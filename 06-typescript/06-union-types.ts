// ============================================================
// 06 — Union Types (This OR That)
// Run: npx ts-node 06-union-types.ts
// ============================================================

console.log("=== Union Types ===\n");

// A variable that can be string OR number
let id: string | number;

id = "ABC-123";
console.log(id);     // ABC-123

id = 456;
console.log(id);     // 456

// id = true;        // Error: boolean is not assignable to string | number

// Useful in functions
function printId(id: string | number): void {
  if (typeof id === "string") {
    console.log("String ID:", id.toUpperCase());
  } else {
    console.log("Number ID:", id);
  }
}

printId("abc");    // String ID: ABC
printId(123);      // Number ID: 123
