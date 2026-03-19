import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PawnSVG, RookSVG, KnightSVG, QueenSVG } from "../utils/PieceIcons";

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

export default function Login() {
  const navigate = useNavigate();
  const { login, username } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Outfit:wght@300;400;500;600&display=swap');
      *{margin:0;padding:0;box-sizing:border-box;}
      body{overflow-x:hidden;}

      @keyframes chessfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
      @keyframes fadein{from{opacity:0}to{opacity:1}}
      @keyframes slideup{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
      @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
      @keyframes moused{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}

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

      .cm-scroll{
        position:fixed;bottom:24px;left:64px;
        display:flex;align-items:center;gap:10px;
        color:#5b21b6;opacity:.45;font-size:12px;letter-spacing:.07em;
        z-index:6;animation:fadein 1.5s .8s ease both;
      }
      .cm-mouse{width:22px;height:34px;border:1.5px solid currentColor;border-radius:12px;display:flex;justify-content:center;padding-top:7px;}
      .cm-mdot{width:3px;height:6px;background:currentColor;border-radius:2px;animation:moused 1.5s ease-in-out infinite;}

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

      .cm-forgot{text-align:right;margin-top:5px;}
      .cm-forgot span{font-size:11px;color:#7c3aed;cursor:pointer;opacity:.65;transition:opacity .2s;}
      .cm-forgot span:hover{opacity:1;}

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

      .cm-divider{display:flex;align-items:center;gap:12px;margin:14px 0;}
      .cm-divider::before,.cm-divider::after{content:'';flex:1;height:1px;background:rgba(167,139,250,.28);}
      .cm-divider span{font-size:11px;color:#7c3aed;opacity:.45;letter-spacing:.1em;text-transform:uppercase;}

      .cm-google-btn{
        width:100%;padding:11px 16px;
        background:#fff;
        border:1.5px solid rgba(167,139,250,.35);
        border-radius:10px;
        font-family:'Outfit',sans-serif;font-size:14px;font-weight:500;
        color:#2e1065;cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:10px;
        transition:border-color .2s,box-shadow .2s,transform .15s;
      }
      .cm-google-btn:hover{border-color:#7c3aed;box-shadow:0 4px 16px rgba(124,58,237,.12);transform:translateY(-1px);}
      .cm-google-btn:active{transform:translateY(0);}
      .cm-google-icon{width:18px;height:18px;flex-shrink:0;}

      .cm-register{text-align:center;font-size:13px;color:#5b21b6;opacity:.7;margin-top:14px;}
      .cm-register button{
        background:none;border:none;
        font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;
        color:#7c3aed;cursor:pointer;padding:0;
        text-decoration:underline;text-underline-offset:2px;
        text-decoration-color:rgba(124,58,237,.35);transition:text-decoration-color .2s;
      }
      .cm-register button:hover{text-decoration-color:#7c3aed;}

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
        .cm-scroll{display:none;}
        .cm-float-piece{display:none;}
      }
      @media screen and (max-width:480px){
        .cm-card{padding:20px 14px;}
        .cm-card-title{font-size:1.4rem;}
        .cm-input{font-size:16px;padding:10px 12px;}
        .cm-field{margin-bottom:10px;}
        .cm-submit{padding:11px;}
        .cm-divider{margin:10px 0;}
      }
    `;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

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
      login(data.token);
      toast.success("Login successful");
      navigate("/");
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleLogin() {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  }
  useEffect(() => {
    if(username) {
      navigate("/");
    }
  },[username]);
  return (
    <div className="cm-page">
      <div className="cm-bg" />
      <Board />

      <Float style={{ top: "9%", left: "37%", zIndex: 3 }} delay="0s" dur="7s"><PawnSVG size={68} color="#9d5ff5" /></Float>
      <Float style={{ top: "14%", right: "450px", zIndex: 3 }} delay="1.2s" dur="5.5s"><PawnSVG size={52} color="#7c3aed" /></Float>
      <Float style={{ bottom: "12%", left: "40%", zIndex: 3 }} delay="2s" dur="8s"><PawnSVG size={62} color="#a78bfa" /></Float>
      <Float style={{ top: "22%", right: "20px", zIndex: 3 }} delay="0.6s" dur="6.5s"><RookSVG size={84} color="#c4b5fd" /></Float>
      <Float style={{ bottom: "8%", right: "50px", zIndex: 3 }} delay="1.6s" dur="7.5s"><KnightSVG size={96} color="#7c3aed" /></Float>
      <Float style={{ top: "4%", right: "210px", zIndex: 2 }} delay="0.9s" dur="9s"><QueenSVG size={106} color="#ddd6fe" /></Float>

      <div className="cm-left">
        <h1 className="cm-headline">
          Chess is<br /><em>essentially</em><br />a philosopher's<br />game
        </h1>
        <p className="cm-sub">
          Our online chess platform offers a unique 3D playing experience.
          Challenge players from around the world and test your skills.
        </p>
      </div>

      <div className="cm-scroll">
        <div className="cm-mouse"><div className="cm-mdot" /></div>
        <span>Scroll down</span>
      </div>

      <div className="cm-right">
        <div className="cm-card">
          <h2 className="cm-card-title">Welcome back</h2>
          <p className="cm-card-sub">Sign in to continue your game</p>

          <form onSubmit={handleSubmit}>
            <div className="cm-field">
              <label htmlFor="email">Email address</label>
              <input id="email" className="cm-input" type="email" name="email"
                placeholder="you@example.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="cm-field">
              <label htmlFor="password">Password</label>
              <input id="password" className="cm-input" type="password" name="password"
                placeholder="••••••••••" value={form.password} onChange={handleChange} required />
              <div className="cm-forgot"><span>Forgot password?</span></div>
            </div>
            <button type="submit" className={`cm-submit${loading ? " loading" : ""}`}>
              <span>{loading ? "Signing in…" : "Play for Free →"}</span>
            </button>
          </form>

          <div className="cm-divider"><span>or</span></div>

          <button type="button" className="cm-google-btn" onClick={handleGoogleLogin}>
            <svg className="cm-google-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="cm-register">
            New here?{" "}
            <button type="button" onClick={() => navigate("/register")}>Create an account</button>
          </p>
        </div>
      </div>
    </div>
  );
}
