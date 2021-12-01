// *  Store 5 employees’ data in one array (ID,FirstName,LastName,Address,Salary). Do the operation searching by indexnumber, EmployeeID, Insert the employee, delete the employee from the Array. Create one more array emp and join the value with above array. When display list combine firstname and lastname as fullname, From the address field flatnumber,city,state and should be splited.PF should be computed and total salary should be display.
const employeeData = [
    {
        id: 1,
        firstName: "sagar",
        lastName: "bhatt",
        address: "11, ahmedabad, gujarat",
        salary: 100000,
    },
    {
        id: 2,
        firstName: "harsh",
        lastName: "bhatt",
        address: "22, surat, gujarat",
        salary: 100000,
    },
];
const empData = [
    {
        id: 3,
        firstName: "khushubu",
        lastName: "bhatt",
        address: "33, baroda, gujarat",
        salary: 100000,
    },
    {
        id: 4,
        firstName: "niraj",
        lastName: "surati",
        address: "44, gandhinagar, gujarat",
        salary: 100000,
    },
    {
        id: 5,
        firstName: "meet",
        lastName: "bhatt",
        address: "55, rajkot, gujarat",
        salary: 100000,
    },
];
// * CONCAT ARRAYS
const employees = employeeData.concat(empData);
console.log(`ALL EMPLOYEES:`, employees);
// * CALCULATE PF
function calculatePF(amount) {
    let rate = 12;
    let salary = amount - (amount * rate) / 100;
    return salary;
}
// * DISPLAY EMPLOYEE
function getEmployee(employees) {
    for (let emp of employees) {
        let address = emp["address"].split(",");
        console.log(`----------------------------------------`);
        console.log(`ID : ${emp["id"]}`);
        console.log(`Name : ${emp["firstName"]} ${emp["lastName"]}`);
        console.log("address");
        console.log(`Flat No : ${address[0]}`);
        console.log(`City : ${address[1]}`);
        console.log(`State : ${address[2]}`);
        console.log(`Salary: ${calculatePF(emp["salary"])}`);
        console.log(`----------------------------------------`);
    }
}
getEmployee(employees);
// * GET EMPLOYEE BY ID
function GetEmployeeById(id, employees) {
    let employee = employees.filter((elem) => {
        return elem["id"] == id;
    });
    if (employee.length < 1) {
        console.log("Employee not found!");
    }
    else {
        getEmployee(employee);
    }
}
GetEmployeeById(1, employees);
// * GET EMPLOYEE BY INDEX
function getEmployeeByIndexId(id, employees) {
    let employee = [];
    employee.push(employees[id]);
    if (employee.length < 1) {
        console.log("No match found!");
    }
    else {
        getEmployee(employee);
    }
}
getEmployeeByIndexId(2, employees);
// * CREATE AN EMPLOYEE
function createEmployee(employees, emp) {
    const len = employees.length;
    employees.push(emp);
    if (employees.length > len) {
        console.log("Created New Record!");
    }
    else {
        console.log("Failed to create!");
    }
}
const newEmployee = {
    id: 6,
    firstName: "sagar",
    lastName: "bhatt",
    address: "66, Ahmedabad, Gujarat",
    salary: 30000,
};
createEmployee(employees, newEmployee);
// * DELETE EMPLOYEE
const deleteEmployee = (id, employees) => {
    const len = employees.length;
    let employee = employees.findIndex((elem) => {
        return elem["id"] == id;
    });
    const emp = employees.splice(employee, 1);
    if (employees.length < len) {
        console.log("Record Deleted!", emp);
    }
    else {
        console.log("Failed to create!");
    }
};
deleteEmployee(6, employees);
