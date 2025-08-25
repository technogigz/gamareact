import "./BannerTicker.css";

export default function BannerTicker({text}) {
  return (
    <div className="ticker-wrapper">
      <p className="ticker-text">
        {text}
      </p>
    </div>
  );
}
