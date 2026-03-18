import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PawnSVG, RookSVG, KnightSVG,QueenSVG  } from "../utils/PieceIcons";

/* ─── Floating wrapper ───────────────────────────────────────────────── */
const Float = ({ children, style, delay = "0s", dur = "7s" }) => (
  <div style={{
    position: "absolute",
    animation: `chessfloat ${dur} ease-in-out infinite`,
    animationDelay: delay,
    filter: "drop-shadow(0 18px 36px rgba(109,40,217,0.28))",
    ...style,
  }}>
    {children}
  </div>
);

/* ─── Checkerboard ───────────────────────────────────────────────────── */
function Board() {
  const tiles = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const dark = (r + c) % 2 === 0;
      tiles.push(
        <div key={`${r}-${c}`} style={{
          position: "absolute",
          left: c * 52, top: r * 52,
          width: 52, height: 52,
          background: dark ? "rgba(139,92,246,0.22)" : "rgba(255,255,255,0.6)",
          borderRadius: 3,
        }} />
      );
    }
  }
  return (
    <div style={{
      position: "fixed",
      bottom: -60, right: -60,
      width: 416, height: 416,
      transform: "rotate(-16deg)",
      opacity: 0.6,
      zIndex: 1,
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "0 40px 80px rgba(109,40,217,0.22)",
      animation: "fadein 1.2s ease both",
    }}>
      <div style={{ position: "relative", width: 416, height: 416 }}>{tiles}</div>
    </div>
  );
}

