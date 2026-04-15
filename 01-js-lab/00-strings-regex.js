// ============================================================
// Strings & Regular Expressions — Full Guide
// Run: node 00-strings-regex.js
// ============================================================

// ************************************************************
// PART 1: STRING BASICS (before regex)
// ************************************************************

console.log("=== PART 1: String Methods (no regex) ===\n");

const str = "Hello World, Hello JavaScript";

// --- Finding ---
console.log(str.indexOf("Hello"));        // 0    (first occurrence, position)
console.log(str.indexOf("Hello", 1));     // 13   (search starting from position 1)
console.log(str.indexOf("Python"));       // -1   (not found)
console.log(str.includes("World"));       // true
console.log(str.startsWith("Hello"));     // true
console.log(str.endsWith("Script"));      // true

// --- Extracting ---
console.log(str.slice(6, 11));            // "World"    (start, end)
console.log(str.slice(-10));              // "JavaScript" (last 10 chars)
console.log(str.substring(6, 11));        // "World"    (same as slice, but no negatives)

// --- Changing ---
console.log(str.toUpperCase());           // "HELLO WORLD, HELLO JAVASCRIPT"
console.log(str.toLowerCase());           // "hello world, hello javascript"
console.log(str.replace("Hello", "Hi"));  // "Hi World, Hello JavaScript" (only first!)
console.log(str.replaceAll("Hello", "Hi")); // "Hi World, Hi JavaScript"   (all)
console.log("  hi  ".trim());             // "hi"       (remove whitespace both sides)
console.log("  hi  ".trimStart());        // "hi  "
console.log("  hi  ".trimEnd());          // "  hi"

// --- Splitting & Joining ---
console.log("a,b,c".split(","));          // ["a", "b", "c"]
console.log("hello".split(""));           // ["h", "e", "l", "l", "o"]
console.log(["a", "b", "c"].join("-"));   // "a-b-c"

// --- Repeating & Padding ---
console.log("ha".repeat(3));              // "hahaha"
console.log("5".padStart(4, "0"));        // "0005"
console.log("hi".padEnd(6, "."));         // "hi...."


// ************************************************************
// PART 2: WHAT IS A REGULAR EXPRESSION?
// ************************************************************

console.log("\n=== PART 2: What is a Regex? ===\n");

// A regex is a PATTERN to match text.
// In JavaScript, you write it between / slashes:
//
//   /pattern/flags
//
// It's like a search query with superpowers.

// Two ways to create:
const regex1 = /hello/;               // literal (most common)
const regex2 = new RegExp("hello");   // constructor (use when pattern is dynamic)

console.log(regex1.test("hello world"));  // true  — does the string contain "hello"?
console.log(regex2.test("HELLO world"));  // false — regex is case-sensitive by default


// ************************************************************
// PART 3: REGEX — test() — Does it match? (true/false)
// ************************************************************

console.log("\n=== PART 3: test() — true/false matching ===\n");

console.log(/cat/.test("I have a cat"));      // true
console.log(/cat/.test("I have a dog"));      // false
console.log(/cat/.test("catalog"));           // true  (found inside word!)

// Flags
console.log(/hello/.test("Hello"));           // false (case sensitive)
console.log(/hello/i.test("Hello"));          // true  (i = case insensitive)


// ************************************************************
// PART 4: REGEX — match() — What did it find?
// ************************************************************

console.log("\n=== PART 4: match() — find matches ===\n");

// Without g flag — returns first match + details
const result1 = "I like cats and cats".match(/cat/);
console.log(result1[0]);     // "cat"    (what matched)
console.log(result1.index);  // 7        (where it matched)

// With g flag — returns ALL matches as an array
const result2 = "I like cats and cats".match(/cat/g);
console.log(result2);        // ["cat", "cat"]

// No match returns null
console.log("hello".match(/xyz/));  // null


// ************************************************************
// PART 5: SPECIAL CHARACTERS — The building blocks
// ************************************************************

console.log("\n=== PART 5: Special Characters ===\n");

// --- Character classes ---
// \d  = any digit         (0-9)
// \D  = any NON-digit
// \w  = any word char     (a-z, A-Z, 0-9, _)
// \W  = any NON-word char
// \s  = any whitespace    (space, tab, newline)
// \S  = any NON-whitespace
// .   = any character EXCEPT newline

