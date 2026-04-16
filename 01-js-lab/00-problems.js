// ============================================================
// JavaScript Interview Problems
// Run: node 00-interview-problems.js
// ============================================================


// ************************************************************
// 1. FIZZBUZZ
// ************************************************************

console.log("=== 1. FizzBuzz ===\n");

// Print 1 to 20. For multiples of 3 print "Fizz",
// multiples of 5 print "Buzz", both print "FizzBuzz".

function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(i);
  }
  return result;
}

console.log(fizzBuzz(20).join(", "));
// 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, 16, 17, Fizz, 19, Buzz


// ************************************************************
// 2. REVERSE A STRING
// ************************************************************

console.log("\n=== 2. Reverse a String ===\n");

// Method 1: Built-in
function reverse1(str) {
  return str.split("").reverse().join("");
}

// Method 2: Loop
function reverse2(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

console.log(reverse1("hello"));    // "olleh"
console.log(reverse2("JavaScript")); // "tpircSavaJ"


// ************************************************************
// 3. PALINDROME CHECK
// ************************************************************

console.log("\n=== 3. Palindrome ===\n");

// A word/phrase that reads the same forwards and backwards

function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

console.log(isPalindrome("racecar"));     // true
console.log(isPalindrome("hello"));       // false
console.log(isPalindrome("A man a plan a canal Panama"));  // true
console.log(isPalindrome("Was it a car or a cat I saw"));  // true


// ************************************************************
// 4. ANAGRAM CHECK
// ************************************************************

console.log("\n=== 4. Anagram ===\n");

// Two words are anagrams if they use the same letters in different order

function isAnagram(a, b) {
  const sort = (s) => s.toLowerCase().replace(/\s/g, "").split("").sort().join("");
  return sort(a) === sort(b);
}

console.log(isAnagram("listen", "silent"));    // true
console.log(isAnagram("hello", "world"));      // false
console.log(isAnagram("Astronomer", "Moon starer")); // true


// ************************************************************
// 5. FIND DUPLICATES IN ARRAY
// ************************************************************

console.log("\n=== 5. Find Duplicates ===\n");

function findDuplicates(arr) {
  const seen = {};
  const duplicates = [];
  for (const item of arr) {
    if (seen[item]) duplicates.push(item);
    else seen[item] = true;
  }
  return duplicates;
}

console.log(findDuplicates([1, 2, 3, 2, 4, 3, 5]));   // [2, 3]
console.log(findDuplicates(["a", "b", "a", "c"]));     // ["a"]
console.log(findDuplicates([1, 2, 3]));                 // []


// ************************************************************
// 6. FLATTEN A NESTED ARRAY
// ************************************************************

console.log("\n=== 6. Flatten Array ===\n");

// [1, [2, [3, 4]], 5] → [1, 2, 3, 4, 5]

// Method 1: Built-in
console.log([1, [2, [3, 4]], 5].flat(Infinity));  // [1, 2, 3, 4, 5]

// Method 2: Recursive
function flatten(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) result.push(...flatten(item));
    else result.push(item);
  }
  return result;
}

console.log(flatten([1, [2, [3, [4]]], 5]));   // [1, 2, 3, 4, 5]


// ************************************************************
// 7. TWO SUM
// ************************************************************

console.log("\n=== 7. Two Sum ===\n");

// Find two numbers in array that add up to target.
// Return their indices.

function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
  return null;
}

console.log(twoSum([2, 7, 11, 15], 9));    // [0, 1]  (2 + 7 = 9)
console.log(twoSum([3, 2, 4], 6));          // [1, 2]  (2 + 4 = 6)
console.log(twoSum([1, 2, 3], 10));         // null


// ************************************************************
// 8. MOST FREQUENT CHARACTER
// ************************************************************

console.log("\n=== 8. Most Frequent Character ===\n");

