import "./UserSettings.css";
import { useContext, useState } from "react";
import { UserContext } from "./UserProvider";
import Card from "../style/card";

export default function UserSettings() {
  const { user, deleteUser, updateUser } = useContext(UserContext);

  const [isVisible, setIsVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  const [message, setMessage] = useState();

  const updateUserHandler = (event) => {
    event.preventDefault();

    const formData = getFormData();
    formData.id = user.id;
    updateUser(formData);
    setMessage("Account information updated!");

    resetForm();
  };

  const deleteUserHandler = () => {
    deleteUser(user);
  };

  const showSettings = () => {
    setIsVisible(true);
  };

  const showUsername = () => {
    setIsUpdatingUsername(true);
  };

  const showPassword = () => {
    setIsUpdatingPassword(true);
  };

  const showEmail = () => {
    setIsUpdatingEmail(true);
  };

  const hideSettings = () => {
    setIsVisible(false);
  };

  const showUpdateFormHandler = () => {
    setIsVisible(false);
    setIsUpdating(true);
  };

  const resetForm = () => {
    setIsUpdating(false);
    setIsUpdatingUsername(false);
    setIsUpdatingPassword(false);
    setIsUpdatingEmail(false);
  };

  const getFormData = () => {
    let username;
    let password;
    let email;

    isUpdatingUsername
      ? (username = document.querySelector("#username").value)
      : (username = user.username);

    isUpdatingPassword
      ? (password = document.querySelector("#password").value)
      : (password = user.password);

    isUpdatingEmail
      ? (email = document.querySelector("#email").value)
      : (email = user.email);

    const data = {
      username: username,
      password: password,
      email: email,
    };

    return data;
  };

  const settings = (
    <Card>
      <div className="settings-container">
        <button id="close-button" onClick={hideSettings}>
          X
        </button>
        <button onClick={deleteUserHandler}>Delete Account</button>
        <button onClick={showUpdateFormHandler}>Account Settings</button>
      </div>
    </Card>
  );

  const updateForm = (
    <Card>
      <button
        onClick={() => {
          resetForm();
        }}
      >
        X
      </button>
      {isUpdatingUsername ? null : (
        <button onClick={showUsername}>Change Username</button>
      )}
      {isUpdatingPassword ? null : (
        <button onClick={showPassword}>Change Password</button>
      )}
      {isUpdatingEmail ? null : (
        <button onClick={showEmail}>Change Email</button>
      )}
      <form className="userUpdate-form" onSubmit={updateUserHandler}>
        {isUpdatingUsername ? (
          <input
            type="text"
            name="username"
            id="username"
            placeholder="New username"
            defaultValue={user.username}
          />
        ) : null}
        {isUpdatingPassword ? (
          <input
            type="password"
            name="password"
            id="password"
            placeholder="New password"
          />
        ) : null}
        {isUpdatingEmail ? (
          <input
            type="email"
            name="email"
            id="email"
            placeholder="New email"
            defaultValue={user.email}
          />
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </Card>
  );

  return (
    <>
      {user ? <button onClick={showSettings}>Settings</button> : null}
      {message ? <p>{message}</p> : null}
      {isVisible ? settings : null}
      {isUpdating ? updateForm : null}
    </>
  );
}
