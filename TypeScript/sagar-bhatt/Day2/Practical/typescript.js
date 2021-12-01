// * CLASSES
class Employee {
    constructor(code, name) {
        this.empCode = code;
        this.empName = name;
    }
    getSalary() {
        return 1000;
    }
}
const emp = new Employee(1, "sagar");
console.log(emp);
console.log(emp.getSalary());
// * ENUM
var Category;
(function (Category) {
    Category[Category["Biography"] = 5] = "Biography";
    Category[Category["Poetry"] = 7] = "Poetry";
    Category[Category["Fiction"] = 9] = "Fiction";
})(Category || (Category = {})); // 5, 7, 9
// ? variable of enum type
let favoriteCategory = Category.Biography;
console.log(`favoriteCategory: ${Category[favoriteCategory]} ${favoriteCategory}`);
// * TUPLES
let tuple1 = [1, "tuple"];
console.log(tuple1);
let tuple2 = [
    [1, "tuple", true],
    [2, "tuple", true],
];
console.log(tuple2);
// * UNION
let union = 10;
console.log(union);
// * IMPLEMENTING INTERFACE
class Person {
    constructor(name) {
        this.pName = name;
    }
}
const objPer = new Person("sagar");
console.log(objPer);
const objEmployee = {
    empCode: 1,
    pName: "sagar",
    SSN: 111,
};
console.log(objEmployee);
// * FUNCTIONS
function logName(name) {
    if (typeof name === "string") {
        return name;
    }
    else {
        return `Please Enter String Value`;
    }
}
const userName = logName(`sagar bhatt`);
console.log(userName);
