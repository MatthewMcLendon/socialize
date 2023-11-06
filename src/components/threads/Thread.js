import "./Thread.css";
import { useNavigate, useParams } from "react-router-dom";
import { ThreadContext } from "./ThreadProvider";
import { UserContext } from "../users/UserProvider";
import { useContext, useEffect, useState } from "react";

export default function Thread() {
  const { threads, deleteThread, getThreadById } = useContext(ThreadContext);
  const { user } = useContext(UserContext);

  const [isModerator, setIsModerator] = useState(false);
  const [thread, setThread] = useState();
  const { id } = useParams();

  useEffect(() => {
    threads
      ? setThread(threads.find((thread) => thread.id === Number(id)))
      : getThread();
  }, []);

  useEffect(() => {
    if (user && thread) {
      moderatorCheck();
    }
  }, [user, thread]);

  const navigate = useNavigate();

  const deleteHandler = () => {
    deleteThread();
    navigate("/home");
  };

  const getThread = async () => {
    await getThreadById(id).then((response) => {
      setThread(response);
    });
  };

  const moderatorCheck = () => {
    // if (thread.moderators.includes(1)) {
    //   console.log(user, "Moderator!");
    // }
    console.log(thread.moderators);
  };

  return (
    <>
      {thread ? (
        <>
          <h2>{thread.name}</h2>
          <button onClick={deleteHandler}>Delete</button>
        </>
      ) : null}
    </>
  );
}

// add thread settings. Check if moderator, delete, update
// continue here - need to figure out why page isn't refreshing when thread is updated.
