// Tab 4: Events — handling user interactions

import { useState } from "react";

function Tab4_Events() {
  const [message, setMessage] = useState("Try the actions below!");
  const [typed, setTyped] = useState("");
  const [color, setColor] = useState("black");

  function handleClick() {
    setMessage("Button was clicked!");
  }

  function handleDoubleClick() {
    setMessage("Button was double-clicked!");
  }

  return (
    <div>
      <h2>Events</h2>
      <p>Handle clicks, typing, hover, etc.</p>

      <p style={{ "color":color, fontSize: "20px" }}>{message}</p>

      <h3>1. Click Events</h3>
      <button onClick={handleClick}>Click me</button>{" "}
      <button onDoubleClick={handleDoubleClick}>Double-click me</button>

      <h3>2. Typing Event</h3>
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setTyped(e.target.value)}
      />
      <p>You typed: {typed}</p>

      <h3>3. Mouse Events</h3>
      <div
        onMouseEnter={() => setColor("blue")}
        onMouseLeave={() => setColor("black")}
        style={{
          padding: "20px",
          backgroundColor: "#f0f0f0",
          display: "inline-block",
          cursor: "pointer"
        }}
      >
        Hover over me! (text color changes above)
      </div>
    </div>
  );
}

export default Tab4_Events;
