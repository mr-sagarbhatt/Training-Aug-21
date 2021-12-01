// * GENERIC: Component which can work with variety of data

// * Generic Function
function display<Type>(arg: Type): Type {
  return arg;
}
console.log(display("sagar"));
console.log(display(11));

// import { StudentInfo } from "./StudentInfo.js";
// const st = new StudentInfo<number, string>();
// st.setValue(1, "sagar");
// st.display();

// * Namespace: Interrelated code wrapper
/// <reference path="./Users.ts" />
const u1 = new UserUtils.Users();
console.log(u1.getName());
