import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreadContext } from "./ThreadProvider";
import { UserContext } from "../users/UserProvider";
import Card from "../style/Card";

export default function ThreadSettings({ thread }) {
  const { deleteThread, updateThread } = useContext(ThreadContext);
  const { getUserById } = useContext(UserContext);

  const [isVisible, setIsVisible] = useState(false);
  const [moderators, setModerators] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // if (thread) {
    //   populateModerators();
    // }
    populateModerators();
  }, []);

  const populateModerators = () => {
    thread.moderators.map(async (mod) => {
      const moderator = await getUserById(mod);
      setModerators([...moderators, moderator]);
    });
  };

  const deleteHandler = () => {
    deleteThread(thread);
    navigate("/");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const data = getFormData();

    if (data.name) {
      thread.name = data.name;
    }

    if (data.description) {
      thread.description = data.description;
    }

    clearFormData();
    setIsVisible(false);

    updateThread(thread);

    console.log(data);
  };

  const getFormData = () => {
    const data = {
      name: document.querySelector("#thread-name").value,
      description: document.querySelector("#thread-description").value,
    };

    return data;
  };

  const clearFormData = () => {
    document.querySelector("#thread-name").value = null;
    document.querySelector("#thread-description").value = null;
  };

  const threadSettings = (
    <Card>
      <h1>Menu</h1>
      <button
        onClick={() => {
          setIsVisible(false);
        }}
      >
        X
      </button>
      <button onClick={deleteHandler}>Delete thread</button>
      <form id="thread-update-form" onSubmit={submitHandler}>
        <input type="text" id="thread-name" placeholder={thread.name} />
        <textarea
          name="description"
          id="thread-description"
          cols="30"
          rows="10"
          placeholder={thread.description}
        ></textarea>
        <ul>
          {moderators.map((mod) => {
            return <li key={mod.id}>{mod.username} <button>Remove Moderator</button></li>;
          })}
        </ul>
        <button>Update</button>
      </form>
    </Card>
  );

  return (
    <>
      {isVisible ? (
        threadSettings
      ) : (
        <button
          onClick={() => {
            setIsVisible(true);
          }}
        >
          Settings
        </button>
      )}
    </>
  );
}
