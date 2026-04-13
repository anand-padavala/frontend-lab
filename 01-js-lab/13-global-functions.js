// Global functions — available everywhere without require/import

// --- 1. console methods ---
console.log("=== 1. console ===\n");

console.log("log — normal output");
console.warn("warn — warning message");
console.error("error — error message");

console.table([
  { name: "Anand", age: 25 },
  { name: "John", age: 30 },
]);

console.time("timer");
for (let i = 0; i < 1000000; i++) {}
console.timeEnd("timer");

console.count("clicked");
console.count("clicked");
console.count("clicked");

console.group("User Details");
console.log("Name: Anand");
console.log("Age: 25");
console.groupEnd();

// --- 2. Timers ---
console.log("\n=== 2. Timers ===\n");

// setTimeout — run once after delay
setTimeout(() => {
  console.log("setTimeout: ran after 1 second");
}, 1000);

// setInterval — run repeatedly
let counter = 0;
const intervalId = setInterval(() => {
  counter++;
  console.log(`setInterval: tick ${counter}`);
  if (counter >= 3) {
    clearInterval(intervalId);   // stop after 3 ticks
    console.log("setInterval: stopped");
    runRest();  // continue with remaining examples
  }
}, 500);

function runRest() {
  // --- 3. String/Number conversions ---
  console.log("\n=== 3. Conversions ===\n");

  console.log("parseInt('42px'):", parseInt("42px"));         // 42
  console.log("parseInt('0xFF', 16):", parseInt("0xFF", 16)); // 255
  console.log("parseFloat('3.14abc'):", parseFloat("3.14abc")); // 3.14
  console.log("Number('42'):", Number("42"));                  // 42
  console.log("Number('hello'):", Number("hello"));            // NaN
  console.log("String(42):", String(42));                      // "42"
  console.log("Boolean(0):", Boolean(0));                      // false
  console.log("Boolean('hi'):", Boolean("hi"));                // true

  // --- 4. isNaN, isFinite ---
  console.log("\n=== 4. Number checks ===\n");

  console.log("isNaN('hello'):", isNaN("hello"));           // true
  console.log("isNaN(42):", isNaN(42));                      // false
  console.log("isFinite(42):", isFinite(42));                // true
  console.log("isFinite(Infinity):", isFinite(Infinity));    // false
  console.log("Number.isInteger(3.0):", Number.isInteger(3.0)); // true
  console.log("Number.isInteger(3.5):", Number.isInteger(3.5)); // false

  // --- 5. JSON ---
  console.log("\n=== 5. JSON ===\n");

  const user = { name: "Anand", age: 25, skills: ["JS", "React"] };

  // Object → String
  const jsonString = JSON.stringify(user);
  console.log("stringify:", jsonString);

  // String → Object
  const parsed = JSON.parse(jsonString);
  console.log("parse:", parsed);

  // Pretty print
  console.log("pretty:\n" + JSON.stringify(user, null, 2));

  // --- 6. encodeURI / decodeURI ---
  console.log("\n=== 6. URI encoding ===\n");

  const url = "https://example.com/search?q=hello world&lang=en";
  const encoded = encodeURI(url);
  console.log("encodeURI:", encoded);
  console.log("decodeURI:", decodeURI(encoded));

  const param = "name=Anand&role=admin";
  console.log("encodeURIComponent:", encodeURIComponent(param));

  // --- 7. Math (global object) ---
  console.log("\n=== 7. Math ===\n");

  console.log("Math.round(4.6):", Math.round(4.6));     // 5
  console.log("Math.ceil(4.1):", Math.ceil(4.1));        // 5
  console.log("Math.floor(4.9):", Math.floor(4.9));      // 4
  console.log("Math.abs(-10):", Math.abs(-10));           // 10
  console.log("Math.max(3,7,1):", Math.max(3, 7, 1));    // 7
  console.log("Math.min(3,7,1):", Math.min(3, 7, 1));    // 1
  console.log("Math.pow(2, 8):", Math.pow(2, 8));         // 256
  console.log("Math.sqrt(64):", Math.sqrt(64));           // 8
  console.log("Math.random():", Math.random());           // 0 to 1
  console.log("Random 1-100:", Math.floor(Math.random() * 100) + 1);

  // --- 8. Date (global object) ---
  console.log("\n=== 8. Date ===\n");

  const now = new Date();
  console.log("now:", now.toString());
  console.log("ISO:", now.toISOString());
  console.log("date:", now.toLocaleDateString());
  console.log("time:", now.toLocaleTimeString());
  console.log("year:", now.getFullYear());
  console.log("month:", now.getMonth() + 1);   // 0-indexed!
  console.log("day:", now.getDate());
  console.log("timestamp:", Date.now());

  // --- 9. Error ---
  console.log("\n=== 9. Error ===\n");

  try {
    throw new Error("Something went wrong");
  } catch (err) {
    console.log("Error name:", err.name);
    console.log("Error message:", err.message);
  }

  try {
    JSON.parse("invalid json");
  } catch (err) {
    console.log("Caught:", err.message);
  }

  // --- 10. process (Node.js only) ---
  console.log("\n=== 10. process ===\n");

  console.log("version:", process.version);
  console.log("platform:", process.platform);
  console.log("cwd:", process.cwd());
  console.log("pid:", process.pid);
  console.log("uptime:", process.uptime().toFixed(2), "seconds");
}
