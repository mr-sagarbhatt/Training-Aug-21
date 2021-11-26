"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Applicant = void 0;
// * Applicant
class Applicant {
    constructor(applicantId, applicantName, phoneNumber, qualification, departmentId) {
        this.applicantId = applicantId;
        this.applicantName = applicantName;
        this.phoneNumber = phoneNumber;
        this.qualification = qualification;
        this.departmentId = departmentId;
    }
    getApplicantDetails() {
        return {
            applicantId: this.applicantId,
            applicantName: this.applicantName,
            phoneNumber: this.phoneNumber,
            qualification: this.qualification,
            departmentId: this.departmentId,
        };
    }
}
exports.Applicant = Applicant;
