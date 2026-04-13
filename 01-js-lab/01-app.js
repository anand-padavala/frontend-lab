// --- MAIN FILE ---
// This file IMPORTS from the two modules using require()

// Import everything from the math module
const math = require("./01-math-module");

// Import only specific functions using destructuring
const { capitalize, reverse, countWords } = require("./01-string-module");

// --- Using math module ---
console.log("=== Math Module ===\n");
console.log(`add(10, 5)      = ${math.add(10, 5)}`);
console.log(`subtract(10, 5) = ${math.subtract(10, 5)}`);
console.log(`multiply(10, 5) = ${math.multiply(10, 5)}`);
console.log(`divide(10, 5)   = ${math.divide(10, 5)}`);
console.log(`PI              = ${math.PI}`);

// validate() is private — this would fail:
// math.validate(1, 2);  // TypeError: math.validate is not a function

// --- Using string module ---
console.log("\n=== String Module ===\n");
console.log(`capitalize("hello")           = ${capitalize("hello")}`);
console.log(`reverse("hello")              = ${reverse("hello")}`);
console.log(`countWords("hello world foo") = ${countWords("hello world foo")}`);

// --- How require works ---
console.log("\n=== Module Info ===\n");
console.log("Current file:", __filename);
console.log("Current dir :", __dirname);
console.log("Module object:", module.id);
