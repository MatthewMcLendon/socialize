import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreadContext } from "./ThreadProvider";

export default function ThreadSettings({ thread }) {
  const { deleteThread } = useContext(ThreadContext);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const deleteHandler = () => {
    deleteThread(thread);
    navigate("/home");
  };

  const visibilityHandler = () => {
    setIsVisible(true);
  };

  const threadSettings = (
    <>
      <h1>Menu</h1>
      <button onClick={deleteHandler}>Delete thread</button>
    </>
  );

  return (
    <>
      <button onClick={visibilityHandler}>Settings</button>
      {isVisible ? threadSettings : null}
    </>
  );
}
