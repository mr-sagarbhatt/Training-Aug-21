import "./signin.scss";
import Copyrights from "../../components/Copyrights/Copyrights";
import SigninCard from "../../components/cards/SigninCard/SigninCard";
import { SigninProvider } from "../../contexts/SigninContext";

const SignIn = () => {
  return (
    <SigninProvider>
      <>
        <section className='signin'>
          {/* //*********** SIGNIN CARD *********** */}
          <SigninCard></SigninCard>
        </section>
        {/* //*********** FOOTER :: COPYRIGHTS *********** */}
        <div className='signin-copyrights'>
          <Copyrights></Copyrights>
        </div>
      </>
    </SigninProvider>
  );
};

export default SignIn;
