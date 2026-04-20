// ============================================================
// JavaScript vs TypeScript — Simple Variables
// Run: npx ts-node 00-js-vs-ts.ts
// ============================================================

// --- JavaScript style (no types) ---
// TypeScript allows this — it infers the type automatically

let name1 = "Anand";
let age1 = 25;
let active1 = true;
const pi1 = 3.14;

console.log("=== JavaScript style (type inferred) ===");
console.log(name1, age1, active1, pi1);

// --- TypeScript style (explicit types) ---

let name2: string = "Anand";
let age2: number = 25;
let active2: boolean = true;
const pi2: number = 3.14;

console.log("\n=== TypeScript style (explicit types) ===");
console.log(name2, age2, active2, pi2);
