// * Interview Result
enum enumResult {
  selected = 1,
  rejected,
}
class InterviewResult {
  interviewId: number;
  marks: number;
  totalMarks: number;
  result?: enumResult;
  constructor(interviewId: number, marks: number, totalMarks: number) {
    this.interviewId = interviewId;
    this.marks = marks;
    this.totalMarks = totalMarks;
  }
  getInterviewResult() {
    if (this.marks >= (this.totalMarks * 50) / 100) {
      return {
        interviewId: this.interviewId,
        result: enumResult[enumResult.selected],
      };
    } else {
      return {
        interviewId: this.interviewId,
        result: enumResult[enumResult.rejected],
      };
    }
  }
}

export { InterviewResult, enumResult };
