// ============================================================
// 08 — Enums (Named constants)
// Run: npx ts-node 08-enums.ts
// ============================================================

console.log("=== Enums ===\n");

enum Direction {
  Up,        // 0
  Down,      // 1
  Left,      // 2
  Right,     // 3
}

let move: Direction = Direction.Up;
console.log(move);             // 0
console.log(Direction[0]);     // "Up"

// String enum
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

let fav: Color = Color.Green;
console.log(fav);              // "GREEN"
