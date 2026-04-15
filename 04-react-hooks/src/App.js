import { useState } from "react";
import Tab1_UseContext from "./hooks/useContext/Tab1_UseContext";
import Tab2_ChangeContext from "./hooks/useContext/Tab2_ChangeContext";
import Tab0_UIElements from "./hooks/Tab0_UIElements";
import Tab3_UseMemo from "./hooks/useMemo/Tab3_UseMemo";
import Tab4_UseCallback from "./hooks/useCallback/Tab4_UseCallback";
import Tab5_UseRef from "./hooks/useRef/Tab5_UseRef";
import Tab6_UseReducer from "./hooks/useReducer/Tab6_UseReducer";
import Tab7_UseEffect from "./hooks/useEffect/Tab7_UseEffect";

const tabs = [
  { label: "0. UI Elements", component: Tab0_UIElements },
  { label: "1. Hardcoded Context", component: Tab1_UseContext },
  { label: "2. Changing Context", component: Tab2_ChangeContext },
  { label: "3. useMemo", component: Tab3_UseMemo },
  { label: "4. useCallback", component: Tab4_UseCallback },
  { label: "5. useRef", component: Tab5_UseRef },
  { label: "6. useReducer", component: Tab6_UseReducer },
  { label: "7. useEffect", component: Tab7_UseEffect },
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
