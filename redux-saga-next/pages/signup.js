import { useDispatch, useSelector } from "react-redux";
import { signupRequest } from "../store/auth/authActions";
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
        radial-gradient(ellipse 35% 35% at 5% 90%, rgba(200,169,110,0.05) 0%, transparent 60%);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Outfit', sans-serif; padding: 2rem 1rem;
    }

    .card {
      background: #161618;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px;
      padding: 2.6rem 2.6rem 2.2rem;
      width: 100%; max-width: 440px;
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
      display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.6rem;
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
    .subtitle { font-size: 0.8rem; color: #555; font-weight: 300; margin-bottom: 1.6rem; }

    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(200,169,110,0.18), transparent);
      margin: 1.4rem 0;
    }

    .error-banner {
      background: rgba(220,80,80,0.08);
      border: 1px solid rgba(220,80,80,0.22);
      border-radius: 10px; padding: 0.75rem 1rem;
      margin-bottom: 1.2rem;
      font-size: 0.8rem; color: #e06060;
      display: flex; align-items: center; gap: 0.5rem;
    }

    .field { margin-bottom: 1rem; }
    .field-label {
      display: block; font-size: 0.65rem; font-weight: 600;
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
      outline: none; -webkit-appearance: none;
      transition: border-color 0.2s, box-shadow 0.2s;
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

    /* Password strength */
    .strength-bar {
      display: flex; gap: 4px; margin-top: 0.5rem;
    }
    .strength-seg {
      flex: 1; height: 2px; border-radius: 99px;
      background: #2a2a2c; transition: background 0.3s;
    }
    .strength-seg.weak   { background: #e06060; }
    .strength-seg.medium { background: #c8a96e; }
    .strength-seg.strong { background: #6cdc8a; }
    .strength-label { font-size: 0.65rem; color: #555; margin-top: 0.3rem; text-align: right; }
    .strength-label.weak   { color: #e06060; }
    .strength-label.medium { color: #c8a96e; }
    .strength-label.strong { color: #6cdc8a; }

    /* Terms */
    .terms-row {
      display: flex; align-items: flex-start; gap: 0.65rem;
      margin: 1.2rem 0 1.6rem;
    }
    .checkbox { accent-color: #c8a96e; cursor: pointer; width: 14px; height: 14px; margin-top: 2px; flex-shrink: 0; }
    .terms-label { font-size: 0.76rem; color: #555; font-weight: 300; line-height: 1.55; cursor: pointer; }
    .terms-link { color: #c8a96e; text-decoration: none; }
    .terms-link:hover { opacity: 0.75; }

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

    .login-link { text-align: center; font-size: 0.78rem; color: #555; margin-top: 1.2rem; }
    .text-link {
      color: #c8a96e; cursor: pointer; font-weight: 500;
      background: none; border: none; font-family: 'Outfit', sans-serif; font-size: 0.78rem; padding: 0;
      transition: opacity 0.15s;
    }
    .text-link:hover { opacity: 0.75; }
  `}</style>
);

function getStrength(pw) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", agreed: false });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const registeredUser = useSelector((s) => s.auth.registeredUser);
  const authError = useSelector((s) => s.auth.error);
  const loading = useSelector((s) => s.auth.loading);

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (form.password.length < 8) e.password = "Must be at least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    if (!form.agreed) e.agreed = "You must accept the terms to continue";
    return e;
  };

  const handleSignup = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    dispatch(signupRequest({ email: form.email, password: form.password }));
  };

  useEffect(() => { if (registeredUser) router.push("/login"); }, [registeredUser]);

  const strength = getStrength(form.password);
  const strengthLabel = strength <= 1 ? "Weak" : strength <= 2 ? "Fair" : strength <= 3 ? "Good" : "Strong";
  const strengthClass = strength <= 1 ? "weak" : strength <= 2 ? "medium" : "strong";

  const cls = (field, extra = "") =>
    ["input", errors[field] ? "error" : "", extra].filter(Boolean).join(" ");

  return (
    <>
      <GlobalStyle />
      <div className="page">
        <div className="card">
          <div className="card-glow" />

          <div className="brand-label">Create Account</div>

          <h1 className="heading">Join <em>us.</em></h1>
          <p className="subtitle">Fill in your details to get started.</p>

          <div className="divider" />

          {authError && (
            <div className="error-banner"><span>⚠</span> {authError}</div>
          )}

          {/* Name */}
          <div className="field">
            <label className="field-label" htmlFor="name">Full Name</label>
            <input
              id="name" type="text" placeholder="John Doe"
              className={cls("name")}
              value={form.name} onChange={set("name")}
              autoComplete="name"
            />
            {errors.name && <div className="error-msg">{errors.name}</div>}
          </div>

          {/* Email */}
          <div className="field">
            <label className="field-label" htmlFor="email">Email Address</label>
            <input
              id="email" type="email" placeholder="user@example.com"
              className={cls("email")}
              value={form.email} onChange={set("email")}
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
                placeholder="Min. 8 characters"
                className={cls("password", "has-toggle")}
                value={form.password} onChange={set("password")}
                autoComplete="new-password"
              />
              <button className="toggle-btn" type="button" onClick={() => setShowPw(!showPw)}>
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
            {form.password && (
              <>
                <div className="strength-bar">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`strength-seg ${i <= strength ? strengthClass : ""}`} />
                  ))}
                </div>
                <div className={`strength-label ${strengthClass}`}>{strengthLabel}</div>
              </>
            )}
            {errors.password && <div className="error-msg">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="field">
            <label className="field-label" htmlFor="confirm">Confirm Password</label>
            <div className="input-wrap">
              <input
                id="confirm" type={showConfirm ? "text" : "password"}
                placeholder="Re-enter password"
                className={cls("confirm", "has-toggle")}
                value={form.confirm} onChange={set("confirm")}
                autoComplete="new-password"
              />
              <button className="toggle-btn" type="button" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirm && <div className="error-msg">{errors.confirm}</div>}
          </div>

          {/* Terms */}
          <div className="terms-row">
            <input
              type="checkbox" id="terms" className="checkbox"
              checked={form.agreed} onChange={set("agreed")}
            />
            <label htmlFor="terms" className="terms-label">
              I agree to the{" "}
              <a href="/terms" className="terms-link">Terms of Service</a>
              {" "}and{" "}
              <a href="/privacy" className="terms-link">Privacy Policy</a>
            </label>
          </div>
          {errors.agreed && <div className="error-msg" style={{ marginTop: "-1rem", marginBottom: "1rem" }}>{errors.agreed}</div>}

          <button className="submit-btn" onClick={handleSignup} disabled={loading}>
            {loading ? "Creating account…" : "Create Account →"}
          </button>

          <div className="login-link">
            Already have an account?{" "}
            <button className="text-link" onClick={() => router.push("/login")}>Sign in</button>
          </div>
        </div>
      </div>
    </>
  );
}