console.log("abc123".match(/\d/g));     // ["1", "2", "3"]
console.log("abc123".match(/\D/g));     // ["a", "b", "c"]
console.log("hi there!".match(/\w/g));  // ["h", "i", "t", "h", "e", "r", "e"]
console.log("hi there!".match(/\W/g));  // [" ", "!"]
console.log("a 1\tb".match(/\s/g));     // [" ", "\t"]
console.log("a.b.c".match(/./g));       // ["a", ".", "b", ".", "c"] (. matches everything)

// --- Dot (.) catches everything ---
console.log("cat".match(/c.t/));        // ["cat"]  (c + any char + t)
console.log("cot".match(/c.t/));        // ["cot"]
console.log("ct".match(/c.t/));         // null     (needs exactly one char between)

// --- Literal dot (escape with \) ---
console.log("3.14".match(/\d\.\d/));    // ["3.1"]  (\. matches actual period)
console.log("3x14".match(/\d\.\d/));    // null


// ************************************************************
// PART 6: QUANTIFIERS — How many times?
// ************************************************************

console.log("\n=== PART 6: Quantifiers ===\n");

// *     = 0 or more
// +     = 1 or more
// ?     = 0 or 1 (optional)
// {3}   = exactly 3
// {2,5} = between 2 and 5
// {2,}  = 2 or more

console.log("goood".match(/go*/));        // ["goood"]  (g + 0 or more o's)
console.log("gd".match(/go*/));           // ["g"]      (g + 0 o's — still matches!)
console.log("gd".match(/go+/));           // null       (g + 1 or more o's — needs at least one)
console.log("good".match(/go+/));         // ["goo"]

console.log("color".match(/colou?r/));    // ["color"]  (u is optional)
console.log("colour".match(/colou?r/));   // ["colour"]

console.log("aaa".match(/a{2}/));         // ["aa"]     (exactly 2)
console.log("aaaa".match(/a{2,4}/));      // ["aaaa"]   (between 2 and 4, greedy)
console.log("aaaaa".match(/a{2,}/));      // ["aaaaa"]  (2 or more)

// Combining: \d+ means "one or more digits"
console.log("price: 42 dollars and 99 cents".match(/\d+/g));  // ["42", "99"]


// ************************************************************
// PART 7: ANCHORS — Where in the string?
// ************************************************************

console.log("\n=== PART 7: Anchors ===\n");

// ^  = start of string
// $  = end of string
// \b = word boundary

console.log(/^Hello/.test("Hello World"));   // true  (starts with Hello)
console.log(/^Hello/.test("Say Hello"));     // false

console.log(/World$/.test("Hello World"));   // true  (ends with World)
console.log(/World$/.test("World Cup"));     // false

// Word boundary — matches position between word and non-word char
console.log(/\bcat\b/.test("the cat sat"));  // true  (whole word "cat")
console.log(/\bcat\b/.test("catalog"));      // false (cat is part of catalog)
console.log(/\bcat\b/.test("the cat"));      // true


// ************************************************************
// PART 8: CHARACTER SETS — [  ]
// ************************************************************

console.log("\n=== PART 8: Character Sets [ ] ===\n");

// [abc]   = a OR b OR c
// [a-z]   = any lowercase letter
// [A-Z]   = any uppercase letter
// [0-9]   = any digit (same as \d)
// [^abc]  = NOT a, b, or c (^ inside [ ] means negate)

console.log("gray".match(/gr[ae]y/));       // ["gray"]   (a or e)
console.log("grey".match(/gr[ae]y/));       // ["grey"]
console.log("griy".match(/gr[ae]y/));       // null

console.log("b2".match(/[a-z][0-9]/));      // ["b2"]     (letter then digit)
console.log("hello".match(/[aeiou]/g));     // ["e", "o"] (all vowels)
console.log("hello".match(/[^aeiou]/g));    // ["h", "l", "l"] (all non-vowels)

