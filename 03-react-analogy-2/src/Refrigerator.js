import React, { useState } from "react";

function Refrigerator({ name, warranty }) {
  // STATE: Handled in the "Closed Room"
  const [temp, setTemp] = useState(37);
  const [isLightOn, setIsLightOn] = useState(false);

  // Every time the state changes, the Manager runs this logic in the room
  console.log(`[Closed Room] Re-rendering ${name}. Temp: ${temp}, Light: ${isLightOn}`);

  return (
    <div style={{
      border: "2px solid #ccc",
      padding: "15px",
      borderRadius: "8px",
      width: "250px",
      backgroundColor: isLightOn ? "#fffde7" : "#f5f5f5"
    }}>
      {/* PROPS: The "Labels" on the rack */}
      <h3 style={{ margin: "0 0 5px 0" }}>{name}</h3>
      <p style={{ margin: "0 0 10px 0", color: "#666" }}>Warranty: {warranty} Years</p>

      <hr />

      {/* STATE 1: Numeric Fine-Tuning */}
      <div style={{ margin: "10px 0" }}>
        <p>Temp: <strong style={{ color: temp < 32 ? "#1976d2" : temp > 45 ? "#d32f2f" : "#388e3c" }}>{temp}°F</strong></p>
        <button onClick={() => setTemp(temp - 1)}>Cool Down</button>{" "}
        <button onClick={() => setTemp(temp + 1)}>Warm Up</button>
      </div>

      {/* STATE 2: Boolean Toggle */}
      <div style={{ margin: "10px 0" }}>
        <p>Interior Light: {isLightOn ? "ON" : "OFF"}</p>
        <button onClick={() => setIsLightOn(!isLightOn)}>
          Toggle Light
        </button>
      </div>

      {/* Legend */}
      <div style={{ marginTop: "12px", fontSize: "11px", color: "#888" }}>
        <div>PROPS (fixed): name="{name}", warranty={warranty}</div>
        <div>STATE (changes): temp={temp}, light={isLightOn ? "on" : "off"}</div>
      </div>
    </div>
  );
}

export default Refrigerator;
