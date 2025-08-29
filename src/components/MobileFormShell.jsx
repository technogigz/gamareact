import React from "react";
import "./MobileFormShell.css";

/**
 * Reusable mobile screen shell
 * Props:
 *  - title: string (top-left white title)
 *  - illustration?: ReactNode (center visual; optional)
 *  - children: form/content area
 */
export default function MobileFormShell({ title, illustration, children }) {
  return (
    <div className="mf-shell">
      <header className="mf-hero">
        <div className="mf-hero-inner">
          <h1 className="mf-hero-title">{title}</h1>

          {/* watermark playing cards - purely decorative, no images */}
          <svg className="mf-hero-watermark" viewBox="0 0 220 150" aria-hidden="true">
            {/* back card */}
            <g opacity="0.22">
              <rect x="70" y="6" rx="14" ry="14" width="140" height="92" fill="#ffffff" />
              <path d="M158 31c11 7 13 20 0 31-12-11-11-24 0-31z" fill="#ffffff"/>
              <text x="83" y="30" fontSize="22" fill="#ffffff" fontFamily="Inter, system-ui">G</text>
            </g>
            {/* front card */}
            <g opacity="0.28">
              <rect x="40" y="26" rx="14" ry="14" width="140" height="92" fill="#ffffff"/>
              <path d="M128 51c11 7 13 20 0 31-12-11-11-24 0-31z" fill="#ffffff"/>
            </g>
          </svg>
        </div>
      </header>

      <section className="mf-sheet">
        {illustration ? (
          <div className="mf-illustration">{illustration}</div>
        ) : null}
        <div className="mf-content">{children}</div>
      </section>
    </div>
  );
}
