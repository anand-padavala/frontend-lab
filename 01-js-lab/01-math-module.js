// --- This is a MODULE ---
// It exports functions for other files to use.
// Not everything is exported — internal helpers stay private.

// PRIVATE — not exported, only used inside this file
function validate(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Both arguments must be numbers");
  }
}

// PUBLIC — exported for other files to use
function add(a, b) {
  validate(a, b);
  return a + b;
}

function subtract(a, b) {
  validate(a, b);
  return a - b;
}

function multiply(a, b) {
  validate(a, b);
  return a * b;
}

function divide(a, b) {
  validate(a, b);
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

const PI = 3.14159;

// module.exports decides what goes OUT of this file
module.exports = { add, subtract, multiply, divide, PI };

// Note: validate() is NOT exported — it's private to this module
