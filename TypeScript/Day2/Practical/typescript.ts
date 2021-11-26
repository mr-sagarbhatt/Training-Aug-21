// * CLASSES
class Employee {
  empCode: number;
  empName: String;

  constructor(code: number, name: string) {
    this.empCode = code;
    this.empName = name;
  }

  getSalary(): number {
    return 1000;
  }
}

const emp = new Employee(1, "sagar");
console.log(emp);
console.log(emp.getSalary());

// * ENUM
enum Category {
  Biography = 5,
  Poetry = 7,
  Fiction = 9,
} // 5, 7, 9

// ? variable of enum type
let favoriteCategory: Category = Category.Biography;
console.log(
  `favoriteCategory: ${Category[favoriteCategory]} ${favoriteCategory}`
);

// * TUPLES
let tuple1: [number, string] = [1, "tuple"];
console.log(tuple1);

let tuple2: [number, string, boolean][] = [
  [1, "tuple", true],
  [2, "tuple", true],
];
console.log(tuple2);

// * UNION
let union: number | string = 10;
console.log(union);

// * INTERFACE
interface IPerson {
  pName: string;
}

// * IMPLEMENTING INTERFACE
class Person implements IPerson {
  pName: string;
  constructor(name: string) {
    this.pName = name;
  }
}

const objPer = new Person("sagar");
console.log(objPer);

// * EXTENDING INTERFACE
interface IEmployee extends IPerson {
  empCode: number;
  empDept?: string; // optional
  readonly SSN: number; // readonly
}
const objEmployee: IEmployee = {
  empCode: 1,
  pName: "sagar",
  SSN: 111,
};
console.log(objEmployee);

// * FUNCTIONS
function logName(name: string): string {
  if (typeof name === "string") {
    return name;
  } else {
    return `Please Enter String Value`;
  }
}
const userName: string = logName(`sagar bhatt`);
console.log(userName);
