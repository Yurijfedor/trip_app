import React from "react";
import { useDispatch } from "react-redux";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setUser } from "../redux/userSlice";

const SignInButton = () => {
  const dispatch = useDispatch();
  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
            photo: user.photoURL,
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <button
      className="button-container-scroll button-scroll"
      onClick={handleSignIn}
    >
      Sign in with Google
    </button>
  );
};

export default SignInButton;
