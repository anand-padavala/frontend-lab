import { useState } from "react";
import Television from "./Television";
import Refrigerator from "./Refrigerator";

function App() {
  const [showDiagrams, setShowDiagrams] = useState(false);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Store Rack — Props vs State</h1>

      <button
        onClick={() => setShowDiagrams(!showDiagrams)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: showDiagrams ? "#d32f2f" : "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        {showDiagrams ? "Hide Real Demos" : "Show Real Demos"}
      </button>

      {showDiagrams && (
        <div style={{ marginBottom: "30px" }}>
          <h2>Store Rack — Side View</h2>
          <img
            src="/storerack.jpg"
            alt="Store rack side view with TVs and Refrigerators"
            style={{ width: "100%", maxWidth: "600px", borderRadius: "8px", border: "1px solid #ddd" }}
          />
          <h2 style={{ marginTop: "20px" }}>Store Rack — Front View (Props & State Labeled)</h2>
          <img
            src="/storerack-frontview.svg"
            alt="Store rack front view with props and state labels"
            style={{ width: "100%", maxWidth: "900px", borderRadius: "8px", border: "1px solid #ddd" }}
          />
        </div>
      )}

      <div style={{
        backgroundColor: "#e8f5e9",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
        fontSize: "14px"
      }}>
        <strong>Analogy:</strong> Think of a store rack displaying appliances.
        <ul style={{ margin: "8px 0 0 0" }}>
          <li><strong>Props</strong> = the label on the shelf (brand, size, warranty). Set by the store (parent), the product (child) cannot change them.</li>
          <li><strong>State</strong> = what's happening inside the product (channel, temperature, light). The product manages this internally.</li>
        </ul>
      </div>

      {/* TV Rack */}
      <h2>TV Rack</h2>
      <p style={{ color: "#666" }}>Same component, different props — each TV manages its own channel state independently.</p>
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "30px" }}>
        {/* Parent passes PROPS — child cannot change these */}
        <Television brand="Samsung" size='55"' />
        <Television brand="LG" size='65"' />
        <Television brand="Sony" size='50"' />
      </div>

      {/* Refrigerator Rack */}
      <h2>Refrigerator Rack</h2>
      <p style={{ color: "#666" }}>Each fridge has its own temperature and light state. Changing one doesn't affect the others.</p>
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "30px" }}>
        {/* Parent passes PROPS — child cannot change these */}
        <Refrigerator name="Whirlpool 300L" warranty={3} />
        <Refrigerator name="Samsung 250L" warranty={5} />
        <Refrigerator name="LG 400L" warranty={2} />
      </div>

      {/* Summary */}
      <div style={{
        backgroundColor: "#f5f5f5",
        padding: "15px",
        borderRadius: "8px",
        fontSize: "14px"
      }}>
        <strong>Key Takeaways:</strong>
        <ul style={{ margin: "8px 0 0 0" }}>
          <li>Props flow <strong>down</strong> from parent (App) to child (Television, Refrigerator)</li>
          <li>State is <strong>private</strong> to each component instance</li>
          <li>Changing state triggers a re-render of <strong>only that component</strong> (check console)</li>
          <li>Same component + different props = different products on the rack</li>
          <li>Same component + independent state = each product works independently</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
