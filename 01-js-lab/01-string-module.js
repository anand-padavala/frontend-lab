// --- Another MODULE ---
// Exports string utility functions

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverse(str) {
  return str.split("").reverse().join("");
}

function countWords(str) {
  return str.trim().split(/\s+/).length;
}

// You can also export one at a time using exports
exports.capitalize = capitalize;
exports.reverse = reverse;
exports.countWords = countWords;

// This is equivalent to:
// module.exports = { capitalize, reverse, countWords };
