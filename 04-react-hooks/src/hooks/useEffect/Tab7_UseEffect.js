import { useState, useEffect, useLayoutEffect, useRef } from "react";

function Tab7_UseEffect() {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);
  const logRef = useRef(null);

  function addLog(message) {
    setLogs((prev) => [...prev, message]);
  }

  // useEffect — runs AFTER the browser paints
  useEffect(() => {
    addLog(`useEffect: count is ${count}`);
    return () => addLog(`useEffect cleanup: count was ${count}`);
  }, [count]);

  // useLayoutEffect — runs BEFORE the browser paints
  useLayoutEffect(() => {
    addLog(`useLayoutEffect: count is ${count}`);
    return () => addLog(`useLayoutEffect cleanup: count was ${count}`);
  }, [count]);

  // Auto-scroll logs
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div>
      <h2>useEffect & useLayoutEffect</h2>
      <p>Both run side effects after render. The difference is <strong>when</strong> they fire.</p>

      <h3>Counter: {count}</h3>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => setCount((c) => c + 1)}
          style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
        >
          Increment
        </button>
        <button
          onClick={() => { setCount(0); setLogs([]); }}
          style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
        >
          Reset
        </button>
      </div>

      <h3 style={{ marginTop: "20px" }}>Execution Log</h3>
      <p style={{ color: "#666" }}>Click Increment and watch the order of execution.</p>
      <div
        ref={logRef}
        style={{
          backgroundColor: "#1e1e1e",
          color: "#d4d4d4",
          padding: "12px",
          borderRadius: "6px",
          fontFamily: "monospace",
          fontSize: "13px",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        {logs.length === 0 && <div style={{ color: "#666" }}>Click Increment to see logs...</div>}
        {logs.map((log, i) => (
          <div
            key={i}
            style={{
              color: log.includes("useLayoutEffect")
                ? log.includes("cleanup") ? "#ce9178" : "#dcdcaa"
                : log.includes("cleanup") ? "#ce9178" : "#9cdcfe",
              padding: "2px 0",
            }}
          >
            {log}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "20px" }}>The difference</h3>
      <pre
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "6px",
        }}
      >
{`Render → DOM updated → useLayoutEffect → Browser paints → useEffect

useEffect (most common):
  - Runs AFTER the browser paints the screen
  - User sees the UI first, then the effect runs
  - Use for: data fetching, event listeners, timers

useLayoutEffect (rare):
  - Runs BEFORE the browser paints the screen
  - Blocks painting until it finishes
  - Use for: measuring DOM size/position, preventing visual flicker

Both have the same API:
  useEffect(() => {
    // effect runs
    return () => { /* cleanup runs before next effect or unmount */ };
  }, [dependencies]);`}
      </pre>
    </div>
  );
}

export default Tab7_UseEffect;
