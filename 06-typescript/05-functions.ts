// ============================================================
// 05 — Functions
// Run: npx ts-node 05-functions.ts
// ============================================================

console.log("=== Functions ===\n");

// Type the parameters AND the return value
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3));       // 5
// add("2", 3);               // Error: string is not assignable to number

// Function with optional parameter
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

console.log(greet("Anand"));              // Hello, Anand!
console.log(greet("Anand", "Welcome"));   // Welcome, Anand!

// Function with default parameter
interface User {
  name: string;
  age: number;
  email: string;
}

function createUser(name: string, role: string = "viewer"): User {
  return { name, age: 0, email: `${name.toLowerCase()}@example.com` };
}

console.log(createUser("Sita"));
console.log(createUser("Kiran", "admin"));

// Arrow function with types
const multiply = (a: number, b: number): number => a * b;
console.log(multiply(4, 5));   // 20

// Function that returns nothing
function logMessage(msg: string): void {
  console.log("LOG:", msg);
}

logMessage("TypeScript is working!");
