import { invokeOciFunction } from "../../lib/oci-functions-client.js";

// Exact messages reset-password's Go handler emits, see
// chess-auth-functions/reset-password/func.go
const ERROR_STATUS = {
  "invalid JSON body": 400,
  "Invalid Input": 400,
  "invalid or expired token": 400,
  "failed to reset password": 500,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  const body = req.body ?? {};

  try {
    const { status, data } = await invokeOciFunction({
      functionId: process.env.RESET_PASSWORD_FUNCTION_ID,
      invokeEndpoint: process.env.RESET_PASSWORD_INVOKE_ENDPOINT,
      body: {
        token: body.token,
        new_password: body.new_password,
      },
      errorStatusMap: ERROR_STATUS,
    });

    res.status(status).json(data);
  } catch (err) {
    console.error("reset-password invocation failed:", err);
    res.status(500).json({ error: "failed to reset password" });
  }
}
