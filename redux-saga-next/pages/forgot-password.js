import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

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

    .success-banner {
      background: rgba(108,220,138,0.08);
      border: 1px solid rgba(108,220,138,0.22);
      border-radius: 10px;
      padding: 0.75rem 1rem;
      margin-bottom: 1.2rem;
      font-size: 0.8rem; color: #6cdc8a;
      display: flex; align-items: center; gap: 0.5rem;
    }

    .error-banner {
      background: rgba(220,80,80,0.08);
      border: 1px solid rgba(220,80,80,0.22);
      border-radius: 10px;
      padding: 0.75rem 1rem;
      margin-bottom: 1.2rem;
      font-size: 0.8rem; color: #e06060;
      display: flex; align-items: center; gap: 0.5rem;
    }

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

    .back-link { text-align: center; font-size: 0.78rem; color: #555; margin-top: 1.2rem; }
    .text-link {
      color: #c8a96e; cursor: pointer; font-weight: 500;
      background: none; border: none; font-family: 'Outfit', sans-serif;
      font-size: 0.78rem; padding: 0; transition: opacity 0.15s;
    }
    .text-link:hover { opacity: 0.75; }
  `}</style>
);

export default function ForgotPassword() {
  const [form, setForm] = useState({ email: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (form.newPassword.length < 8) e.newPassword = 'Must be at least 8 characters';
    if (form.newPassword !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleReset = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      await axios.post('/api/auth/forgot-password', {
        email: form.email,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      setSuccess(true);
      setForm({ email: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const cls = (field, extra = '') =>
    ['input', errors[field] ? 'error' : '', extra].filter(Boolean).join(' ');

  return (
    <>
      <GlobalStyle />
      <div className="page">
        <div className="card">
          <div className="card-glow" />

          <div className="brand-label">Reset Password</div>

          <h1 className="heading">Recover <em>access.</em></h1>
          <p className="subtitle">Enter your email and new password.</p>

          <div className="divider" />

          {mounted && success && (
            <div className="success-banner">
              <span>✓</span> Password reset successfully. Redirecting to login...
            </div>
          )}

          {mounted && errorMsg && (
            <div className="error-banner">
              <span>⚠</span> {errorMsg}
            </div>
          )}

          {/* Email */}
          <div className="field">
            <label className="field-label" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="user@example.com"
              className={cls('email')}
              value={form.email}
              onChange={set('email')}
              autoComplete="email"
            />
            {errors.email && <div className="error-msg">{errors.email}</div>}
          </div>

          {/* New Password */}
          <div className="field">
            <label className="field-label" htmlFor="newPassword">New Password</label>
            <div className="input-wrap">
              <input
                id="newPassword"
                type={showNewPw ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                className={cls('newPassword', 'has-toggle')}
                value={form.newPassword}
                onChange={set('newPassword')}
                autoComplete="new-password"
              />
              <button
                className="toggle-btn"
                type="button"
                onClick={() => setShowNewPw(!showNewPw)}
              >
                {showNewPw ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.newPassword && <div className="error-msg">{errors.newPassword}</div>}
          </div>

          {/* Confirm Password */}
          <div className="field">
            <label className="field-label" htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrap">
              <input
                id="confirmPassword"
                type={showConfirmPw ? 'text' : 'password'}
                placeholder="Re-enter password"
                className={cls('confirmPassword', 'has-toggle')}
                value={form.confirmPassword}
                onChange={set('confirmPassword')}
                autoComplete="new-password"
              />
              <button
                className="toggle-btn"
                type="button"
                onClick={() => setShowConfirmPw(!showConfirmPw)}
              >
                {showConfirmPw ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.confirmPassword && <div className="error-msg">{errors.confirmPassword}</div>}
          </div>

          <button className="submit-btn" onClick={handleReset} disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password →'}
          </button>

          <div className="back-link">
            Remember your password?{' '}
            <button className="text-link" onClick={() => router.push('/login')}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
