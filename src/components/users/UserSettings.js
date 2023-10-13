import "./UserSettings.css";
import { useContext, useState } from "react";
import { UserContext } from "./UserProvider";

export default function UserSettings() {
  const { user } = useContext(UserContext);
  const [visible, setVisible] = useState(false);

  const showSettings = () => {
    setVisible(true);
  };

  const hideSettings = () => {
    setVisible(false);
  };

  const settings = (
    <>
      <button onClick={hideSettings}>X</button>
    </>
  );

  return (
    <>
      {user ? <button onClick={showSettings}>Settings</button> : null}
      {visible ? settings : null}
    </>
  );
}
