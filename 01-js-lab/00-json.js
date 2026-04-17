// ============================================================
// JSON Operations — Fetch, Convert, Filter
// Run: node 00-json.js
// ============================================================


// ************************************************************
// PART 1: JSON BASICS — Parse & Stringify
// ************************************************************

console.log("=== PART 1: JSON Basics ===\n");

// A JSON string (like what you'd get from an API)
const jsonString = `{
  "name": "Anand",
  "age": 25,
  "skills": ["JavaScript", "React", "Node.js"]
}`;

// Parse: JSON string → JavaScript object
const user = JSON.parse(jsonString);
console.log(user);           // { name: 'Anand', age: 25, skills: [...] }
console.log(user.name);      // "Anand"

// Stringify: JavaScript object → JSON string
const backToJson = JSON.stringify(user);
console.log(backToJson);
// '{"name":"Anand","age":25,"skills":["JavaScript","React","Node.js"]}'

// Pretty-print with 2-space indent
console.log(JSON.stringify(user, null, 2));


// ************************************************************
// PART 2: FETCH JSON & CONVERT TO LIST
// ************************************************************

console.log("\n=== PART 2: Fetch JSON & Convert to List ===\n");

// Simulating a JSON response (e.g., from an API)
const employeesJson = `{
  "department": "Engineering",
  "employees": {
    "emp001": { "name": "Alice",   "age": 30, "role": "Frontend Dev",  "salary": 85000, "active": true  },
    "emp002": { "name": "Bob",     "age": 35, "role": "Backend Dev",   "salary": 95000, "active": true  },
    "emp003": { "name": "Charlie", "age": 28, "role": "Frontend Dev",  "salary": 78000, "active": false },
    "emp004": { "name": "Diana",   "age": 32, "role": "DevOps",        "salary": 92000, "active": true  },
    "emp005": { "name": "Eve",     "age": 26, "role": "Frontend Dev",  "salary": 72000, "active": true  },
    "emp006": { "name": "Frank",   "age": 40, "role": "Tech Lead",     "salary": 120000,"active": true  },
    "emp007": { "name": "Grace",   "age": 29, "role": "Backend Dev",   "salary": 88000, "active": false },
    "emp008": { "name": "Hank",    "age": 33, "role": "QA Engineer",   "salary": 75000, "active": true  }
  }
}`;

// Step 1: Parse the JSON
const data = JSON.parse(employeesJson);
console.log("Department:", data.department);

// Step 2: Convert the employees object into a list (array)
// Object.entries gives [key, value] pairs
const employeeList = Object.entries(data.employees).map(([id, info]) => ({
  id,
  ...info,
}));

console.log("Employee list:");
console.log(employeeList);
// Each item: { id: 'emp001', name: 'Alice', age: 30, role: '...', salary: ..., active: ... }

// Other ways to convert object → list
const keys = Object.keys(data.employees);       // ['emp001', 'emp002', ...]
const values = Object.values(data.employees);    // [{ name: 'Alice', ... }, ...]
const entries = Object.entries(data.employees);  // [['emp001', { name: 'Alice', ... }], ...]

console.log("\nKeys:", keys);
console.log("Values (first):", values[0]);
console.log("Entries (first):", entries[0]);


// ************************************************************
// PART 3: FILTER THE DATA
// ************************************************************

console.log("\n=== PART 3: Filter the Data ===\n");

// Filter 1: Only active employees
const activeEmployees = employeeList.filter((emp) => emp.active);
console.log("Active employees:");
activeEmployees.forEach((emp) => console.log(`  ${emp.name} — ${emp.role}`));

// Filter 2: Frontend devs only
const frontendDevs = employeeList.filter((emp) => emp.role === "Frontend Dev");
console.log("\nFrontend Devs:");
frontendDevs.forEach((emp) => console.log(`  ${emp.name} (active: ${emp.active})`));

// Filter 3: Salary above 90k
const highEarners = employeeList.filter((emp) => emp.salary > 90000);
console.log("\nSalary > 90k:");
highEarners.forEach((emp) => console.log(`  ${emp.name} — $${emp.salary}`));

