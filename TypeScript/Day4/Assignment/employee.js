// * EMPLOYEES
const employees = [
    { id: 1, name: "sagar", city: "ahmedabad", doj: new Date("2019-11-27") },
    { id: 2, name: "harsh", city: "mumbai", doj: new Date("2021-5-27") },
    { id: 3, name: "niraj", city: "delhi", doj: new Date("2021-11-27") },
    { id: 4, name: "meet", city: "surat", doj: new Date("2021-11-27") },
    { id: 5, name: "vinod", city: "gandhinagar", doj: new Date("2021-11-27") },
];
console.log(`Employees:`, employees);
// console.log(new Date("2021-11-27").toLocaleDateString());
// * GET EMPLOYEE BY Id
function getEmployeeById(employees, id) {
    const employee = employees.find((elem) => elem.id === id);
    return employee;
}
const empById = getEmployeeById(employees, 1);
console.log(`Employee ID: ${empById.id}`, empById);
// * FILTER EMPLOYEES BY YEAR AND CITY
const y = 2020;
function filterByYearCity(employees, year = y, city) {
    if (!city) {
        const employee = employees.filter((elem) => elem.doj.getFullYear() > year);
        return employee;
    }
    else {
        const employee = employees.filter((elem) => elem.doj.getFullYear() > year &&
            elem.city.toLowerCase() === city.toLowerCase());
        return employee;
    }
}
const filterYear = filterByYearCity(employees);
console.log(`Employees filter by year:`, filterYear);
const filterYearCity = filterByYearCity(employees, 2020, "mumbai");
console.log(`Employees filter by year and city:`, filterYearCity);
