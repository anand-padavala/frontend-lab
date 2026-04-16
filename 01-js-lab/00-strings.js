// ============================================================
// String Operations — Complete Guide
// Run: node 00-strings.js
// ============================================================


// ************************************************************
// PART 1: CREATING STRINGS
// ************************************************************

console.log("=== PART 1: Creating Strings ===\n");

// Three ways to create
const single = 'hello';              // single quotes
const double = "hello";              // double quotes
const backtick = `hello`;            // template literal (backticks)

// They all create the same string
console.log(single === double);      // true
console.log(double === backtick);    // true

// Template literals allow expressions inside ${}
const name = "Anand";
const age = 25;
console.log(`My name is ${name} and I am ${age} years old`);
// "My name is Anand and I am 25 years old"

// Template literals allow multi-line strings
const multiline = `Line 1
Line 2
Line 3`;
console.log(multiline);

// String from a number
console.log(String(42));         // "42"
console.log((42).toString());    // "42"
console.log("" + 42);           // "42"  — quick trick


// ************************************************************
// PART 2: STRING LENGTH & ACCESSING CHARACTERS
// ************************************************************

console.log("\n=== PART 2: Length & Characters ===\n");

const str = "JavaScript";

console.log(str.length);         // 10

// Access individual characters
console.log(str[0]);             // "J"        (first)
console.log(str[4]);             // "S"
console.log(str[str.length - 1]); // "t"       (last)
console.log(str.charAt(0));      // "J"        (same as str[0])

// Characters are read-only — you can't change them
// str[0] = "j";  ← this does nothing, strings are immutable

// Character code
console.log(str.charCodeAt(0));       // 74  (ASCII code of "J")
console.log(String.fromCharCode(74)); // "J" (code back to character)


// ************************************************************
// PART 3: FINDING IN STRINGS
// ************************************************************

console.log("\n=== PART 3: Finding ===\n");

const sentence = "The cat sat on the mat, the cat slept";

// --- indexOf / lastIndexOf ---
// Returns position (index), or -1 if not found
console.log(sentence.indexOf("cat"));        // 4   (first "cat")
console.log(sentence.lastIndexOf("cat"));    // 27  (last "cat")
console.log(sentence.indexOf("dog"));        // -1  (not found)
console.log(sentence.indexOf("cat", 5));     // 27  (search starting from position 5)

// --- includes ---
// Returns true/false — simpler than checking indexOf !== -1
console.log(sentence.includes("cat"));       // true
console.log(sentence.includes("dog"));       // false
console.log(sentence.includes("Cat"));       // false (case sensitive!)

// --- startsWith / endsWith ---
console.log(sentence.startsWith("The"));     // true
console.log(sentence.startsWith("the"));     // false
console.log(sentence.endsWith("slept"));     // true
console.log(sentence.endsWith("mat"));       // false

// --- search ---
// Like indexOf but accepts regex too
console.log(sentence.search("cat"));         // 4
console.log(sentence.search("dog"));         // -1


// ************************************************************
// PART 4: EXTRACTING SUBSTRINGS
// ************************************************************

console.log("\n=== PART 4: Extracting ===\n");

const text = "Hello, World!";

// --- slice(start, end) ---
// Returns characters from start up to (but NOT including) end
console.log(text.slice(0, 5));      // "Hello"     (position 0 to 4)
console.log(text.slice(7));         // "World!"    (from position 7 to end)
console.log(text.slice(7, 12));     // "World"     (position 7 to 11)

// Negative indices count from the end
console.log(text.slice(-6));        // "orld!"     (last 6 characters)
console.log(text.slice(-6, -1));    // "orld"      (last 6, excluding last 1)

// --- substring(start, end) ---
// Similar to slice, but doesn't support negative indices
console.log(text.substring(0, 5));  // "Hello"
console.log(text.substring(7));     // "World!"

// substring swaps arguments if start > end
console.log(text.substring(5, 0));  // "Hello"  (same as substring(0, 5))
// slice doesn't swap — it returns empty string
console.log(text.slice(5, 0));      // ""


// ************************************************************
// PART 5: CHANGING CASE
// ************************************************************

console.log("\n=== PART 5: Case ===\n");

const mixed = "Hello World";

console.log(mixed.toUpperCase());    // "HELLO WORLD"
console.log(mixed.toLowerCase());    // "hello world"

// Case-insensitive comparison
const a = "Hello";
const b = "hello";
console.log(a === b);                           // false
console.log(a.toLowerCase() === b.toLowerCase()); // true


// ************************************************************
// PART 6: TRIMMING WHITESPACE
// ************************************************************

console.log("\n=== PART 6: Trimming ===\n");

