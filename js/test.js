const array = [4, 0, null, 2, 6, 2, 0, 8, 9];
// console.log(null - 0);

array.sort((a, b) => (a !== null ? a : Infinity) - (b !== null ? b : Infinity));
// console.log(array);
const s = `WASHINGTON: President Joe Biden announced nearly $3 billion in military aid to Kyiv on Wednesday -- the biggest US package so far -- to mark Ukraine's independence day, six months after Russia invaded the country. The package aims to`;
console.log(s.length);
