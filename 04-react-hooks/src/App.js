import { useState } from "react";
import Tab1_UseContext from "./hooks/useContext/Tab1_UseContext";

const tabs = [
  { label: "1. useContext", component: Tab1_UseContext },
];

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveComponent = tabs[activeTab].component;

  return (
    <div style={{ fontFamily: "sans-serif", margin: "0 auto", padding: "20px" }}>
      <h1>React Hooks Lab</h1>

      <div style={{ display: "flex", gap: "5px", marginBottom: "20px" }}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              flex: 1,
              padding: "8px 16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: activeTab === i ? "#4CAF50" : "#fff",
              color: activeTab === i ? "#fff" : "#333",
              cursor: "pointer",
              fontWeight: activeTab === i ? "bold" : "normal",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px" }}>
        <ActiveComponent />
      </div>
    </div>
  );
}

export default App;
