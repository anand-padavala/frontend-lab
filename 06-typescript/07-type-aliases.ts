// ============================================================
// 07 — Type Aliases (Name your own types)
// Run: npx ts-node 07-type-aliases.ts
// ============================================================

console.log("=== Type Aliases ===\n");

// Like interface, but for any type (not just objects)
type ID = string | number;
type Status = "active" | "inactive" | "pending";   // literal types

let userId: ID = "ABC-123";
let status: Status = "active";

// status = "deleted";    // Error: "deleted" is not assignable to "active" | "inactive" | "pending"

console.log(userId, status);

// Type alias for objects (alternative to interface)
type Product = {
  name: string;
  price: number;
  inStock: boolean;
};

let item: Product = { name: "Laptop", price: 999, inStock: true };
console.log(item);
