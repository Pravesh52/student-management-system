export default function Loader({ fullScreen = false, text = "Loading..." }) {
  return <div className={`loader-wrap ${fullScreen ? "loader-full" : ""}`}>
    <span className="spinner" />
    <span>{text}</span>
  </div>;
}
