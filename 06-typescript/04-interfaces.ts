// ============================================================
// 04 — Interfaces (Reusable object shapes)
// Run: npx ts-node 04-interfaces.ts
// ============================================================

console.log("=== Interfaces ===\n");

// Instead of writing the type inline every time, define an interface
interface User {
  name: string;
  age: number;
  email: string;
  phone?: string;          // ? means optional
}

let user1: User = {
  name: "Anand",
  age: 25,
  email: "anand@example.com",
};

let user2: User = {
  name: "Ravi",
  age: 30,
  email: "ravi@example.com",
  phone: "9876543210",       // optional, included here
};

console.log(user1);
console.log(user2);

// Reuse the interface for arrays
let users: User[] = [user1, user2];
console.log("Users count:", users.length);

export { User };
