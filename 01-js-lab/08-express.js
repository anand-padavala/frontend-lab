const express = require("express");
const app = express();

// Middleware: parse JSON request bodies
app.use(express.json());

// --- Sample data (in-memory database) ---
let users = [
  { id: 1, name: "Anand", role: "admin" },
  { id: 2, name: "John", role: "guest" },
  { id: 3, name: "Sara", role: "editor" },
];
let nextId = 4;

// --- 1. Middleware ---
// Runs before every request — great for logging, auth, etc.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // pass to next handler
});

// --- 2. GET — read all users ---
app.get("/api/users", (req, res) => {
  res.json(users);
});

// --- 3. GET — read single user by id ---
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// --- 4. POST — create a new user ---
app.post("/api/users", (req, res) => {
  const { name, role } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const user = { id: nextId++, name, role: role || "guest" };
  users.push(user);
  res.status(201).json(user);
});

// --- 5. PUT — update a user ---
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });

  const { name, role } = req.body;
  if (name) user.name = name;
  if (role) user.role = role;
  res.json(user);
});

// --- 6. DELETE — remove a user ---
app.delete("/api/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "User not found" });

  const deleted = users.splice(index, 1)[0];
  res.json({ message: "Deleted", user: deleted });
});

// --- 7. Query parameters ---
// GET /api/search?role=admin
app.get("/api/search", (req, res) => {
  const { role } = req.query;
  if (!role) return res.json(users);
  const filtered = users.filter((u) => u.role === role);
  res.json(filtered);
});

// --- Start server ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}\n`);
  console.log("Try these commands in another terminal:\n");
  console.log('  GET all users     : curl http://localhost:3000/api/users');
  console.log('  GET one user      : curl http://localhost:3000/api/users/1');
  console.log('  POST new user     : curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d "{\\"name\\":\\"Alex\\"}"');
  console.log('  PUT update user   : curl -X PUT http://localhost:3000/api/users/1 -H "Content-Type: application/json" -d "{\\"role\\":\\"superadmin\\"}"');
  console.log('  DELETE user       : curl -X DELETE http://localhost:3000/api/users/2');
  console.log('  Search by role    : curl http://localhost:3000/api/search?role=admin');
  console.log("\nPress Ctrl+C to stop");
});
