// ============================================================
// JavaScript Special Characters — Complete Reference
// ============================================================


// ── { } Curly Braces ────────────────────────────────────────

// 1. Object literal
const user = { name: "Anand", age: 25 };

// 2. Block scope (if, for, while, function)
if (true) { console.log("block"); }

// 3. Destructuring
const { name, age } = user;

// 4. Template literal expression
console.log(`Hello ${name}`);

// 5. Import/export
// import { useState } from "react";
// export { myFunction };


// ── [ ] Square Brackets ─────────────────────────────────────

// 1. Array literal
const arr = [1, 2, 3];

// 2. Array/object access by index/key
arr[0];              // 1
user["name"];        // "Anand"

// 3. Destructuring
const [first, second] = arr;

// 4. Computed property name
const key = "email";
const obj = { [key]: "a@b.com" };  // { email: "a@b.com" }


// ── ( ) Parentheses ─────────────────────────────────────────

// 1. Function call
console.log("hi");

// 2. Function parameters
function greet(name) { return "Hi " + name; }

// 3. Grouping / order of operations
const result = (2 + 3) * 4;

// 4. Condition in if/for/while
if (age > 18) { }
for (let i = 0; i < 10; i++) { }

// 5. Arrow function params
const add = (a, b) => a + b;

// 6. IIFE (Immediately Invoked Function Expression)
// (function() { console.log("runs now"); })();


// ── . Dot ────────────────────────────────────────────────────

// 1. Property access
user.name;

// 2. Method call
arr.push(4);

// 3. Chaining
[1, 2, 3].filter(n => n > 1).map(n => n * 2);

// 4. Decimal numbers
const pi = 3.14;


// ── , Comma ──────────────────────────────────────────────────

// 1. Separate items in arrays, objects, function args
const nums = [1, 2, 3];
function sum(a, b, c) { return a + b + c; }

// 2. Variable declarations
let x = 1, y = 2, z = 3;

// 3. Comma operator (rare — evaluates both, returns last)
const val = (1, 2, 3);  // val = 3


// ── ; Semicolon ──────────────────────────────────────────────

// 1. Statement terminator
let a = 5;

// 2. for loop sections
for (let i = 0; i < 10; i++) { }


// ── : Colon ──────────────────────────────────────────────────

// 1. Object key-value pair
const car = { brand: "Toyota", year: 2024 };

// 2. Ternary operator
const status = age >= 18 ? "adult" : "minor";

// 3. Switch case / default
// switch (x) { case 1: ...; default: ...; }

// 4. Labels (rare)
// outer: for (...) { break outer; }

// 5. Destructuring rename
const { name: userName } = user;

// 6. TypeScript only — type annotations
// const age: number = 25;


// ── ? Question Mark ──────────────────────────────────────────

// 1. Ternary operator
const msg = age > 18 ? "yes" : "no";

// 2. Optional chaining
const city = user?.address?.city;  // undefined if any part is missing

// 3. Nullish coalescing
const value = null ?? "default";   // "default" (only for null/undefined)

// 4. TypeScript — optional property
// interface User { phone?: string; }


// ── ! Exclamation Mark ───────────────────────────────────────

// 1. Logical NOT
const isAdult = !false;  // true

// 2. Not equal
5 != "5";    // false (loose)
5 !== "5";   // true (strict)

// 3. Double NOT — convert to boolean
const truthy = !!"hello";  // true
const falsy = !!"";         // false


// ── = Equals Sign ────────────────────────────────────────────

// 1. Assignment
let score = 100;

// 2. Comparison
score == 100;    // loose equality (type coercion)
score === 100;   // strict equality (no coercion) — ALWAYS USE THIS

// 3. Arrow function
const double = (n) => n * 2;

// 4. Default parameter
function greet2(name = "World") { return "Hi " + name; }

// 5. Compound assignment
score += 10;   // score = score + 10
score -= 5;    // score = score - 5
score *= 2;    // score = score * 2
score /= 3;    // score = score / 3


// ── + Plus ───────────────────────────────────────────────────

// 1. Addition
3 + 4;  // 7

// 2. String concatenation
"hello" + " " + "world";

// 3. Unary plus — convert to number
+"42";      // 42 (number)
+true;      // 1

