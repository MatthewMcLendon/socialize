import "./UserSettings.css";
import { useContext, useState } from "react";
import { UserContext } from "./UserProvider";
import Card from "../style/card";

export default function UserSettings() {
  const { user, deleteUser } = useContext(UserContext);

  const [isVisible, setIsVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

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

  const deleteUserHandler = () => {
    deleteUser(user);
  };

  const showUpdateFormHandler = () => {
    setIsVisible(false);
    setIsUpdating(true);
  };

  const updateUserHandler = (event) => {
    event.preventDefault();

    setIsUpdating(false);
  };

  // const getFormData = () => {
  //   const data = {
  //     username: document.querySelector("#username").value,
  //     password: document.querySelector("#password").value,
  //     email: document.querySelector("#email").value,
  //   };

  //   return data;
  // };

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
      <>
        {isUpdatingUsername ? null : (
          <button onClick={showUsername}>Change Username</button>
        )}
        {isUpdatingPassword ? null : (
          <button onClick={showPassword}>Change Password</button>
        )}
        {isUpdatingEmail ? null : (
          <button onClick={showEmail}>Change Email</button>
        )}
      </>
      <form className="userUpdate-form" onClick={updateUserHandler}>
        {isUpdatingUsername ? (
          <input type="text" id="username" placeholder="New username" />
        ) : null}
        {isUpdatingPassword ? (
          <input type="password" id="password" placeholder="New password" />
        ) : null}
        {isUpdatingEmail ? (
          <input type="email" id="email" placeholder="New email" />
        ) : null}
        <button>Submit</button>
      </form>
    </Card>
  );

  return (
    <>
      {user ? <button onClick={showSettings}>Settings</button> : null}
      {isVisible ? settings : null}
      {isUpdating ? updateForm : null}
    </>
  );
}

// continue here: work on updating user profile.
