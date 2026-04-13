import { useContext } from "react";
import ThemeContext from "./ThemeContext";

function ThemedBox() {
  const theme = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: "15px",
        borderRadius: "8px",
        backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
        color: theme === "dark" ? "#fff" : "#333",
        border: "1px solid #ccc",
      }}
    >
      Current theme: <strong>{theme}</strong>
    </div>
  );
}

export default ThemedBox;