function mostFrequent(str) {
  const count = {};
  for (const char of str) {
    if (char === " ") continue;
    count[char] = (count[char] || 0) + 1;
  }

  let maxChar = "";
  let maxCount = 0;
  for (const [char, c] of Object.entries(count)) {
    if (c > maxCount) {
      maxCount = c;
      maxChar = char;
    }
  }
  return { char: maxChar, count: maxCount };
}

console.log(mostFrequent("javascript"));    // { char: "a", count: 2 }
console.log(mostFrequent("aabbbcccc"));     // { char: "c", count: 4 }


// ************************************************************
// 9. FIBONACCI SEQUENCE
// ************************************************************

console.log("\n=== 9. Fibonacci ===\n");

// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ...
// Each number = sum of previous two

// Method 1: Loop
function fibonacci(n) {
  const seq = [0, 1];
  for (let i = 2; i < n; i++) {
    seq.push(seq[i - 1] + seq[i - 2]);
  }
  return seq;
}

console.log(fibonacci(10));
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// Method 2: Nth fibonacci number (recursive with memo)
function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

console.log(fib(10));   // 55
console.log(fib(20));   // 6765


// ************************************************************
// 10. REMOVE DUPLICATES FROM ARRAY
// ************************************************************

console.log("\n=== 10. Remove Duplicates ===\n");

// Method 1: Set
console.log([...new Set([1, 2, 2, 3, 3, 4])]);   // [1, 2, 3, 4]

// Method 2: Filter
function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

console.log(removeDuplicates([1, 2, 2, 3, 3, 4]));          // [1, 2, 3, 4]
console.log(removeDuplicates(["a", "b", "a", "c", "b"]));   // ["a", "b", "c"]


// ************************************************************
// 11. CHUNK AN ARRAY
// ************************************************************

console.log("\n=== 11. Chunk Array ===\n");

// Split array into groups of n
// [1,2,3,4,5], size 2 → [[1,2], [3,4], [5]]

function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

console.log(chunk([1, 2, 3, 4, 5], 2));      // [[1,2], [3,4], [5]]
console.log(chunk([1, 2, 3, 4, 5, 6], 3));   // [[1,2,3], [4,5,6]]


// ************************************************************
// 12. DEBOUNCE
// ************************************************************

console.log("\n=== 12. Debounce ===\n");

// Wait until user STOPS calling for X ms, then execute once.
// Used for: search input, window resize, scroll events.

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Example: won't log until 300ms after last call
const debouncedLog = debounce((msg) => console.log("Debounced:", msg), 300);
debouncedLog("a");   // cancelled
debouncedLog("b");   // cancelled
debouncedLog("c");   // this one fires after 300ms → "Debounced: c"


// ************************************************************
// 13. THROTTLE
// ************************************************************

console.log("=== 13. Throttle ===\n");

// Execute at most once every X ms. Ignores calls in between.
// Used for: scroll handler, button clicks, API calls.

function throttle(fn, limit) {
  let waiting = false;
  return function (...args) {
    if (!waiting) {
      fn(...args);
      waiting = true;
      setTimeout(() => { waiting = false; }, limit);
    }
  };
}

const throttledLog = throttle((msg) => console.log("Throttled:", msg), 1000);
throttledLog("first");    // fires immediately → "Throttled: first"
throttledLog("second");   // ignored (within 1000ms)
throttledLog("third");    // ignored


// ************************************************************
// 14. DEEP CLONE AN OBJECT
// ************************************************************

console.log("\n=== 14. Deep Clone ===\n");

// Shallow copy: nested objects still share references
const original = { a: 1, b: { c: 2 } };
const shallow = { ...original };
shallow.b.c = 99;
console.log(original.b.c);   // 99 — original changed too!

// Deep clone: completely independent copy
// Method 1: structuredClone (modern)
const original2 = { a: 1, b: { c: 2 } };
const deep = structuredClone(original2);
deep.b.c = 99;
console.log(original2.b.c);  // 2 — original unchanged

