// ============================================================
// Spread & Destructuring — playground
// Run: node 00-spread-destructure.js
// ============================================================

// --- 1. Spread with arrays ---
console.log("=== Array Spread ===");

const fruits = ["apple", "banana"];

fruits = ["orange"]

const moreFruits = ["...fruits", "mango"];
console.log(moreFruits);  // ["apple", "banana", "mango"]

// Add to beginning
const withGrape = ["grape", ...fruits];
console.log(withGrape);  // ["grape", "apple", "banana"]

// Combine two arrays
const vegs = ["carrot", "peas"];
const all = [...fruits.at.apply., ...vegs];
console.log(all);  // ["apple", "banana", "carrot", "peas"]

// Copy an array (not the same reference)
const copy = [...fruits];
console.log(copy === fruits);  // false — different array

// Remove last item (without mutating)
const withoutLast = fruits.slice(0, -1);
console.log(withoutLast);  // ["apple"]
console.log(fruits);       // ["apple", "banana"] — unchanged!


// --- 2. Spread with objects ---
console.log("\n=== Object Spread ===");

const user = { name : "Anand", age: 25, role: "dev" };

// Copy and override one field
const older = { name : "Anand", role: "dev", age: 26 };
console.log(older);  // { name: "Anand", age: 26, role: "dev" }

// Add a new field
const withEmail = { ...user, email: "anand@test.com" };
console.log(withEmail);  // { name: "Anand", age: 25, role: "dev", email: "anand@test.com" }

// Merge two objects
const address = { city: "Chennai", country: "India" };
const full = { ...user, ...address };
console.log(full);  // { name: "Anand", age: 25, role: "dev", city: "Chennai", country: "India" }

// Last one wins
const conflict = { ...user, name: "Raj", age: 30 };
console.log(conflict);  // { name: "Raj", age: 30, role: "dev" }


// --- 3. Destructuring arrays ---
console.log("\n=== Array Destructuring ===");

const colors = ["red", "green", "blue"];

const [first, second, third] = colors;

console.log(first, second, third);  // red green blue

// Skip items
const [, , lastColor] = colors;
console.log(lastColor);  // blue

// Rest pattern — grab remaining items
const [head, ...rest] = colors;
console.log(head);  // red
console.log(rest);  // ["green", "blue"]

// This is how useState works!
const [value, setValue] = [0, (v) => console.log(`setting ${v}`)];
console.log(value);   // 0
setValue(5);           // "setting 5"


// --- 4. Destructuring objects ---
console.log("\n=== Object Destructuring ===");

const person = { name: "Anand", age: 25, city: "Chennai"};

const { name, age } = person;
console.log(name, age);  // Anand 25

// Rename while destructuring
const { name: userName, city: location } = person;


console.log(userName, location);  // Anand Chennai

// Default values
const { name: n, phone = "N/A" } = person;
console.log(n, phone);  // Anand N/A

// Rest pattern with objects
const { city: c, ...remaining } = person;
console.log(c);          // Chennai
console.log(remaining);  // { name: "Anand", age: 25 }


// --- 5. Nested spread (common in React state) ---
console.log("\n=== Nested Spread (React pattern) ===");

const state = {
  user: { name: "Anand", age: 25 },
  todos: ["buy milk", "walk dog"],
  count: 0,
};

// Update nested field — must spread at each level
const newState = {
  ...state,
  user: { ...state.user, age: 26 },
  todos: [...state.todos, "write code"],
  count: state.count + 1,
};

console.log("old:", state);
console.log("new:", newState);
console.log("same?", state === newState);              // false
console.log("user same?", state.user === newState.user);  // false


// --- 6. Function params destructuring ---
console.log("\n=== Function Params ===");

// This is how React components receive props
function Greeting({ name, age }) {
  return `Hello ${name}, age ${age}`;
}
console.log(Greeting({ name: "Anand", age: 25 }));

// With defaults
function Config({ theme = "light", lang = "en" }) {
  return `${theme} / ${lang}`;
}
console.log(Config({ theme: "dark" }));  // dark / en
console.log(Config({}));                 // light / en
