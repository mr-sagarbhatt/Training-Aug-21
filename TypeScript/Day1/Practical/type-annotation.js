// * TypeAnnotation
// * number
let first = 5;
let bin = 0b111001;
let oct = 0o377;
let hex = 0x37cf;
console.log(`number: ${first}, ${bin}, ${oct}, ${hex}`);
// * string
let str = `First: ${first}`;
console.log(`string: ${str}`);
// * boolean
let isAdmin = true;
console.log(`boolean: ${isAdmin}`);
// * null
let n = null;
// let nn: number = null;
// console.log(`null: ${n}, ${nn}`);
// * void
function funVoid() {
    console.log(`void: Nothing to return!`);
}
funVoid();
// * any: Store any type of data
let data = 11;
console.log(`any: ${data}`);
// * Array: Collection of same data type
let arrNum = [1, 2, 3];
// Generic Array Type
let arrStr = ["sagar", "harsh", "khushubu"];
// Multi Type Array
let arrMultiNum = ["sagar", "harsh", "khushubu", 1];
let arrMultiStr = ["sagar", "harsh", "khushubu", 1];
console.log(`array of number[]:`, arrNum);
console.log(`array of string[] - Generic Array Type:`, arrStr);
console.log(`array of number|string[]:`, arrMultiNum);
console.log(`array of number|string[] - Generic Array Type:`, arrMultiStr);
// * Methods
// * number methods
let no1 = 999.11111;
let no2 = 999.99999;
console.log(no1.toFixed(2), no2.toFixed(2), no1.toLocaleString(), no2.toLocaleString(), no1.toString(), no2.toString(), no1.valueOf(), no2.valueOf());
// * array methods
let arr1 = [2, 1, "sagar", "harsh"];
let arr2 = ["khushbu", "zeel", 3, 4];
console.log(arr1, arr2);
console.log(arr1.concat(arr2), arr1.copyWithin(0, 1), arr1.pop(), arr1.push("harsh"), arr1, 
// arr1.sort(),
// arr2.sort(),
arr1.indexOf("sagar"), arr1.shift(), arr1.fill(2, 1, 3));
let a = arr2.filter((elem) => elem > 2);
console.log(a);
// * string methods
let str1 = "Learning TypeScript";
let str2 = "string methods.";
console.log(str1);
console.log(str1.charAt(0), str1.concat(` ${str2}`), str1.indexOf("typescript"), str1.indexOf("TypeScript", 5), str1.split(""), str1.split(" "), str1.toUpperCase(), str1.toLowerCase(), str1.includes("learning"), str1.includes("Learning"), str1.endsWith("TypeScript"), str1.endsWith("t"), str1.normalize(), str1.repeat(2), str1.slice(0, 8));
