const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "demo-files");
const filePath = path.join(dir, "notes.txt");
const copyPath = path.join(dir, "notes-copy.txt");
const jsonPath = path.join(dir, "users.json");

// 1. Create a directory
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  console.log("1. Created directory:", dir);
} else {
  console.log("1. Directory already exists:", dir);
}

// 2. Write a file
fs.writeFileSync(filePath, "Hello from Node.js!\nThis is line 2.\nThis is line 3.");
console.log("2. File written:", filePath);

// 3. Read a file
const content = fs.readFileSync(filePath, "utf-8");
console.log("3. File content:");
console.log(content);

// 4. Append to a file
fs.appendFileSync(filePath, "\nThis line was appended.");
console.log("4. Appended to file");

// 5. Read again to see the change
console.log("5. Updated content:");
console.log(fs.readFileSync(filePath, "utf-8"));

// 6. Copy a file
fs.copyFileSync(filePath, copyPath);
console.log("6. File copied to:", copyPath);

// 7. Get file info
const stats = fs.statSync(filePath);
console.log("7. File stats:");
console.log(`   Size     : ${stats.size} bytes`);
console.log(`   Created  : ${stats.birthtime.toLocaleString()}`);
console.log(`   Modified : ${stats.mtime.toLocaleString()}`);
console.log(`   Is file  : ${stats.isFile()}`);
console.log(`   Is dir   : ${stats.isDirectory()}`);

// 8. List directory contents
const files = fs.readdirSync(dir);
console.log("8. Files in demo-files/:", files);

// 9. Rename a file
const renamedPath = path.join(dir, "notes-renamed.txt");
fs.renameSync(copyPath, renamedPath);
console.log("9. Renamed notes-copy.txt → notes-renamed.txt");

// 10. Write and read JSON
const users = [
  { name: "Anand", role: "admin" },
  { name: "John", role: "guest" },
];
fs.writeFileSync(jsonPath, JSON.stringify(users, null, 2));
console.log("10. JSON written:", jsonPath);

const readUsers = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
console.log("    Parsed JSON:", readUsers);

// 11. Delete files and directory
fs.unlinkSync(filePath);
fs.unlinkSync(renamedPath);
fs.unlinkSync(jsonPath);
fs.rmdirSync(dir);
console.log("11. Cleaned up — deleted all files and directory");
