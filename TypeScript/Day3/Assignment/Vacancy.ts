// * Vacancy
class Vacancy {
  departmentId: number;
  departmentName: string;
  noOfVacancies: number;
  constructor(
    departmentId: number,
    departmentName: string,
    noOfVacancies: number
  ) {
    this.departmentId = departmentId;
    this.departmentName = departmentName;
    this.noOfVacancies = noOfVacancies;
  }
  getVacancyDetails() {
    return {
      departmentId: this.departmentId,
      departmentName: this.departmentName,
      noOfVacancies: this.noOfVacancies,
    };
  }
}

export { Vacancy };
