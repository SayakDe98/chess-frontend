import { invokeOciFunction } from "../../lib/oci-functions-client.js";

// Exact messages signup's Go handler emits, see
// chess-auth-functions/signup/func.go
const ERROR_STATUS = {
  "invalid JSON body": 400,
  "Invalid Input": 400,
  "User exists": 400,
  "failed to create user": 500,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  const body = req.body ?? {};

  try {
    const { status, data } = await invokeOciFunction({
      functionId: process.env.SIGNUP_FUNCTION_ID,
      invokeEndpoint: process.env.SIGNUP_INVOKE_ENDPOINT,
      body: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
      errorStatusMap: ERROR_STATUS,
    });

    res.status(status).json(data);
  } catch (err) {
    console.error("signup invocation failed:", err);
    res.status(500).json({ error: "failed to create account" });
  }
}
