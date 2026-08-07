import * as common from "oci-common";

let cachedAuthProvider = null;

function getAuthProvider() {
  if (cachedAuthProvider) return cachedAuthProvider;

  const {
    OCI_TENANCY_OCID,
    OCI_USER_OCID,
    OCI_FINGERPRINT,
    OCI_PRIVATE_KEY,
    OCI_REGION,
  } = process.env;

  if (!OCI_TENANCY_OCID || !OCI_USER_OCID || !OCI_FINGERPRINT || !OCI_PRIVATE_KEY || !OCI_REGION) {
    throw new Error("Missing required OCI_* environment variables for authentication");
  }

  const privateKey = unquote(OCI_PRIVATE_KEY).replace(/\\n/g, "\n");

  cachedAuthProvider = new common.SimpleAuthenticationDetailsProvider(
    unquote(OCI_TENANCY_OCID),
    unquote(OCI_USER_OCID),
    unquote(OCI_FINGERPRINT),
    privateKey,
    null,
    common.Region.fromRegionId(unquote(OCI_REGION))
  );

  return cachedAuthProvider;
}

/**
 * .env.local wraps OCI_PRIVATE_KEY in double quotes (dotenv syntax, stripped by a
 * dotenv parser). If a value gets copy-pasted straight into a single "Value" field
 * in Vercel's dashboard rather than through its bulk .env import, those quote
 * characters are stored as literal characters instead of being stripped — which
 * silently corrupts the PEM. Strip a single matching pair of leading/trailing quotes
 * (and incidental whitespace) from any of these vars so that mistake doesn't break
 * auth.
 */
function unquote(value) {
  const trimmed = value.trim();
  const isQuoted =
    trimmed.length >= 2 &&
    ((trimmed[0] === '"' && trimmed[trimmed.length - 1] === '"') ||
      (trimmed[0] === "'" && trimmed[trimmed.length - 1] === "'"));
  return isQuoted ? trimmed.slice(1, -1) : trimmed;
}

/**
 * Invokes an OCI Function and returns its actual HTTP status + parsed JSON body,
 * whatever that status is (200, 400, 404, 500, ...).
 *
 * We deliberately don't use FunctionsInvokeClient.invokeFunction() here: the OCI
 * Node SDK's retrier treats any non-2xx response as a service error and throws an
 * OciError, discarding the real response body in the process (it only special-cases
 * bodies shaped like {code, message}, so our functions' {"error": "..."} payload
 * gets replaced with a generic "unknown reason." / HTTP status-text message). Our
 * functions use ordinary 400/404/500 responses as part of normal operation, and the
 * caller needs the real body to relay it to the client, so we reuse the same signer
 * and HTTP client the SDK uses internally (oci-common's DefaultRequestSigner +
 * FetchHttpClient + composeRequest, the same pieces FunctionsInvokeClient itself is
 * built on) but read the response ourselves instead of routing it through the
 * throw-on-error retrier.
 */
export async function invokeOciFunction({ functionId, invokeEndpoint, body, errorStatusMap = {} }) {
  if (!functionId || !invokeEndpoint) {
    throw new Error("invokeOciFunction requires both functionId and invokeEndpoint");
  }

  const authProvider = getAuthProvider();
  const signer = new common.DefaultRequestSigner(authProvider);
  const httpClient = new common.FetchHttpClient(signer);

  const request = await common.composeRequest({
    baseEndpoint: `${normalizeInvokeEndpoint(invokeEndpoint)}/20181201`,
    defaultHeaders: {},
    path: "/functions/{functionId}/actions/invoke",
    method: "POST",
    bodyContent: JSON.stringify(body),
    pathParams: { "{functionId}": functionId },
    // fn-intent: httprequest matches the fdk response contract these handlers speak
    // (status code + headers set via the fdk response helper, whichever language SDK).
    // It doesn't change the outer transport status (see below), but it's the
    // semantically correct intent for these functions, so we still send it.
    headerParams: { "content-type": "application/json", "fn-intent": "httprequest" },
    queryParams: {},
  });

  const response = await httpClient.send(request);
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  let status = response.status;
  // OCI's direct Functions Invoke endpoint reports 200 for any completed execution —
  // confirmed empirically (including with fn-intent: httprequest set) that it does
  // NOT forward the status the handler set via its response helper. That passthrough
  // only happens when a function is fronted by API Gateway, not on the raw invoke
  // path used here. So a 200 with an {"error": "..."} body means the function itself
  // reported a failure; recover the intended status from that exact message using
  // the finite set of strings the handler emits (see errorStatusMap per route).
  if (status === 200 && data && typeof data.error === "string") {
    status = errorStatusMap[data.error] || 500;
  }

  return { status, data };
}

/**
 * `fn inspect function` prints the invoke endpoint as the fully-formed invoke URL
 * (host + /20181201/functions/{id}/actions/invoke, functionId already baked in),
 * not just the bare host. Accept either form so pasting that value directly into
 * the env var doesn't silently double the path.
 */
function normalizeInvokeEndpoint(raw) {
  const trimmed = raw.replace(/\/+$/, "");
  const cutIndex = trimmed.indexOf("/20181201");
  return cutIndex === -1 ? trimmed : trimmed.slice(0, cutIndex);
}
