"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interview = void 0;
// * Interview Process
class Interview {
    constructor(interviewId, interviewDate, interviewTime, applicantId) {
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
exports.Interview = Interview;
