import React, { Component } from "react";
import "../../css/day1-2/Student.css";

// * STUDENTS DATA
import students from "./students-data";

// * STUDENT LIST COMPONENT
class StudentList extends Component {
  state = {
    student: students,
  };
  render() {
    return (
      <>
        {this.props.children}
        <section className='student'>
          {this.state.student.map((item) => (
            <StudentIdCard key={item.id} studentInfo={item} />
          ))}
        </section>
      </>
    );
  }
}

// * STUDENT ID CARD COMPONENT
class StudentIdCard extends Component {
  render() {
    console.log(this.props.studentInfo);
    const {
      image,
      id,
      firstName,
      lastName,
      dob,
      collegeName,
      address,
      collegeLogo,
    } = this.props.studentInfo;
    return (
      <article className='student-id-card'>
        <Image image={image} />
        <PersonalInfo
          id={id}
          firstName={firstName}
          lastName={lastName}
          dob={dob}
        />
        <CollegeInfo
          collegeName={collegeName}
          address={address}
          collegeLogo={collegeLogo}
        />
      </article>
    );
  }
}

// * STUDENT IMAGE COMPONENT
class Image extends Component {
  render() {
    return (
      <div>
        <img
          src={this.props.image}
          alt='student'
          height='100px'
          width='100px'
        />
      </div>
    );
  }
}

// * PERSONAL INFO COMPONENT
class PersonalInfo extends Component {
  render() {
    const { id, firstName, lastName, dob } = this.props;
    return (
      <div>
        <p>ID: {id}</p>
        <p>FullName: {`${firstName} ${lastName}`}</p>
        <p>DOB: {dob}</p>
      </div>
    );
  }
}

// * COLLEGE INFO COMPONENT
class CollegeInfo extends Component {
  render() {
    const { collegeName, address, collegeLogo } = this.props;
    return (
      <div>
        <p>collegeName: {collegeName}</p>
        <p>collegeAddress: {address}</p>
        <Image image={collegeLogo} />
      </div>
    );
  }
}

export { StudentList };
