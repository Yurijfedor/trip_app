import React from "react";
import { useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { removeUser } from "../redux/userSlice";
const SignOutButton = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        // Optionally, handle additional sign-out logic or redirect the user
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <button
      className="button-container-scroll button-scroll"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
