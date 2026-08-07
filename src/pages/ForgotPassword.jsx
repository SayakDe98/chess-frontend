import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PawnSVG, KnightSVG, QueenSVG } from "../utils/PieceIcons";

const Float = ({ children, style, delay = "0s", dur = "7s" }) => (
  <div className="cm-float-piece" style={{
    position: "absolute",
    animation: `chessfloat ${dur} ease-in-out infinite`,
    animationDelay: delay,
    filter: "drop-shadow(0 18px 36px rgba(109,40,217,0.28))",
    ...style,
  }}>
    {children}
  </div>
);

function Board() {
  const tiles = [];
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const dark = (r + c) % 2 === 0;
      tiles.push(<div key={`${r}-${c}`} style={{
        position: "absolute", left: c * 52, top: r * 52,
        width: 52, height: 52,
        background: dark ? "rgba(139,92,246,0.22)" : "rgba(255,255,255,0.6)",
        borderRadius: 3,
      }} />);
    }
  return (
    <div style={{
      position: "fixed", bottom: -60, right: -60,
      width: 416, height: 416, transform: "rotate(-16deg)",
      opacity: 0.6, zIndex: 1, borderRadius: 14, overflow: "hidden",
      boxShadow: "0 40px 80px rgba(109,40,217,0.22)",
      animation: "fadein 1.2s ease both",
    }}>
      <div style={{ position: "relative", width: 416, height: 416 }}>{tiles}</div>
    </div>
  );
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("form");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Outfit:wght@300;400;500;600&display=swap');
      *{margin:0;padding:0;box-sizing:border-box;}
      body{overflow-x:hidden;}
      #root{padding-top:0;padding-bottom:0;max-width:none}

      @keyframes chessfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
      @keyframes fadein{from{opacity:0}to{opacity:1}}
      @keyframes slideup{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
      @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}

      .cm-page{
        height:100svh;
        display:flex;
        padding-top:64px;
        font-family:'Outfit',sans-serif;
        background:#ede9fe;
        position:relative;
        overflow:hidden;
      }
      .cm-bg{
        position:fixed;inset:0;
        background:
          radial-gradient(ellipse 80% 55% at 55% 35%,rgba(167,139,250,.28) 0,transparent 60%),
          radial-gradient(ellipse 50% 50% at 10% 70%,rgba(196,181,253,.3) 0,transparent 55%),
          radial-gradient(ellipse 40% 40% at 88% 88%,rgba(124,58,237,.14) 0,transparent 50%),
          #ede9fe;
        z-index:0;
      }

      .cm-left{
        flex:1;display:flex;flex-direction:column;justify-content:center;
        padding:40px 64px 40px;
        position:relative;z-index:2;
        animation:slideup .9s cubic-bezier(.16,1,.3,1) .1s both;
      }
      .cm-headline{
        font-family:'Playfair Display',serif;font-weight:800;
        font-size:clamp(2.2rem,3.5vw,3.8rem);
        line-height:1.08;color:#2e1065;letter-spacing:-.02em;margin-bottom:14px;
      }
      .cm-headline em{
        font-style:italic;
        background:linear-gradient(135deg,#7c3aed 0%,#a78bfa 50%,#7c3aed 100%);
        background-size:200% auto;
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        animation:shimmer 3s linear infinite;
      }
      .cm-sub{
        font-size:14px;font-weight:300;color:#6d28d9;opacity:.72;
        line-height:1.65;max-width:340px;margin-bottom:0;
      }

      .cm-right{
        width:420px;flex-shrink:0;
        display:flex;align-items:center;justify-content:center;
        padding:24px 24px;
        position:relative;z-index:5;
      }
      .cm-card{
        width:100%;max-width:375px;
        background:rgba(255,255,255,.76);
        backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);
        border-radius:20px;
        padding:32px 32px;
        box-shadow:
          0 2px 0 rgba(255,255,255,.92) inset,
          0 24px 64px rgba(109,40,217,.18),
          0 4px 16px rgba(109,40,217,.08);
        border:1px solid rgba(255,255,255,.82);
        animation:slideup .8s cubic-bezier(.16,1,.3,1) .2s both;
      }
      .cm-card-title{
        font-family:'Playfair Display',serif;font-weight:700;
        font-size:1.75rem;color:#2e1065;margin-bottom:4px;letter-spacing:-.01em;
      }
      .cm-card-sub{font-size:13px;color:#7c3aed;opacity:.62;margin-bottom:20px;font-weight:300;}

      .cm-field{margin-bottom:14px;}
      .cm-field label{
        display:block;font-size:11px;font-weight:500;
        letter-spacing:.1em;text-transform:uppercase;
        color:#5b21b6;margin-bottom:6px;
      }
      .cm-input{
        width:100%;padding:11px 14px;
        background:rgba(237,233,254,.5);
        border:1.5px solid rgba(167,139,250,.35);
        border-radius:10px;
        font-family:'Outfit',sans-serif;font-size:14px;font-weight:400;
        color:#2e1065;outline:none;
        transition:border-color .25s,background .25s,box-shadow .25s;
        caret-color:#7c3aed;
      }
      .cm-input::placeholder{color:rgba(109,40,217,.28);}
      .cm-input:focus{border-color:#7c3aed;background:rgba(255,255,255,.9);box-shadow:0 0 0 4px rgba(124,58,237,.11);}

      .cm-submit{
        margin-top:16px;width:100%;padding:12px;
        background:linear-gradient(135deg,#7c3aed 0%,#9d5ff5 100%);
        color:#fff;border:none;border-radius:10px;
        font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;
        letter-spacing:.04em;cursor:pointer;
        position:relative;overflow:hidden;
        transition:transform .2s,box-shadow .2s;
        box-shadow:0 8px 24px rgba(124,58,237,.38);
      }
      .cm-submit::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#6d28d9 0%,#7c3aed 100%);opacity:0;transition:opacity .3s;}
      .cm-submit:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(124,58,237,.48);}
      .cm-submit:hover::before{opacity:1;}
      .cm-submit:active{transform:translateY(0);}
      .cm-submit span{position:relative;z-index:1;}
      .cm-submit.loading{opacity:.75;pointer-events:none;}

      .cm-back{text-align:center;font-size:13px;color:#5b21b6;opacity:.7;margin-top:14px;}
      .cm-back button{
        background:none;border:none;
        font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;
        color:#7c3aed;cursor:pointer;padding:0;
        text-decoration:underline;text-underline-offset:2px;
        text-decoration-color:rgba(124,58,237,.35);transition:text-decoration-color .2s;
      }
      .cm-back button:hover{text-decoration-color:#7c3aed;}

      .cm-status-icon{
        width:52px;height:52px;border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        margin-bottom:16px;
        animation:slideup .5s cubic-bezier(.16,1,.3,1) both;
      }
      .cm-status-icon.success{background:rgba(34,197,94,.14);color:#16a34a;}
      .cm-status-icon svg{width:26px;height:26px;}

      /* ── Responsive ───────────────────────────────────────────────── */
      @media screen and (max-width:900px){
        .cm-left{display:none;}
        .cm-right{width:100svw;flex:1;}
      }
      @media screen and (max-width:768px){
        .cm-page{height:100svh;flex-direction:column;align-items:center;justify-content:center;padding-top:64px;overflow:hidden;}
        .cm-right{width:100svw;padding:16px;align-items:center;}
        .cm-card{max-width:100%;padding:24px 18px;border-radius:16px;}
        .cm-card-title{font-size:1.5rem;}
        .cm-float-piece{display:none;}
      }
      @media screen and (max-width:480px){
        .cm-card{padding:20px 14px;}
        .cm-card-title{font-size:1.4rem;}
        .cm-input{font-size:16px;padding:10px 12px;}
        .cm-field{margin-bottom:10px;}
        .cm-submit{padding:11px;}
      }
    `;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      // Always the generic non-enumerating message the backend returns —
      // never anything that could reveal whether the email exists.
      setMessage(data.message);
      setStatus("sent");
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cm-page">
      <div className="cm-bg" />
      <Board />

      <Float style={{ top: "9%", left: "37%", zIndex: 3 }} delay="0s" dur="7s"><PawnSVG size={68} color="#9d5ff5" /></Float>
      <Float style={{ bottom: "12%", left: "40%", zIndex: 3 }} delay="2s" dur="8s"><PawnSVG size={62} color="#a78bfa" /></Float>
      <Float style={{ bottom: "8%", right: "50px", zIndex: 3 }} delay="1.6s" dur="7.5s"><KnightSVG size={96} color="#7c3aed" /></Float>
      <Float style={{ top: "4%", right: "210px", zIndex: 2 }} delay="0.9s" dur="9s"><QueenSVG size={106} color="#ddd6fe" /></Float>

      <div className="cm-left">
        <h1 className="cm-headline">
          Locked out?<br />Let's get you<br /><em>back in.</em>
        </h1>
        <p className="cm-sub">
          Enter the email on your account and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="cm-right">
        <div className="cm-card">
          {status === "sent" ? (
            <>
              <div className="cm-status-icon success">
                <svg viewBox="0 0 24 24" fill="none"><path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h2 className="cm-card-title">Check your email</h2>
              <p className="cm-card-sub">{message}</p>
              <p className="cm-back"><button type="button" onClick={() => navigate("/login")}>Back to sign in</button></p>
            </>
          ) : (
            <>
              <h2 className="cm-card-title">Forgot password?</h2>
              <p className="cm-card-sub">We'll email you a link to reset it</p>

              <form onSubmit={handleSubmit}>
                <div className="cm-field">
                  <label htmlFor="email">Email address</label>
                  <input id="email" className="cm-input" type="email" name="email"
                    placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit" className={`cm-submit${loading ? " loading" : ""}`}>
                  <span>{loading ? "Sending…" : "Send reset link →"}</span>
                </button>
              </form>

              <p className="cm-back"><button type="button" onClick={() => navigate("/login")}>Back to sign in</button></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
