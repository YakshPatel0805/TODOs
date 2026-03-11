import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodosRequest,
  createTodoRequest,
  deleteTodoRequest,
  updateTodoRequest,
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

    .todo-header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

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

    /* Search bar */
    .search-bar {
      display: flex; gap: 0.6rem;
      padding: 1.2rem 1.8rem;
      background: rgba(255,255,255,0.02);
      border-bottom: 1px solid rgba(200,169,110,0.1);
    }
    .search-input {
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
    .search-input::placeholder { color: #444; }
    .search-input:focus { border-color: rgba(200,169,110,0.45); }

    /* Modal overlay */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Modal */
    .modal {
      background: #161618;
      border: 1px solid rgba(200,169,110,0.18);
      border-radius: 16px;
      padding: 2rem;
      max-width: 500px;
      width: 90%;
      animation: slideUp 0.3s ease;
    }
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .modal-header {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      color: #f0ede8;
      margin-bottom: 1.5rem;
    }
    .modal-header em { color: #c8a96e; font-style: italic; }

    .modal-field {
      margin-bottom: 1.2rem;
    }
    .modal-label {
      display: block;
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #555;
      margin-bottom: 0.4rem;
    }
    .modal-input {
      width: 100%;
      background: #1e1e21;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      padding: 0.8rem 1rem;
      font-family: 'Outfit', sans-serif;
      font-size: 0.88rem;
      color: #f0ede8;
      outline: none;
      transition: border-color 0.2s;
    }
    .modal-input::placeholder { color: #f8f3f3ff; }
    .modal-input:focus { border-color: rgba(200,169,110,0.45); }
    .modal-input.error { border-color: rgba(220,80,80,0.5); }

    .modal-error {
      font-size: 0.7rem;
      color: #e06060;
      margin-top: 0.3rem;
    }

    .modal-textarea {
      width: 100%;
      background: #1e1e21;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      padding: 0.8rem 1rem;
      font-family: 'Outfit', sans-serif;
      font-size: 0.88rem;
      color: #f0ede8;
      outline: none;
      resize: vertical;
      min-height: 100px;
      transition: border-color 0.2s;
    }
    .modal-textarea::placeholder { color: #444; }
    .modal-textarea:focus { border-color: rgba(200,169,110,0.45); }
    .modal-textarea.error { border-color: rgba(220,80,80,0.5); }

    .modal-select {
      width: 100%;
      background: #1e1e21;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      padding: 0.8rem 1rem;
      font-family: 'Outfit', sans-serif;
      font-size: 0.88rem;
      color: #f0ede8;
      outline: none;
      transition: border-color 0.2s;
      cursor: pointer;
    }
    .modal-select:focus { border-color: rgba(200,169,110,0.45); }
    .modal-select option { background: #1e1e21; color: #f0ede8; }

    .modal-actions {
      display: flex;
      gap: 0.8rem;
      margin-top: 1.8rem;
    }
    .modal-btn {
      flex: 1;
      padding: 0.8rem;
      border: none;
      border-radius: 10px;
      font-family: 'Outfit', sans-serif;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.15s;
    }
    .modal-btn-submit {
      background: linear-gradient(135deg, #c8a96e, #a07840);
      color: #0d0d0f;
    }
    .modal-btn-submit:hover { opacity: 0.88; transform: translateY(-1px); }
    .modal-btn-cancel {
      background: rgba(255,255,255,0.08);
      color: #f0ede8;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .modal-btn-cancel:hover { background: rgba(255,255,255,0.12); }

    /* Details Modal */
    .details-modal {
      background: #161618;
      border: 1px solid rgba(200,169,110,0.18);
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 600px;
      width: 90%;
      animation: slideUp 0.3s ease;
      max-height: 80vh;
      overflow-y: auto;
    }

    .details-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(200,169,110,0.1);
    }

    .details-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.8rem;
      color: #f0ede8;
      word-break: break-word;
      flex: 1;
    }

    .details-close-btn {
      background: none;
      border: none;
      color: #555;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
    }
    .details-close-btn:hover { color: #c8a96e; }

    .details-meta {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .details-meta-item {
      background: rgba(200,169,110,0.05);
      border: 1px solid rgba(200,169,110,0.1);
      border-radius: 12px;
      padding: 1rem;
    }

    .details-meta-label {
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #555;
      margin-bottom: 0.5rem;
      display: block;
    }

    .details-meta-value {
      font-size: 0.9rem;
      color: #f0ede8;
    }

    .details-status {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .details-status.completed {
      background: rgba(108,220,138,0.15);
      color: #6cdc8a;
    }

    .details-status.pending {
      background: rgba(200,169,110,0.15);
      color: #c8a96e;
    }

    .details-section {
      margin-bottom: 2rem;
    }

    .details-section-title {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #555;
      margin-bottom: 0.8rem;
      display: block;
    }

    .details-description {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(200,169,110,0.1);
      border-radius: 12px;
      padding: 1.2rem;
      font-size: 0.9rem;
      line-height: 1.6;
      color: #d0ccc7;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .details-actions {
      display: flex;
      gap: 0.8rem;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(200,169,110,0.1);
    }

    .details-btn {
      flex: 1;
      padding: 0.8rem;
      border: none;
      border-radius: 10px;
      font-family: 'Outfit', sans-serif;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.15s;
    }

    .details-btn-primary {
      background: linear-gradient(135deg, #c8a96e, #a07840);
      color: #0d0d0f;
    }
    .details-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

    .details-btn-secondary {
      background: rgba(255,255,255,0.08);
      color: #f0ede8;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .details-btn-secondary:hover { background: rgba(255,255,255,0.12); }

    .details-btn-danger {
      background: rgba(220,80,80,0.15);
      color: #e06060;
      border: 1px solid rgba(220,80,80,0.3);
    }
    .details-btn-danger:hover { background: rgba(220,80,80,0.25); }

    .details-timestamp {
      font-size: 0.75rem;
      color: #555;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(200,169,110,0.05);
    }

    /* Notification Bell */
    .notification-bell {
      position: relative;
      background: none;
      border: none;
      font-size: 1.3rem;
      cursor: pointer;
      color: #c8a96e;
      transition: transform 0.2s;
      padding: 0.5rem;
      margin-right: 10px;
    }

    .notification-bell:hover { transform: scale(1.1); }

    .notification-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      background: #e06060;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.65rem;
      font-weight: 600;
    }

    /* Notification Panel */
    .notification-panel {
      position: absolute;
      top: 100%;
      right: 0;
      background: #161618;
      border: 1px solid rgba(200,169,110,0.18);
      border-radius: 12px;
      width: 320px;
      max-height: 400px;
      overflow-y: auto;
      z-index: 999;
      margin-top: 0.5rem;
      box-shadow: 0 10px 40px rgba(0,0,0,0.4);
      animation: slideDown 0.2s ease;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .notification-panel-header {
      padding: 1rem;
      border-bottom: 1px solid rgba(200,169,110,0.1);
      font-family: 'Playfair Display', serif;
      font-size: 1rem;
      color: #f0ede8;
    }

    .notification-item {
      padding: 1rem;
      border-bottom: 1px solid rgba(200,169,110,0.05);
      cursor: pointer;
      transition: background 0.2s;
    }
    .notification-item:hover { background: rgba(200,169,110,0.05); }
    .notification-item:last-child { border-bottom: none; }

    .notification-item-title {
      font-size: 0.85rem;
      color: #f0ede8;
      font-weight: 500;
      margin-bottom: 0.3rem;
    }

    .notification-item-meta {
      font-size: 0.7rem;
      color: #555;
      display: flex;
      justify-content: space-between;
    }

    .notification-empty {
      padding: 2rem 1rem;
      text-align: center;
      color: #555;
      font-size: 0.8rem;
    }

    /* Due Soon Alert */
    .due-soon-alert {
      background: rgba(224,96,96,0.1);
      border: 1px solid rgba(224,96,96,0.2);
      border-radius: 10px;
      padding: 1rem;
      margin-bottom: 1.2rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      animation: slideIn 0.3s ease;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .due-soon-alert-icon {
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .due-soon-alert-content {
      flex: 1;
    }

    .due-soon-alert-title {
      font-size: 0.8rem;
      font-weight: 600;
      color: #e06060;
      margin-bottom: 0.2rem;
    }

    .due-soon-alert-message {
      font-size: 0.75rem;
      color: #d0a0a0;
    }
  `}</style>
);

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EyeIcon = () => (
  <svg width="13" height="13" viewBox="0  0 24 24" fill="none" color="white">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" color="white">
    <path d="M9 1.5L11.5 4L4.5 11H2V8.5L9 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" color="white">
    <path d="M2 2L11 11M11 2L2 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" color="currentColor">
    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 18 3 18H21C21 18 18 15 18 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.73 21C15.5814 21.3031 15.3625 21.5547 15.0951 21.7295C14.8277 21.9044 14.5161 21.9965 14.2 22H9.8C9.48387 21.9965 9.17225 21.9044 8.90487 21.7295C8.63749 21.5547 8.41858 21.3031 8.27 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [editingDueDate, setEditingDueDate] = useState("");
  const [editingPriority, setEditingPriority] = useState("medium");
  const [originalTitle, setOriginalTitle] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | done
  const [errorMsg, setErrorMsg] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", dueDate: "", priority: "medium" });
  const [formErrors, setFormErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [lastAlertDate, setLastAlertDate] = useState(null);

  // Helper functions for due date notifications
  const calculateDaysRemaining = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isTaskDueSoon = (todo) => {
    if (todo.completed) return false;
    const daysRemaining = calculateDaysRemaining(todo.dueDate);
    return daysRemaining !== null && daysRemaining >= 0 && daysRemaining <= 3;
  };

  const getTasksDueSoon = () => {
    return todos.filter(isTaskDueSoon).sort((a, b) => {
      const daysA = calculateDaysRemaining(a.dueDate);
      const daysB = calculateDaysRemaining(b.dueDate);
      return daysA - daysB;
    });
  };

  const getDueSoonMessage = (daysRemaining) => {
    if (daysRemaining === 0) return "Due today";
    if (daysRemaining === 1) return "Due tomorrow";
    return `${daysRemaining} days remaining`;
  };

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showNotifications && !e.target.closest('.notification-bell') && !e.target.closest('.notification-panel')) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showNotifications]);

  useEffect(() => {
    setMounted(true);
    if (user?.id) {
      dispatch(fetchTodosRequest(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      setErrorMsg(error);
      const timer = setTimeout(() => setErrorMsg(""), 4000);
      return () => clearTimeout(timer);
    } else {
      setErrorMsg("");
    }
  }, [error]);

  const handleAddTodo = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setErrorMsg("");
    dispatch(createTodoRequest(user.id, {
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: formData.dueDate || null,
      priority: formData.priority
    }));
    setFormData({ title: "", description: "", dueDate: "", priority: "medium" });
    setFormErrors({});
    setShowModal(false);
  };

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditingText(todo.title);
    setEditingDescription(todo.description || "");
    setEditingDueDate(todo.dueDate ? todo.dueDate.split('T')[0] : "");
    setEditingPriority(todo.priority || "medium");
    setOriginalTitle(todo.title);
    setShowEditModal(true);
  };

  const handleUpdateTodo = () => {
    const errors = {};
    if (!editingText.trim()) errors.title = "Title is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    dispatch(updateTodoRequest(originalTitle, user.id, {
      newTitle: editingText.trim(),
      description: editingDescription.trim(),
      dueDate: editingDueDate || null,
      priority: editingPriority
    }));
    setShowEditModal(false);
    setEditingId(null);
    setEditingText("");
    setEditingDescription("");
    setEditingDueDate("");
    setEditingPriority("medium");
    setOriginalTitle("");
    setFormErrors({});
  };

  const handleDelete = (title) => dispatch(deleteTodoRequest(title, user.id));

  const handleEditKeyDown = (e) => { if (e.key === "Enter") handleUpdateTodo(); if (e.key === "Escape") setShowEditModal(false); };

  // Toggle complete
  const handleToggle = (id) => {
    const todo = todos.find(t => t._id === id);
    if (todo) {
      dispatch(updateTodoRequest(todo.title, user.id, { completed: !todo.completed }));
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const progress = todos.length ? Math.round((completedCount / todos.length) * 100) : 0;

  const filteredTodos = todos.filter((t) => {
    const matchesFilter = filter === "all" ? true : filter === "active" ? !t.completed : t.completed;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getInitial = (email) => email ? email[0].toUpperCase() : "?";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e06060';
      case 'medium': return '#c8a96e';
      case 'low': return '#6cdc8a';
      default: return '#c8a96e';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'rgba(220,80,80,0.15)';
      case 'medium': return 'rgba(200,169,110,0.15)';
      case 'low': return 'rgba(108,220,138,0.15)';
      default: return 'rgba(200,169,110,0.15)';
    }
  };

  const handleShowDetails = (todo) => {
    setSelectedTodo(todo);
    setShowDetailsModal(true);
  };

  if (!mounted) return null;

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
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ fontSize: "0.72rem", color: "#fdfffef1", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {user.email}
            </div>

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
            <div className="todo-header-container">
              <div className="todo-header">
                <h1 className="todo-title">My Tasks</h1>
                <p className="todo-subtitle">Stay focused. Get things done.</p>
              </div>

              <div className="notification-wrapper" style={{ position: "relative" }}>
                <button
                  className="notification-bell"
                  onClick={() => setShowNotifications(!showNotifications)}
                  title="Notifications"
                >
                  <BellIcon />
                  {getTasksDueSoon().length > 0 && (
                    <div className="notification-badge">{getTasksDueSoon().length}</div>
                  )}
                </button>

                {showNotifications && (
                  <div className="notification-panel">
                    <div className="notification-panel-header">Notifications</div>
                    {getTasksDueSoon().length > 0 ? (
                      getTasksDueSoon().map((todo) => (
                        <div
                          key={todo._id}
                          className="notification-item"
                          onClick={() => {
                            handleShowDetails(todo);
                            setShowNotifications(false);
                          }}
                        >
                          <div className="notification-item-title">{todo.title}</div>
                          <div className="notification-item-meta">
                            <span>
                              {getDueSoonMessage(calculateDaysRemaining(todo.dueDate))}
                            </span>
                            <span>{formatDueDate(todo.dueDate)}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="notification-empty">No tasks due soon</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {mounted && errorMsg && (
              <div style={{
                background: 'rgba(220,80,80,0.08)',
                border: '1px solid rgba(220,80,80,0.22)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                marginBottom: '1.2rem',
                fontSize: '0.8rem',
                color: '#e06060',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>⚠</span> {errorMsg}
              </div>
            )}

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

            {/* Search bar */}
            <div className="search-bar">
              <input
                className="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
              />
              <button className="add-btn" onClick={() => setShowModal(true)}>+ Add</button>
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
                  <li key={todo._id} className={`todo-item ${todo.completed ? "done" : ""}`}>

                    {/* Check button */}
                    <button
                      className={`check-btn ${todo.completed ? "checked" : ""}`}
                      onClick={() => handleToggle(todo._id)}
                      title={todo.completed ? "Mark incomplete" : "Mark complete"}
                    >
                      {todo.completed && <CheckIcon />}
                    </button>

                    {/* Text or edit input */}
                    <span className={`todo-text ${todo.completed ? "done" : ""}`}>
                      {todo.title}
                    </span>

                    {/* Action buttons */}
                    <>
                      <button className="icon-btn" onClick={() => handleShowDetails(todo)} title="Show Details">
                        <EyeIcon />
                      </button>
                      <button className="icon-btn" onClick={() => handleEdit(todo)} title="Edit">
                        <EditIcon />
                      </button>
                      <button className="icon-btn delete" onClick={() => handleDelete(todo.title)} title="Delete">
                        <DeleteIcon />
                      </button>
                    </>

                  </li>
                ))}
              </ul>
            )}
          </main>

        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-header">Create <em>Task</em></h2>

              <div className="modal-field">
                <label className="modal-label" htmlFor="title">Task Title</label>
                <input
                  id="title"
                  type="text"
                  className={`modal-input ${formErrors.title ? 'error' : ''}`}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter task title"
                />
                {formErrors.title && <div className="modal-error">{formErrors.title}</div>}
              </div>

              <div className="modal-field">
                <label className="modal-label" htmlFor="description">Description</label>
                <textarea
                  id="description"
                  className="modal-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter task description"
                />
              </div>

              <div className="modal-field">
                <label className="modal-label" htmlFor="dueDate">Due Date</label>
                <input
                  id="dueDate"
                  type="date"
                  className="modal-input"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>

              <div className="modal-field">
                <label className="modal-label" htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  className="modal-select"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="modal-actions">
                <button className="modal-btn modal-btn-submit" onClick={handleAddTodo}>
                  Create Task
                </button>
                <button className="modal-btn modal-btn-cancel" onClick={() => {
                  setShowModal(false);
                  setFormData({ title: "", description: "", dueDate: "", priority: "medium" });
                  setFormErrors({});
                }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedTodo && (
          <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
            <div className="details-modal" onClick={(e) => e.stopPropagation()}>
              <div className="details-header">
                <h2 className="details-title">{selectedTodo.title}</h2>
                <button
                  className="details-close-btn"
                  onClick={() => setShowDetailsModal(false)}
                  title="Close"
                >
                  ✕
                </button>
              </div>

              <div className="details-meta">
                <div className="details-meta-item">
                  <span className="details-meta-label">Status</span>
                  <div className={`details-status ${selectedTodo.completed ? 'completed' : 'pending'}`}>
                    {selectedTodo.completed ? '✓ Completed' : '⏱ Pending'}
                  </div>
                </div>
                <div className="details-meta-item">
                  <span className="details-meta-label">Priority</span>
                  <div className="details-status" style={{ background: getPriorityBg(selectedTodo.priority || 'medium'), color: getPriorityColor(selectedTodo.priority || 'medium') }}>
                    {(selectedTodo.priority || 'medium').charAt(0).toUpperCase() + (selectedTodo.priority || 'medium').slice(1)}
                  </div>
                </div>
              </div>

              <div className="details-meta">
                <div className="details-meta-item">
                  <span className="details-meta-label">Due Date</span>
                  <div className="details-meta-value">{selectedTodo.dueDate ? formatDueDate(selectedTodo.dueDate) : 'No due date'}</div>
                </div>
                <div className="details-meta-item">
                  <span className="details-meta-label">Created</span>
                  <div className="details-meta-value">{formatDate(selectedTodo.createdAt)}</div>
                </div>
              </div>

              {selectedTodo.updatedAt && selectedTodo.updatedAt !== selectedTodo.createdAt && (
                <div className="details-meta">
                  <div className="details-meta-item">
                    <span className="details-meta-label">Last Updated</span>
                    <div className="details-meta-value">{formatDate(selectedTodo.updatedAt)}</div>
                  </div>
                </div>
              )}

              <div className="details-section">
                <span className="details-section-title">Description</span>
                <div className="details-description">
                  {selectedTodo.description || 'No description provided'}
                </div>
              </div>

              <div className="details-actions">
                <button
                  className="details-btn details-btn-primary"
                  onClick={() => {
                    handleEdit(selectedTodo);
                    setShowDetailsModal(false);
                  }}
                >
                  Edit Task
                </button>
                <button
                  className="details-btn details-btn-secondary"
                  onClick={() => {
                    dispatch(updateTodoRequest(selectedTodo.title, user.id, { completed: !selectedTodo.completed }));
                    setShowDetailsModal(false);
                  }}
                >
                  {selectedTodo.completed ? 'Mark Pending' : 'Mark Complete'}
                </button>
                <button
                  className="details-btn details-btn-danger"
                  onClick={() => {
                    handleDelete(selectedTodo.title);
                    setShowDetailsModal(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-header">Edit <em>Task</em></h2>

              <div className="modal-field">
                <label className="modal-label" htmlFor="edit-title">Task Title</label>
                <input
                  id="edit-title"
                  type="text"
                  className={`modal-input ${formErrors.title ? 'error' : ''}`}
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={handleEditKeyDown}
                  placeholder="Enter task title"
                  autoFocus
                />
                {formErrors.title && <div className="modal-error">{formErrors.title}</div>}
              </div>

              <div className="modal-field">
                <label className="modal-label" htmlFor="edit-description">Description</label>
                <textarea
                  id="edit-description"
                  className="modal-textarea"
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                  placeholder="Enter task description"
                />
              </div>

              <div className="modal-field">
                <label className="modal-label" htmlFor="edit-dueDate">Due Date</label>
                <input
                  id="edit-dueDate"
                  type="date"
                  className="modal-input"
                  value={editingDueDate}
                  onChange={(e) => setEditingDueDate(e.target.value)}
                />
              </div>

              <div className="modal-field">
                <label className="modal-label" htmlFor="edit-priority">Priority</label>
                <select
                  id="edit-priority"
                  className="modal-select"
                  value={editingPriority}
                  onChange={(e) => setEditingPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="modal-actions">
                <button className="modal-btn modal-btn-submit" onClick={handleUpdateTodo}>
                  Update Task
                </button>
                <button className="modal-btn modal-btn-cancel" onClick={() => {
                  setShowEditModal(false);
                  setEditingId(null);
                  setEditingText("");
                  setEditingDescription("");
                  setEditingDueDate("");
                  setEditingPriority("medium");
                  setOriginalTitle("");
                  setFormErrors({});
                }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}