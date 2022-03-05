import "./my-profile.scss";
import { useState } from "react";
import MyProfileForm from "../../../forms/MyProfileForm/MyProfileForm";

const MyProfile = () => {
  const [edit, setEdit] = useState(false);
  console.log(edit);

  return (
    <section className='my-profile'>
      <h1 className='my-profile-title'>My Profile</h1>
      {!edit ? (
        <>
          <div className='my-profile-card'>
            <div className='personal-info'>
              <div className='info-label'>Full Name</div>
              <div className='info-text'>Sagar Bhatt</div>
              <div className='info-label'>Organization</div>
              <div className='info-text'>Radix web</div>
              <div className='info-label'>Email</div>
              <div className='info-text'>bhattsagar112@gmail.com</div>
              <div className='info-label'>Default Currency</div>
              <div className='info-text'>INR</div>
            </div>
            <div className='contact-info'>
              <div className='info-label'>Primary Phone</div>
              <div className='info-text'>+91.1231231231</div>
              <div className='info-label'>Mobile Phone</div>
              <div className='info-text'>+91.1231231231</div>
              <div className='info-label'>Home Phone</div>
              <div className='info-text'>+91.1231231231</div>
              <div className='info-label'>Fax Phone</div>
              <div className='info-text'>+91.1231231231</div>
            </div>
            <div className='address-info'>
              <div className='info-label'>Address</div>
              <div className='info-text'>
                2937,Gala Gandhi ni pole, shahpur, ahmedabad, GJ 380001
              </div>
            </div>
            <div className='edit-btn' onClick={() => setEdit(true)}>
              Edit
            </div>
          </div>
        </>
      ) : (
        <MyProfileForm setEdit={setEdit}></MyProfileForm>
      )}
    </section>
  );
};

export default MyProfile;
