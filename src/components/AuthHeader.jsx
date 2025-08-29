import React from "react";
import "./AuthHeader.css";

export default function AuthHeader({ title = "Login" }) {
  return (
    <header className="auth-header" role="banner" aria-label={`${title} header`}>
      <div className="auth-header__inner">
        <h1 className="auth-header__title">{title}</h1>

        {/* subtle card watermark (right side) */}
        <svg
          className="auth-header__art"
          viewBox="0 0 260 160"
          aria-hidden="true"
        >
          {/* back card */}
          <rect x="120" y="10" width="120" height="150" rx="14" ry="14" />
          {/* front card */}
          <rect x="80" y="22" width="120" height="150" rx="14" ry="14" />
          {/* spade mark */}
          <path d="M140 95c0-18 20-32 20-32s20 14 20 32c0 9-7 16-16 16-4 0-7-1-9-3 0 7 3 13 8 18h-6c-6-5-9-12-9-19-2 2-5 4-9 4-9 0-16-7-16-16z" />
          {/* 'G' letter */}
          <path d="M98 54c0-9 7-16 16-16 5 0 9 1 12 3l-2 5c-3-2-6-3-10-3-6 0-11 5-11 11s5 11 12 11c3 0 6-1 9-2v-7h-10v-5h16v16c-4 2-9 4-15 4-10 0-17-7-17-17z" />
        </svg>
      </div>
    </header>
  );
}
