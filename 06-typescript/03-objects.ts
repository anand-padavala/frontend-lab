// ============================================================
// 03 — Objects
// Run: npx ts-node 03-objects.ts
// ============================================================

console.log("=== Objects ===\n");

// Define the shape of an object inline
let user: { name: string; age: number; email: string } = {
  name: "Anand",
  age: 25,
  email: "anand@example.com",
};

console.log(user);

// user.age = "twenty";    // Error: string is not assignable to number
// user.phone = "123";     // Error: 'phone' does not exist on this type
