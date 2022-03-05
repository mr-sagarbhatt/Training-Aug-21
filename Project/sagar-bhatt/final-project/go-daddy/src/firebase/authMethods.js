import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

export { facebookProvider, googleProvider };