const messy = "   Hello World   ";

console.log(messy.trim());          // "Hello World"    (both sides)
console.log(messy.trimStart());     // "Hello World   " (left only)
console.log(messy.trimEnd());       // "   Hello World" (right only)

// Useful for form inputs — users often add accidental spaces
const userInput = "  anand@gmail.com  ";
console.log(userInput.trim());      // "anand@gmail.com"


// ************************************************************
// PART 7: REPLACING
// ************************************************************

console.log("\n=== PART 7: Replacing ===\n");

const greeting = "Hello World, Hello JavaScript";

// replace — first occurrence only
console.log(greeting.replace("Hello", "Hi"));
// "Hi World, Hello JavaScript"

// replaceAll — all occurrences
console.log(greeting.replaceAll("Hello", "Hi"));
// "Hi World, Hi JavaScript"

// Replace is case sensitive
console.log("Hello".replace("hello", "Hi"));   // "Hello" (no match!)

// Replace with empty string = delete
console.log("Hello World".replace(" World", ""));  // "Hello"

// Replace with regex (covered in 00-strings-regex.js)
console.log("abc 123 def 456".replace(/[0-9]+/g, "***"));
// "abc *** def ***"


// ************************************************************
// PART 8: SPLITTING & JOINING
// ************************************************************

console.log("\n=== PART 8: Split & Join ===\n");

// --- split — string to array ---
console.log("a,b,c,d".split(","));            // ["a", "b", "c", "d"]
console.log("Hello World".split(" "));        // ["Hello", "World"]
console.log("hello".split(""));               // ["h", "e", "l", "l", "o"]
console.log("one--two--three".split("--"));   // ["one", "two", "three"]

// Limit the number of splits
console.log("a,b,c,d".split(",", 2));         // ["a", "b"]

// --- join — array to string ---
console.log(["a", "b", "c"].join(","));       // "a,b,c"
console.log(["a", "b", "c"].join(" - "));     // "a - b - c"
console.log(["a", "b", "c"].join(""));        // "abc"

// Split then join — common pattern for transformations
const csv = "Anand,25,Hyderabad";
const parts = csv.split(",");
console.log(parts);                           // ["Anand", "25", "Hyderabad"]
console.log(parts.join(" | "));               // "Anand | 25 | Hyderabad"


// ************************************************************
// PART 9: REPEATING & PADDING
// ************************************************************

console.log("\n=== PART 9: Repeat & Pad ===\n");

// --- repeat ---
console.log("ha".repeat(3));          // "hahaha"
console.log("-".repeat(20));          // "--------------------"
console.log("abc".repeat(0));         // ""

// --- padStart — pad from the left ---
console.log("5".padStart(3, "0"));    // "005"
console.log("42".padStart(5, " "));   // "   42"
console.log("hi".padStart(5, "."));   // "...hi"

// Common use: format numbers with leading zeros
const month = 3;
const day = 5;
console.log(String(month).padStart(2, "0") + "/" + String(day).padStart(2, "0"));
// "03/05"

// --- padEnd — pad from the right ---
console.log("hi".padEnd(6, "."));     // "hi...."
console.log("Name".padEnd(15, " ") + "Age");  // "Name           Age"


// ************************************************************
// PART 10: CONCATENATION (COMBINING STRINGS)
// ************************************************************

console.log("\n=== PART 10: Concatenation ===\n");

// Method 1: + operator (most common)
console.log("Hello" + " " + "World");         // "Hello World"

// Method 2: concat()
console.log("Hello".concat(" ", "World"));     // "Hello World"

// Method 3: Template literal (best for mixing variables)
const firstName = "Anand";
const lastName = "P";
console.log(`${firstName} ${lastName}`);       // "Anand P"

// Method 4: Array join (best for many pieces)
const words = ["I", "love", "JavaScript"];
console.log(words.join(" "));                  // "I love JavaScript"

// + converts numbers to strings automatically
console.log("Age: " + 25);          // "Age: 25"
console.log("Score: " + 100);       // "Score: 100"

// But be careful with order!
console.log(1 + 2 + " apples");     // "3 apples"  (1+2 first, then string)
console.log("apples " + 1 + 2);     // "apples 12" (string + 1 = string, then + 2)


// ************************************************************
// PART 11: COMPARING STRINGS
// ************************************************************

console.log("\n=== PART 11: Comparing ===\n");

// --- Equality ---
console.log("abc" === "abc");      // true
console.log("abc" === "ABC");      // false (case matters)

