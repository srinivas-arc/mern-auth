import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const handleGoogleAuth = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const bck_res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: res.user.displayName,
          email: res.user.email,
          photo: res.user.photoURL,
        }),
      });
      const resp = await bck_res.json();
      dispatch(signInSuccess(resp));
    } catch (error) {
      console.log("Error Fetching Details From GIP");
    }
  };
  return (
    <button
      type="button"
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
      onClick={handleGoogleAuth}
    >
      Continue With Google
    </button>
  );
};

export default OAuth;
