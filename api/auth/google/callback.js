import { invokeOciFunction } from "../../../lib/oci-functions-client.js";

// Exact messages google-oauth-callback's Go handler emits, see
// chess-auth-functions/google-oauth-callback/func.go
const ERROR_STATUS = {
  "invalid JSON body": 400,
  "code is required": 400,
  "exchange failed": 500,
  "failed to fetch user info": 500,
  "db error": 500,
  "failed to issue token": 500,
};

// This is the URL Google actually redirects the browser to, so it's also the
// exact value that must be registered as the authorized redirect URI in
// Google Cloud Console, and match GOOGLE_REDIRECT_URI on both this app and
// the OCI google-oauth-callback function's config.
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  const { code, state } = req.query;
  const cookieState = readCookie(req.headers.cookie, "oauth_state");

  if (!state || state !== cookieState) {
    res.status(401).json({ error: "invalid state" });
    return;
  }

  try {
    const { status, data } = await invokeOciFunction({
      functionId: process.env.GOOGLE_OAUTH_CALLBACK_FUNCTION_ID,
      invokeEndpoint: process.env.GOOGLE_OAUTH_CALLBACK_INVOKE_ENDPOINT,
      body: { code },
      errorStatusMap: ERROR_STATUS,
    });

    if (status !== 200) {
      res.status(status).json(data);
      return;
    }

    // Same query-param handoff chess-backend's Go code always used
    // (FRONTEND_URL + "/auth/callback?token=..."), read by
    // chess-frontend/src/pages/AuthCallback.jsx into localStorage — the same
    // path signup/signin already use. FRONTEND_URL is optional: this route
    // and the static frontend are now the same Vercel deployment, so a
    // relative redirect works without it; set FRONTEND_URL only if the
    // frontend is ever served from a different origin than this API.
    const target = process.env.FRONTEND_URL
      ? `${process.env.FRONTEND_URL}/auth/callback?token=${encodeURIComponent(data.token)}`
      : `/auth/callback?token=${encodeURIComponent(data.token)}`;
    res.setHeader("Location", target);
    res.status(307).end();
  } catch (err) {
    console.error("google-oauth-callback invocation failed:", err);
    res.status(500).json({ error: "oauth callback failed" });
  }
}

function readCookie(header, name) {
  if (!header) return null;
  const match = header
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}
