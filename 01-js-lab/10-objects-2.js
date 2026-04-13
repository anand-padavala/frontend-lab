// Objects — key-value pairs

// --- 1. Creating objects ---
console.log("=== 1. Basics ===\n");

const user = {
  name: "Anand",
  age: 25,
  role: "admin",
  skills: ["JavaScript", "Node.js", "React"],
  address: {
    city: "Chennai",
    country: "India"
  }
};

console.log("user:", user);
console.log("name:", user.name);
console.log("city:", user.address.city);
console.log("first skill:", user.skills[0]);

// --- 2. Adding, updating, deleting properties ---
console.log("\n=== 2. Add, Update, Delete ===\n");

user.email = "anand@test.com";    // add
user.age = 26;                     // update
delete user.role;                  // delete

console.log("after changes:", user);

// --- 3. Dot vs bracket notation ---
console.log("\n=== 3. Dot vs Bracket ===\n");

console.log("dot:", user.name);
console.log("bracket:", user["name"]);

// Bracket is needed when key is in a variable
const key = "age";
console.log("dynamic key:", user[key]);

// --- 4. Checking if key exists ---
console.log("\n=== 4. Key Exists ===\n");

console.log("has name:", "name" in user);
console.log("has role:", "role" in user);         // false — we deleted it
console.log("has email:", user.hasOwnProperty("email"));

// --- 5. Looping through objects ---
console.log("\n=== 5. Looping ===\n");

// Object.keys — array of keys
console.log("keys:", Object.keys(user));

// Object.values — array of values
console.log("values:", Object.values(user));

// Object.entries — array of [key, value] pairs
console.log("entries:", Object.entries(user));

// for...in loop
for (const key in user) {
  console.log(`  ${key}: ${user[key]}`);
}

// --- 6. Spread — copy and merge ---
console.log("\n=== 6. Spread ===\n");

const copy = { ...user };
console.log("copy:", copy);

const updated = { ...user, age: 30, city: "Mumbai" };
console.log("updated:", updated);

const defaults = { theme: "dark", lang: "en" };
const settings = { lang: "ta", fontSize: 16 };
const merged = { ...defaults, ...settings };
console.log("merged:", merged);   // lang is "ta" — second object wins

// --- 7. Destructuring ---
console.log("\n=== 7. Destructuring ===\n");

const { name, age, email } = user;
console.log("name:", name);
console.log("age:", age);
console.log("email:", email);

// Rename while destructuring
const { name: userName, age: userAge } = user;
console.log("renamed:", userName, userAge);

// Default values
const { phone = "N/A" } = user;
console.log("phone (default):", phone);

// Nested destructuring
const { address: { city, country } } = user;
console.log("city:", city);
console.log("country:", country);

// --- 8. Shorthand property ---
console.log("\n=== 8. Shorthand ===\n");

const firstName = "Anand";
const role = "admin";

// Long form
const obj1 = { firstName: firstName, role: role };

// Shorthand — same thing
const obj2 = { firstName, role };

console.log("long:", obj1);
console.log("short:", obj2);

// --- 9. Optional chaining (?.) ---
console.log("\n=== 9. Optional Chaining ===\n");

const student = { name: "John" };

// Without ?. — would crash if address is undefined
// console.log(student.address.city);  // ERROR!

// With ?. — returns undefined safely
console.log("city:", student.address?.city);           // undefined
console.log("zip:", student.address?.zip?.code);       // undefined

// --- 10. Array of objects (very common pattern) ---
console.log("\n=== 10. Array of Objects ===\n");

const users = [
  { name: "Anand", age: 25, role: "admin" },
  { name: "John", age: 30, role: "guest" },
  { name: "Sara", age: 22, role: "editor" },
  { name: "Alex", age: 28, role: "guest" },
];

// Find one user
const admin = users.find(u => u.role === "admin");
console.log("admin:", admin);

// Filter users
const guests = users.filter(u => u.role === "guest");
console.log("guests:", guests);

// Get all names
const names = users.map(u => u.name);
console.log("names:", names);

// Sort by age
const sorted = [...users].sort((a, b) => a.age - b.age);
console.log("sorted by age:", sorted.map(u => `${u.name}(${u.age})`));

// Total age
const totalAge = users.reduce((sum, u) => sum + u.age, 0);
console.log("total age:", totalAge);
console.log("average age:", totalAge / users.length);
