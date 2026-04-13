import React, { useState } from "react";

function Television({ brand, size }) {
  // STATE: Managed in the "Closed Room"
  const [channel, setChannel] = useState("Store Demo");

  console.log(`[Closed Room] Re-rendering ${brand} TV. Channel: ${channel}`);

  return (
    <div style={{
      border: "2px solid #333",
      borderRadius: "10px",
      padding: "15px",
      width: "250px",
      backgroundColor: "#1a1a2e",
      color: "#fff",
      textAlign: "center"
    }}>
      {/* PROPS: Physical attributes that don't change */}
      <div style={{ fontSize: "14px", color: "#aaa", marginBottom: "8px" }}>
        {brand} | {size}
      </div>

      {/* STATE: The dynamic screen content */}
      <div style={{
        backgroundColor: "#0f3460",
        padding: "30px 10px",
        borderRadius: "6px",
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px"
      }}>
        {channel}
      </div>

      <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
        <button onClick={() => setChannel("Movie Mode")}>Movie</button>
        <button onClick={() => setChannel("Sports")}>Sports</button>
        <button onClick={() => setChannel("News")}>News</button>
        <button onClick={() => setChannel("Store Demo")}>Reset</button>
      </div>

      {/* Legend */}
      <div style={{ marginTop: "12px", fontSize: "11px", color: "#888", textAlign: "left" }}>
        <div>PROPS (fixed): brand="{brand}", size="{size}"</div>
        <div>STATE (changes): channel="{channel}"</div>
      </div>
    </div>
  );
}

export default Television;
