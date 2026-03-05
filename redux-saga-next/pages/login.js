import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../store/auth/authActions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
        radial-gradient(ellipse 35% 35% at 95% 85%, rgba(200,169,110,0.06) 0%, transparent 60%);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Outfit', sans-serif; padding: 2rem 1rem;
    }

    .card {
      background: #161618;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px;
      padding: 2.8rem 2.6rem;
      width: 100%; max-width: 420px;
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
      letter-spacing: 0.22em; text-transform: uppercase;
      color: #c8a96e;
      display: flex; align-items: center; gap: 0.75rem;
      margin-bottom: 1.8rem;
    }
    .brand-label::before {
      content: ''; display: block; width: 28px; height: 1px; background: #c8a96e;
    }

    .heading {
      font-family: 'Playfair Display', serif;
      font-size: 1.9rem; font-weight: 400;
      color: #f0ede8; line-height: 1.2; margin-bottom: 0.35rem;
    }
    .heading em { color: #c8a96e; font-style: italic; }
    .subtitle { font-size: 0.8rem; color: #555; font-weight: 300; margin-bottom: 1.8rem; }

    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(200,169,110,0.18), transparent);
      margin: 1.6rem 0;
    }

    /* Error banner */
    .error-banner {
      background: rgba(220,80,80,0.08);
      border: 1px solid rgba(220,80,80,0.22);
      border-radius: 10px;
      padding: 0.75rem 1rem;
      margin-bottom: 1.2rem;
      font-size: 0.8rem; color: #e06060;
      display: flex; align-items: center; gap: 0.5rem;
    }

    /* Fields */
    .field { margin-bottom: 1.1rem; }
    .field-label {
      display: block;
      font-size: 0.65rem; font-weight: 600;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: #555; margin-bottom: 0.4rem;
    }
    .input-wrap { position: relative; }
    .input {
      width: 100%;
      background: #1e1e21;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      padding: 0.72rem 1rem;
      font-family: 'Outfit', sans-serif;
      font-size: 0.88rem; color: #f0ede8;
      outline: none; transition: border-color 0.2s, box-shadow 0.2s;
      -webkit-appearance: none;
    }
    .input::placeholder { color: #3a3a3e; }
    .input:focus { border-color: rgba(200,169,110,0.45); box-shadow: 0 0 0 3px rgba(200,169,110,0.08); }
    .input.error { border-color: rgba(220,80,80,0.5); }
    .input.has-toggle { padding-right: 3.5rem; }
    .error-msg { font-size: 0.7rem; color: #e06060; margin-top: 0.3rem; }

    .toggle-btn {
      position: absolute; right: 0.9rem; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer;
      color: #444; font-size: 0.7rem; letter-spacing: 0.05em;
      font-family: 'Outfit', sans-serif; font-weight: 500; text-transform: uppercase;
      transition: color 0.15s;
    }
    .toggle-btn:hover { color: #c8a96e; }

    /* Remember / forgot row */
    .meta-row {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 1.4rem;
    }
    .remember-row { display: flex; align-items: center; gap: 0.5rem; }
    .remember-label { font-size: 0.75rem; color: #555; cursor: pointer; }
    .checkbox { accent-color: #c8a96e; cursor: pointer; width: 14px; height: 14px; }
    .forgot-btn {
      background: none; border: none; cursor: pointer;
      font-family: 'Outfit', sans-serif;
      font-size: 0.72rem; color: #c8a96e; font-weight: 500;
      letter-spacing: 0.05em; padding: 0;
      transition: opacity 0.15s;
    }
    .forgot-btn:hover { opacity: 0.7; }

    /* Submit */
    .submit-btn {
      width: 100%; padding: 0.9rem;
      background: linear-gradient(135deg, #c8a96e, #a07840);
      color: #0d0d0f; border: none; border-radius: 10px;
      font-family: 'Outfit', sans-serif;
      font-size: 0.78rem; font-weight: 600;
      letter-spacing: 0.14em; text-transform: uppercase;
      cursor: pointer; transition: opacity 0.2s, transform 0.15s;
    }
    .submit-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
    .submit-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

    /* Or divider */
    .or-row {
      display: flex; align-items: center; gap: 1rem; margin: 1.4rem 0;
    }
    .or-line { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
    .or-text { font-size: 0.65rem; color: #3a3a3e; letter-spacing: 0.1em; text-transform: uppercase; }

    /* Signup link */
    .signup-link { text-align: center; font-size: 0.78rem; color: #555; }
    .text-link {
      color: #c8a96e; cursor: pointer; font-weight: 500;
      background: none; border: none; font-family: 'Outfit', sans-serif;
      font-size: 0.78rem; padding: 0; transition: opacity 0.15s;
    }
    .text-link:hover { opacity: 0.75; }
  `}</style>
);

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState("");
  const [showPw, setShowPw] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((s) => s.auth.user);
  const authError = useSelector((s) => s.auth.error);
  const loading = useSelector((s) => s.auth.loading);

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleLogin = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    dispatch(loginRequest({ email: form.email, password: form.password }));
  };

  useEffect(() => { if (user) router.push("/profile"); }, [user]);

  const cls = (field) =>
    ["input", errors[field] ? "error" : "", field === "password" ? "has-toggle" : ""].filter(Boolean).join(" ");

  return (
    <>
      <GlobalStyle />
      <div className="page">
        <div className="card">
          <div className="card-glow" />

          <div className="brand-label">Welcome Back</div>

          <h1 className="heading">Sign <em>in.</em></h1>
          <p className="subtitle">Enter your credentials to continue.</p>

          <div className="divider" />

          {authError && (
            <div className="error-banner">
              <span>⚠</span> {authError}
            </div>
          )}

          {/* Email */}
          <div className="field">
            <label className="field-label" htmlFor="email">Email Address</label>
            <input
              id="email" type="email" placeholder="user@example.com"
              className={cls("email")}
              value={form.email} onChange={set("email")}
              onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              autoComplete="email"
            />
            {errors.email && <div className="error-msg">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="field">
            <label className="field-label" htmlFor="password">Password</label>
            <div className="input-wrap">
              <input
                id="password" type={showPw ? "text" : "password"}
                placeholder="Enter your password"
                className={cls("password")}
                value={form.password} onChange={set("password")}
                onFocus={() => setFocused("password")} onBlur={() => setFocused("")}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                autoComplete="current-password"
              />
              <button className="toggle-btn" type="button" onClick={() => setShowPw(!showPw)}>
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <div className="error-msg">{errors.password}</div>}
          </div>

          {/* Remember + Forgot */}
          <div className="meta-row">
            <div className="remember-row">
              <input
                type="checkbox" id="remember" className="checkbox"
                checked={form.remember} onChange={set("remember")}
              />
              <label htmlFor="remember" className="remember-label">Remember me</label>
            </div>
            <button className="forgot-btn" type="button" onClick={() => router.push("/forgot-password")}>
              Forgot password?
            </button>
          </div>

          <button className="submit-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Signing in…" : "Sign In →"}
          </button>

          <div className="or-row">
            <div className="or-line" />
            <span className="or-text">or</span>
            <div className="or-line" />
          </div>

          <div className="signup-link">
            Don't have an account?{" "}
            <button className="text-link" onClick={() => router.push("/signup")}>Create one</button>
          </div>
        </div>
      </div>
    </>
  );
}