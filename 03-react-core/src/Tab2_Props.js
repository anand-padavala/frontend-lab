// Tab 2: Props — passing data to components

function UserCard({ name, role, isOnline, text, children }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "10px",
      margin: "8px 0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <strong>{name}</strong> — {role} - {text}
      </div>
      <span>{isOnline ? "🟢 Online" : "⚪ Offline"}</span>
    </div>
  );
}

function Alert({ type, children }) {
  const colors = {
    success: { bg: "#d4edda", color: "#155724" },
    error: { bg: "#f8d7da", color: "#721c24" },
    info: { bg: "#d1ecf1", color: "#0c5460" },
  };
  const s = colors[type] || colors.info;

  return (
    <div style={{ backgroundColor: s.bg, color: s.color, padding: "12px", borderRadius: "6px", margin: "8px 0" }}>
      {children}
    </div>
  );
}

function Tab2_Props() {
  const users = [
    { name: "Anand", role: "Admin", isOnline: true },
    { name: "John", role: "Developer", isOnline: true },
    { name: "Sara", role: "Designer", isOnline: false },
  ];

  return (
    <div>
      <h2>Props</h2>
      <p>Props pass data from parent to child — like function arguments.</p>

      <h3>Alert Component (with children prop)</h3>
      <Alert type="success">This is a success alert</Alert>
      <Alert type="error">This is an error alert</Alert>
      <Alert type="info">
        <strong>Children prop</strong> — anything between tags becomes children
      </Alert>

      <h3>User Cards (with multiple props)</h3>
      {users.map((user, i) => (
        <UserCard key={i} name={user.name} role={user.role} isOnline={user.isOnline} />
      ))}

      <h3>Spread Props</h3>
      <UserCard {...users[0]} text="sss">Test</UserCard>
    </div>
  );
}

export default Tab2_Props;
