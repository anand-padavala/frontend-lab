import { useRef, useState } from "react";

function Tab5_UseRef() {
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  const [text, setText] = useState("");

  renderCount.current += 1;

  function handleFocus() {
    inputRef.current.focus();
  }

  return (
    <div>
      <h2>useRef</h2>
      <p>Hold a value that persists across renders without causing a re-render when it changes.</p>

      <h3>1. Access a DOM element</h3>
      <p>Attach a ref to an input and focus it with a button click.</p>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          ref={inputRef}
          placeholder="Click the button to focus me"
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", flex: 1, fontSize: "14px" }}
        />
        <button
          onClick={handleFocus}
          style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
        >
          Focus Input
        </button>
      </div>

      <h3 style={{ marginTop: "20px" }}>2. Track render count</h3>
      <p>useRef holds the count without triggering re-renders. useState would cause an infinite loop here.</p>
      <p style={{ fontSize: "18px" }}>
        This component has rendered <strong>{renderCount.current}</strong> times
      </p>
      <p style={{ color: "#666" }}>Type below to trigger re-renders and watch the count go up.</p>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type to re-render..."
        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", width: "100%", fontSize: "14px" }}
      />

      <h3 style={{ marginTop: "20px" }}>How it works</h3>
      <pre
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "6px",
        }}
      >
{`// Access a DOM element
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus();    // direct DOM access

// Persist a value across renders
const renderCount = useRef(0);
renderCount.current += 1;    // mutate freely, no re-render

useRef vs useState:
  useRef    → changing .current does NOT trigger re-render
  useState  → changing value DOES trigger re-render`}
      </pre>
    </div>
  );
}

export default Tab5_UseRef;
