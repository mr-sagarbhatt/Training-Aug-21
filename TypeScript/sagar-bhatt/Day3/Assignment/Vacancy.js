"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vacancy = void 0;
// * Vacancy
class Vacancy {
    constructor(departmentId, departmentName, noOfVacancies) {
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
exports.Vacancy = Vacancy;
