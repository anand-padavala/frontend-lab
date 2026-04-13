// Higher-order functions — functions that take or return functions

// --- 1. Regular vs Higher-order ---
console.log("=== 1. Regular vs Higher-order ===\n");

// Regular function — takes DATA
function add(a, b) {
  return a + b;
}
console.log("regular:", add(2, 3));

// Higher-order function — takes a FUNCTION
function doMath(a, b, operation) {
  return operation(a, b);
}
console.log("higher-order:", doMath(2, 3, add));
console.log("higher-order:", doMath(2, 3, (a, b) => a * b));
console.log("higher-order:", doMath(2, 3, (a, b) => a - b));

// --- 2. Writing your own map ---
console.log("\n=== 2. Custom map ===\n");

// This is what Array.map does internally
function myMap(arr, transformFn) {
  const result = [];
  for (const item of arr) {
    result.push(transformFn(item));
  }
  return result;
}

console.log("double:", myMap([1, 2, 3], n => n * 2));
console.log("square:", myMap([1, 2, 3], n => n * n));
console.log("string:", myMap([1, 2, 3], n => "Item " + n));

// Compare with built-in
console.log("built-in:", [1, 2, 3].map(n => n * 2));

// --- 3. Writing your own filter ---
console.log("\n=== 3. Custom filter ===\n");

function myFilter(arr, testFn) {
  const result = [];
  for (const item of arr) {
    if (testFn(item)) {
      result.push(item);
    }
  }
  return result;
}

console.log("even:", myFilter([1, 2, 3, 4, 5], n => n % 2 === 0));
console.log("> 3:", myFilter([1, 2, 3, 4, 5], n => n > 3));

// --- 4. Writing your own reduce ---
console.log("\n=== 4. Custom reduce ===\n");

function myReduce(arr, combineFn, initial) {
  let result = initial;
  for (const item of arr) {
    result = combineFn(result, item);
  }
  return result;
}

console.log("sum:", myReduce([1, 2, 3, 4, 5], (sum, n) => sum + n, 0));
console.log("max:", myReduce([1, 2, 3, 4, 5], (max, n) => n > max ? n : max, 0));

// --- 5. Writing your own forEach ---
console.log("\n=== 5. Custom forEach ===\n");

function myForEach(arr, actionFn) {
  for (const item of arr) {
    actionFn(item);
  }
}

myForEach(["Apple", "Banana", "Mango"], item => console.log("  fruit:", item));

// --- 6. Functions that RETURN functions ---
console.log("\n=== 6. Returning Functions ===\n");

// A function that creates other functions
function createMultiplier(factor) {
  return function (num) {
    return num * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const tenTimes = createMultiplier(10);

console.log("double(5):", double(5));       // 10
console.log("triple(5):", triple(5));       // 15
console.log("tenTimes(5):", tenTimes(5));   // 50

// --- 7. Function that creates a greeter ---
console.log("\n=== 7. Greeter Factory ===\n");

function createGreeter(greeting) {
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}

const hello = createGreeter("Hello");
const namaste = createGreeter("Namaste");
const hey = createGreeter("Hey");

console.log(hello("Anand"));      // Hello, Anand!
console.log(namaste("Anand"));    // Namaste, Anand!
console.log(hey("John"));         // Hey, John!

// --- 8. Function that adds validation ---
console.log("\n=== 8. Adding Behavior ===\n");

function withLogging(fn) {
  return function (...args) {
    console.log(`  calling ${fn.name} with args:`, args);
    const result = fn(...args);
    console.log(`  result:`, result);
    return result;
  };
}

function multiply(a, b) {
  return a * b;
}

const loggedMultiply = withLogging(multiply);
loggedMultiply(3, 4);
loggedMultiply(5, 6);

// --- 9. Practical: repeat, delay, retry ---
console.log("\n=== 9. Practical Examples ===\n");

// Repeat a function n times
function repeat(n, fn) {
  for (let i = 0; i < n; i++) {
    fn(i);
  }
}

repeat(3, i => console.log(`  repeat ${i}`));

// Run function only once
function once(fn) {
  let called = false;
  return function (...args) {
    if (!called) {
      called = true;
      return fn(...args);
    }
    return "Already called!";
  };
}

const initialize = once(() => "Initialized!");
console.log(initialize());   // Initialized!
console.log(initialize());   // Already called!
console.log(initialize());   // Already called!

// --- 10. Chaining higher-order functions ---
console.log("\n=== 10. Chaining ===\n");

const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  .filter(n => n % 2 === 0)         // keep even: [2,4,6,8,10]
  .map(n => n * n)                   // square: [4,16,36,64,100]
  .reduce((sum, n) => sum + n, 0);   // sum: 220

console.log("filter → map → reduce:", result);

// --- Summary ---
console.log("\n=== Summary ===\n");
console.log("Higher-order function = takes a function OR returns a function");
console.log("");
console.log("Takes a function:     map, filter, reduce, forEach, sort, setTimeout");
console.log("Returns a function:   createMultiplier, createGreeter, withLogging, once");
console.log("Both:                 a function that takes fn and returns new fn (withLogging)");
