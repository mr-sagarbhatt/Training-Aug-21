import authentication from "./firebase-config";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// list of firebase error codes to alternate error messages
const firebaseErrors = {
  "auth/user-not-found": "No user corresponding to this email.",
  "auth/email-already-in-use": "Email is already registered.",
};

// *********** SOCIAL MEDIA AUTHENTICATION ***********
const socialMediaAuth = async (provider) => {
  try {
    const res = await signInWithPopup(authentication, provider);
    return res.user;
  } catch (err) {
    return err;
  }
};

// *********** PASSWORD BASED AUTHENTICATION ***********
// *********** create a password-based account ***********
const createPasswordAuth = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(
      authentication,
      email,
      password
    );
    return res.user;
  } catch (err) {
    return firebaseErrors[err.code] || err.message;
  }
};

// *********** Sign in a user with an email address and password ***********
const signInPasswordAuth = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(
      authentication,
      email,
      password
    );
    return res.user;
  } catch (err) {
    return err;
  }
};

export { socialMediaAuth, createPasswordAuth, signInPasswordAuth };
