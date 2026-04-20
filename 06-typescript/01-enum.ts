// ============================================================
// Enums — JavaScript vs TypeScript
// Run: npx ts-node 01-enum.ts
// ============================================================


// --- JavaScript style (fake enum with plain object) ---

const DirectionJS = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
};

console.log("=== JavaScript style (plain object) ===");
console.log(DirectionJS.Up);      // 0
console.log(DirectionJS.Right);   // 3

let moveJS = DirectionJS.Up;
console.log(moveJS);              // 0

// No protection — this works even though 99 is not a valid direction
moveJS = 99;
console.log(moveJS);              // 99 — no error!


// --- TypeScript style (real enum) ---

enum DirectionTS {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right,   // 3
}

console.log("\n=== TypeScript style (real enum) ===");
console.log(DirectionTS.Up);      // 0
console.log(DirectionTS.Right);   // 3

let moveTS: DirectionTS = DirectionTS.UP;
console.log(moveTS);              // 0

// moveTS = 99;   // Error: Type '99' is not assignable to type 'DirectionTS'


// --- String enum (TypeScript only, no JavaScript equivalent) ---

enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

console.log("\n=== String enum (TypeScript only) ===");
console.log(Color.Red);     // "RED"
console.log(Color.Green);   // "GREEN"

let mycolor:Color

mycolor = Color.Red
