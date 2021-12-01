// * Interview Process
class Interview {
  interviewId: number;
  interviewDate: Date;
  interviewTime: string;
  applicantId: number;

  constructor(
    interviewId: number,
    interviewDate: Date,
    interviewTime: string,
    applicantId: number
  ) {
    this.interviewId = interviewId;
    this.interviewDate = interviewDate;
    this.interviewTime = interviewTime;
    this.applicantId = applicantId;
  }
  getInterviewDetails() {
    return {
      interviewId: this.interviewId,
      interviewDate: this.interviewDate,
      interviewTime: this.interviewTime,
      applicantId: this.applicantId,
    };
  }
}

export { Interview };
