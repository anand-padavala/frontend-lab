// ============================================================
// Promise — Fetch data from a URL
// Run: node 05-promise.js
// ============================================================

// --- Method 1: .then() chain ---

console.log("=== Method 1: .then() chain ===\n");

fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((res) => {
    if (!res.ok) throw new Error("HTTP error: " + res.status);
    return res.json();    // parse JSON → returns another Promise
  })
  .then((user) => {
    console.log("Name:", user.name);
    console.log("Email:", user.email);
    console.log("City:", user.address.city);
    console.log("Company:", user.company.name);
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });


// --- Method 2: async/await ---

console.log("=== Method 2: async/await ===\n");

async function fetchUser() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/2");
    if (!res.ok) throw new Error("HTTP error: " + res.status);
    const user = await res.json();

    console.log("Name:", user.name);
    console.log("Email:", user.email);
    console.log("City:", user.address.city);
    console.log("Company:", user.company.name);
  } catch (err) {
    console.log("Error:", err.message);
  }
}

fetchUser();


// --- Method 3: Error handling — bad URL ---

console.log("=== Method 3: Error handling ===\n");

async function fetchBadURL() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/9999");
    if (!res.ok) throw new Error("HTTP error: " + res.status);
    const user = await res.json();
    console.log("Name:", user.name);
  } catch (err) {
    console.log("Caught error:", err.message);
  }
}

fetchBadURL();
