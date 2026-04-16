// ============================================================
// Regular Expressions — Validation with test()
// Run: node 00-strings-regex.js
// ============================================================
//
// regex.test(string) → true or false
// "Does this string match the pattern?"
//
// That's all test() does. It's the most common regex method
// for form validation — you just need yes or no.
// ============================================================


// ************************************************************
// PART 1: BUILDING BLOCKS — Learn these first
// ************************************************************

console.log("=== PART 1: Building Blocks ===\n");

// --- What each symbol means ---
//
// CHARACTERS:
//   [0-9]  = any digit
//   [^0-9] = any NON-digit
//   \w     = any word character (a-z, A-Z, 0-9, _)
//   \W     = any NON-word character
//   \s     = any whitespace (space, tab, newline)
//   .      = any character at all
//
// QUANTIFIERS (how many):
//   +     = 1 or more
//   *     = 0 or more
//   ?     = 0 or 1 (optional)
//   {3}   = exactly 3
//   {2,5} = between 2 and 5
//   {2,}  = 2 or more
//
// ESCAPING:
//   \.  = literal dot (not "any character")
//   \+  = literal plus sign
//   \$  = literal dollar sign
//
// ANCHORS (where):
//   ^  = start of string
//   $  = end of string
//
// SETS:
//   [abc]    = a OR b OR c
//   [a-z]    = any lowercase letter
//   [A-Z]    = any uppercase letter
//   [0-9]    = any digit
//   [^abc]   = NOT a, b, or c
//
// GROUPS:
//   (a|b)    = a OR b
//
// FLAGS (after the closing /):
//   i  = case insensitive
//
// --- Simple examples to build intuition ---

// Does the string contain a digit?
console.log(/[0-9]/.test("hello5"));       // true  — there's a 5
console.log(/[0-9]/.test("hello"));        // false — no digits

// Does the string contain ONLY digits?
console.log(/^[0-9]+$/.test("12345"));     // true  — start to end, only digits
console.log(/^[0-9]+$/.test("123a5"));     // false — "a" breaks it
// ^ = must start with digit, [0-9]+ = one or more digits, $ = must end with digit

// Exactly 3 digits?
console.log(/^[0-9]{3}$/.test("123"));     // true
console.log(/^[0-9]{3}$/.test("1234"));    // false — 4 digits, not 3
console.log(/^[0-9]{3}$/.test("12"));      // false — only 2

// Letters only?
console.log(/^[a-zA-Z]+$/.test("Hello"));    // true
console.log(/^[a-zA-Z]+$/.test("Hello1"));   // false — 1 is not a letter

// Letters and spaces only?
console.log(/^[a-zA-Z\s]+$/.test("John Doe"));   // true
console.log(/^[a-zA-Z\s]+$/.test("John123"));    // false


// ************************************************************
// PART 2: CREDIT CARD VALIDATION
// ************************************************************

console.log("\n=== PART 2: Credit Card Validation ===\n");

// --- Card number: 13 to 19 digits ---
function isValidCardNumber(num) {
  const digits = num.replace(/\s/g, "");        // remove spaces first
  return /^[0-9]{13,19}$/.test(digits);
  // ^            start
  // [0-9]{13,19} between 13 and 19 digits
  // $        end
}

console.log("Card number:");
console.log(isValidCardNumber("4111 1111 1111 1111"));  // true  — 16 digits (Visa)
console.log(isValidCardNumber("4111111111111"));         // true  — 13 digits (min)
console.log(isValidCardNumber("411"));                   // false — too short
console.log(isValidCardNumber("4111 abcd 1111 1111"));  // false — has letters

// --- Is it a Visa? (starts with 4) ---
function isVisa(num) {
  const digits = num.replace(/\s/g, "");
  return /^4[0-9]{12,18}$/.test(digits);
  // ^4            starts with 4
  // [0-9]{12,18}  followed by 12 to 18 more digits (total 13-19)
}

console.log("\nVisa check:");
console.log(isVisa("4111 1111 1111 1111"));   // true  — starts with 4
console.log(isVisa("5111 1111 1111 1111"));   // false — starts with 5