// Filter 4: Active AND age under 30
const youngActive = employeeList.filter((emp) => emp.active && emp.age < 30);
console.log("\nActive & under 30:");
youngActive.forEach((emp) => console.log(`  ${emp.name}, age ${emp.age}`));


// ************************************************************
// PART 4: TRANSFORM — map, reduce, sort
// ************************************************************

console.log("\n=== PART 4: Transform ===\n");

// Map: extract just names
const names = employeeList.map((emp) => emp.name);
console.log("All names:", names);

// Map: create summary strings
const summaries = employeeList.map(
  (emp) => `${emp.name} (${emp.role}) — $${emp.salary}`
);
console.log("\nSummaries:");
summaries.forEach((s) => console.log(`  ${s}`));

// Reduce: total salary
const totalSalary = employeeList.reduce((sum, emp) => sum + emp.salary, 0);
console.log("\nTotal salary:", `$${totalSalary}`);

// Reduce: average salary
const avgSalary = totalSalary / employeeList.length;
console.log("Average salary:", `$${avgSalary.toFixed(0)}`);

// Reduce: group by role
const byRole = employeeList.reduce((groups, emp) => {
  if (!groups[emp.role]) groups[emp.role] = [];
  groups[emp.role].push(emp.name);
  return groups;
}, {});
console.log("\nGrouped by role:", byRole);

// Sort: by salary (ascending)
const bySalaryAsc = [...employeeList].sort((a, b) => a.salary - b.salary);
console.log("\nSorted by salary (low → high):");
bySalaryAsc.forEach((emp) => console.log(`  ${emp.name} — $${emp.salary}`));

// Sort: by name (alphabetical)
const byName = [...employeeList].sort((a, b) => a.name.localeCompare(b.name));
console.log("\nSorted by name:");
byName.forEach((emp) => console.log(`  ${emp.name}`));


// ************************************************************
// PART 5: FIND & CHECK
// ************************************************************

console.log("\n=== PART 5: Find & Check ===\n");

// find: first match
const firstBackend = employeeList.find((emp) => emp.role === "Backend Dev");
console.log("First Backend Dev:", firstBackend.name);

// findIndex: index of first match
const idx = employeeList.findIndex((emp) => emp.name === "Diana");
console.log("Diana's index:", idx);

// some: does ANY match?
const hasDevOps = employeeList.some((emp) => emp.role === "DevOps");
console.log("Has DevOps?", hasDevOps);   // true

// every: do ALL match?
const allActive = employeeList.every((emp) => emp.active);
console.log("All active?", allActive);    // false

// includes (on the names array)
console.log("Has 'Eve'?", names.includes("Eve"));     // true
console.log("Has 'Zara'?", names.includes("Zara"));   // false


// ************************************************************
// PART 6: REAL-WORLD — FETCH FROM API (using fetch)
// ************************************************************

console.log("\n=== PART 6: Fetch from API ===\n");

// Node 18+ has built-in fetch
async function fetchAndFilter() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json(); // parse JSON response → array

  console.log(`Fetched ${users.length} users from API\n`);

  // Filter: users whose company catchPhrase contains "synergy" (case-insensitive)
  const synergyUsers = users.filter((u) =>
    u.company.catchPhrase.toLowerCase().includes("synergy")
  );
  console.log("Users with 'synergy' in catchPhrase:");
  synergyUsers.forEach((u) =>
    console.log(`  ${u.name} — "${u.company.catchPhrase}"`)
  );

  // Transform: extract name + city
  const nameAndCity = users.map((u) => ({
    name: u.name,
    city: u.address.city,
  }));
  console.log("\nName & City:");
  nameAndCity.forEach((u) => console.log(`  ${u.name} → ${u.city}`));

  // Reduce: group users by city
  const byCity = users.reduce((groups, u) => {
    const city = u.address.city;
    if (!groups[city]) groups[city] = [];
    groups[city].push(u.name);
    return groups;
  }, {});
  console.log("\nGrouped by city:", byCity);
}

fetchAndFilter().catch((err) => console.error("Fetch failed:", err.message));