// --- Comparison (alphabetical order) ---
// Uses Unicode values: A-Z (65-90), a-z (97-122)
console.log("a" < "b");           // true   (a comes before b)
console.log("b" < "a");           // false
console.log("a" < "A");           // false  (lowercase > uppercase in Unicode!)
console.log("apple" < "banana");  // true   (compares first char, then second, etc.)

// --- localeCompare — proper alphabetical comparison ---
console.log("a".localeCompare("b"));    // -1 (a comes before b)
console.log("b".localeCompare("a"));    //  1 (b comes after a)
console.log("a".localeCompare("a"));    //  0 (equal)

// Useful for sorting
const names = ["Charlie", "alice", "Bob"];
console.log(names.sort((x, y) => x.localeCompare(y)));
// ["alice", "Bob", "Charlie"]  (case-insensitive sort)


// ************************************************************
// PART 12: TYPE CONVERSION
// ************************************************************

console.log("\n=== PART 12: Type Conversion ===\n");

// --- String to Number ---
console.log(Number("42"));          // 42
console.log(Number("3.14"));        // 3.14
console.log(Number(""));            // 0
console.log(Number("abc"));         // NaN (Not a Number)
console.log(parseInt("42px"));      // 42  (stops at first non-digit)
console.log(parseFloat("3.14em"));  // 3.14
console.log(+"42");                 // 42  (unary + trick)

// --- Number to String ---
console.log(String(42));            // "42"
console.log((42).toString());       // "42"
console.log((255).toString(16));    // "ff"  (convert to hex)
console.log((10).toString(2));      // "1010" (convert to binary)
console.log((3.14159).toFixed(2));  // "3.14" (2 decimal places)

// --- Check if string is a number ---
console.log(isNaN("42"));           // false — it IS a number
console.log(isNaN("abc"));          // true  — it is NOT a number
console.log(isNaN(""));             // false — empty string converts to 0


// ************************************************************
// PART 13: USEFUL PATTERNS
// ************************************************************

console.log("\n=== PART 13: Useful Patterns ===\n");

// --- Reverse a string ---
function reverseString(str) {
  return str.split("").reverse().join("");
}
console.log(reverseString("hello"));        // "olleh"
console.log(reverseString("JavaScript"));   // "tpircSavaJ"

// --- Count occurrences of a character ---
function countChar(str, char) {
  return str.split(char).length - 1;
}
console.log(countChar("hello world", "l"));    // 3
console.log(countChar("banana", "a"));         // 3

// --- Capitalize first letter ---
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
console.log(capitalize("hello"));     // "Hello"
console.log(capitalize("javaScript")); // "JavaScript"

// --- Capitalize every word ---
function capitalizeWords(str) {
  return str.split(" ").map(word => capitalize(word)).join(" ");
}
console.log(capitalizeWords("hello world foo bar"));   // "Hello World Foo Bar"

// --- Truncate with ellipsis ---
function truncate(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}
console.log(truncate("Hello World", 20));    // "Hello World" (fits)
console.log(truncate("Hello World", 8));     // "Hello..."

// --- Check if palindrome ---
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}
console.log(isPalindrome("racecar"));        // true
console.log(isPalindrome("A man a plan a canal Panama"));  // true
console.log(isPalindrome("hello"));          // false

// --- Count words ---
function wordCount(str) {
  return str.trim().split(/\s+/).length;
}
console.log(wordCount("Hello World"));              // 2
console.log(wordCount("  multiple   spaces  "));    // 2

// --- Remove duplicate characters ---
function removeDuplicates(str) {
  return [...new Set(str)].join("");
}
console.log(removeDuplicates("aabbccdd"));    // "abcd"
console.log(removeDuplicates("hello"));       // "helo"

// --- Mask a string (show only last 4) ---
function mask(str, visibleCount) {
  if (str.length <= visibleCount) return str;
  return "*".repeat(str.length - visibleCount) + str.slice(-visibleCount);
}
console.log(mask("4111222233334444", 4));   // "************4444"
console.log(mask("9876543210", 4));         // "******3210"
console.log(mask("hi", 4));                 // "hi" (too short to mask)

// --- Slug from title (URL-friendly) ---
function toSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")   // remove special chars
    .replace(/\s+/g, "-");           // spaces to hyphens
}
console.log(toSlug("Hello World!"));                  // "hello-world"
console.log(toSlug("  My Blog Post #1  "));           // "my-blog-post-1"
console.log(toSlug("JavaScript: The Good Parts"));    // "javascript-the-good-parts"

// --- Extract initials ---
function getInitials(fullName) {
  return fullName
    .trim()
    .split(/\s+/)
    .map(word => word[0].toUpperCase())
    .join("");
}
console.log(getInitials("Anand Padavala"));        // "AP"
console.log(getInitials("John Michael Doe"));      // "JMD"