// --- Is it a Mastercard? (starts with 51-55) ---
function isMastercard(num) {
  const digits = num.replace(/\s/g, "");
  return /^5[1-5][0-9]{14}$/.test(digits);
  // ^5            starts with 5
  // [1-5]         second digit is 1, 2, 3, 4, or 5
  // [0-9]{14}     followed by exactly 14 more digits (total 16)
}

console.log("\nMastercard check:");
console.log(isMastercard("5211 1111 1111 1111"));  // true
console.log(isMastercard("5611 1111 1111 1111"));  // false — 56 not in range
console.log(isMastercard("4111 1111 1111 1111"));  // false — that's Visa

// --- Is it Amex? (starts with 34 or 37, 15 digits) ---
function isAmex(num) {
  const digits = num.replace(/\s/g, "");
  return /^3[47][0-9]{13}$/.test(digits);
  // ^3           starts with 3
  // [47]         second digit is 4 or 7
  // [0-9]{13}    followed by 13 more digits (total 15)
}

console.log("\nAmex check:");
console.log(isAmex("3411 111111 11111"));   // true  — starts with 34, 15 digits
console.log(isAmex("3711 111111 11111"));   // true  — starts with 37
console.log(isAmex("3511 111111 11111"));   // false — 35 not valid

// --- CVV: 3 or 4 digits ---
function isValidCVV(cvv) {
  return /^[0-9]{3,4}$/.test(cvv);
  // 3 digits for Visa/MC, 4 for Amex
}

console.log("\nCVV check:");
console.log(isValidCVV("123"));    // true
console.log(isValidCVV("1234"));   // true  — Amex uses 4
console.log(isValidCVV("12"));     // false — too short
console.log(isValidCVV("12345")); // false — too long
console.log(isValidCVV("12a"));   // false — not all digits

// --- Expiry date: MM/YY format ---
function isValidExpiry(exp) {
  return /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(exp);
  // ^           start
  // (           group for month:
  //   0[1-9]      01 through 09
  //   |           OR
  //   1[0-2]      10, 11, or 12
  // )
  // \/          literal slash (escaped)
  // [0-9]{2}    two digits for year
  // $           end
}

console.log("\nExpiry check:");
console.log(isValidExpiry("01/25"));   // true  — January 2025
console.log(isValidExpiry("12/30"));   // true  — December 2030
console.log(isValidExpiry("13/25"));   // false — month 13 doesn't exist
console.log(isValidExpiry("00/25"));   // false — month 00 doesn't exist
console.log(isValidExpiry("1/25"));    // false — needs leading zero
console.log(isValidExpiry("01-25"));   // false — needs slash not dash


// ************************************************************
// PART 3: NAME VALIDATION
// ************************************************************

console.log("\n=== PART 3: Name Validation ===\n");

// --- Letters and spaces only ---
function isValidName(name) {
  return /^[a-zA-Z\s]{2,50}$/.test(name.trim());
  // ^              start
  // [a-zA-Z\s]     letters and spaces
  // {2,50}         between 2 and 50 characters
  // $              end
}

console.log("Name check:");
console.log(isValidName("John Doe"));        // true
console.log(isValidName("Anand"));           // true
console.log(isValidName("J"));               // false — too short
console.log(isValidName("John123"));         // false — has numbers
console.log(isValidName("John@Doe"));        // false — has @

