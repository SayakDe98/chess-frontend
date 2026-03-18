import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/* ─── Chess piece SVGs ───────────────────────────────────────────────── */
const PawnSVG = ({ size = 80, color = "#a78bfa" }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="72" rx="16" ry="5" fill={color} opacity="0.22" />
    <rect x="28" y="54" width="24" height="10" rx="3" fill={color} />
    <rect x="32" y="38" width="16" height="18" rx="2" fill={color} opacity="0.9" />
    <circle cx="40" cy="30" r="10" fill={color} />
    <ellipse cx="37" cy="27" rx="3" ry="4" fill="white" opacity="0.22" />
  </svg>
);

const BishopSVG = ({ size = 100, color = "#a78bfa" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="92" rx="20" ry="6" fill={color} opacity="0.2" />
    <rect x="28" y="74" width="44" height="12" rx="3" fill={color} />
    <path d="M34 74 C30 58 28 44 36 30 C42 20 58 20 64 30 C72 44 70 58 66 74 Z" fill={color} opacity="0.88" />
    <circle cx="50" cy="18" r="8" fill={color} />
    <line x1="50" y1="10" x2="50" y2="4" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <circle cx="50" cy="3" r="3" fill={color} />
    <ellipse cx="44" cy="34" rx="4" ry="7" fill="white" opacity="0.2" />
  </svg>
);

const KingSVG = ({ size = 115, color = "#c4b5fd" }) => (
  <svg width={size} height={size} viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="57" cy="106" rx="26" ry="7" fill={color} opacity="0.2" />
    <rect x="30" y="86" width="55" height="14" rx="3" fill={color} />
    <path d="M34 86 L28 46 L57 60 L86 46 L80 86 Z" fill={color} opacity="0.9" />
    <rect x="50" y="10" width="14" height="36" rx="3" fill={color} />
    <rect x="40" y="20" width="34" height="14" rx="3" fill={color} />
    <ellipse cx="48" cy="50" rx="6" ry="10" fill="white" opacity="0.18" />
  </svg>
);

const RookSVG = ({ size = 90, color = "#7c3aed" }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="48" cy="88" rx="20" ry="6" fill={color} opacity="0.2" />
    <rect x="26" y="66" width="44" height="14" rx="3" fill={color} />
    <rect x="30" y="32" width="36" height="36" rx="2" fill={color} opacity="0.9" />
    <rect x="26" y="18" width="10" height="16" rx="2" fill={color} />
    <rect x="43" y="18" width="10" height="16" rx="2" fill={color} />
    <rect x="60" y="18" width="10" height="16" rx="2" fill={color} />
    <ellipse cx="43" cy="30" rx="5" ry="7" fill="white" opacity="0.18" />
  </svg>
);

const QueenSVG = ({ size = 110, color = "#ddd6fe" }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="112" rx="26" ry="7" fill={color} opacity="0.2" />
    <rect x="32" y="90" width="56" height="14" rx="3" fill={color} />
    <path d="M36 90 L30 50 L44 62 L60 20 L76 62 L90 50 L84 90 Z" fill={color} opacity="0.9" />
    <circle cx="30" cy="46" r="7" fill={color} />
    <circle cx="60" cy="16" r="7" fill={color} />
    <circle cx="90" cy="46" r="7" fill={color} />
    <ellipse cx="52" cy="45" rx="6" ry="10" fill="white" opacity="0.18" />
  </svg>
);

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
      bottom: -60, left: -60,
      width: 416, height: 416,
      transform: "rotate(16deg)",
      opacity: 0.55,
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

/* ─── Password strength ──────────────────────────────────────────────── */
function PasswordStrength({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#ef4444", "#f59e0b", "#6366f1", "#22c55e"];

  if (!password) return null;

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 99,
            background: i <= score ? colors[score] : "rgba(167,139,250,0.2)",
            transition: "background 0.3s ease",
          }} />
        ))}
      </div>
      <span style={{
        fontSize: 10, letterSpacing: "0.08em",
        color: colors[score], fontWeight: 500,
        textTransform: "uppercase",
        transition: "color 0.3s ease",
      }}>
        {labels[score]}
      </span>
    </div>
  );
}

