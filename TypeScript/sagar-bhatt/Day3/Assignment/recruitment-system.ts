import { Vacancy } from "./Vacancy";
import { Applicant } from "./Applicant";
import { Interview } from "./Interview";
import { InterviewResult } from "./InterviewResult";

// * Vacancies
const objVacancy1 = new Vacancy(1, "node", 10);
const vacancy1 = objVacancy1.getVacancyDetails();
const vacancies = [vacancy1];
console.log(`Vacancies:`, vacancies);

// * Applicants
const objApplicant1 = new Applicant(1, "sagar bhatt", 7600608432, "MCA", 1);
const applicant1 = objApplicant1.getApplicantDetails();
const applicants = [applicant1];
console.log(`Applicants:`, applicants);

// * Interviews
const objInterview1 = new Interview(
  1,
  new Date("27-11-2021"),
  fnSetTime(12, 0),
  1
);
const interview1 = objInterview1.getInterviewDetails();
const interviews = [interview1];
console.log(`Interviews:`, interviews);

// * Interview Results
const objInterviewResult1 = new InterviewResult(1, 50, 100);
const interviewResult1 = objInterviewResult1.getInterviewResult();
const interviewResults = [interviewResult1];
console.log(`Interview Results:`, interviewResults);

// * SET INTERVIEW TIME
function fnSetTime(h: number, m: number, s: number = 0) {
  const date = new Date();
  date.setHours(h);
  date.setMinutes(m);
  date.setSeconds(s);
  return date.toLocaleTimeString();
}