// --- Name with hyphens and apostrophes (O'Brien, Mary-Jane) ---
function isValidFullName(name) {
  return /^[a-zA-Z][a-zA-Z\s'-]{1,49}$/.test(name.trim());
  // ^[a-zA-Z]           must start with a letter
  // [a-zA-Z\s'-]{1,49}  then letters, spaces, hyphens, apostrophes
}

console.log("\nFull name check:");
console.log(isValidFullName("O'Brien"));       // true
console.log(isValidFullName("Mary-Jane"));     // true
console.log(isValidFullName("Anand P"));       // true
console.log(isValidFullName("'Bad"));          // false — starts with apostrophe
console.log(isValidFullName("A"));             // false — too short

// --- First name and last name (at least two words) ---
function hasFirstAndLastName(name) {
  return /^[a-zA-Z]{2,}\s+[a-zA-Z]{2,}/.test(name.trim());
  // [a-zA-Z]{2,}   first name: 2+ letters
  // \s+             one or more spaces
  // [a-zA-Z]{2,}   last name: 2+ letters
}

console.log("\nFirst + Last name:");
console.log(hasFirstAndLastName("John Doe"));      // true
console.log(hasFirstAndLastName("John"));          // false — only first name
console.log(hasFirstAndLastName("J D"));           // false — single letters


// ************************************************************
// PART 4: USER PROFILE VALIDATION
// ************************************************************

console.log("\n=== PART 4: User Profile Validation ===\n");

// --- Email ---
function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  // ^[a-zA-Z0-9._%+-]+   one or more valid chars before @
  // @                     literal @
  // [a-zA-Z0-9.-]+        domain name
  // \.                    literal dot
  // [a-zA-Z]{2,}          extension (com, org, etc.) at least 2 letters
  // $                     end
}

console.log("Email:");
console.log(isValidEmail("anand@gmail.com"));          // true
console.log(isValidEmail("user.name+tag@company.co")); // true
console.log(isValidEmail("bad@"));                     // false — no domain
console.log(isValidEmail("@gmail.com"));               // false — no username
console.log(isValidEmail("anand@gmail"));              // false — no extension
console.log(isValidEmail("anand gmail.com"));          // false — space instead of @

// --- Phone: Indian format ---
function isValidIndianPhone(phone) {
  const digits = phone.replace(/[\s-]/g, "");   // remove spaces and dashes
  return /^(\+91|91)?[6-9][0-9]{9}$/.test(digits);
  // ^             start
  // (\+91|91)?    optional country code (+91 or 91)
  // [6-9]         first digit must be 6, 7, 8, or 9
  // [0-9]{9}      followed by exactly 9 more digits
  // $             end
}

console.log("\nIndian phone:");
console.log(isValidIndianPhone("9876543210"));          // true
console.log(isValidIndianPhone("+91 98765 43210"));     // true
console.log(isValidIndianPhone("91-9876543210"));       // true
console.log(isValidIndianPhone("1234567890"));          // false — starts with 1
console.log(isValidIndianPhone("987654321"));           // false — 9 digits only

// --- Phone: US format ---
function isValidUSPhone(phone) {
  const digits = phone.replace(/[\s()-]/g, "");
  return /^1?[0-9]{10}$/.test(digits);
  // ^1?         optional leading 1 (country code)
  // [0-9]{10}   exactly 10 digits
}

console.log("\nUS phone:");
console.log(isValidUSPhone("(123) 456-7890"));   // true
console.log(isValidUSPhone("123-456-7890"));      // true
console.log(isValidUSPhone("1 123 456 7890"));    // true
console.log(isValidUSPhone("123-456-789"));       // false — 9 digits

// --- Username: alphanumeric, underscores, 3-20 chars ---
function isValidUsername(username) {
  return /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/.test(username);
  // ^[a-zA-Z]            must start with a letter
  // [a-zA-Z0-9_]{2,19}   then 2-19 more chars (letters, digits, underscore)
  //                       total: 3 to 20 characters
}

console.log("\nUsername:");
console.log(isValidUsername("anand_p"));       // true
console.log(isValidUsername("user123"));        // true
console.log(isValidUsername("ab"));             // false — too short
console.log(isValidUsername("1user"));          // false — starts with number
console.log(isValidUsername("user name"));      // false — has space
console.log(isValidUsername("user@name"));      // false — has @

// --- Age: 1 to 150 ---
function isValidAge(age) {
  return /^([1-9]|[1-9][0-9]|1[0-4][0-9]|150)$/.test(age);
  // [1-9]          1 through 9
  // [1-9][0-9]     10 through 99
  // 1[0-4][0-9]    100 through 149
  // 150         exactly 150
}

