import React from "react";
import ReactDOM from "react-dom";
import { HelloWorld } from "./components/day1-2/HelloWorld";
import { Student } from "./components/day1-2/Student";
import { StudentList } from "./components/day3-4-5-6/StudentList";
import { StudentForm } from "./components/day8-9/StudentForm";
import "./index.css";

// *---------------------------------------------------------------------

// * Day1-2 :: STUDENT LIST :: FUNCTION BASED COMPONENT
ReactDOM.render(
  [
    <p>Day 1-2:</p>,
    <HelloWorld />,
    <Student>
      <p className='title'>Student Details</p>
    </Student>,
    <br />,
    <hr />,
    <br />,
  ],
  document.getElementById("day1-2")
);

// * Day3-4-5-6 :: STUDENT LIST :: CLASS BASED COMPONENT
ReactDOM.render(
  [
    <p>Day 3-4-5-6:</p>,
    <StudentList>
      <p className='title'>Student Details</p>
    </StudentList>,
    <br />,
    <hr />,
  ],
  document.getElementById("day3-4-5-6")
);

// * day8-9
ReactDOM.render(
  [
    <br />,
    <p>Day 8-9:</p>,
    <StudentForm>
      <p className='title'>Student Form</p>
    </StudentForm>,
    <br />,
    <hr />,
  ],
  document.getElementById("day8-9")
);
