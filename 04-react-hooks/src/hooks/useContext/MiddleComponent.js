import ThemedBox from "./ThemedBox";

// This component doesn't use theme at all — it just passes through.
// Without context, you'd have to pass theme as a prop here too.
function MiddleComponent() {
  return (
    <div style={{ padding: "10px", border: "1px dashed #aaa", marginTop: "10px" }}>
      <p>MiddleComponent — doesn't know about theme</p>
      <ThemedBox />
    </div>
  );
}

export default MiddleComponent;
