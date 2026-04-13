// Built-in modules — need require() but no npm install

// --- 1. path — file path utilities ---
const path = require("path");
console.log("=== 1. path ===\n");

console.log("join:", path.join("users", "anand", "docs", "file.txt"));
console.log("resolve:", path.resolve("file.txt"));
console.log("dirname:", path.dirname("/users/anand/file.txt"));
console.log("basename:", path.basename("/users/anand/file.txt"));
console.log("extname:", path.extname("photo.png"));
console.log("parse:", path.parse("/users/anand/file.txt"));
console.log("sep:", path.sep);

// --- 2. os — operating system info ---
const os = require("os");
console.log("\n=== 2. os ===\n");

console.log("platform:", os.platform());
console.log("arch:", os.arch());
console.log("hostname:", os.hostname());
console.log("homedir:", os.homedir());
console.log("tmpdir:", os.tmpdir());
console.log("cpus:", os.cpus().length, "cores");
console.log("total memory:", (os.totalmem() / 1024 / 1024 / 1024).toFixed(1), "GB");
console.log("free memory:", (os.freemem() / 1024 / 1024 / 1024).toFixed(1), "GB");
console.log("uptime:", (os.uptime() / 3600).toFixed(1), "hours");
console.log("user:", os.userInfo().username);
console.log("EOL:", JSON.stringify(os.EOL));

// --- 3. fs — file system ---
const fs = require("fs");
console.log("\n=== 3. fs ===\n");

// Check if file exists
console.log("this file exists:", fs.existsSync(__filename));
console.log("fake file exists:", fs.existsSync("fake.txt"));

// Read this file's size
const stats = fs.statSync(__filename);
console.log("this file size:", stats.size, "bytes");

// Read directory
const files = fs.readdirSync(__dirname);
console.log("files in this dir:", files);

// --- 4. url — URL parsing ---
const { URL } = require("url");
console.log("\n=== 4. url ===\n");

const myUrl = new URL("https://example.com:8080/api/users?name=anand&role=admin#section1");
console.log("href:", myUrl.href);
console.log("protocol:", myUrl.protocol);
console.log("hostname:", myUrl.hostname);
console.log("port:", myUrl.port);
console.log("pathname:", myUrl.pathname);
console.log("search:", myUrl.search);
console.log("hash:", myUrl.hash);
console.log("searchParams:", Object.fromEntries(myUrl.searchParams));

// --- 5. crypto — hashing and random ---
const crypto = require("crypto");
console.log("\n=== 5. crypto ===\n");

// Hash a string
const hash = crypto.createHash("sha256").update("hello").digest("hex");
console.log("sha256 of 'hello':", hash);

const md5 = crypto.createHash("md5").update("hello").digest("hex");
console.log("md5 of 'hello':", md5);

// Random bytes
console.log("random hex:", crypto.randomBytes(8).toString("hex"));
console.log("random uuid:", crypto.randomUUID());

// --- 6. util — utility functions ---
const util = require("util");
console.log("\n=== 6. util ===\n");

console.log("inspect:", util.inspect({ a: 1, b: { c: [1, 2, 3] } }, { colors: true, depth: null }));
console.log("format:", util.format("Hello %s, you are %d years old", "Anand", 25));
console.log("isDeepStrictEqual:", util.isDeepStrictEqual([1, 2, 3], [1, 2, 3]));
console.log("isDeepStrictEqual:", util.isDeepStrictEqual([1, 2, 3], [1, 2, 4]));

// types checking
console.log("isDate:", util.types.isDate(new Date()));
console.log("isRegExp:", util.types.isRegExp(/hello/));
console.log("isMap:", util.types.isMap(new Map()));

// --- 7. events — event emitter ---
const EventEmitter = require("events");
console.log("\n=== 7. events ===\n");

const emitter = new EventEmitter();
emitter.on("greet", (name) => console.log(`Hello, ${name}!`));
emitter.emit("greet", "Anand");
emitter.emit("greet", "John");

// --- 8. querystring — parse query strings ---
const qs = require("querystring");
console.log("\n=== 8. querystring ===\n");

const parsed = qs.parse("name=Anand&role=admin&skills=js&skills=react");
console.log("parse:", parsed);

const stringified = qs.stringify({ name: "Anand", role: "admin" });
console.log("stringify:", stringified);

// --- 9. child_process — run shell commands ---
const { execSync } = require("child_process");
console.log("\n=== 9. child_process ===\n");

const nodeVersion = execSync("node --version").toString().trim();
console.log("node version:", nodeVersion);

const npmVersion = execSync("npm --version").toString().trim();
console.log("npm version:", npmVersion);

// --- 10. buffer — binary data ---
console.log("\n=== 10. buffer ===\n");

const buf1 = Buffer.from("Hello");
console.log("from string:", buf1);
console.log("to hex:", buf1.toString("hex"));
console.log("to base64:", buf1.toString("base64"));
console.log("back to string:", buf1.toString("utf-8"));

const buf2 = Buffer.alloc(5, 0);
console.log("alloc(5):", buf2);

console.log("byte length:", Buffer.byteLength("Hello"));

// --- Summary ---
console.log("\n=== Built-in Modules Summary ===\n");
console.log("path          — file path operations");
console.log("os            — operating system info");
console.log("fs            — read/write files");
console.log("url           — parse URLs");
console.log("crypto        — hashing, random, encryption");
console.log("util          — utility functions");
console.log("events        — event emitter");
console.log("querystring   — parse query strings");
console.log("child_process — run shell commands");
console.log("buffer        — binary data");
console.log("\nOthers: http, https, net, dns, zlib, stream, readline, assert, timers");
