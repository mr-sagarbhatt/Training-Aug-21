import React, { Component } from "react";
import "../../css/day8-9/StudentInfo.css";

export class StudentForm extends Component {
  state = {
    id: "",
    firstName: "",
    lastName: "",
    clgName: "",
    // img: null,
    // clgLogo: null,
    students: [],
    formErr: false,
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };
  // handleImageChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.files[0],
  //   });
  // };

  validate = () => {};

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState(() => {
      return {
        formErr: false,
      };
    });
    if (
      event.target.firstName.value != "" &&
      event.target.lastName.value != "" &&
      event.target.clgName.value != "" &&
      event.target.img.value != "" &&
      event.target.clgLogo.value != ""
    ) {
      this.image = this.img.files[0];
      this.collegeLogo = this.clgLogo.files[0];
      console.log(this.image, this.collegeLogo);

      let { firstName, lastName, clgName, students } = this.state;
      const personList = {
        firstName: firstName,
        lastName: lastName,
        clgName: clgName,
        id: students.length + 1,
        img: this.image,
        clgLogo: this.collegeLogo,
      };
      console.log(personList);
      this.setState(
        (state, props) => {
          return {
            students: [...state.students, personList],
            firstName: "",
            lastName: "",
            clgName: "",
          };
        },
        () => console.log(this.state.students)
      );
      this.img.value = "";
      this.clgLogo.value = "";
    } else {
      this.setState(() => {
        return {
          formErr: true,
        };
      });
    }
  };

  render() {
    return (
      <>
        {this.props.children}
        <section>
          <form
            action=''
            onSubmit={(e) => this.handleSubmit(e)}
            encType='multipart/form-data'
          >
            {this.state.formErr && (
              <div style={{ color: "red", paddingBottom: "1rem" }}>
                All fields are required!
              </div>
            )}
            <label htmlFor='firstName'>First Name:</label>
            <input
              type='text'
              name='firstName'
              id='firstName'
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <label htmlFor='lastName'>Last Name:</label>
            <input
              type='text'
              name='lastName'
              id='lastName'
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <label htmlFor='img'>Upload Image:</label>
            <input
              type='file'
              name='img'
              id='img'
              // onChange={this.handleImageChange}
              ref={(node) => (this.img = node)}
              accept='image/*'
            />
            {/* {this.img && (
              <img src={this.img} height='300px' width='300px' alt='student' />
            )} */}
            <label htmlFor='clgName'>College Name:</label>
            <input
              type='text'
              name='clgName'
              id='clgName'
              value={this.state.clgName}
              onChange={this.handleChange}
            />
            <label htmlFor='clgLogo'>Upload College Logo:</label>
            <input
              type='file'
              name='clgLogo'
              id='clgLogo'
              // onChange={this.handleImageChange}
              ref={(node) => (this.clgLogo = node)}
              accept='image/*'
            />
            {/* {this.clgLogo && (
              <img
                src={this.clgLogo}
                height='300px'
                width='300px'
                alt='student'
              />
            )} */}
            <input className='btn' type='submit' value='Submit' />
          </form>
        </section>
        <section>
          {/* {this.image && this.collegeLogo && (
            <>
              <img
                src={URL.createObjectURL(this.image)}
                height='300px'
                width='300px'
                alt='student'
              />
              <img
                src={URL.createObjectURL(this.collegeLogo)}
                height='300px'
                width='300px'
                alt='student'
              />
            </>
          )} */}
          <h1 className='title'>Student Details</h1>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Image</th>
                <th>College Name</th>
                <th>College Logo</th>
              </tr>
            </thead>
            <tbody>
              {this.state.students.map(
                ({ id, firstName, lastName, img, clgName, clgLogo }) => {
                  return (
                    <tr>
                      <td>{id}</td>
                      <td>{firstName}</td>
                      <td>{lastName}</td>
                      <td>
                        {img && (
                          <img
                            src={URL.createObjectURL(img)}
                            alt={firstName}
                            height='100px'
                            width='200px'
                          />
                        )}
                      </td>
                      <td>{clgName}</td>
                      <td>
                        {clgLogo && (
                          <img
                            src={URL.createObjectURL(clgLogo)}
                            alt={clgName}
                            height='100px'
                            width='200px'
                          />
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </section>
      </>
    );
  }
}