/* ─── Main Login ─────────────────────────────────────────────────────── */
export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Outfit:wght@300;400;500;600&display=swap');
      *{margin:0;padding:0;box-sizing:border-box;}
      body{overflow-x:hidden;}

      @keyframes chessfloat {
        0%,100%{transform:translateY(0)}
        50%{transform:translateY(-16px)}
      }
      @keyframes fadein {
        from{opacity:0} to{opacity:1}
      }
      @keyframes slideup {
        from{opacity:0;transform:translateY(28px)}
        to{opacity:1;transform:translateY(0)}
      }
      @keyframes shimmer {
        0%{background-position:-200% center}
        100%{background-position:200% center}
      }
      @keyframes moused {
        0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)}
      }

      .cm-page{
        min-height:100vh;
        display:flex;
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

      /* NAV */
      .cm-nav{
        position:fixed;top:0;left:0;right:0;
        padding:20px 48px;
        display:flex;justify-content:space-between;align-items:center;
        z-index:20;
        animation:fadein .6s ease both;
      }
      .cm-brand{display:flex;align-items:center;gap:10px;}
      .cm-brand-icon{
        width:36px;height:36px;
        background:linear-gradient(135deg,#7c3aed,#a78bfa);
        border-radius:10px;
        display:flex;align-items:center;justify-content:center;
        font-size:17px;
        box-shadow:0 4px 12px rgba(124,58,237,.38);
      }
      .cm-brand-name{
        font-weight:700;font-size:16px;letter-spacing:.06em;color:#3b1d8a;
      }
      .cm-brand-name span{color:#7c3aed;}
      .cm-navlinks{display:flex;gap:26px;list-style:none;align-items:center;}
      .cm-navlinks li{
        font-size:13px;font-weight:400;color:#4c1d95;opacity:.7;cursor:pointer;
        transition:opacity .2s;
      }
      .cm-navlinks li:hover{opacity:1;}
      .cm-navlinks li.reg{
        background:#7c3aed;color:#fff !important;opacity:1 !important;
        padding:8px 20px;border-radius:8px;font-weight:500;
        box-shadow:0 4px 14px rgba(124,58,237,.36);
        transition:background .2s,transform .2s !important;
      }
      .cm-navlinks li.reg:hover{background:#6d28d9 !important;transform:translateY(-1px);}

      /* LEFT */
      .cm-left{
        flex:1;
        display:flex;flex-direction:column;justify-content:center;
        padding:80px 64px 60px;
        position:relative;z-index:2;
        animation:slideup .9s cubic-bezier(.16,1,.3,1) .1s both;
      }
      @media(max-width:900px){.cm-left{display:none;}.cm-right{flex:1;}}
      .cm-headline{
        font-family:'Playfair Display',serif;
        font-weight:800;
        font-size:clamp(2.6rem,4vw,4.2rem);
        line-height:1.08;
        color:#2e1065;
        letter-spacing:-.02em;
        margin-bottom:18px;
      }
      .cm-headline em{
        font-style:italic;
        background:linear-gradient(135deg,#7c3aed 0%,#a78bfa 50%,#7c3aed 100%);
        background-size:200% auto;
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        background-clip:text;
        animation:shimmer 3s linear infinite;
      }
      .cm-sub{
        font-size:15px;font-weight:300;color:#6d28d9;opacity:.72;
        line-height:1.7;max-width:360px;margin-bottom:44px;
      }
      .cm-btn-primary{
        padding:13px 28px;
        background:#7c3aed;color:#fff;
        border:none;border-radius:10px;
        font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;
        letter-spacing:.04em;cursor:pointer;
        box-shadow:0 8px 24px rgba(124,58,237,.38);
        transition:background .2s,transform .2s;
      }
      .cm-btn-primary:hover{background:#6d28d9;transform:translateY(-2px);}
      .cm-btn-ghost{
        padding:13px 28px;
        background:transparent;
        border:1.5px solid rgba(124,58,237,.35);
        border-radius:10px;
        font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;
        color:#5b21b6;cursor:pointer;
        transition:border-color .2s,background .2s;
      }
      .cm-btn-ghost:hover{border-color:#7c3aed;background:rgba(124,58,237,.07);}

      /* SCROLL HINT */
      .cm-scroll{
        position:fixed;bottom:28px;left:64px;
        display:flex;align-items:center;gap:10px;
        color:#5b21b6;opacity:.45;font-size:12px;letter-spacing:.07em;
        z-index:6;animation:fadein 1.5s .8s ease both;
      }
      .cm-mouse{
        width:22px;height:34px;
        border:1.5px solid currentColor;border-radius:12px;
        display:flex;justify-content:center;padding-top:7px;
      }
      .cm-mdot{
        width:3px;height:6px;background:currentColor;border-radius:2px;
        animation:moused 1.5s ease-in-out infinite;
      }

      /* RIGHT / FORM */
      .cm-right{
        width:440px;flex-shrink:0;
        display:flex;align-items:center;justify-content:center;
        padding:40px 24px;
        position:relative;z-index:5;
      }
      .cm-card{
        width:100%;max-width:380px;
        background:rgba(255,255,255,.76);
        backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);
        border-radius:24px;
        padding:44px 40px;
        box-shadow:
          0 2px 0 rgba(255,255,255,.92) inset,
          0 24px 64px rgba(109,40,217,.18),
          0 4px 16px rgba(109,40,217,.08);
        border:1px solid rgba(255,255,255,.82);
        animation:slideup .8s cubic-bezier(.16,1,.3,1) .2s both;
      }
      .cm-card-title{
        font-family:'Playfair Display',serif;font-weight:700;
        font-size:2rem;color:#2e1065;margin-bottom:6px;letter-spacing:-.01em;
      }
      .cm-card-sub{
        font-size:13px;color:#7c3aed;opacity:.62;
        margin-bottom:30px;font-weight:300;
      }

      .cm-field{margin-bottom:18px;}
      .cm-field label{
        display:block;font-size:11px;font-weight:500;
        letter-spacing:.1em;text-transform:uppercase;
        color:#5b21b6;margin-bottom:8px;
      }
      .cm-input{
        width:100%;padding:13px 16px;
        background:rgba(237,233,254,.5);
        border:1.5px solid rgba(167,139,250,.35);
        border-radius:12px;
        font-family:'Outfit',sans-serif;font-size:14px;font-weight:400;
        color:#2e1065;outline:none;
        transition:border-color .25s,background .25s,box-shadow .25s;
        caret-color:#7c3aed;
      }
      .cm-input::placeholder{color:rgba(109,40,217,.28);}
      .cm-input:focus{
        border-color:#7c3aed;
        background:rgba(255,255,255,.9);
        box-shadow:0 0 0 4px rgba(124,58,237,.11);
      }
      .cm-forgot{text-align:right;margin-top:6px;}
      .cm-forgot span{
        font-size:11px;color:#7c3aed;cursor:pointer;opacity:.65;
        transition:opacity .2s;
      }
      .cm-forgot span:hover{opacity:1;}

      .cm-submit{
        margin-top:22px;width:100%;padding:14px;
        background:linear-gradient(135deg,#7c3aed 0%,#9d5ff5 100%);
        color:#fff;border:none;border-radius:12px;
        font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;
        letter-spacing:.04em;cursor:pointer;
        position:relative;overflow:hidden;
        transition:transform .2s,box-shadow .2s;
        box-shadow:0 8px 24px rgba(124,58,237,.38);
      }
      .cm-submit::before{
        content:'';position:absolute;inset:0;
        background:linear-gradient(135deg,#6d28d9 0%,#7c3aed 100%);
        opacity:0;transition:opacity .3s;
      }
      .cm-submit:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(124,58,237,.48);}
      .cm-submit:hover::before{opacity:1;}
      .cm-submit:active{transform:translateY(0);}
      .cm-submit span{position:relative;z-index:1;}
      .cm-submit.loading{opacity:.75;pointer-events:none;}

      .cm-divider{
        display:flex;align-items:center;gap:12px;margin:22px 0;
      }
      .cm-divider::before,.cm-divider::after{
        content:'';flex:1;height:1px;background:rgba(167,139,250,.28);
      }
      .cm-divider span{
        font-size:11px;color:#7c3aed;opacity:.45;
        letter-spacing:.1em;text-transform:uppercase;
      }
      .cm-register{text-align:center;font-size:13px;color:#5b21b6;opacity:.7;}
      .cm-register button{
        background:none;border:none;
        font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;
        color:#7c3aed;cursor:pointer;padding:0;
        text-decoration:underline;text-underline-offset:2px;
        text-decoration-color:rgba(124,58,237,.35);
        transition:text-decoration-color .2s;
      }
      .cm-register button:hover{text-decoration-color:#7c3aed;}
    `;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Login failed"); return; }
      localStorage.setItem("token", data.token);
      toast.success("Login successful");
      navigate("/");
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cm-page">
      <div className="cm-bg" />
      <Board />

      {/* Floating pieces */}
      <Float style={{ top: "9%", left: "37%", zIndex: 3 }} delay="0s" dur="7s">
        <PawnSVG size={68} color="#9d5ff5" />
      </Float>
      <Float style={{ top: "14%", right: "450px", zIndex: 3 }} delay="1.2s" dur="5.5s">
        <PawnSVG size={52} color="#7c3aed" />
      </Float>
      <Float style={{ bottom: "12%", left: "40%", zIndex: 3 }} delay="2s" dur="8s">
        <PawnSVG size={62} color="#a78bfa" />
      </Float>
      <Float style={{ top: "22%", right: "20px", zIndex: 3 }} delay="0.6s" dur="6.5s">
        <RookSVG size={84} color="#c4b5fd" />
      </Float>
      <Float style={{ bottom: "8%", right: "50px", zIndex: 3 }} delay="1.6s" dur="7.5s">
        <KnightSVG size={96} color="#7c3aed" />
      </Float>
      <Float style={{ top: "4%", right: "210px", zIndex: 2 }} delay="0.9s" dur="9s">
        <QueenSVG size={106} color="#ddd6fe" />
      </Float>

      {/* Left */}
      <div className="cm-left">
        <h1 className="cm-headline">
          Chess is<br />
          <em>essentially</em><br />
          a philosopher's<br />
          game
        </h1>
        <p className="cm-sub">
          Our online chess platform offers a unique 3D playing experience,
          so you can feel like you're playing on a real board. Challenge
          players from around the world and test your skills.
        </p>
      </div>

      {/* Scroll hint */}
      <div className="cm-scroll">
        <div className="cm-mouse"><div className="cm-mdot" /></div>
        <span>Scroll down</span>
      </div>

      {/* Form */}
      <div className="cm-right">
        <div className="cm-card">
          <h2 className="cm-card-title">Welcome back</h2>
          <p className="cm-card-sub">Sign in to continue your game</p>

          <form onSubmit={handleSubmit}>
            <div className="cm-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email" className="cm-input"
                type="email" name="email"
                placeholder="you@example.com"
                value={form.email} onChange={handleChange} required
              />
            </div>

            <div className="cm-field">
              <label htmlFor="password">Password</label>
              <input
                id="password" className="cm-input"
                type="password" name="password"
                placeholder="••••••••••"
                value={form.password} onChange={handleChange} required
              />
              <div className="cm-forgot"><span>Forgot password?</span></div>
            </div>

            <button type="submit" className={`cm-submit${loading ? " loading" : ""}`}>
              <span>{loading ? "Signing in…" : "Play for Free →"}</span>
            </button>
          </form>

          <div className="cm-divider"><span>or</span></div>

          <p className="cm-register">
            New here?{" "}
            <button type="button" onClick={() => navigate("/register")}>Create an account</button>
          </p>
        </div>
      </div>
    </div>
  );
}
