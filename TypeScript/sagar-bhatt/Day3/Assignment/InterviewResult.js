"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumResult = exports.InterviewResult = void 0;
// * Interview Result
var enumResult;
(function (enumResult) {
    enumResult[enumResult["selected"] = 1] = "selected";
    enumResult[enumResult["rejected"] = 2] = "rejected";
})(enumResult || (enumResult = {}));
exports.enumResult = enumResult;
class InterviewResult {
    constructor(interviewId, marks, totalMarks) {
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
        }
        else {
            return {
                interviewId: this.interviewId,
                result: enumResult[enumResult.rejected],
            };
        }
    }
}
exports.InterviewResult = InterviewResult;
