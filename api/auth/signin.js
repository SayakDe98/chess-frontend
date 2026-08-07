import { invokeOciFunction } from "../../lib/oci-functions-client.js";

// Exact messages signin's Go handler emits, see
// chess-auth-functions/signin/func.go
const ERROR_STATUS = {
  "invalid JSON body": 400,
  "Invalid Input": 400,
  "User does not exist": 404,
  "Wrong credentials": 401,
  "login failed": 500,
  "failed to issue token": 500,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  const body = req.body ?? {};

  try {
    const { status, data } = await invokeOciFunction({
      functionId: process.env.SIGNIN_FUNCTION_ID,
      invokeEndpoint: process.env.SIGNIN_INVOKE_ENDPOINT,
      body: {
        email: body.email,
        password: body.password,
      },
      errorStatusMap: ERROR_STATUS,
    });

    res.status(status).json(data);
  } catch (err) {
    console.error("signin invocation failed:", err);
    res.status(500).json({ error: "failed to sign in" });
  }
}
