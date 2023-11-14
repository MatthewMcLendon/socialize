import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreadContext } from "./ThreadProvider";
import { UserContext } from "../users/UserProvider";
import Card from "../style/Card";

export default function ThreadSettings({ thread }) {
  const { deleteThread, updateThread } = useContext(ThreadContext);
  const { getUserById, users } = useContext(UserContext);

  const [isVisible, setIsVisible] = useState(false);
  const [moderators, setModerators] = useState([]);
  const [message, setMessage] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    populateModerators();
  }, []);

  // Moderator functions:
  const populateModerators = () => {
    let modArray = [];

    thread.moderators.map(async (mod) => {
      const modData = await getUserById(mod);
      modArray.push(modData);
    });

    setModerators(modArray);
  };

  const removeModeratorHandler = (id) => {
    let newModerators = moderators.filter((mod) => mod.id !== id);
    setModerators(newModerators);
  };

  const addModeratorHandler = (username) => {
    const newMod = users.find((user) => user.username === username);

    if (newMod) {
      if (
        moderators.find((moderator) => moderator.username === newMod.username)
      ) {
        setMessage("User is already a moderator!");
        return;
      } else {
        const newMods = [...moderators, newMod];
        setModerators(newMods);
      }
    } else {
      setMessage("User not found, please try again.");
    }
  };

  // Thread functions:
  const deleteHandler = () => {
    deleteThread(thread);
    navigate("/");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const data = getFormData();

    if (moderators.length === 0) {
      setMessage(
        "Must have moderators. Please add a moderator to the thread or delete the thread."
      );
      return;
    } else {
      let modIds = [];
      moderators.map((mod) => {
        return modIds.push(mod.id);
      });

      thread.moderators = modIds;
    }

    if (data.name) {
      thread.name = data.name;
    }

    if (data.description) {
      thread.description = data.description;
    }

    clearFormData();
    setIsVisible(false);

    updateThread(thread);
  };

  // Form functions:
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
    setMessage();
  };

  const closeForm = () => {
    setIsVisible(false);
    clearFormData();
  };

  const threadSettings = (
    <Card>
      <h1>Thread Settings</h1>
      <button onClick={closeForm}>X</button>
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
        <input
          id="moderator-username"
          type="text"
          placeholder="Moderator username"
        />{" "}
        <button
          type="button"
          onClick={() => {
            addModeratorHandler(
              document.querySelector("#moderator-username").value
            );
          }}
        >
          Add moderator
        </button>
        <ul>
          {moderators.map((mod) => {
            return (
              <li key={mod.id}>
                {mod.username}{" "}
                <button
                  type="button"
                  onClick={() => {
                    removeModeratorHandler(mod.id);
                  }}
                >
                  Remove Moderator
                </button>
              </li>
            );
          })}
        </ul>
        {message ? <p>{message}</p> : null}
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
