// ============================================================
// Tagged Template Literals — step by step
// Run: node 00-tagged-template.js
// ============================================================

// --- 1. What JavaScript does behind the scenes ---
console.log("=== How it splits the template ===");

function showParts(strings, ...values) {
  console.log("  strings (static parts):", strings);
  console.log("  values (dynamic parts):", values);
}

const name = "Anand";
const age = 25;

showParts`Hello ${name}, you are ${age} years old`;
// strings: ["Hello ", ", you are ", " years old"]
// values:  ["Anand", 25]
//
// Notice: the template is split AROUND each ${}
// "Hello [Anand], you are [25] years old"
//  ^^^^^^         ^^^^^^^^^     ^^^^^^^^^^  ← strings (3 pieces)
//         ^^^^^            ^^               ← values (2 pieces)
// strings always has one more item than values


// --- 2. Without tagged template — manual work ---
console.log("\n=== Without tagged template ===");

function highlightManual(name, action) {
  return "**" + name + "**" + " just " + "**" + action + "**";
}

console.log(highlightManual("Anand", "logged in"));
// Works, but:
// - You must know the exact format upfront
// - Every new format needs a new function
// - Adding more values = more messy concatenation


// --- 3. With tagged template — automatic ---
console.log("\n=== With tagged template ===");

function highlight(strings, ...values) {
  let result = "";
  strings.forEach((str, i) => {
    result += str;
    if (values[i] !== undefined) {
      result += "**" + values[i] + "**";
    }
  });
  return result;
}

const action = "logged in";
console.log(highlight`${name} just ${action}`);
// **Anand** just **logged in**

// Same function, different template — no new function needed!
const item = "milk";
const price = 50;
console.log(highlight`${name} bought ${item} for ${price} rupees`);
// **Anand** bought **milk** for **50** rupees


// --- 4. Practical example: safe HTML escaping ---
console.log("\n=== HTML escaping (security) ===");

function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function safeHTML(strings, ...values) {
  let result = "";
  strings.forEach((str, i) => {
    result += str;  // static parts are safe — you wrote them
    if (values[i] !== undefined) {
      result += escapeHTML(String(values[i]));  // dynamic parts — escape!
    }
  });
  return result;
}

// Imagine this comes from user input
const userInput = '<script>alert("hacked!")</script>';

// Without tag — DANGEROUS
console.log("  Unsafe: " + `<div>${userInput}</div>`);
// <div><script>alert("hacked!")</script></div>  ← script runs!

// With tag — SAFE
console.log("  Safe:   " + safeHTML`<div>${userInput}</div>`);
// <div>&lt;script&gt;alert("hacked!")&lt;/script&gt;</div>  ← escaped!


// --- 5. Practical example: SQL safety ---
console.log("\n=== SQL escaping (security) ===");

function sql(strings, ...values) {
  let query = "";
  strings.forEach((str, i) => {
    query += str;
    if (values[i] !== undefined) {
      // In real code this would properly escape, here we just wrap in quotes
      query += `'${String(values[i]).replace(/'/g, "''")}'`;
    }
  });
  return query;
}

const userName = "Anand";
const userCity = "O'Brien";  // has a quote — could break SQL

console.log("  " + sql`SELECT * FROM users WHERE name = ${userName} AND city = ${userCity}`);
// SELECT * FROM users WHERE name = 'Anand' AND city = 'O''Brien'
// The quote in O'Brien is escaped automatically!


// --- 6. Step-by-step trace ---
console.log("\n=== Step-by-step trace ===");

function traced(strings, ...values) {
  console.log("  Step 1 — JS splits the template:");
  console.log("    strings:", strings);
  console.log("    values:", values);

  console.log("  Step 2 — We loop and combine:");
  let result = "";
  strings.forEach((str, i) => {
    result += str;
    if (values[i] !== undefined) {
      const wrapped = `[${values[i]}]`;
      result += wrapped;
      console.log(`    + "${str}" + "${wrapped}"`);
    } else {
      console.log(`    + "${str}"`);
    }
  });

  console.log("  Step 3 — Final result:", result);
  return result;
}

traced`Hello ${name}, age ${age}!`;