console.log("\nAge:");
console.log(isValidAge("25"));     // true
console.log(isValidAge("0"));      // false — zero not valid
console.log(isValidAge("150"));    // true  — max
console.log(isValidAge("151"));    // false — too old
console.log(isValidAge("07"));     // false — leading zero


// ************************************************************
// PART 5: PASSWORD VALIDATION
// ************************************************************

console.log("\n=== PART 5: Password Validation ===\n");

// Passwords are tricky — you need MULTIPLE conditions.
// Instead of one complex regex, use multiple simple ones.

function validatePassword(pw) {
  const checks = {
    minLength:    pw.length >= 8,              // no regex needed
    hasUppercase: /[A-Z]/.test(pw),            // at least one uppercase
    hasLowercase: /[a-z]/.test(pw),            // at least one lowercase
    hasDigit:     /[0-9]/.test(pw),             // at least one digit
    hasSpecial:   /[!@#$%^&*()_+\-=]/.test(pw), // at least one special char
    noSpaces:     !/\s/.test(pw),              // no spaces (! inverts the test)
  };
  return checks;
}

console.log("Password: 'Abc12345!'");
console.log(validatePassword("Abc12345!"));
// { minLength: true, hasUppercase: true, hasLowercase: true,
//   hasDigit: true, hasSpecial: true, noSpaces: true }

console.log("\nPassword: 'weak'");
console.log(validatePassword("weak"));
// { minLength: false, hasUppercase: false, hasLowercase: true,
//   hasDigit: false, hasSpecial: false, noSpaces: true }

console.log("\nPassword: 'Has Space 1!'");
console.log(validatePassword("Has Space 1!"));
// noSpaces: false

// --- Simple pass/fail version ---
function isStrongPassword(pw) {
  return pw.length >= 8
    && /[A-Z]/.test(pw)
    && /[a-z]/.test(pw)
    && /[0-9]/.test(pw)
    && /[!@#$%^&*]/.test(pw);
}

console.log("\nStrong password check:");
console.log(isStrongPassword("Abc12345!"));    // true
console.log(isStrongPassword("abcdefgh"));     // false — no uppercase, digit, special


// ************************************************************
// PART 6: ADDRESS & LOCATION VALIDATION
// ************************************************************

console.log("\n=== PART 6: Address & Location ===\n");

// --- ZIP code: US (5 digits or 5+4) ---
function isValidUSZip(zip) {
  return /^[0-9]{5}(-[0-9]{4})?$/.test(zip);
  // [0-9]{5}        five digits
  // (-[0-9]{4})?    optional: dash followed by four digits
}

console.log("US ZIP:");
console.log(isValidUSZip("90210"));        // true
console.log(isValidUSZip("90210-1234"));   // true
console.log(isValidUSZip("9021"));         // false — 4 digits
console.log(isValidUSZip("902101"));       // false — 6 digits

// --- PIN code: India (6 digits, first digit 1-9) ---
function isValidPIN(pin) {
  return /^[1-9][0-9]{5}$/.test(pin);
  // [1-9]       first digit is 1-9 (not 0)
  // [0-9]{5}    followed by 5 more digits
}

console.log("\nIndia PIN:");
console.log(isValidPIN("500001"));   // true  — Hyderabad
console.log(isValidPIN("110001"));   // true  — Delhi
console.log(isValidPIN("012345"));   // false — starts with 0
console.log(isValidPIN("12345"));    // false — only 5 digits

// --- State abbreviation: US (2 uppercase letters) ---
function isValidState(state) {
  return /^[A-Z]{2}$/.test(state);
}

console.log("\nUS State:");
console.log(isValidState("CA"));    // true
console.log(isValidState("ca"));    // false — must be uppercase
console.log(isValidState("CAL"));   // false — only 2 letters


// ************************************************************
// PART 7: URL & WEB VALIDATION
// ************************************************************

console.log("\n=== PART 7: URL & Web ===\n");

// --- Simple URL check ---
function isValidURL(url) {
  return /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(url);
  // ^https?      starts with http or https (s is optional)
  // :\/\/        literal ://  (slashes escaped)
  // [a-zA-Z0-9.-]+  domain name
  // \.           literal dot
  // [a-zA-Z]{2,} extension (at least 2 letters)
}

console.log("URL:");
console.log(isValidURL("https://google.com"));          // true
console.log(isValidURL("http://example.co.uk/page"));   // true
console.log(isValidURL("ftp://bad.com"));               // false — not http/https
console.log(isValidURL("google.com"));                  // false — no protocol

// --- Hex color code ---
function isValidHexColor(color) {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color);
  // #              starts with hash
  // [0-9a-fA-F]{3} 3-char shorthand (#fff)
  // |              OR
  // [0-9a-fA-F]{6} 6-char full (#ff00ab)
}

console.log("\nHex color:");
console.log(isValidHexColor("#fff"));       // true  — shorthand
console.log(isValidHexColor("#ff00ab"));    // true  — full
console.log(isValidHexColor("#xyz"));       // false — x, y, z not hex
console.log(isValidHexColor("ff00ab"));     // false — missing #

// --- IP Address (v4) ---
function isValidIPv4(ip) {
  const part = "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
  const regex = new RegExp(`^${part}\\.${part}\\.${part}\\.${part}$`);
  return regex.test(ip);
  // Each part: 0-255
  // 25[0-5]        250-255
  // 2[0-4][0-9]    200-249
  // [01]?[0-9][0-9]?  0-199
}

console.log("\nIPv4:");
console.log(isValidIPv4("192.168.1.1"));     // true
console.log(isValidIPv4("255.255.255.0"));   // true
console.log(isValidIPv4("256.1.1.1"));       // false — 256 > 255
console.log(isValidIPv4("1.2.3"));           // false — only 3 parts


// ************************************************************
// PART 8: DATE & TIME VALIDATION
// ************************************************************

console.log("\n=== PART 8: Date & Time ===\n");

// --- Date: DD/MM/YYYY ---
function isValidDateDMY(date) {
  return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/.test(date);
  // Day:   01-09, 10-29, 30-31
  // Month: 01-09, 10-12
  // Year:  any 4 digits
}

console.log("Date DD/MM/YYYY:");
console.log(isValidDateDMY("15/03/2024"));   // true
console.log(isValidDateDMY("31/12/2024"));   // true
console.log(isValidDateDMY("32/01/2024"));   // false — day 32
console.log(isValidDateDMY("15/13/2024"));   // false — month 13
console.log(isValidDateDMY("5/3/2024"));     // false — needs leading zeros

// --- Date: YYYY-MM-DD (ISO format) ---
function isValidDateISO(date) {
  return /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(date);
}

console.log("\nDate YYYY-MM-DD:");
console.log(isValidDateISO("2024-03-15"));   // true
console.log(isValidDateISO("2024-13-15"));   // false — month 13

// --- Time: HH:MM (24-hour) ---
function isValidTime24(time) {
  return /^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(time);
  // Hour:   00-19, 20-23
  // Minute: 00-59
}

console.log("\nTime HH:MM (24h):");
console.log(isValidTime24("09:30"));   // true
console.log(isValidTime24("23:59"));   // true
console.log(isValidTime24("24:00"));   // false — 24 not valid
console.log(isValidTime24("9:30"));    // false — needs leading zero

// --- Time: 12-hour with AM/PM ---
function isValidTime12(time) {
  return /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i.test(time);
  // Hour: 1-9 or 01-12
  // : minute
  // optional space
  // AM or PM (case insensitive with i flag)
}

console.log("\nTime 12h:");
console.log(isValidTime12("9:30 AM"));    // true
console.log(isValidTime12("12:00 PM"));   // true
console.log(isValidTime12("12:00PM"));    // true  — no space ok
console.log(isValidTime12("13:00 AM"));   // false — 13 not valid in 12h


// ************************************************************
// PART 9: PAN, AADHAAR, SSN — ID NUMBERS
// ************************************************************

console.log("\n=== PART 9: ID Numbers ===\n");

// --- PAN Card (India): ABCDE1234F ---
function isValidPAN(pan) {
  return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
  // 5 uppercase letters
  // 4 digits
  // 1 uppercase letter
}

console.log("PAN:");
console.log(isValidPAN("ABCDE1234F"));    // true
console.log(isValidPAN("abcde1234f"));    // false — must be uppercase
console.log(isValidPAN("ABCDE123F"));     // false — only 3 digits

// --- Aadhaar (India): 12 digits, doesn't start with 0 or 1 ---
function isValidAadhaar(num) {
  const digits = num.replace(/\s/g, "");
  return /^[2-9][0-9]{11}$/.test(digits);
}

console.log("\nAadhaar:");
console.log(isValidAadhaar("2345 6789 0123"));   // true
console.log(isValidAadhaar("0345 6789 0123"));   // false — starts with 0
console.log(isValidAadhaar("1345 6789 0123"));   // false — starts with 1

// --- SSN (US): XXX-XX-XXXX ---
function isValidSSN(ssn) {
  return /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/.test(ssn);
}

console.log("\nSSN:");
console.log(isValidSSN("123-45-6789"));   // true
console.log(isValidSSN("123456789"));     // false — needs dashes
console.log(isValidSSN("123-4-56789"));   // false — wrong grouping


// ************************************************************
// PART 10: EVERYDAY PATTERNS
// ************************************************************

console.log("\n=== PART 10: Everyday Patterns ===\n");

// --- No special characters (alphanumeric + spaces only) ---
function isAlphanumeric(str) {
  return /^[a-zA-Z0-9\s]+$/.test(str);
}

console.log("Alphanumeric:");
console.log(isAlphanumeric("Hello World 123"));   // true
console.log(isAlphanumeric("Hello@World"));        // false

// --- Contains at least one digit ---
console.log("\nContains digit:");
console.log(/[0-9]/.test("abc123"));     // true
console.log(/[0-9]/.test("abcdef"));     // false

// --- Contains NO digits ---
console.log("\nNo digits:");
console.log(/^[^0-9]+$/.test("hello"));   // true  — every char is a non-digit
console.log(/^[^0-9]+$/.test("hello1"));  // false

// --- Starts with uppercase ---
console.log("\nStarts uppercase:");
console.log(/^[A-Z]/.test("Hello"));  // true
console.log(/^[A-Z]/.test("hello"));  // false

// --- Only whitespace (empty or spaces) ---
console.log("\nOnly whitespace:");
console.log(/^\s*$/.test(""));        // true  — empty string
console.log(/^\s*$/.test("   "));     // true  — only spaces
console.log(/^\s*$/.test(" a "));     // false — has a letter

// --- Has consecutive repeated characters (aa, bb, 11) ---
console.log("\nRepeated chars:");
console.log(/(.)\1/.test("aardvark"));  // true  — "aa"
console.log(/(.)\1/.test("abcdef"));    // false
// (.)  = capture any character
// \1   = same character again (backreference)

// --- File extension check ---
function isImageFile(filename) {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);
}

console.log("\nImage file:");
console.log(isImageFile("photo.jpg"));      // true
console.log(isImageFile("photo.PNG"));      // true  — case insensitive
console.log(isImageFile("document.pdf"));   // false

// --- Currency amount ($1,234.56) ---
function isValidCurrency(amount) {
  return /^\$?[0-9]{1,3}(,[0-9]{3})*(\.[0-9]{2})?$/.test(amount);
  // \$?              optional dollar sign
  // [0-9]{1,3}       1-3 digits
  // (,[0-9]{3})*     optional groups of comma + 3 digits
  // (\.[0-9]{2})?    optional decimal + 2 digits
}

console.log("\nCurrency:");
console.log(isValidCurrency("$1,234.56"));    // true
console.log(isValidCurrency("1234.56"));      // true
console.log(isValidCurrency("$1,234,567"));   // true
console.log(isValidCurrency("1,23"));         // false — incomplete group
