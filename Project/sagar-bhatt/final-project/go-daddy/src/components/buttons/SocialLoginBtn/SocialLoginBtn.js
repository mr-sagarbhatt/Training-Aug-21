import "./social-login-btn.scss";

const SocialLoginBtn = ({ icon, text, changeEmail, socialLoginProvider }) => {
  return (
    <>
      {socialLoginProvider && (
        <>
          {/* // *********** NOT SELECTED EMAIL OPTION *********** */}
          <button
            className='btn btn-light'
            onClick={() => socialLoginProvider()}
          >
            <span className='icon'>{icon}</span>{" "}
            <span className='text'>{text}</span>
          </button>
        </>
      )}
      {changeEmail && (
        <>
          {/* // *********** SELECTED EMAIL OPTION *********** */}
          <button className='btn btn-light' onClick={() => changeEmail()}>
            <span className='icon'>{icon}</span>{" "}
            <span className='text'>{text}</span>
          </button>
        </>
      )}
      {!socialLoginProvider && !changeEmail && (
        <>
          {/* // *********** FOR LOGIN *********** */}
          <button
            className='btn btn-light'
            onClick={() => socialLoginProvider()}
          >
            <span className='icon'>{icon}</span>{" "}
            <span className='text'>{text}</span>
          </button>
        </>
      )}
    </>
  );
};

export default SocialLoginBtn;

// <>
//   {!changeEmail ? (
//     <>
//       {/* // *********** NOT SELECTED EMAIL OPTION *********** */}
//       <button className='btn btn-light'>
//         <span className='icon'>{icon}</span>{" "}
//         <span className='text'>{text}</span>
//       </button>
//     </>
//   ) : (
//           )}
// </>
