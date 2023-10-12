import { useState, useContext } from "react";
import Card from "../style/card";
import { UserContext } from "./UserProvider";
import "./UserForm.css";

export default function UserForm() {
  const [isSignup, setIsSignup] = useState(false);

  const { addUser } = useContext(UserContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = getFormData();

    if (isSignup) {
      // add additional user properties here to save to database. post array, thread array, etc.
      addUser(formData);
    }

    clearFormData();
  };

  const signupHandler = () => {
    setIsSignup(true);
  };

  const cancelHandler = () => {
    setIsSignup(false);
  };

  const getFormData = () => {
    let email;

    if (isSignup) {
      email = document.querySelector("#email").value;
    } else {
      email = null;
    }

    return {
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
      email: email,
    };
  };

  const clearFormData = () => {
    document.querySelector("#username").value = "";
    document.querySelector("#password").value = "";

    if (isSignup) {
      document.querySelector("#email").value = "";
    }

    setIsSignup(false);
  };

  return (
    <Card>
      <form id="user-form" onSubmit={submitHandler}>
        <input type="hidden" />
        <input type="text" placeholder="Username" id="username" required />
        <input type="text" placeholder="Password" id="password" required />
        {isSignup ? (
          <>
            <input type="email" placeholder="Email" id="email" required />
            <button id="login-button">Register</button>
          </>
        ) : (
          <button id="login-button">Log in</button>
        )}
      </form>
      {isSignup ? (
        <button id="cancel-button" onClick={cancelHandler}>
          Cancel
        </button>
      ) : (
        <button id="signup-button" onClick={signupHandler}>
          Sign Up
        </button>
      )}
    </Card>
  );
}
