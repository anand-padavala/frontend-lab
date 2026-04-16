import { useState } from "react";
import Tab0_Sandbox from "./Tab0_Sandbox";
import Tab1_Components from "./Tab1_Components";
import Tab2_Props from "./Tab2_Props";
import Tab3_State from "./Tab3_State";
import Tab4_Events from "./Tab4_Events";
import Tab5_Conditional from "./Tab5_Conditional";
import Tab6_UseEffect from "./Tab6_UseEffect";
import Tab7_UseRef from "./Tab7_UseRef";
import Tab8_UseContext from "./Tab8_UseContext";
import Tab8_Only_UseContext from "./Tab8_Only_UseContext";
import Tab9_UserForm from "./Tab9_UserForm";
import Tab10_SimpleForm from "./Tab10_SimpleForm";

const tabs = [
  { label: "0. Sandbox", component: Tab0_Sandbox },
  { label: "1. Components", component: Tab1_Components },
  { label: "2. Props", component: Tab2_Props },
  { label: "3. State", component: Tab3_State },
  { label: "4. Events", component: Tab4_Events },
  { label: "5. Conditional", component: Tab5_Conditional },
  { label: "6. useEffect", component: Tab6_UseEffect },
  { label: "7. useRef", component: Tab7_UseRef },
  { label: "8. useContext", component: Tab8_UseContext },
  { label: "8b. Context Only", component: Tab8_Only_UseContext },
  { label: "9. User Form", component: Tab9_UserForm },
  { label: "10. Simple Form", component: Tab10_SimpleForm },
];

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveComponent = tabs[activeTab].component;

  return (
    <div style={{ fontFamily: "sans-serif", margin: "0 auto", padding: "20px" }}>
      <h1>React Learning Lab</h1>

      {/* Tab buttons */}
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
              fontWeight: activeTab === i ? "bold" : "normal"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px" }}>
        <ActiveComponent />
      </div>
    </div>
  );
}

export default App;
