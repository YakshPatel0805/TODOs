"use client";
import Link from "next/link";

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
        radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,169,110,0.13) 0%, transparent 60%),
        radial-gradient(ellipse 40% 40% at 90% 90%, rgba(200,169,110,0.06) 0%, transparent 60%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Outfit', sans-serif;
      padding: 2rem 1rem;
      min-height: 100vh;
    }

    .card {
      background: #161618;
      border: 1px solid rgba(200,169,110,0.18);
      border-radius: 20px;
      padding: 3.5rem 3rem 3rem;
      width: 100%;
      max-width: 420px;
      text-align: center;
      position: relative;
      overflow: hidden;
      animation: fadeUp 0.5s ease forwards;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .card-glow {
      position: absolute;
      top: -60px; left: 50%; transform: translateX(-50%);
      width: 260px; height: 120px;
      background: radial-gradient(ellipse, rgba(200,169,110,0.15) 0%, transparent 70%);
      pointer-events: none;
    }

    .brand-label {
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #c8a96e;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 2rem;
    }
    .brand-label::before, .brand-label::after {
      content: '';
      display: block;
      width: 24px; height: 1px;
      background: #c8a96e;
    }

    .logo-mark {
      width: 56px; height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #c8a96e, #f0d080, #a07840);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 1.4rem; color: #0d0d0f; font-weight: 600;
      margin: 0 auto 1.6rem;
      box-shadow: 0 0 0 3px #161618, 0 0 0 5px rgba(200,169,110,0.35);
    }

    .heading {
      font-family: 'Playfair Display', serif;
      font-size: 2rem; font-weight: 400;
      color: #f0ede8; line-height: 1.2;
      margin-bottom: 0.5rem;
    }
    .heading em { color: #c8a96e; font-style: italic; }

    .subtitle {
      font-size: 0.82rem; color: #555; font-weight: 300;
      line-height: 1.7; margin-bottom: 2.8rem;
    }

    .btn-group { display: flex; flex-direction: column; gap: 0.75rem; }

    .btn-primary {
      display: block; width: 100%;
      padding: 0.9rem;
      background: linear-gradient(135deg, #c8a96e, #a07840);
      color: #0d0d0f;
      border: none; border-radius: 10px;
      font-family: 'Outfit', sans-serif;
      font-size: 0.78rem; font-weight: 600;
      letter-spacing: 0.14em; text-transform: uppercase;
      text-decoration: none; cursor: pointer;
      transition: opacity 0.2s, transform 0.15s;
    }
    .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

    .btn-secondary {
      display: block; width: 100%;
      padding: 0.9rem;
      background: transparent;
      color: #888;
      border: 1px solid #2a2a2c; border-radius: 10px;
      font-family: 'Outfit', sans-serif;
      font-size: 0.78rem; font-weight: 500;
      letter-spacing: 0.14em; text-transform: uppercase;
      text-decoration: none; cursor: pointer;
      transition: border-color 0.2s, color 0.2s;
    }
    .btn-secondary:hover { border-color: #c8a96e; color: #c8a96e; }

    .footer {
      margin-top: 2rem;
      font-size: 0.7rem; color: #333;
      letter-spacing: 0.08em;
    }

    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent);
      margin: 2rem 0;
    }
  `}</style>
);

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <div className="page">
        <div className="card">
          <div className="card-glow" />

          <div className="brand-label">Your App</div>

          <div className="logo-mark">A</div>

          <h1 className="heading">
            Welcome<br /><em>back.</em>
          </h1>

          <p className="subtitle">
            Sign in to your account or create a new one<br />to get started.
          </p>

          <div className="btn-group">
            <Link href="/login" className="btn-primary">
              Sign In →
            </Link>
            <Link href="/signup" className="btn-secondary">
              Create Account
            </Link>
          </div>
        </div>

        <p className="footer">© {new Date().getFullYear()} Your App. All rights reserved.</p>
      </div>
    </>
  );
}