// Practical: match a hex color
console.log("#ff00ab".match(/^#[0-9a-fA-F]{6}$/));  // ["#ff00ab"]
console.log("#xyz123".match(/^#[0-9a-fA-F]{6}$/));  // null


// ************************************************************
// PART 9: GROUPS — ( )
// ************************************************************

console.log("\n=== PART 9: Groups ( ) ===\n");

// Groups let you:
// 1. Capture parts of a match
// 2. Apply quantifiers to a group
// 3. Reference captured groups

// --- Capturing ---
const dateMatch = "2024-03-15".match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(dateMatch[0]);  // "2024-03-15"  (full match)
console.log(dateMatch[1]);  // "2024"        (first group)
console.log(dateMatch[2]);  // "03"          (second group)
console.log(dateMatch[3]);  // "15"          (third group)

// --- Group with quantifier ---
console.log("hahaha".match(/(ha)+/));    // ["hahaha"] (ha repeated 1+ times)
console.log("ha".match(/(ha)+/));        // ["ha"]

// --- OR operator | ---
console.log("cat".match(/cat|dog/));     // ["cat"]
console.log("dog".match(/cat|dog/));     // ["dog"]
console.log("I have a cat and a dog".match(/cat|dog/g));  // ["cat", "dog"]

// --- Named groups ---
const namedMatch = "2024-03-15".match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
console.log(namedMatch.groups.year);   // "2024"
console.log(namedMatch.groups.month);  // "03"
console.log(namedMatch.groups.day);    // "15"


// ************************************************************
// PART 10: LOOKAHEAD & LOOKBEHIND — Match without consuming
// ************************************************************

console.log("\n=== PART 10: Lookahead & Lookbehind ===\n");

// (?=X)   Positive lookahead  — followed by X
// (?!X)   Negative lookahead  — NOT followed by X
// (?<=X)  Positive lookbehind — preceded by X
// (?<!X)  Negative lookbehind — NOT preceded by X

// Lookahead: find digits followed by "px"
console.log("12px 5em 20px".match(/\d+(?=px)/g));   // ["12", "20"]  (just the numbers, not "px")

// Negative lookahead: find digits NOT followed by "px"
console.log("12px 5em 20px".match(/\d+(?!px)/g));   // ["1", "5", "2"]

// Lookbehind: find amount after $
console.log("$100 and $200".match(/(?<=\$)\d+/g));   // ["100", "200"]

// This is what the credit card form uses!
// (\d{4})(?=\d) — match 4 digits only if more digits follow
console.log("4111222233334444".replace(/(\d{4})(?=\d)/g, "$1 "));
// "4111 2222 3333 4444"


// ************************************************************
// PART 11: replace() WITH REGEX
// ************************************************************

console.log("\n=== PART 11: replace() with regex ===\n");

// --- Basic replace ---
console.log("hello world".replace(/world/, "there"));  // "hello there"

// --- g flag = replace ALL ---
console.log("ha ha ha".replace(/ha/, "ho"));     // "ho ha ha"   (first only)
console.log("ha ha ha".replace(/ha/g, "ho"));    // "ho ho ho"   (all)

// --- Using captured groups with $1, $2 ---
// Swap first and last name
console.log("John Smith".replace(/(\w+) (\w+)/, "$2 $1"));  // "Smith John"

// Reformat date: 2024-03-15 → 15/03/2024
console.log("2024-03-15".replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1"));  // "15/03/2024"

// --- Using a function as replacement ---
// The function receives each match and returns the replacement
console.log("i like cats and dogs".replace(/cats|dogs/g, (match) => match.toUpperCase()));
// "i like CATS and DOGS"

// Double every number
console.log("I have 5 cats and 3 dogs".replace(/\d+/g, (n) => n * 2));
// "I have 10 cats and 6 dogs"

// Censor words
console.log("damn this hell".replace(/damn|hell/gi, (w) => "*".repeat(w.length)));
// "**** this ****"


// ************************************************************
// PART 12: search() — Find position with regex
// ************************************************************

console.log("\n=== PART 12: search() ===\n");

// Like indexOf but with regex
console.log("hello 42 world".search(/\d+/));     // 6  (position of first digit sequence)
console.log("hello world".search(/\d+/));         // -1 (not found)


// ************************************************************
// PART 13: split() WITH REGEX
// ************************************************************

console.log("\n=== PART 13: split() with regex ===\n");

// Split on one or more spaces
console.log("hello   world   foo".split(/\s+/));     // ["hello", "world", "foo"]

// Split on any punctuation
console.log("one,two;three.four".split(/[,;.]/));    // ["one", "two", "three", "four"]

// Split but keep the separator (use capture group)
console.log("one,two;three".split(/([,;])/));        // ["one", ",", "two", ";", "three"]


// ************************************************************
// PART 14: matchAll() — Iterate all matches with details
// ************************************************************

console.log("\n=== PART 14: matchAll() ===\n");

// match() with g flag gives you matches but no details (no index, no groups)
// matchAll() gives you full details for every match

const text = "Call 123-456-7890 or 987-654-3210";
const phoneRegex = /(\d{3})-(\d{3})-(\d{4})/g;

for (const m of text.matchAll(phoneRegex)) {
  console.log(`Found: ${m[0]} at index ${m.index}`);
  console.log(`  Area code: ${m[1]}, Exchange: ${m[2]}, Number: ${m[3]}`);
}


// ************************************************************
// PART 15: FLAGS SUMMARY
// ************************************************************

console.log("\n=== PART 15: Flags ===\n");

// i — case insensitive
console.log(/hello/i.test("HELLO"));     // true

// g — global (find all, not just first)
console.log("aaa".match(/a/));           // ["a"]          (first only)
console.log("aaa".match(/a/g));          // ["a", "a", "a"]

// m — multiline (^ and $ match each line, not just start/end of string)
const multiline = "hello\nworld";
console.log(multiline.match(/^\w+/g));   // ["hello"]            (only start of string)
console.log(multiline.match(/^\w+/gm));  // ["hello", "world"]   (start of each line)

// s — dotAll (. also matches newline)
console.log("a\nb".match(/a.b/));        // null   (. doesn't match \n)
console.log("a\nb".match(/a.b/s));       // ["a\nb"]


// ************************************************************
// PART 16: REAL-WORLD EXERCISES — Try these!
// ************************************************************

console.log("\n=== PART 16: Exercises ===\n");

// 1. Validate an email (simplified)
function isEmail(str) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(str);
}
console.log("isEmail('a@b.com'):", isEmail("a@b.com"));       // true
console.log("isEmail('bad@'):", isEmail("bad@"));              // false

// 2. Extract all hashtags from a tweet
const tweet = "Learning #regex is #fun and #useful";
console.log("Hashtags:", tweet.match(/#\w+/g));                // ["#regex", "#fun", "#useful"]

// 3. Validate a password (min 8 chars, has uppercase, lowercase, digit)
function isStrongPassword(pw) {
  return pw.length >= 8 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /\d/.test(pw);
}
console.log("isStrongPassword('Abc12345'):", isStrongPassword("Abc12345"));  // true
console.log("isStrongPassword('abc'):", isStrongPassword("abc"));            // false

// 4. Mask a credit card number
function maskCard(num) {
  return num.replace(/\d(?=\d{4})/g, "*");
}
console.log("maskCard:", maskCard("4111222233334444"));        // "************4444"

// 5. Convert camelCase to kebab-case
function toKebab(str) {
  return str.replace(/[A-Z]/g, (ch) => "-" + ch.toLowerCase());
}
console.log("toKebab:", toKebab("backgroundColor"));          // "background-color"
console.log("toKebab:", toKebab("fontSize"));                 // "font-size"

// 6. Remove HTML tags
function stripTags(html) {
  return html.replace(/<[^>]+>/g, "");
}
console.log("stripTags:", stripTags("<b>hello</b> <i>world</i>"));  // "hello world"

// 7. Extract domain from URL
function getDomain(url) {
  const match = url.match(/https?:\/\/([^/]+)/);
  return match ? match[1] : null;
}
console.log("getDomain:", getDomain("https://www.example.com/page"));  // "www.example.com"

// 8. Validate Indian phone number
function isIndianPhone(num) {
  return /^(\+91|91)?[6-9]\d{9}$/.test(num.replace(/[\s-]/g, ""));
}
console.log("isIndianPhone('9876543210'):", isIndianPhone("9876543210"));      // true
console.log("isIndianPhone('+91 98765 43210'):", isIndianPhone("+91 98765 43210")); // true
console.log("isIndianPhone('1234567890'):", isIndianPhone("1234567890"));      // false