// 4. Increment
let count = 0;
count++;   // 1


// ── - Minus ──────────────────────────────────────────────────

// 1. Subtraction
10 - 3;  // 7

// 2. Negative number
const temp = -5;

// 3. Decrement
count--;


// ── * Asterisk ───────────────────────────────────────────────

// 1. Multiplication
5 * 3;  // 15

// 2. Exponentiation
2 ** 10;  // 1024

// 3. Spread/rest (see ... below)

// 4. Generator function
// function* gen() { yield 1; yield 2; }


// ── / Slash ──────────────────────────────────────────────────

// 1. Division
10 / 3;  // 3.333...

// 2. Regex literal
const pattern = /hello/gi;

// 3. Comments
// single line
/* multi line */


// ── % Percent ────────────────────────────────────────────────

// 1. Modulo (remainder)
10 % 3;  // 1
7 % 2;   // 1 (odd number check)


// ── & Ampersand ──────────────────────────────────────────────

// 1. Logical AND
true && false;  // false

// 2. Short-circuit evaluation
const data = user && user.name;  // returns user.name if user exists

// 3. Bitwise AND (rare)
5 & 3;  // 1

// 4. TypeScript — intersection type
// type Admin = User & { role: string };


// ── | Pipe ───────────────────────────────────────────────────

// 1. Logical OR
false || true;  // true

// 2. Default value (old way)
const port = undefined || 3000;  // 3000

// 3. Bitwise OR (rare)
5 | 3;  // 7

// 4. TypeScript — union type
// type ID = string | number;


// ── ~ Tilde ──────────────────────────────────────────────────

// 1. Bitwise NOT (rare)
~5;  // -6


// ── ^ Caret ──────────────────────────────────────────────────

// 1. Bitwise XOR (rare)
5 ^ 3;  // 6


// ── < > Angle Brackets ──────────────────────────────────────

// 1. Comparison
5 > 3;   // true
3 < 5;   // true
5 >= 5;  // true
3 <= 5;  // true

// 2. Bitwise shift (rare)
8 >> 1;  // 4
4 << 1;  // 8

// 3. TypeScript — generics
// function wrap<T>(value: T): T[] { return [value]; }

// 4. JSX / HTML tags
// <div className="box">Hello</div>


// ── ... Spread / Rest (three dots) ───────────────────────────

// 1. Spread — expand array/object
const arr2 = [1, 2, 3];
const arr3 = [...arr2, 4, 5];           // [1, 2, 3, 4, 5]
const user2 = { ...user, email: "x" };  // copy + override

// 2. Rest — collect remaining args
function sum2(first, ...rest) {
  return first + rest.reduce((a, b) => a + b, 0);
}

// 3. Destructuring rest
const [head, ...tail] = [1, 2, 3, 4];  // head=1, tail=[2,3,4]


// ── => Fat Arrow ─────────────────────────────────────────────

// 1. Arrow function
const multiply = (a, b) => a * b;
const sayHi = () => console.log("hi");


// ── ` Backtick ───────────────────────────────────────────────

// 1. Template literal
const greeting = `Hello ${name}, you are ${age} years old`;

// 2. Multi-line strings
const multi = `line 1
line 2
line 3`;

// 3. Tagged templates (advanced)
// html`<div>${content}</div>`


// ── ' " Quotes ───────────────────────────────────────────────

// 1. String literals
const s1 = "double quotes";
const s2 = 'single quotes';
// No difference — pick one and be consistent


// ── \ Backslash ──────────────────────────────────────────────

// 1. Escape characters
const escaped = "He said \"hello\"";
const newline = "line1\nline2";
const tab = "col1\tcol2";


// ── _ Underscore ─────────────────────────────────────────────

// 1. Convention — unused variable
const [, second2] = [1, 2];  // skip first
const fn = (_, index) => index;

// 2. Numeric separator (readability)
const billion = 1_000_000_000;  // same as 1000000000

// 3. Convention — private variable name
// const _internal = "private by convention";


// ── # Hash ───────────────────────────────────────────────────

// 1. Private class fields (ES2022)
// class User { #password = "secret"; }


// ── @ At Sign ────────────────────────────────────────────────

// 1. Decorators (TypeScript / proposal)
// @Component({ selector: 'app' })
// class AppComponent {}
