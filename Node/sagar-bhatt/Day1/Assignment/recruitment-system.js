url = "./json/vacancies.json";
async function getVacancies(url) {
  let data = await fetch(url);
  let obj = await data.json();
  console.log(obj);
}

getVacancies(url);

class Vacancies {
  constructor(department, noOfVacancies) {
    this.department = department;
    this.noOfVacancies = noOfVacancies;
  }
  getVacancy() {
    return {
      department: this.department,
      noOfVacancies: this.noOfVacancies,
    };
  }
}
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let arrVacancies = [];
readline.question(`Enter Department: `, (department) => {
  readline.question(`Enter no of Vacancies: `, (noOfVacancies) => {
    const objVacancies = new Vacancies(department, noOfVacancies);
    console.log(objVacancies.getVacancy());
    readline.close();
    arrVacancies.push(objVacancies.getVacancy());
    console.log(arrVacancies);
  });
});

// * Vacancies: department, noOfVacancy
// * Applicant: vacancies, data
// * Interview : applicant, timing, result

// hr > vac
// app > vac apply
// hr > applicant numner / cross check
// hr > interview timing process
// hr > resulut declare
// app > selected /rejected
