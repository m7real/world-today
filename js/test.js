const array = [4, 0, null, 2, 6, 2, 0, 8, 9];
// console.log(null - 0);

array.sort((a, b) => (a !== null ? a : Infinity) - (b !== null ? b : Infinity));
console.log(array);