// Method 2: JSON (works for plain objects, no functions/dates)
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const obj = { name: "Anand", scores: [1, 2, 3] };
const cloned = deepClone(obj);
cloned.scores.push(4);
console.log(obj.scores);      // [1, 2, 3] — unchanged
console.log(cloned.scores);   // [1, 2, 3, 4]


// ************************************************************
// 15. PROMISE / ASYNC PATTERNS
// ************************************************************

console.log("\n=== 15. Promise Patterns ===\n");

// Simulate an API call
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: "User " + id }), 100);
  });
}

// Sequential — one after another
async function sequential() {
  const user1 = await fetchUser(1);
  const user2 = await fetchUser(2);
  console.log("Sequential:", user1.name, user2.name);
}

// Parallel — all at once (faster)
async function parallel() {
  const [user1, user2] = await Promise.all([fetchUser(1), fetchUser(2)]);
  console.log("Parallel:", user1.name, user2.name);
}

sequential();
parallel();


// ************************************************************
// 16. CURRY
// ************************************************************

console.log("\n=== 16. Curry ===\n");

// Transform f(a, b, c) into f(a)(b)(c)

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));      // 6
console.log(curriedAdd(1, 2)(3));      // 6
console.log(curriedAdd(1)(2, 3));      // 6
console.log(curriedAdd(1, 2, 3));      // 6


// ************************************************************
// 17. MEMOIZE
// ************************************************************

console.log("\n=== 17. Memoize ===\n");

// Cache function results — don't compute the same thing twice

function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      console.log(`  cache hit for (${args})`);
      return cache[key];
    }
    console.log(`  computing for (${args})`);
    cache[key] = fn(...args);
    return cache[key];
  };
}

const slowSquare = memoize((n) => n * n);
console.log(slowSquare(5));    // computing → 25
console.log(slowSquare(5));    // cache hit → 25
console.log(slowSquare(10));   // computing → 100
console.log(slowSquare(10));   // cache hit → 100


// ************************************************************
// 18. GROUP BY
// ************************************************************

console.log("\n=== 18. Group By ===\n");

function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    const value = item[key];
    groups[value] = groups[value] || [];
    groups[value].push(item);
    return groups;
  }, {});
}

const people = [
  { name: "Anand", city: "Hyderabad" },
  { name: "Ravi", city: "Bangalore" },
  { name: "Sita", city: "Hyderabad" },
  { name: "Kiran", city: "Bangalore" },
];

console.log(groupBy(people, "city"));
// { Hyderabad: [{Anand}, {Sita}], Bangalore: [{Ravi}, {Kiran}] }


// ************************************************************
// 19. INTERSECTION & DIFFERENCE OF ARRAYS
// ************************************************************

console.log("\n=== 19. Array Set Operations ===\n");

function intersection(a, b) {
  const setB = new Set(b);
  return a.filter(item => setB.has(item));
}

function difference(a, b) {
  const setB = new Set(b);
  return a.filter(item => !setB.has(item));
}

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 4, 5, 6, 7];

console.log("Intersection:", intersection(arr1, arr2));  // [3, 4, 5]
console.log("Difference:", difference(arr1, arr2));      // [1, 2]


// ************************************************************
// 20. EVENT EMITTER (mini pub/sub)
// ************************************************************

console.log("\n=== 20. Event Emitter ===\n");

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  }

  emit(event, ...args) {
    const callbacks = this.events[event] || [];
    callbacks.forEach(cb => cb(...args));
  }

  off(event, callback) {
    this.events[event] = (this.events[event] || []).filter(cb => cb !== callback);
  }
}

const emitter = new EventEmitter();

function onGreet(name) {
  console.log(`Hello, ${name}!`);
}

emitter.on("greet", onGreet);
emitter.emit("greet", "Anand");     // "Hello, Anand!"
emitter.emit("greet", "Ravi");      // "Hello, Ravi!"
emitter.off("greet", onGreet);
emitter.emit("greet", "Nobody");    // (nothing — listener removed)
