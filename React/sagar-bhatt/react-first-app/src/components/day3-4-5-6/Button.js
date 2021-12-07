import React from "react";
import "../../css/day1-2/Student.css";

// * handleDelete :: METHOD FROM PARENT COMPONENT
export default function Button({ id, handleDelete }) {
  return (
    <button type='button' className='btn' onClick={() => handleDelete(id)}>
      Delete
    </button>
  );
}
