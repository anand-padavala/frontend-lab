// 1. Function Declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// 2. Function Expression
const add = function (a, b) {
  return a + b;
};

// 3. Arrow Function
const multiply = (a, b) => a * b;

// 4. Arrow Function with body
const divide = (a, b) => {
  if (b === 0) return "Cannot divide by zero";
  return a / b;
};

// 5. Default Parameters
function createUser(name, role = "guest") {
  return { name, role };
}

// 6. Rest Parameters (variable number of arguments)
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

// 7. Function returning a function (closure)
function counter(start) {
  let count = start;
  return function () {
    count++;
    return count;
  };
}

// 8. Immediately Invoked Function Expression (IIFE)
const result = (function () {
  return "I ran immediately!";
})();

// --- Test all functions ---
console.log(greet("Anand"));              // Hello, Anand!
console.log(add(5, 3));                   // 8
console.log(multiply(4, 6));              // 24
console.log(divide(10, 3));               // 3.333...
console.log(divide(10, 0));              // Cannot divide by zero
console.log(createUser("Anand"));         // { name: 'Anand', role: 'guest' }
console.log(createUser("Anand", "admin"));// { name: 'Anand', role: 'admin' }
console.log(sum(1, 2, 3, 4, 5));         // 15

const myCounter = counter(0);
console.log(myCounter());                // 1
console.log(myCounter());                // 2
console.log(myCounter());                // 3

console.log(result);                     // I ran immediately!
