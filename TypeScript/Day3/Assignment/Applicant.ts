// * Applicant
class Applicant {
  applicantId: number;
  applicantName: string;
  phoneNumber: number;
  qualification: string;
  departmentId: number;
  constructor(
    applicantId: number,
    applicantName: string,
    phoneNumber: number,
    qualification: string,
    departmentId: number
  ) {
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

export { Applicant };
