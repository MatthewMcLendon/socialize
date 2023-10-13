import { useState, useContext, useEffect } from "react";
import Card from "../style/card";
import { UserContext } from "./UserProvider";
import "./UserForm.css";

export default function UserForm() {
  const { addUser, getUsers } = useContext(UserContext);

  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = getFormData();

    if (isSignup) {
      // add additional user properties here to save to database. post array, thread array, etc.

      if (duplicateUserCheck) {
        console.log("duplicate");
        setErrorMessage(
          "Sorry, that username is taken. Please select another."
        );
        return;
      }

      // addUser(formData);
    }

    clearFormData();
  };

  const signupHandler = () => {
    setIsSignup(true);
  };

  const cancelHandler = () => {
    setIsSignup(false);
  };

  const duplicateUserCheck = async (user) => {
    let check;
    let users = await getUsers();

    users.find((existingUser) => existingUser.username === user.username)
      ? (check = true)
      : (check = false);

    return check;
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
      {errorMessage ? <p>{errorMessage}</p> : null}
    </Card>
  );
}
