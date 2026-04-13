// Arrays — ordered list of values

// --- 1. Creating arrays ---
const fruits = ["Apple", "Banana", "Mango"];
const numbers = [10, 20, 30, 40, 50];
const mixed = ["hello", 42, true, null, { name: "Anand" }];

console.log("=== 1. Basics ===\n");
console.log("fruits:", fruits);
console.log("length:", fruits.length);
console.log("first:", fruits[0]);
console.log("last:", fruits[fruits.length - 1]);

// --- 2. Adding & removing ---
console.log("\n=== 2. Add & Remove ===\n");

fruits.push("Orange");           // add to end
console.log("push:", fruits);

fruits.unshift("Grape");         // add to start
console.log("unshift:", fruits);

fruits.pop();                    // remove from end
console.log("pop:", fruits);

fruits.shift();                  // remove from start
console.log("shift:", fruits);

// --- 3. Finding items ---
console.log("\n=== 3. Finding ===\n");

console.log("indexOf Banana:", fruits.indexOf("Banana"));
console.log("includes Mango:", fruits.includes("Mango"));

const nums = [10, 20, 30, 40, 50];
console.log("find > 25:", nums.find(n => n > 25));
console.log("findIndex > 25:", nums.findIndex(n => n > 25));

// --- 4. map — transform every item ---
console.log("\n=== 4. map ===\n");

const doubled = nums.map(n => n * 2);
console.log("original:", nums);
console.log("doubled:", doubled);

const upper = fruits.map(f => f.toUpperCase());
console.log("uppercase:", upper);

// --- 5. filter — keep items that match ---
console.log("\n=== 5. filter ===\n");

const big = nums.filter(n => n > 25);
console.log("nums > 25:", big);

const longNames = fruits.filter(f => f.length > 5);
console.log("names longer than 5:", longNames);

// --- 6. reduce — combine into one value ---
console.log("\n=== 6. reduce ===\n");

const sum = nums.reduce((total, n) => total + n, 0);
console.log("sum:", sum);

const max = nums.reduce((biggest, n) => n > biggest ? n : biggest, nums[0]);
console.log("max:", max);

// --- 7. Sorting ---
console.log("\n=== 7. sort ===\n");

const names = ["Sara", "Anand", "John", "Alex"];
console.log("alphabetical:", [...names].sort());
console.log("reverse:", [...names].sort().reverse());
console.log("numbers asc:", [...nums].sort((a, b) => a - b));
console.log("numbers desc:", [...nums].sort((a, b) => b - a));

// --- 8. Slice & Splice ---
console.log("\n=== 8. slice & splice ===\n");

const arr = [10, 20, 30, 40, 50];

// slice — copies a portion (does NOT modify original)
console.log("slice(1, 3):", arr.slice(1, 3));   // [20, 30]
console.log("original:", arr);                   // unchanged

// splice — removes/inserts (MODIFIES original)
const removed = arr.splice(1, 2);               // remove 2 items at index 1
console.log("splice removed:", removed);         // [20, 30]
console.log("after splice:", arr);               // [10, 40, 50]

// --- 9. Spread & Destructuring ---
console.log("\n=== 9. Spread & Destructuring ===\n");

const a = [1, 2, 3];
const b = [4, 5, 6];
const combined = [...a, ...b];
console.log("spread:", combined);

const [first, second, ...rest] = combined;
console.log("first:", first);
console.log("second:", second);
console.log("rest:", rest);

// --- 10. forEach — loop through items ---
console.log("\n=== 10. forEach ===\n");

["Apple", "Banana", "Mango"].forEach((fruit, index) => {
  console.log(`  ${index}: ${fruit}`);
});

// --- 11. Chaining methods ---
console.log("\n=== 11. Chaining ===\n");

const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  .filter(n => n % 2 === 0)     // keep even: [2, 4, 6, 8, 10]
  .map(n => n * 10)              // multiply: [20, 40, 60, 80, 100]
  .reduce((sum, n) => sum + n, 0); // sum: 300

console.log("filter → map → reduce:", result);
