import "./signup.scss";
import Copyrights from "../../components/Copyrights/Copyrights";
import SignupCard from "../../components/cards/SignupCard/SignupCard";
import { SignupProvider } from "../../contexts/SignupContext";

const SignUp = () => {
  return (
    <>
      <section className='sign-up'>
        <SignupProvider>
          {/* //*********** SIGNUP CARD *********** */}
          <SignupCard></SignupCard>
          {/* //*********** FOOTER :: COPYRIGHTS *********** */}
          <Copyrights></Copyrights>
        </SignupProvider>
      </section>
    </>
  );
};

export default SignUp;
