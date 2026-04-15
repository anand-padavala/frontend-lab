import { useState, useCallback, memo } from "react";

const Button = memo(function Button({ label, onClick }) {
  console.log(`Button "${label}" rendered`);
  return (
    <button
      onClick={onClick}
      style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer", marginRight: "8px" }}
    >
      {label}
    </button>
  );
});

function Tab4_UseCallback() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <h2>useCallback</h2>
      <p>Cache a function reference so it doesn't get recreated on every render. Useful with memo'd child components.</p>

      <h3>Counter: {count}</h3>
      <Button label="Increment (useCallback)" onClick={increment} />

      <h3 style={{ marginTop: "20px" }}>Type below (unrelated state)</h3>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type anything..."
        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", width: "100%", fontSize: "14px" }}
      />

      <h3 style={{ marginTop: "20px" }}>Open the console to see</h3>
      <pre
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "6px",
        }}
      >
{`Type in the input:
  → Parent re-renders
  → Button does NOT re-render (same function reference, memo skips it)

Click Increment:
  → Parent re-renders
  → Button does NOT re-render (useCallback returns same reference)

Without useCallback:
  → Every parent re-render creates a new function
  → memo sees a new prop → Button re-renders every time

useCallback(fn, deps)
  fn   → the function to cache
  deps → when these change, recreate the function`}
      </pre>
    </div>
  );
}

export default Tab4_UseCallback;
