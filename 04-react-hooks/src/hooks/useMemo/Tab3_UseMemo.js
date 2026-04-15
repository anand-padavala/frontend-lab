import { useState, useMemo } from "react";

function Tab3_UseMemo() {
  const [number, setNumber] = useState(5);
  const [color, setColor] = useState("#333");

  console.log("Component re-rendered");
  
  const factorial = () => {
    console.log("Computing factorial...");
    let result = 1;
    for (let i = 2; i <= number; i++) {
      result *= i;
    }
    return result;
  }
  const memo = useMemo(factorial, [number]);
  

  return (
    <div>
      <h2>useMemo</h2>
      <p>Cache the result of an expensive computation. It only recalculates when the dependency changes.</p>

      <h3>Factorial Calculator</h3>
      <label>
        Number:{" "}
        <input
          type="range"
          min="0"
          max="20"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
        />
        <strong> {number}</strong>
      </label>

      <p style={{ fontSize: "18px", marginTop: "10px", color }}>
        {number}! = <strong>{memo}</strong>
      </p>

      <h3 style={{ marginTop: "20px" }}>Change Color (unrelated state)</h3>
      <p style={{ color: "#666" }}>
        Changing color re-renders the component, but useMemo skips the factorial computation.
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        {["#333", "#e53935", "#1e88e5", "#43a047"].map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            style={{
              width: "36px", height: "36px", borderRadius: "50%", border: color === c ? "3px solid #000" : "2px solid #ccc",
              backgroundColor: c, cursor: "pointer",
            }}
          />
        ))}
      </div>

      <h3 style={{ marginTop: "20px" }}>Open the console to see</h3>
      <pre
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "6px",
        }}
      >
{`Move the slider:
  → "Component re-rendered"
  → "Computing factorial..."    ← dependency changed, recomputes

Click a color button:
  → "Component re-rendered"
  → (no "Computing factorial...") ← dependency same, returns cache

useMemo(fn, deps)
  fn   → the computation to cache
  deps → when these change, recompute`}
      </pre>
    </div>
  );
}

export default Tab3_UseMemo;
