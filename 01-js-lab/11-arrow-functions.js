// Arrow Functions — shorter way to write functions

// --- 1. Regular vs Arrow ---
console.log("=== 1. Regular vs Arrow ===\n");

// Regular function
function addRegular(a, b) {
  return a + b;
}

// Arrow function
const addArrow = (a, b) => {
  return a + b;
};

// Arrow — short form (one expression, auto returns)
const addShort = (a, b) => a + b;

console.log("regular:", addRegular(2, 3));
console.log("arrow:", addArrow(2, 3));
console.log("short:", addShort(2, 3));

// --- 2. Parameter variations ---
console.log("\n=== 2. Parameters ===\n");

// No parameters — need ()
const sayHello = () => "Hello!";

// One parameter — () optional
const double = n => n * 2;
const doubleParen = (n) => n * 2;    // same thing with ()

// Multiple parameters — need ()
const add = (a, b) => a + b;

// Default parameters
const greet = (name = "Guest") => `Hello, ${name}!`;

// Rest parameters
const sum = (...nums) => nums.reduce((a, b) => a + b, 0);

console.log("no params:", sayHello());
console.log("one param:", double(5));
console.log("two params:", add(3, 4));
console.log("default:", greet());
console.log("default:", greet("Anand"));
console.log("rest:", sum(1, 2, 3, 4, 5));

// --- 3. Return variations ---
console.log("\n=== 3. Returns ===\n");

// Single expression — auto return (no { } needed)
const square = n => n * n;

// Multiple lines — need { } and explicit return
const calculate = (a, b) => {
  const sum = a + b;
  const product = a * b;
  return { sum, product };
};

// Returning an object — wrap in ( )
const makeUser = (name, age) => ({ name, age });
// Without ( ), { } would be treated as function body, not object

console.log("square:", square(4));
console.log("calculate:", calculate(3, 4));
console.log("makeUser:", makeUser("Anand", 25));

// --- 4. Arrow functions with arrays ---
console.log("\n=== 4. With Arrays ===\n");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map
const doubled = numbers.map(n => n * 2);
console.log("map:", doubled);

// filter
const evens = numbers.filter(n => n % 2 === 0);
console.log("filter:", evens);

// find
const firstBig = numbers.find(n => n > 7);
console.log("find:", firstBig);

// reduce
const total = numbers.reduce((sum, n) => sum + n, 0);
console.log("reduce:", total);

// sort
const desc = [...numbers].sort((a, b) => b - a);
console.log("sort desc:", desc);

// every — are ALL items true?
const allPositive = numbers.every(n => n > 0);
console.log("every > 0:", allPositive);

// some — is ANY item true?
const hasEven = numbers.some(n => n % 2 === 0);
console.log("some even:", hasEven);

// forEach
console.log("forEach:");
[10, 20, 30].forEach((n, i) => console.log(`  [${i}] = ${n}`));

// --- 5. Arrow functions with objects ---
console.log("\n=== 5. With Objects ===\n");

const users = [
  { name: "Anand", age: 25 },
  { name: "John", age: 30 },
  { name: "Sara", age: 22 },
];

const names = users.map(u => u.name);
console.log("names:", names);

const older = users.filter(u => u.age > 24);
console.log("age > 24:", older);

const youngest = users.reduce((min, u) => u.age < min.age ? u : min);
console.log("youngest:", youngest);

// Destructuring in arrow parameters
const greetUsers = users.map(({ name, age }) => `${name} is ${age}`);
console.log("destructured:", greetUsers);

// --- 6. Returning functions (closures) ---
console.log("\n=== 6. Returning Functions ===\n");

// A function that returns a function
const multiplier = factor => num => num * factor;

const triple = multiplier(3);
const tenTimes = multiplier(10);

console.log("triple(5):", triple(5));      // 15
console.log("tenTimes(5):", tenTimes(5));  // 50

// Same thing expanded:
// const multiplier = (factor) => {
//   return (num) => {
//     return num * factor;
//   };
// };

// --- 7. Immediately called arrow function ---
console.log("\n=== 7. IIFE ===\n");

const result = (() => {
  const x = 10;
  const y = 20;
  return x + y;
})();

console.log("IIFE result:", result);

// --- 8. Chaining with arrows ---
console.log("\n=== 8. Chaining ===\n");

const sentence = [" hello ", " WORLD ", " JavaScript "]
  .map(s => s.trim())
  .map(s => s.toLowerCase())
  .map(s => s.charAt(0).toUpperCase() + s.slice(1))
  .join(" ");

console.log("chained:", sentence);