/* ─── Main Register ──────────────────────────────────────────────────── */
export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Outfit:wght@300;400;500;600&display=swap');
      *{margin:0;padding:0;box-sizing:border-box;}
      body{overflow-x:hidden;}

      @keyframes chessfloat {
        0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)}
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
      @keyframes checkpop {
        0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)}
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
          radial-gradient(ellipse 80% 55% at 45% 35%,rgba(167,139,250,.28) 0,transparent 60%),
          radial-gradient(ellipse 50% 50% at 90% 70%,rgba(196,181,253,.3) 0,transparent 55%),
          radial-gradient(ellipse 40% 40% at 12% 85%,rgba(124,58,237,.14) 0,transparent 50%),
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
      .cm-brand-name{font-weight:700;font-size:16px;letter-spacing:.06em;color:#3b1d8a;}
      .cm-brand-name span{color:#7c3aed;}
      .cm-navlinks{display:flex;gap:26px;list-style:none;align-items:center;}
      .cm-navlinks li{
        font-size:13px;font-weight:400;color:#4c1d95;opacity:.7;cursor:pointer;
        transition:opacity .2s;
      }
      .cm-navlinks li:hover{opacity:1;}
      .cm-navlinks li.login-pill{
        background:transparent;
        border:1.5px solid rgba(124,58,237,.4);
        padding:7px 20px;border-radius:8px;font-weight:500;
        opacity:1 !important;
        transition:border-color .2s,background .2s !important;
      }
      .cm-navlinks li.login-pill:hover{border-color:#7c3aed;background:rgba(124,58,237,.07);}
      .cm-navlinks li.reg{
        background:#7c3aed;color:#fff !important;opacity:1 !important;
        padding:8px 20px;border-radius:8px;font-weight:500;
        box-shadow:0 4px 14px rgba(124,58,237,.36);
        transition:background .2s,transform .2s !important;
      }
      .cm-navlinks li.reg:hover{background:#6d28d9 !important;transform:translateY(-1px);}

      /* RIGHT / FORM (leading side for register) */
      .cm-left-form{
        width:460px;flex-shrink:0;
        display:flex;align-items:center;justify-content:center;
        padding:40px 24px;
        position:relative;z-index:5;
      }
      .cm-card{
        width:100%;max-width:395px;
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
      .cm-card-eyebrow{
        font-size:10px;letter-spacing:.28em;text-transform:uppercase;
        color:#7c3aed;opacity:.7;margin-bottom:10px;
        display:flex;align-items:center;gap:8px;
      }
      .cm-card-eyebrow::before{
        content:'';display:block;width:18px;height:1px;background:#7c3aed;opacity:.5;
      }
      .cm-card-title{
        font-family:'Playfair Display',serif;font-weight:700;
        font-size:2rem;color:#2e1065;margin-bottom:6px;letter-spacing:-.01em;
      }
      .cm-card-sub{
        font-size:13px;color:#7c3aed;opacity:.62;
        margin-bottom:28px;font-weight:300;
      }

      .cm-field{margin-bottom:16px;}
      .cm-field label{
        display:block;font-size:11px;font-weight:500;
        letter-spacing:.1em;text-transform:uppercase;
        color:#5b21b6;margin-bottom:8px;
      }
      .cm-input-wrap{position:relative;}
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
      .cm-input.valid{border-color:#22c55e;}
      .cm-input.valid:focus{box-shadow:0 0 0 4px rgba(34,197,94,.1);}

      .cm-check{
        position:absolute;right:14px;top:50%;transform:translateY(-50%);
        width:18px;height:18px;
        background:#22c55e;border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        animation:checkpop .3s cubic-bezier(.16,1,.3,1);
      }
      .cm-check svg{width:10px;height:10px;}

      .cm-submit{
        margin-top:20px;width:100%;padding:14px;
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
        display:flex;align-items:center;gap:12px;margin:20px 0;
      }
      .cm-divider::before,.cm-divider::after{
        content:'';flex:1;height:1px;background:rgba(167,139,250,.28);
      }
      .cm-divider span{
        font-size:11px;color:#7c3aed;opacity:.45;
        letter-spacing:.1em;text-transform:uppercase;
      }
      .cm-login-row{text-align:center;font-size:13px;color:#5b21b6;opacity:.7;}
      .cm-login-row button{
        background:none;border:none;
        font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;
        color:#7c3aed;cursor:pointer;padding:0;
        text-decoration:underline;text-underline-offset:2px;
        text-decoration-color:rgba(124,58,237,.35);
        transition:text-decoration-color .2s;
      }
      .cm-login-row button:hover{text-decoration-color:#7c3aed;}

      /* RIGHT PANEL (perks) */
      .cm-right{
        flex:1;
        display:flex;flex-direction:column;justify-content:center;
        padding:80px 64px 60px;
        position:relative;z-index:2;
        animation:slideup .9s cubic-bezier(.16,1,.3,1) .1s both;
      }
      @media(max-width:900px){.cm-right{display:none;}.cm-left-form{flex:1;}}

      .cm-headline{
        font-family:'Playfair Display',serif;
        font-weight:800;
        font-size:clamp(2.4rem,3.8vw,3.9rem);
        line-height:1.1;
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
        line-height:1.7;max-width:380px;margin-bottom:44px;
      }

      .cm-perks{display:flex;flex-direction:column;gap:18px;margin-bottom:48px;}
      .cm-perk{
        display:flex;align-items:flex-start;gap:14px;
      }
      .cm-perk-icon{
        width:40px;height:40px;flex-shrink:0;
        background:rgba(124,58,237,.12);
        border-radius:12px;
        display:flex;align-items:center;justify-content:center;
        font-size:18px;
        border:1px solid rgba(124,58,237,.15);
      }
      .cm-perk-title{
        font-weight:600;font-size:14px;color:#2e1065;margin-bottom:2px;
      }
      .cm-perk-desc{
        font-size:13px;font-weight:300;color:#6d28d9;opacity:.7;line-height:1.5;
      }

      .cm-scroll{
        position:fixed;bottom:28px;right:64px;
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
      @media (max-width: 900px) {
        .cm-left  { display: none; }
        .cm-right { width: 100%; flex: 1; }
        .cm-left-form { width: 100%; flex: 1; }
      }
      @media (max-width: 480px) {
        .cm-card        { padding: 28px 20px; }
        .cm-card-title  { font-size: 1.6rem; }
        .cm-page        { padding-top: 56px; }
      }
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Signup failed"); return; }
      toast.success("Account created successfully!");
      navigate("/login");
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isValidUsername = form.username.length >= 3;

  return (
    <div className="cm-page">
      <div className="cm-bg" />
      <Board />

      {/* Floating pieces — mirrored positions from Login */}
      <Float style={{ top: "10%", right: "38%", zIndex: 3 }} delay="0s" dur="7s">
        <PawnSVG size={65} color="#9d5ff5" />
      </Float>
      <Float style={{ top: "16%", left: "460px", zIndex: 3 }} delay="1.3s" dur="5.5s">
        <PawnSVG size={50} color="#7c3aed" />
      </Float>
      <Float style={{ bottom: "10%", right: "42%", zIndex: 3 }} delay="2s" dur="8s">
        <BishopSVG size={88} color="#a78bfa" />
      </Float>
      <Float style={{ top: "24%", left: "20px", zIndex: 3 }} delay="0.6s" dur="6.5s">
        <RookSVG size={82} color="#c4b5fd" />
      </Float>
      <Float style={{ bottom: "8%", left: "55px", zIndex: 3 }} delay="1.8s" dur="7.5s">
        <KingSVG size={100} color="#7c3aed" />
      </Float>
      <Float style={{ top: "5%", left: "210px", zIndex: 2 }} delay="0.8s" dur="9s">
        <QueenSVG size={100} color="#ddd6fe" />
      </Float>

      {/* Form panel (LEFT side this time — mirrored from Login) */}
      <div className="cm-left-form">
        <div className="cm-card">
          <div className="cm-card-eyebrow">New account</div>
          <h2 className="cm-card-title">Join the game</h2>
          <p className="cm-card-sub">Create your account and start playing today</p>

          <form onSubmit={handleSubmit}>
            <div className="cm-field">
              <label htmlFor="username">Username</label>
              <div className="cm-input-wrap">
                <input
                  id="username" className={`cm-input${isValidUsername && form.username ? " valid" : ""}`}
                  type="text" name="username"
                  placeholder="grandmaster42"
                  value={form.username} onChange={handleChange}
                  required minLength={3}
                />
                {isValidUsername && form.username && (
                  <div className="cm-check">
                    <svg viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
              </div>
            </div>

            <div className="cm-field">
              <label htmlFor="email">Email address</label>
              <div className="cm-input-wrap">
                <input
                  id="email" className={`cm-input${isValidEmail && form.email ? " valid" : ""}`}
                  type="email" name="email"
                  placeholder="you@example.com"
                  value={form.email} onChange={handleChange}
                  required
                />
                {isValidEmail && form.email && (
                  <div className="cm-check">
                    <svg viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
              </div>
            </div>

            <div className="cm-field">
              <label htmlFor="password">Password</label>
              <div className="cm-input-wrap">
                <input
                  id="password" className="cm-input"
                  type="password" name="password"
                  placeholder="••••••••••"
                  value={form.password} onChange={handleChange}
                  required minLength={6}
                />
              </div>
              <PasswordStrength password={form.password} />
            </div>

            <button type="submit" className={`cm-submit${loading ? " loading" : ""}`}>
              <span>{loading ? "Creating account…" : "Create Account →"}</span>
            </button>
          </form>

          <div className="cm-divider"><span>or</span></div>

          <p className="cm-login-row">
            Already have an account?{" "}
            <button type="button" onClick={() => navigate("/login")}>Sign in</button>
          </p>
        </div>
      </div>

      {/* Right perks panel */}
      <div className="cm-right">
        <h1 className="cm-headline">
          Make your<br />
          <em>first move.</em>
        </h1>
        <p className="cm-sub">
          Join millions of players worldwide. Your journey to chess mastery starts with a single account.
        </p>

        <div className="cm-perks">
          {[
            { icon: "♟", title: "Play instantly", desc: "Jump into a game quickly with or without signing up. Let's go." },
            { icon: "🏆", title: "Ranked matches", desc: "Compete in rated games and climb the global leaderboard." },
            { icon: "🎓", title: "Learn & improve", desc: "Access puzzles, tutorials, and analysis tools to sharpen your skills." },
            { icon: "🌍", title: "Global community", desc: "Challenge players from 180+ countries, any time, any skill level." },
          ].map(({ icon, title, desc }) => (
            <div className="cm-perk" key={title}>
              <div className="cm-perk-icon">{icon}</div>
              <div>
                <div className="cm-perk-title">{title}</div>
                <div className="cm-perk-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="cm-scroll">
        <div className="cm-mouse"><div className="cm-mdot" /></div>
        <span>Scroll down</span>
      </div>
    </div>
  );
}
