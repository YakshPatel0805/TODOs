import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodosRequest,
  addtodosRequest,
  deletetodosRequest,
  updatetodoRequest,
  toggletodoRequest,
} from "../store/todos/todoActions";


const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body { background: #0d0d0f; }

    .profile-page {
      min-height: 100vh;
      background: #0d0d0f;
      background-image:
        radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,169,110,0.12) 0%, transparent 60%),
        radial-gradient(ellipse 40% 40% at 90% 80%, rgba(200,169,110,0.06) 0%, transparent 60%);
      font-family: 'Outfit', sans-serif;
      color: #f0ede8;
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }

    /* ── TOP NAV ── */
    .top-nav {
      width: 100%;
      max-width: 740px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0 2.5rem 0;
    }
    .nav-logo {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 1.15rem;
      color: #c8a96e;
      letter-spacing: 0.04em;
    }
    .nav-logo span { color: #f0ede8; font-style: normal; }

    /* ── MAIN LAYOUT ── */
    .main-grid {
      width: 100%;
      max-width: 740px;
      display: grid;
      grid-template-columns: 220px 1fr;
      gap: 1.5rem;
      align-items: start;
    }
    @media (max-width: 640px) {
      .main-grid { grid-template-columns: 1fr; }
    }

    /* ── PROFILE SIDEBAR ── */
    .profile-sidebar {
      background: #161618;
      border: 1px solid rgba(200,169,110,0.18);
      border-radius: 16px;
      padding: 1.8rem 1.4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.2rem;
      position: sticky;
      top: 2rem;
    }
    .avatar-ring {
      width: 72px; height: 72px;
      border-radius: 50%;
      background: linear-gradient(135deg, #c8a96e, #f0d080, #a07840);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Playfair Display', serif;
      font-size: 1.8rem; color: #0d0d0f; font-weight: 600;
      box-shadow: 0 0 0 3px #0d0d0f, 0 0 0 5px rgba(200,169,110,0.4);
    }
    .profile-name {
      font-family: 'Playfair Display', serif;
      font-size: 1.05rem;
      color: #f0ede8;
      text-align: center;
      line-height: 1.3;
    }
    .profile-name em { color: #c8a96e; font-style: italic; }
    .profile-badge {
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #c8a96e;
      background: rgba(200,169,110,0.1);
      border: 1px solid rgba(200,169,110,0.22);
      padding: 0.3rem 0.8rem;
      border-radius: 999px;
    }
    .sidebar-divider {
      width: 100%; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent);
    }
    .stat-row {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .stat-item {
      display: flex; justify-content: space-between; align-items: center;
      font-size: 0.75rem;
    }
    .stat-label { color: #666; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500; }
    .stat-value { color: #c8a96e; font-weight: 600; font-size: 0.85rem; }

    .logout-btn {
      width: 100%;
      padding: 0.7rem;
      background: transparent;
      color: #888;
      border: 1px solid #2a2a2c;
      border-radius: 10px;
      font-family: 'Outfit', sans-serif;
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 0.4rem;
    }
    .logout-btn:hover { border-color: #c8a96e; color: #c8a96e; }

    /* ── TODO PANEL ── */
    .todo-panel {
      background: #161618;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px;
      overflow: hidden;
    }
    .todo-header {
      padding: 1.6rem 1.8rem 0;
    }
    .todo-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.45rem;
      color: #f0ede8;
      margin-bottom: 0.2rem;
    }
    .todo-subtitle {
      font-size: 0.78rem;
      color: #555;
      font-weight: 300;
    }

    /* Input row */
    .add-row {
      display: flex; gap: 0.6rem;
      padding: 1.2rem 1.8rem;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .todo-input {
      flex: 1;
      background: #1e1e21;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      padding: 0.7rem 1rem;
      font-family: 'Outfit', sans-serif;
      font-size: 0.88rem;
      color: #f0ede8;
      outline: none;
      transition: border-color 0.2s;
    }
    .todo-input::placeholder { color: #444; }
    .todo-input:focus { border-color: rgba(200,169,110,0.45); }
    .add-btn {
      padding: 0.7rem 1.2rem;
      background: linear-gradient(135deg, #c8a96e, #a07840);
      color: #0d0d0f;
      border: none;
      border-radius: 10px;
      font-family: 'Outfit', sans-serif;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.15s;
      white-space: nowrap;
    }
    .add-btn:hover { opacity: 0.88; transform: translateY(-1px); }
    .add-btn:active { transform: translateY(0); }

    /* Filter tabs */
    .filter-tabs {
      display: flex;
      gap: 0.3rem;
      padding: 0.8rem 1.8rem;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .filter-tab {
      padding: 0.3rem 0.9rem;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.18s;
      background: transparent;
      color: #555;
      font-family: 'Outfit', sans-serif;
    }
    .filter-tab.active {
      background: rgba(200,169,110,0.12);
      border-color: rgba(200,169,110,0.3);
      color: #c8a96e;
    }
    .filter-tab:not(.active):hover { color: #888; }

    /* Todo list */
    .todo-list {
      list-style: none;
      padding: 0.6rem 1.8rem 1.8rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-height: 380px;
      overflow-y: auto;
    }
    .todo-list::-webkit-scrollbar { width: 3px; }
    .todo-list::-webkit-scrollbar-track { background: transparent; }
    .todo-list::-webkit-scrollbar-thumb { background: rgba(200,169,110,0.2); border-radius: 99px; }

    .todo-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: #1a1a1d;
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 10px;
      transition: border-color 0.18s, background 0.18s;
    }
    .todo-item:hover { border-color: rgba(200,169,110,0.15); background: #1d1d20; }
    .todo-item.done { opacity: 0.5; }

    .check-btn {
      width: 18px; height: 18px; flex-shrink: 0;
      border-radius: 50%;
      border: 1.5px solid #3a3a3d;
      background: transparent;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.18s;
      font-size: 10px; color: transparent;
    }
    .check-btn.checked {
      background: linear-gradient(135deg, #c8a96e, #a07840);
      border-color: transparent;
      color: #0d0d0f;
    }
    .check-btn:hover:not(.checked) { border-color: #c8a96e; }

    .todo-text {
      flex: 1;
      font-size: 0.88rem;
      color: #d8d4cc;
      line-height: 1.4;
      word-break: break-word;
    }
    .todo-text.done { text-decoration: line-through; color: #555; }

    .edit-input {
      flex: 1;
      background: #222226;
      border: 1px solid rgba(200,169,110,0.35);
      border-radius: 6px;
      padding: 0.3rem 0.6rem;
      font-family: 'Outfit', sans-serif;
      font-size: 0.88rem;
      color: #f0ede8;
      outline: none;
    }

    .icon-btn {
      background: none; border: none; cursor: pointer;
      color: #3a3a3e; font-size: 0.85rem; padding: 0.2rem;
      border-radius: 5px; transition: color 0.15s, background 0.15s;
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px;
    }
    .icon-btn:hover { color: #c8a96e; background: rgba(200,169,110,0.08); }
    .icon-btn.delete:hover { color: #e06060; background: rgba(220,80,80,0.08); }
    .icon-btn.save:hover { color: #6cdc8a; background: rgba(100,220,130,0.08); }

    .empty-state {
      padding: 3rem 1.8rem;
      text-align: center;
      color: #3a3a3e;
      font-size: 0.85rem;
    }
    .empty-icon { font-size: 2rem; margin-bottom: 0.6rem; opacity: 0.4; }

    .loading-bar {
      height: 2px;
      background: linear-gradient(90deg, transparent, #c8a96e, transparent);
      background-size: 200%;
      animation: shimmer 1.4s infinite;
    }
    @keyframes shimmer { 0% { background-position: -200%; } 100% { background-position: 200%; } }

    /* Progress bar */
    .progress-wrap {
      padding: 0 1.8rem 0;
      margin-bottom: 0.3rem;
      margin-top: 0.8rem;
    }
    .progress-meta {
      display: flex; justify-content: space-between;
      font-size: 0.68rem; color: #555; margin-bottom: 0.4rem;
      text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;
    }
    .progress-track {
      height: 3px; background: #222; border-radius: 99px; overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #c8a96e, #f0d080);
      border-radius: 99px;
      transition: width 0.4s ease;
    }

    /* No user fallback */
    .no-user {
      background: #161618;
      border: 1px solid rgba(200,169,110,0.15);
      border-radius: 16px;
      padding: 3rem 2rem;
      text-align: center;
      max-width: 360px;
      width: 100%;
    }
    .no-user-icon { font-size: 2.5rem; margin-bottom: 1rem; }
    .no-user h2 {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem; color: #f0ede8; margin-bottom: 0.5rem;
    }
    .no-user p { font-size: 0.82rem; color: #555; }
    .no-user-link {
      display: inline-block; margin-top: 1.2rem;
      color: #c8a96e; cursor: pointer;
      font-size: 0.8rem; letter-spacing: 0.08em;
      text-transform: uppercase; font-weight: 500;
    }
    .no-user-link:hover { text-decoration: underline; }
  `}</style>
);

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M9 1.5L11.5 4L4.5 11H2V8.5L9 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SaveIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M2 7L5 10L11 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DeleteIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M2 2L11 11M11 2L2 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  const dispatch = useDispatch();
  const { todos, loading } = useSelector((state) => state.todos);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | done

  useEffect(() => {
    setIsHydrated(true);
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    dispatch(addtodosRequest(newTodo));
    setNewTodo("");
  };

  const handleEdit = (todo) => {
    setEditingId(todo._key);
    setEditingText(todo.title);
  };

  const handleUpdate = () => {
    dispatch(updatetodoRequest(editingId, editingText));
    setEditingId(null);
    setEditingText("");
  };

  const handleDelete = (key) => dispatch(deletetodosRequest(key));

  const handleKeyDown = (e) => { if (e.key === "Enter") handleAddTodo(); };
  const handleEditKeyDown = (e) => { if (e.key === "Enter") handleUpdate(); if (e.key === "Escape") setEditingId(null); };

  // Toggle complete
  const handleToggle = (key) => {
    dispatch(toggletodoRequest(key));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const progress = todos.length ? Math.round((completedCount / todos.length) * 100) : 0;

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "done") return t.completed;
    return true;
  });

  const getInitial = (email) => email ? email[0].toUpperCase() : "?";

  if (!isHydrated) return null;

  if (!user) {
    return (
      <>
        <GlobalStyle />
        <div className="profile-page">
          <div className="no-user">
            <div className="no-user-icon">🔒</div>
            <h2>Session Expired</h2>
            <p>No active session found. Please sign in to continue.</p>
            <span className="no-user-link" onClick={() => router.push("/login")}>
              Go to Login →
            </span>
          </div>
        </div>
      </>
    );
  }

  const username = user.email?.split("@")[0];

  return (
    <>
      <GlobalStyle />
      <div className="profile-page">

        {/* ── Top Nav ── */}
        <nav className="top-nav">
          <div className="nav-logo">
            <em>Work</em><span>space</span>
          </div>
          <div style={{ fontSize: "0.72rem", color: "#fdfffef1", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {user.email}
          </div>
        </nav>

        {/* ── Main Grid ── */}
        <div className="main-grid">

          {/* ── Sidebar ── */}
          <aside className="profile-sidebar">
            <div className="avatar-ring">{getInitial(user.email)}</div>
            <div className="profile-name">
              Hello, <em>{username}</em>
            </div>
            <span className="profile-badge">Member</span>

            <div className="sidebar-divider" />

            <div className="stat-row">
              <div className="stat-item">
                <span className="stat-label">Total</span>
                <span className="stat-value">{todos.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Done</span>
                <span className="stat-value">{completedCount}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Pending</span>
                <span className="stat-value">{todos.length - completedCount}</span>
              </div>
            </div>

            <div className="sidebar-divider" />

            <button className="logout-btn" onClick={() => router.push("/logout")}>
              Sign Out →
            </button>
          </aside>

          {/* ── Todo Panel ── */}
          <main className="todo-panel">
            {loading && <div className="loading-bar" />}

            <div className="todo-header">
              <h1 className="todo-title">My Tasks</h1>
              <p className="todo-subtitle">Stay focused. Get things done.</p>
            </div>

            {/* Progress */}
            {todos.length > 0 && (
              <div className="progress-wrap">
                <div className="progress-meta">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {/* Add row */}
            <div className="add-row">
              <input
                className="todo-input"
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What needs to be done?"
              />
              <button className="add-btn" onClick={handleAddTodo}>+ Add</button>
            </div>

            {/* Filter tabs */}
            <div className="filter-tabs">
              {["all", "active", "done"].map((f) => (
                <button
                  key={f}
                  className={`filter-tab ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* List */}
            {filteredTodos.length === 0 && !loading ? (
              <div className="empty-state">
                <div className="empty-icon">
                  {filter === "done" ? "✓" : filter === "active" ? "⚡" : "✦"}
                </div>
                <p>
                  {filter === "done"
                    ? "Nothing completed yet"
                    : filter === "active"
                    ? "No active tasks"
                    : "Add your first task above"}
                </p>
              </div>
            ) : (
              <ul className="todo-list">
                {filteredTodos.map((todo) => (
                  <li key={todo._key} className={`todo-item ${todo.completed ? "done" : ""}`}>

                    {/* Check button */}
                    <button
                      className={`check-btn ${todo.completed ? "checked" : ""}`}
                      onClick={() => handleToggle(todo._key)}
                      title={todo.completed ? "Mark incomplete" : "Mark complete"}
                    >
                      {todo.completed && <CheckIcon />}
                    </button>

                    {/* Text or edit input */}
                    {editingId === todo._key ? (
                      <input
                        className="edit-input"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyDown={handleEditKeyDown}
                        autoFocus
                      />
                    ) : (
                      <span className={`todo-text ${todo.completed ? "done" : ""}`}>
                        {todo.title}
                      </span>
                    )}

                    {/* Action buttons */}
                    {editingId === todo._key ? (
                      <button className="icon-btn save" onClick={handleUpdate} title="Save">
                        <SaveIcon />
                      </button>
                    ) : (
                      <>
                        <button className="icon-btn" onClick={() => handleEdit(todo)} title="Edit">
                          <EditIcon />
                        </button>
                        <button className="icon-btn delete" onClick={() => handleDelete(todo._key)} title="Delete">
                          <DeleteIcon />
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </main>

        </div>
      </div>
    </>
  );
}