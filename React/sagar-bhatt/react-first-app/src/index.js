import React from "react";
import ReactDOM from "react-dom";
import { HelloWorld } from "./components/day1-2/HelloWorld";
import { Student } from "./components/day1-2/Student";
import { StudentList } from "./components/day3-4/StudentList";
import "./index.css";

// *---------------------------------------------------------------------

// * Day1 :: STUDENT LIST :: FUNCTION BASED COMPONENT
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
  document.getElementById("day1")
);

// * Day3 :: STUDENT LIST :: CLASS BASED COMPONENT
ReactDOM.render(
  [
    <p>Day 3-4:</p>,
    <StudentList>
      <p className='title'>Student Details</p>
    </StudentList>,
    <br />,
    <hr />,
  ],
  document.getElementById("day2")
);
