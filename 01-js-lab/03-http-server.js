const http = require("http");

// Sample data
const users = [
  { id: 1, name: "Anand", role: "admin" },
  { id: 2, name: "John", role: "guest" },
  { id: 3, name: "Sara", role: "editor" },
];

// Create a server
const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log(`${method} ${url}`);

  // Route: Home
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome to Node.js Server</h1><p>Try /api/users</p>");
    return;
  }

  // Route: Get all users (JSON API)
  if (url === "/api/users" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
    return;
  }

  // Route: Get single user by id
  if (url.startsWith("/api/users/") && method === "GET") {
    const id = parseInt(url.split("/")[3]);
    const user = users.find((u) => u.id === id);

    if (user) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
    }
    return;
  }

  // Route: Not found
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

// Start listening
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Press Ctrl+C to stop\n");
  console.log("Try these URLs in your browser:");
  console.log(`  http://localhost:${PORT}/`);
  console.log(`  http://localhost:${PORT}/api/users`);
  console.log(`  http://localhost:${PORT}/api/users/1`);
  console.log(`  http://localhost:${PORT}/api/users/99  (not found)`);
});
