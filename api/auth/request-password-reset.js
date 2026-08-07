import { invokeOciFunction } from "../../lib/oci-functions-client.js";

// Exact messages request-password-reset's Go handler emits, see
// chess-auth-functions/request-password-reset/func.go
const ERROR_STATUS = {
  "invalid JSON body": 400,
  "Invalid Input": 400,
  "failed to process request": 500,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  const body = req.body ?? {};

  try {
    const { status, data } = await invokeOciFunction({
      functionId: process.env.REQUEST_PASSWORD_RESET_FUNCTION_ID,
      invokeEndpoint: process.env.REQUEST_PASSWORD_RESET_INVOKE_ENDPOINT,
      body: {
        email: body.email,
      },
      errorStatusMap: ERROR_STATUS,
    });

    res.status(status).json(data);
  } catch (err) {
    console.error("request-password-reset invocation failed:", err);
    res.status(500).json({ error: "failed to process request" });
  }
}
