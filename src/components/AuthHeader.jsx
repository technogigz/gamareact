import React from "react";
import "./AuthHeader.css";

export default function AuthHeader({ title = "Login" }) {
  return (
    <header className="auth-header" role="banner" aria-label={`${title} header`}>
      <div className="auth-header__inner">
        <h1 className="auth-header__title">{title}</h1>
      </div>
    </header>
  );
}
