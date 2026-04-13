// Third-party packages — installed via npm, loaded from node_modules/

// chalk — colorful terminal output (using v4 for CommonJS support)
const chalk = require("chalk");

// lodash — utility functions for arrays, objects, strings
const _ = require("lodash");

// dayjs — lightweight date/time library
const dayjs = require("dayjs");

// --- chalk: styled terminal output ---
console.log(chalk.green("=== chalk ===\n"));
console.log(chalk.red("This is red"));
console.log(chalk.blue.bold("This is blue and bold"));
console.log(chalk.bgYellow.black(" Highlighted text "));
console.log(chalk.green("✔ Success"), chalk.red("✘ Error"), chalk.yellow("⚠ Warning"));

// --- lodash: utility functions ---
console.log(chalk.green("\n=== lodash ===\n"));

// Arrays
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("chunk([1..10], 3)  :", _.chunk(numbers, 3));
console.log("shuffle([1..10])   :", _.shuffle(numbers));
console.log("sample([1..10])    :", _.sample(numbers));
console.log("uniq([1,1,2,2,3])  :", _.uniq([1, 1, 2, 2, 3]));

// Objects
const user = { name: "Anand", role: "admin", password: "secret123" };
console.log("omit(user, password):", _.omit(user, "password"));
console.log("pick(user, name)    :", _.pick(user, "name"));

// Strings
console.log("camelCase           :", _.camelCase("hello world"));
console.log("snakeCase           :", _.snakeCase("helloWorld"));
console.log("kebabCase           :", _.kebabCase("Hello World"));

// --- dayjs: date/time ---
console.log(chalk.green("\n=== dayjs ===\n"));

const now = dayjs();
console.log("Now          :", now.format("YYYY-MM-DD HH:mm:ss"));
console.log("Day of week  :", now.format("dddd"));
console.log("Add 7 days   :", now.add(7, "day").format("YYYY-MM-DD"));
console.log("Subtract 1mo :", now.subtract(1, "month").format("YYYY-MM-DD"));
console.log("Start of year:", now.startOf("year").format("YYYY-MM-DD"));
console.log("From now     :", dayjs("2025-01-01").fromNow?.() || "needs plugin");

// --- Where do these packages live? ---
console.log(chalk.green("\n=== How it works ===\n"));
console.log("Packages installed in:", require.resolve("lodash"));
console.log("package.json tracks dependencies — check it!");
