// Tab 7: useRef — accessing DOM elements and persisting values without re-renders

import { useState, useRef, useEffect } from "react";

function Tab7_UseRef() {
  // 1. Access a DOM element directly
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  function clearInput() {
    inputRef.current.value = "sss";
    inputRef.current.focus();
  }

  // 2. Persist a value without causing re-render
  const renderCount = useRef(0);
  const [name, setName] = useState("");

  useEffect(() => {
    renderCount.current += 1;
  });

  // 3. Track previous state value
  const [score, setScore] = useState(0);
  const prevScoreRef = useRef(0);

  useEffect(() => {
    prevScoreRef.current = score;
  }, [score]);

  // 4. Store a timer ID (ref persists across renders, unlike a variable)
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  function startTimer() {
    if (isRunning) return;
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
  }

  function resetTimer() {
    stopTimer();
    setElapsed(0);
  }

  return (
    <div>
      <h2>useRef</h2>
      <p>Access DOM elements directly and store values that persist across renders without causing re-renders.</p>

      <h3>1. Access DOM Elements</h3>
      <p>useRef gives you direct access to a DOM node — like <code>document.getElementById</code> but the React way.</p>
      <input ref={inputRef} placeholder="Click the buttons below..." style={{ padding: "6px", marginRight: "8px" }} />
      <button onClick={focusInput} style={{ marginRight: "5px" }}>Focus Input</button>
      <button onClick={clearInput}>Clear & Focus</button>

      <h3>2. Persist Values Without Re-render</h3>
      <p>
        Type your name and watch: the component re-renders (useState), but the render count
        updates silently (useRef) — no extra re-render from the ref change.
      </p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name..."
        style={{ padding: "6px", marginRight: "8px" }}
      />
      <p>Name: {name}</p>
      <p>This component has rendered <strong>{renderCount.current}</strong> times.</p>

      <h3>3. Track Previous State</h3>
      <p>useRef can remember the previous value of a state, since refs update after render.</p>
      <button onClick={() => setScore(prev => prev + 5)} style={{ marginRight: "5px" }}>+5</button>
      <button onClick={() => setScore(prev => prev - 3)}>-3</button>
      <p>Current score: <strong>{score}</strong></p>
      <p>Previous score: <strong>{prevScoreRef.current}</strong></p>

      <h3>4. Store Timer ID</h3>
      <p>A regular variable resets on every render. useRef keeps the timer ID safe across renders.</p>
      <button onClick={startTimer} style={{ marginRight: "5px" }} disabled={isRunning}>Start</button>
      <button onClick={stopTimer} style={{ marginRight: "5px" }} disabled={!isRunning}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
      <p>Elapsed: <strong>{elapsed}s</strong></p>

      <h3>useState vs useRef</h3>
      <pre style={{ backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "6px" }}>
{`useState                          useRef
─────────                         ──────
Returns [value, setter]           Returns { current: value }
Changing it causes re-render      Changing it does NOT re-render
Use for: UI data                  Use for: DOM refs, timer IDs,
                                  previous values, render counts`}
      </pre>
    </div>
  );
}

export default Tab7_UseRef;
