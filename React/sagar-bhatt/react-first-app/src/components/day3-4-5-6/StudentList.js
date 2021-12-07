import React, { Component } from "react";
import "../../css/day1-2/Student.css";
import Button from "./Button";

// * STUDENTS DATA
import students from "./students-data";

// * STUDENT LIST COMPONENT
class StudentList extends Component {
  state = {
    students: students,
  };
  // * HANDLER FOR DELETE STUDENTS
  handleDelete = (id) => {
    const sortedData = this.state.students.filter(
      (student) => student.id !== id
    );
    this.setState({
      students: sortedData,
    });
  };
  render() {
    return (
      <>
        {this.props.children}
        <section className='student'>
          {this.state.students.map((item) => (
            <StudentIdCard
              key={item.id}
              studentInfo={item}
              handleDelete={this.handleDelete}
            />
          ))}
        </section>
      </>
    );
  }
}

// * STUDENT ID CARD COMPONENT
class StudentIdCard extends Component {
  state = {
    showInfo: false,
  };
  // * handleToggleInfo :: TOGGLE STUDENT INFO
  handleToggleInfo = () => {
    this.setState({
      showInfo: !this.state.showInfo,
    });
  };
  render() {
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
    const { handleDelete } = this.props;
    return (
      <article className='student-id-card'>
        <Image image={image} />
        <PersonalInfo
          id={id}
          firstName={firstName}
          lastName={lastName}
          dob={dob}
        />
        <button type='button' className='btn' onClick={this.handleToggleInfo}>
          Toggle Info
        </button>
        {this.state.showInfo ? (
          <CollegeInfo
            id={id}
            collegeName={collegeName}
            address={address}
            collegeLogo={collegeLogo}
            handleDelete={handleDelete}
          />
        ) : null}
        {/* <button type='button' className='btn' onClick={this.handleToggleInfo}>
          Toggle Info
        </button>
        {this.state.showInfo ? <p>Student Info</p> : null} */}
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
    const { id, collegeName, address, collegeLogo, handleDelete } = this.props;
    return (
      <div>
        <p>collegeName: {collegeName}</p>
        <p>collegeAddress: {address}</p>
        <Image image={collegeLogo} />
        <Button id={id} handleDelete={handleDelete} />
      </div>
    );
  }
}

export { StudentList };
