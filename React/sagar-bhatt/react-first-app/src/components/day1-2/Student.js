import "../../css/day1-2/Student.css";

// * STUDENTS LIST
import students from "./student-data";

// * STUDENTS COMPONENT
const Student = ({ children }) => {
  return (
    <>
      {children}
      <section className='student'>
        {/* <StudentIdCard student={students[0]} />
      <StudentIdCard student={students[1]} /> */}
        {students.map((elem) => (
          <StudentIdCard student={elem} />
        ))}
      </section>
    </>
  );
};

// * STUDENT ID CARD COMPONENT
const StudentIdCard = ({
  student: {
    image,
    id,
    firstName,
    lastName,
    dob,
    collegeName,
    address,
    collegeLogo,
  },
}) => {
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
};

// * STUDENT IMAGE COMPONENT
const Image = ({ image }) => {
  return (
    <div>
      <img src={image} alt='student' height='100px' width='100px' />
    </div>
  );
};

// * PERSONAL INFO COMPONENT
const PersonalInfo = ({ id, firstName, lastName, dob }) => {
  return (
    <div>
      <p>ID: {id}</p>
      <p>FullName: {`${firstName} ${lastName}`}</p>
      <p>DOB: {dob}</p>
    </div>
  );
};

// * COLLEGE INFO COMPONENT
const CollegeInfo = ({ collegeName, address, collegeLogo }) => {
  return (
    <div>
      <p>collegeName: {collegeName}</p>
      <p>collegeAddress: {address}</p>
      <Image image={collegeLogo} />
    </div>
  );
};

export { Student };
