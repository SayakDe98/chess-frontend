import crypto from "node:crypto";

// Matches chessauth.GoogleOauthConfig()'s scopes in chess-auth-functions.
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

// No OCI Function call here — building the consent URL only needs the public
// client ID, not the client secret, so there's nothing to sign or invoke.
// The actual token exchange (which does need the secret) happens in the OCI
// google-oauth-callback function, called from ../callback.js.
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_REDIRECT_URI) {
    console.error("google login: missing GOOGLE_CLIENT_ID or GOOGLE_REDIRECT_URI");
    res.status(500).json({ error: "server misconfigured" });
    return;
  }

  const state = crypto.randomBytes(16).toString("hex");

  const authUrl = new URL(GOOGLE_AUTH_URL);
  authUrl.searchParams.set("client_id", GOOGLE_CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", GOOGLE_REDIRECT_URI);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", SCOPES.join(" "));
  authUrl.searchParams.set("state", state);

  // Read back by ./callback.js to verify the state param Google echoes on
  // redirect (CSRF check), matching chess-backend's original AuthHandler
  // GoogleLogin/GoogleCallback cookie. Both routes live on the same Vercel
  // domain now, so the round trip is reliable without a gateway in between.
  res.setHeader(
    "Set-Cookie",
    `oauth_state=${state}; Path=/; Max-Age=300; HttpOnly; Secure; SameSite=Lax`
  );
  res.setHeader("Location", authUrl.toString());
  res.status(307).end();
}
