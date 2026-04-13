const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "demo-files", "async-test.txt");
const dir = path.join(__dirname, "demo-files");

// --- 1. Callbacks (the old way) ---
console.log("=== 1. Callbacks ===\n");

// Problem: nested callbacks become hard to read ("callback hell")
// fs.mkdir(dir, () => {
//   fs.writeFile(filePath, "hello", () => {
//     fs.readFile(filePath, "utf-8", (err, data) => {
//       fs.unlink(filePath, () => {
//         fs.rmdir(dir, () => {
//           console.log("done!");
//         });
//       });
//     });
//   });
// });
console.log("(see commented code for callback hell example)\n");

// --- 2. Promises (the better way) ---
console.log("=== 2. Promises ===\n");

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Waited ${ms}ms`), ms);
  });
}

// Promise with .then() chaining
wait(500)
  .then((result) => {
    console.log("Promise result:", result);
    return wait(300);
  })
  .then((result) => {
    console.log("Chained result:", result);
  });

// --- 3. Promise states ---
// A promise is always in one of 3 states:
//   PENDING   → still working
//   FULFILLED → done successfully (resolve was called)
//   REJECTED  → failed (reject was called)

function divide(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) reject(new Error("Cannot divide by zero"));
    else resolve(a / b);
  });
}

divide(10, 2)
  .then((result) => console.log("10 / 2 =", result))
  .catch((err) => console.log("Error:", err.message));

divide(10, 0)
  .then((result) => console.log("10 / 0 =", result))
  .catch((err) => console.log("10 / 0 → Error:", err.message));

// --- 4. Async/Await (the cleanest way) ---
// async/await is just a cleaner syntax for promises

async function demo() {
  console.log("\n=== 4. Async/Await ===\n");

  // await pauses until the promise resolves
  const result1 = await wait(400);
  console.log("await result:", result1);

  const result2 = await wait(200);
  console.log("await result:", result2);

  // Error handling with try/catch
  try {
    await divide(10, 0);
  } catch (err) {
    console.log("Caught error:", err.message);
  }

  // --- 5. Async file operations ---
  console.log("\n=== 5. Async File Operations ===\n");

  const fsp = require("fs").promises; // async version of fs

  if (!fs.existsSync(dir)) await fsp.mkdir(dir);
  await fsp.writeFile(filePath, "Hello from async/await!");
  const content = await fsp.readFile(filePath, "utf-8");
  console.log("File content:", content);
  await fsp.unlink(filePath);
  await fsp.rmdir(dir);
  console.log("Cleaned up files");

  // --- 6. Run promises in parallel ---
  console.log("\n=== 6. Parallel Execution ===\n");

  // Sequential — one after another (slow)
  console.time("sequential");
  await wait(300);
  await wait(300);
  await wait(300);
  console.timeEnd("sequential"); // ~900ms

  // Parallel — all at once (fast)
  console.time("parallel");
  await Promise.all([wait(300), wait(300), wait(300)]);
  console.timeEnd("parallel"); // ~300ms

  // --- 7. Promise.all vs Promise.race ---
  console.log("\n=== 7. Promise.all vs Promise.race ===\n");

  // Promise.all — waits for ALL to finish
  const all = await Promise.all([wait(100), wait(200), wait(300)]);
  console.log("Promise.all:", all);

  // Promise.race — returns the FIRST one to finish
  const race = await Promise.race([wait(100), wait(200), wait(300)]);
  console.log("Promise.race:", race);
}

demo();
