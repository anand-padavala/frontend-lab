// ============================================================
// 02 — Arrays
// Run: npx ts-node 02-arrays.ts
// ============================================================

console.log("=== Arrays ===\n");

// Array of strings
let fruits: string[] = ["apple", "banana", "cherry"];

// Array of numbers
let scores: number[] = [90, 85, 92];

// Mixed? Use a union type
let mixed: (string | number)[] = ["hello", 42, "world", 100];

console.log(fruits);
console.log(scores);
console.log(mixed);

// fruits.push(123);       // Error: number is not assignable to string
fruits.push("mango");      // OK
console.log(fruits);
