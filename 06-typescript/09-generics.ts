// ============================================================
// 09 — Generics (Reusable types)
// Run: npx ts-node 09-generics.ts
// ============================================================

console.log("=== Generics ===\n");

// A function that works with ANY type
function firstItem<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(firstItem([10, 20, 30]));           // 10 (number)
console.log(firstItem(["a", "b", "c"]));        // "a" (string)
console.log(firstItem([true, false]));           // true (boolean)

// Generic interface
interface User {
  name: string;
  age: number;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

let userResponse: ApiResponse<User> = {
  data: { name: "Anand", age: 25, email: "anand@example.com" },
  success: true,
  message: "User fetched",
};

let numberResponse: ApiResponse<number[]> = {
  data: [1, 2, 3],
  success: true,
  message: "Numbers fetched",
};

console.log(userResponse);
console.log(numberResponse);
