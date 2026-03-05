import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logoutRequest } from "../store/auth/authActions";

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { -webkit-font-smoothing: antialiased; }
    body { background: #0d0d0f; }

    .page {
      min-height: 100vh;
      background: #0d0d0f;
      background-image:
        radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,169,110,0.12) 0%, transparent 60%),
        radial-gradient(ellipse 35% 35% at 85% 85%, rgba(200,169,110,0.06) 0%, transparent 60%);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Outfit', sans-serif; padding: 2rem 1rem;
    }

    .card {
      background: #161618;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px;
      padding: 3rem 2.8rem;
      width: 100%; max-width: 400px;
      text-align: center;
      position: relative; overflow: hidden;
      animation: fadeUp 0.45s ease forwards;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .card-glow {
      position: absolute; top: -50px; left: 50%; transform: translateX(-50%);
      width: 240px; height: 100px;
      background: radial-gradient(ellipse, rgba(200,169,110,0.13) 0%, transparent 70%);
      pointer-events: none;
    }

    .brand-label {
      font-size: 0.65rem; font-weight: 600;
      letter-spacing: 0.22em; text-transform: uppercase; color: #c8a96e;
      display: flex; align-items: center; justify-content: center; gap: 0.75rem;
      margin-bottom: 1.8rem;
    }
    .brand-label::before, .brand-label::after {
      content: ''; display: block; width: 22px; height: 1px; background: #c8a96e;
    }

    .icon-wrap {
      width: 64px; height: 64px; border-radius: 50%;
      background: #1e1e21;
      border: 1px solid rgba(255,255,255,0.07);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.6rem;
      margin: 0 auto 1.6rem;
    }
    .icon-wrap.success {
      background: rgba(108,220,138,0.08);
      border-color: rgba(108,220,138,0.22);
    }

    .heading {
      font-family: 'Playfair Display', serif;
      font-size: 1.85rem; font-weight: 400;
      color: #f0ede8; line-height: 1.2; margin-bottom: 0.5rem;
    }
    .heading em { color: #c8a96e; font-style: italic; }

    .subtitle {
      font-size: 0.8rem; color: #555; font-weight: 300;
      line-height: 1.65; margin-bottom: 2rem;
    }

    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(200,169,110,0.15), transparent);
      margin: 1.6rem 0;
    }

    /* Progress */
    .progress-track {
      height: 3px; background: #222; border-radius: 99px;
      overflow: hidden; margin-bottom: 2rem;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #c8a96e, #f0d080);
      border-radius: 99px;
      transition: width 0.1s linear;
    }

    /* Buttons */
    .btn-group { display: flex; flex-direction: column; gap: 0.75rem; }

    .btn-danger {
      width: 100%; padding: 0.9rem;
      background: linear-gradient(135deg, #c8a96e, #a07840);
      color: #0d0d0f; border: none; border-radius: 10px;
      font-family: 'Outfit', sans-serif;
      font-size: 0.78rem; font-weight: 600;
      letter-spacing: 0.14em; text-transform: uppercase;
      cursor: pointer; transition: opacity 0.2s, transform 0.15s;
    }
    .btn-danger:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
    .btn-danger:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

    .btn-cancel {
      width: 100%; padding: 0.9rem;
      background: transparent;
      color: #666; border: 1px solid #2a2a2c; border-radius: 10px;
      font-family: 'Outfit', sans-serif;
      font-size: 0.78rem; font-weight: 500;
      letter-spacing: 0.14em; text-transform: uppercase;
      cursor: pointer; transition: border-color 0.2s, color 0.2s;
    }
    .btn-cancel:hover { border-color: #555; color: #888; }

    /* Success state */
    .success-msg {
      font-size: 0.85rem; color: #6cdc8a; font-weight: 500; margin-bottom: 0.25rem;
    }
    .redirect-msg {
      font-size: 0.75rem; color: #3a3a3e;
    }

    /* Countdown ring */
    .countdown-ring {
      width: 48px; height: 48px;
      border-radius: 50%;
      border: 2px solid rgba(200,169,110,0.2);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Playfair Display', serif;
      font-size: 1.1rem; color: #c8a96e;
      margin: 0.75rem auto 0;
    }
  `}</style>
);

const COUNTDOWN = 3;

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [phase, setPhase] = useState("confirm");
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(COUNTDOWN);

  const handleLogout = async () => {
    setPhase("loading");
    let p = 0;
    const interval = setInterval(() => {
      p += 4;
      setProgress(Math.min(p, 100));
      if (p >= 100) clearInterval(interval);
    }, 48);
    await new Promise((r) => setTimeout(r, 1300));
    dispatch(logoutRequest());
    setPhase("done");
  };

  useEffect(() => {
    if (phase !== "done") return;
    if (countdown === 0) { router.push("/login"); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown]);

  return (
    <>
      <GlobalStyle />
      <div className="page">
        <div className="card">
          <div className="card-glow" />

          {/* ── CONFIRM ── */}
          {phase === "confirm" && (
            <>
              <div className="brand-label">Sign Out</div>
              <div className="icon-wrap">👋</div>
              <h1 className="heading">
                Leaving<br /><em>so soon?</em>
              </h1>
              <p className="subtitle">
                You'll be signed out of your account.<br />
                Your data stays safe until you return.
              </p>
              <div className="btn-group">
                <button className="btn-danger" onClick={handleLogout}>
                  Yes, Sign Me Out →
                </button>
                <button className="btn-cancel" onClick={() => router.back()}>
                  Cancel
                </button>
              </div>
            </>
          )}

          {/* ── LOADING ── */}
          {phase === "loading" && (
            <>
              <div className="brand-label">Signing Out</div>
              <div className="icon-wrap">🔒</div>
              <h1 className="heading">
                Clearing<br /><em>your session.</em>
              </h1>
              <p className="subtitle">
                Please wait while we securely sign you out…
              </p>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <button className="btn-danger" disabled>
                Signing out…
              </button>
            </>
          )}

          {/* ── DONE ── */}
          {phase === "done" && (
            <>
              <div className="brand-label">Signed Out</div>
              <div className="icon-wrap success">✓</div>
              <h1 className="heading">
                All done,<br /><em>see you soon.</em>
              </h1>
              <p className="subtitle">
                Your session has been cleared securely.
              </p>
              <div className="success-msg">Redirecting to login…</div>
              <div className="countdown-ring">{countdown}</div>
              <div style={{ marginTop: "1.8rem" }}>
                <button className="btn-danger" onClick={() => router.push("/login")}>
                  Go to Login →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}