// All array methods using a simple numbers array

const nums = [10, 20, 30, 40, 50];
console.log("Original:", nums);

// --- ADDING ITEMS ---
console.log("\n=== Adding Items ===\n");

nums.push(60);                  // add to end
console.log("push(60):", nums);  // [10,20,30,40,50,60]

nums.unshift(5);                // add to start
console.log("unshift(5):", nums); // [5,10,20,30,40,50,60]

// Reset
const arr = [10, 20, 30, 40, 50];

// --- REMOVING ITEMS ---
console.log("\n=== Removing Items ===\n");

let a = [...arr];
console.log("pop():", a.pop(), "→", a);        // removes 50 from end

a = [...arr];
console.log("shift():", a.shift(), "→", a);    // removes 10 from start

a = [...arr];
a.splice(2, 1);                                 // remove 1 item at index 2
console.log("splice(2,1):", a);                 // [10,20,40,50] — removed 30

// --- FINDING ITEMS ---
console.log("\n=== Finding Items ===\n");

console.log("indexOf(30):", arr.indexOf(30));       // 2
console.log("indexOf(99):", arr.indexOf(99));       // -1 (not found)
console.log("includes(30):", arr.includes(30));     // true
console.log("includes(99):", arr.includes(99));     // false
console.log("find(>25):", arr.find(n => n > 25));           // 30 (first match)
console.log("findIndex(>25):", arr.findIndex(n => n > 25)); // 2
console.log("findLast(>25):", arr.findLast(n => n > 25));   // 50 (last match)

// --- CHECKING CONDITIONS ---
console.log("\n=== Checking ===\n");

console.log("every(>5):", arr.every(n => n > 5));     // true — ALL > 5?
console.log("every(>15):", arr.every(n => n > 15));   // false — not all > 15
console.log("some(>45):", arr.some(n => n > 45));     // true — ANY > 45?
console.log("some(>99):", arr.some(n => n > 99));     // false — none > 99

// --- TRANSFORMING ---
console.log("\n=== Transforming ===\n");

console.log("map(n*2):", arr.map(n => n * 2));          // [20,40,60,80,100]
console.log("filter(>25):", arr.filter(n => n > 25));   // [30,40,50]
console.log("reduce(sum):", arr.reduce((sum, n) => sum + n, 0));  // 150
console.log("flat:", [1, [2, 3], [4, [5]]].flat(2));    // [1,2,3,4,5]
console.log("flatMap:", arr.flatMap(n => [n, n * 10])); // [10,100,20,200...]

// --- SORTING ---
console.log("\n=== Sorting ===\n");

console.log("sort asc:", [...arr].sort((a, b) => a - b));  // [10,20,30,40,50]
console.log("sort desc:", [...arr].sort((a, b) => b - a)); // [50,40,30,20,10]
console.log("reverse:", [...arr].reverse());                // [50,40,30,20,10]

// --- SLICING & SPLICING ---
console.log("\n=== Slicing ===\n");

console.log("slice(1,3):", arr.slice(1, 3));   // [20,30] — index 1 to 3 (not included)
console.log("slice(2):", arr.slice(2));         // [30,40,50] — index 2 to end
console.log("slice(-2):", arr.slice(-2));       // [40,50] — last 2

a = [...arr];
a.splice(2, 0, 25);                             // insert 25 at index 2
console.log("splice insert:", a);               // [10,20,25,30,40,50]

a = [...arr];
a.splice(1, 2, 99, 88);                         // replace 2 items at index 1
console.log("splice replace:", a);              // [10,99,88,40,50]

// --- JOINING & SPLITTING ---
console.log("\n=== Join & Split ===\n");

console.log("join('-'):", arr.join("-"));            // "10-20-30-40-50"
console.log("join(' '):", arr.join(" "));            // "10 20 30 40 50"
console.log("toString:", arr.toString());            // "10,20,30,40,50"
console.log("split:", "10-20-30".split("-"));        // ["10","20","30"] — string to array

// --- COPYING ---
console.log("\n=== Copying ===\n");

const copy1 = [...arr];            // spread
const copy2 = arr.slice();         // slice
const copy3 = Array.from(arr);     // Array.from

console.log("spread:", copy1);
console.log("slice:", copy2);
console.log("Array.from:", copy3);

// --- CREATING ARRAYS ---
console.log("\n=== Creating ===\n");

console.log("Array(5).fill(0):", Array(5).fill(0));           // [0,0,0,0,0]
console.log("Array.from({length:5}):", Array.from({length: 5}, (_, i) => i + 1)); // [1,2,3,4,5]
console.log("Array.of(1,2,3):", Array.of(1, 2, 3));           // [1,2,3]

// --- LOOPING ---
console.log("\n=== Looping ===\n");

// forEach
console.log("forEach:");
arr.forEach((n, i) => console.log(`  [${i}] = ${n}`));

// for...of
console.log("for...of:");
for (const n of arr) {
  console.log(`  ${n}`);
}

// entries — index + value
console.log("entries:");
for (const [i, n] of arr.entries()) {
  console.log(`  [${i}] = ${n}`);
}

// keys
console.log("keys:", [...arr.keys()]);       // [0,1,2,3,4]
console.log("values:", [...arr.values()]);   // [10,20,30,40,50]

// --- COMBINING ARRAYS ---
console.log("\n=== Combining ===\n");

const x = [1, 2, 3];
const y = [4, 5, 6];

console.log("spread:", [...x, ...y]);          // [1,2,3,4,5,6]
console.log("concat:", x.concat(y));           // [1,2,3,4,5,6]

// --- SUMMARY ---
console.log("\n=== Quick Reference ===\n");
console.log("Add:       push, unshift, splice");
console.log("Remove:    pop, shift, splice");
console.log("Find:      indexOf, includes, find, findIndex");
console.log("Check:     every, some");
console.log("Transform: map, filter, reduce, flat, flatMap");
console.log("Sort:      sort, reverse");
console.log("Slice:     slice, splice");
console.log("Loop:      forEach, for...of, entries");
console.log("Copy:      spread, slice(), Array.from");
console.log("Join:      join, toString");
console.log("Create:    Array.of, Array.from, fill");
