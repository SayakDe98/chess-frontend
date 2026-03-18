import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { username, logout } = useAuth();

  function handleLogout() {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  }

  const isGuest = !username;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .sh-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          padding: 14px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
          background: rgba(237, 233, 254, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(167, 139, 250, 0.2);
          font-family: 'Outfit', sans-serif;
        }

        .sh-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
        }

        .sh-brand-icon {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          box-shadow: 0 4px 10px rgba(124, 58, 237, 0.35);
          flex-shrink: 0;
        }

        .sh-brand-name {
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.06em;
          color: #3b1d8a;
        }

        .sh-brand-name span { color: #7c3aed; }

        .sh-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sh-user-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px 6px 8px;
          background: rgba(124, 58, 237, 0.1);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          color: #4c1d95;
          max-width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sh-avatar {
          width: 26px; height: 26px;
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }

        .sh-guest-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: transparent;
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 400;
          color: #7c3aed;
          opacity: 0.7;
          letter-spacing: 0.04em;
        }

        .sh-btn {
          padding: 8px 18px;
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }

        .sh-btn:hover { transform: translateY(-1px); }
        .sh-btn:active { transform: translateY(0); }

        .sh-btn-ghost {
          background: transparent;
          border: 1.5px solid rgba(124, 58, 237, 0.3);
          color: #5b21b6;
        }

        .sh-btn-ghost:hover {
          border-color: #7c3aed;
          background: rgba(124, 58, 237, 0.06);
        }

        .sh-btn-primary {
          background: #7c3aed;
          color: #fff;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }

        .sh-btn-primary:hover {
          background: #6d28d9;
          box-shadow: 0 6px 16px rgba(124, 58, 237, 0.4);
        }

        .sh-btn-logout {
          background: rgba(220, 38, 38, 0.08);
          border: 1.5px solid rgba(220, 38, 38, 0.2);
          color: #dc2626;
        }

        .sh-btn-logout:hover {
          background: rgba(220, 38, 38, 0.14);
          border-color: #dc2626;
        }

        .sh-divider {
          width: 1px;
          height: 22px;
          background: rgba(124, 58, 237, 0.2);
          margin: 0 4px;
        }

        @media (max-width: 768px) {
          .sh-nav { padding: 12px 16px; }
          .sh-brand-name { font-size: 13px; }
          .sh-btn { padding: 7px 13px; font-size: 12px; }
          .sh-user-pill { max-width: 110px; }
        }
      `}</style>

      <nav className="sh-nav">
        <div className="sh-brand" onClick={() => navigate("/")}>
          <div className="sh-brand-icon">♟</div>
          <span className="sh-brand-name">CHESS<span>MASTERS</span></span>
        </div>

        <div className="sh-right">
          {isGuest ? (
            <>
              <div className="sh-guest-pill">👤 Guest</div>
              <button className="sh-btn sh-btn-ghost" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="sh-btn sh-btn-primary" onClick={() => navigate("/register")}>
                Register
              </button>
            </>
          ) : (
            <>
              <div className="sh-user-pill">
                <div className="sh-avatar">
                  {username.charAt(0).toUpperCase()}
                </div>
                {username}
              </div>
              <div className="sh-divider" />
              <button className="sh-btn sh-btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
