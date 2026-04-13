// ============================================================
// Functions & Arrow Functions — playground
// Run: node 00-functions.js
// ============================================================

// --- 1. Regular function vs Arrow function ---
console.log("=== Regular vs Arrow ===");

function greet(name) {
  return `Hello ${name}`;
}

const greetArrow = (name) => {
  return `Hello ${name}`;
};

// Arrow with implicit return (no braces = auto return)
const greetShort = (name) => `Hello ${name}`;

console.log(greet("Anand"));       // Hello Anand
console.log(greetArrow("Anand"));  // Hello Anand
console.log(greetShort("Anand"));  // Hello Anand


// --- 2. No parameters ---
console.log("\n=== No Parameters ===");

const sayHi = () => "Hi!";
const getRandom = () => Math.floor(Math.random() * 100);
const getUser = () => ({ name: "Anand", age: 25 });  // wrap object in () for implicit return

console.log(sayHi());      // Hi!
console.log(getRandom());  // random number
console.log(getUser());    // { name: "Anand", age: 25 }


// --- 3. One parameter (parentheses optional) ---
console.log("\n=== One Parameter ===");

const double = x => x * 2;          // no () needed for single param
const shout = msg => msg.toUpperCase();
const isEven = n => n % 2 === 0;

console.log(double(5));      // 10
console.log(shout("hello")); // HELLO
console.log(isEven(4));      // true
console.log(isEven(7));      // false


// --- 4. Two parameters ---
console.log("\n=== Two Parameters ===");

const add = (a, b) => a + b;
const fullName = (first, last) => `${first} ${last}`;
const power = (base, exp) => base ** exp;

console.log(add(3, 4));            // 7
console.log(fullName("Anand", "K")); // Anand K
console.log(power(2, 8));          // 256


// --- 5. Object as parameter ---
console.log("\n=== Object as Parameter ===");

// Pass whole object
const describe = (person) => `${person.name} is ${person.age}`;

// Destructure in parameter — the React component pattern
const describeV2 = ({ name, age }) => `${name} is ${age}`;

// With defaults
const describeV3 = ({ name, age, city = "Unknown" }) => `${name}, ${age}, from ${city}`;

const user = { name: "Anand", age: 25 };
console.log(describe(user));     // Anand is 25
console.log(describeV2(user));   // Anand is 25
console.log(describeV3(user));   // Anand, 25, from Unknown


// --- 6. Function as parameter (callbacks) ---
console.log("\n=== Function as Parameter (Callbacks) ===");

// A function that takes another function
const doTwice = (fn) => {
  fn();
  fn();
};
doTwice(() => console.log("  hello!"));  // prints twice

// Function that takes a value AND a function
const transform = (value, fn) => fn(value);

console.log(transform(5, x => x * 3));        // 15
console.log(transform("hello", s => s.toUpperCase()));  // HELLO

// This is how Array methods work
const nums = [1, 2, 3, 4, 5];
console.log(nums.map(n => n * 2));       // [2, 4, 6, 8, 10]
console.log(nums.filter(n => n > 3));    // [4, 5]
console.log(nums.find(n => n === 3));    // 3
console.log(nums.some(n => n > 4));      // true
console.log(nums.every(n => n > 0));     // true


// --- 7. Function returning a function (closures) ---
console.log("\n=== Function Returning Function (Closures) ===");

// Basic closure
const multiplier = (factor) => (n) => n * factor;

const triple = multiplier(3);
const tenX = multiplier(10);

console.log(triple(5));  // 15
console.log(tenX(5));    // 50

// This is how setState works in React!
const createCounter = (initial) => {
  let count = initial;
  return {
    increment: () => { count += 1; return count; },
    decrement: () => { count -= 1; return count; },
    getCount: () => count,
  };
};

const counter = createCounter(0);
console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.decrement());  // 1
console.log(counter.getCount());   // 1


// --- 8. Spread in function parameters ---
console.log("\n=== Spread in Function Params ===");

// Rest params — collect remaining args into an array
const sum = (...nums) => nums.reduce((total, n) => total + n, 0);
console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// First param separate, rest collected
const log = (label, ...values) => console.log(`  [${label}]`, ...values);
log("info", "server started", "port 3000");  // [info] server started port 3000
log("error", "not found");                   // [error] not found

// Spread to pass array as individual args
const numbers = [10, 20, 30];
console.log(Math.max(...numbers));  // 30


// --- 9. React patterns — all together ---
console.log("\n=== React Patterns ===");

// Event handler: no params, calls something inside
const onClick = () => console.log("  clicked!");
onClick();

// Event handler with value: closure captures the value
const onClickItem = (id) => () => console.log(`  clicked item ${id}`);
onClickItem(42)();   // clicked item 42
onClickItem(99)();   // clicked item 99

// setState with functional update: function takes prev, returns next
const setState = (updater) => {
  const prevState = 10;
  const newState = typeof updater === "function" ? updater(prevState) : updater;
  console.log(`  ${prevState} → ${newState}`);
};
setState(20);              // 10 → 20 (direct value)
setState(prev => prev + 1); // 10 → 11 (functional update)

// Array.map to render a list — function receives each item
const todos = ["buy milk", "walk dog", "code"];
const rendered = todos.map((todo, index) => `  <li key=${index}>${todo}</li>`);
console.log(rendered.join("\n"));

// Filter + map chain
const users = [
  { name: "Anand", active: true },
  { name: "Raj", active: false },
  { name: "Priya", active: true },
];
const activeNames = users
  .filter(u => u.active)
  .map(u => u.name);
console.log(activeNames);  // ["Anand", "Priya"]
