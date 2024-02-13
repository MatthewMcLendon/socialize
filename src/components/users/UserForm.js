import "./UserForm.css";
import { useState, useContext } from "react";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";
import Card from "../style/card";

// for for loging users in and registering new users
export default function UserForm() {
  // import user functions and all users
  const { addUser, logInUser, users } = useContext(UserContext);

  // states for determining between loging in and sign up, Error message
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  // useNavigate shortcut for redirect after login/signup
  const navigate = useNavigate();

  // logic for login / signup
  const submitHandler = (event) => {
    // prevent submission and get info from form
    event.preventDefault();
    const formData = getFormData();

    // for signing up a new user
    if (isSignup) {
      // check if submitted email is in use
      if (duplicateEmailCheck(formData, users)) {
        setErrorMessage("Email already in use.");
        return;
      }
      // check if username is in use
      if (duplicateUserCheck(formData, users)) {
        setErrorMessage("Username taken. Please select another.");
        return;
      }
      // create new user, navigate home
      else {
        addUser(formData).then(clearFormData).then(navigate("/"));
        return;
      }
    }

    // for logging in an existing user
    // find existing user for provided username and password
    let user = users.find(
      (existingUser) =>
        existingUser.username === formData.username && existingUser.password === formData.password
    );

    // log in user, clear the form, navigate home
    if (user) {
      logInUser(user);
      clearFormData();
      navigate("/");
    }
    // otherwise set error message
    else {
      setErrorMessage("Username or Password incorrect. Please try again.");
    }
  };

  // handler for signup button
  const signupHandler = () => {
    setIsSignup(true);
  };

  // handler for cancle button, set to login
  const cancelHandler = () => {
    setIsSignup(false);
  };

  // check if form email exists in database
  const duplicateEmailCheck = (user, users) => {
    let check;

    if (users.find((existingUser) => existingUser.email === user.email)) {
      check = true;
    } else {
      check = false;
    }

    return check;
  };

  // check if form user exists in database
  const duplicateUserCheck = (user, users) => {
    let check;

    if (users.find((existingUser) => existingUser.username === user.username)) {
      check = true;
    } else {
      check = false;
    }

    return check;
  };

  // collect the data from the form and prepare it for signup or login
  const getFormData = () => {
    // get email only if creating a new user, otherwise set to null
    let email;

    if (isSignup) {
      email = document.querySelector("#email").value;
    } else {
      email = null;
    }

    // return object with form data: username, password, email
    return {
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
      email: email,
    };
  };

  // clear the form
  const clearFormData = () => {
    document.querySelector("#username").value = "";
    document.querySelector("#password").value = "";

    // email only visible for the signup form, clear only if it exists
    if (isSignup) {
      document.querySelector("#email").value = "";
    }

    // reset states to default values
    setIsSignup(false);
    setErrorMessage();
  };

  // render
  return (
    <Card>
      <div className="form-container">
        <form id="user-form" onSubmit={submitHandler}>
          <input type="hidden" />
          <input type="text" placeholder="Username" id="username" name="username" required />
          <input type="password" placeholder="Password" id="password" name="password" required />
          {isSignup ? (
            <>
              <input type="email" placeholder="Email" id="email" name="email" required />
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
