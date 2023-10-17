import "./UserSettings.css";
import { useContext, useState } from "react";
import { UserContext } from "./UserProvider";
import Card from "../style/card";

export default function UserSettings() {
  const { user, deleteUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);

  const showSettings = () => {
    setVisible(true);
  };

  const hideSettings = () => {
    setVisible(false);
  };

  const deleteUserHandler = () => {
    deleteUser(user);
  };

  const settings = (
    <Card>
      <div className="settings-container">
        <button id="close-button" onClick={hideSettings}>X</button>
        <button onClick={deleteUserHandler}>Delete account</button>
      </div>
    </Card>
  );

  return (
    <>
      {user ? <button onClick={showSettings}>Settings</button> : null}
      {visible ? settings : null}
    </>
  );
}
