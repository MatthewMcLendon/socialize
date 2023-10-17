import "./UserSettings.css";
import { useContext, useState } from "react";
import { UserContext } from "./UserProvider";
import Card from "../style/card";

export default function UserSettings() {
  const { user, deleteUser } = useContext(UserContext);

  const [isVisible, setIsVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const showSettings = () => {
    setIsVisible(true);
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

  const settings = (
    <Card>
      <div className="settings-container">
        <button id="close-button" onClick={hideSettings}>
          X
        </button>
        <button onClick={deleteUserHandler}>Delete account</button>
        <button onClick={showUpdateFormHandler}>
          Update account information
        </button>
      </div>
    </Card>
  );

  const updateForm = (
    <Card>
      <form className="userUpdate-form">
        <input type="text" placeholder="New username" />
        <input type="password" placeholder="New password" />
        <input type="email" placeholder="New email" />
        <button onClick={updateUserHandler}>Submit</button>
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
