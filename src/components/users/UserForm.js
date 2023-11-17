import "./UserForm.css";
import { useState, useContext } from "react";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";
import Card from "../style/card";

export default function UserForm() {
  const { addUser, logInUser, users } = useContext(UserContext);

  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = getFormData();

    if (isSignup) {
      duplicateEmailCheck(formData, users)
        ? setErrorMessage("Email already in use.")
        : duplicateUserCheck(formData, users)
        ? setErrorMessage("Username taken. Please select another.")
        : addUser(formData).then(clearFormData).then(navigate("/"));

      return;
    }

    let user = users.find(
      (existingUser) =>
        existingUser.username === formData.username &&
        existingUser.password === formData.password
    );

    if (user) {
      logInUser(user);
      clearFormData();
      navigate("/");
    } else {
      setErrorMessage("Username of Password incorrect. Please try again.");
    }
  };

  const signupHandler = () => {
    setIsSignup(true);
  };

  const cancelHandler = () => {
    setIsSignup(false);
  };

  const duplicateEmailCheck = (user, users) => {
    let check;

    users.find((existingUser) => existingUser.email === user.email)
      ? (check = true)
      : (check = false);
    return check;
  };

  const duplicateUserCheck = (user, users) => {
    let check;

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
    setErrorMessage();
  };

  return (
    <Card>
      <div className="form-container">
        <form id="user-form" onSubmit={submitHandler}>
          <input type="hidden" />
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
          />
          {isSignup ? (
            <>
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                required
              />
              <button type="submit" id="login-button">
                Register
              </button>
            </>
          ) : (
            <button type="submit" id="login-button">
              Log in
            </button>
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
      </div>
    </Card>
  );
}
