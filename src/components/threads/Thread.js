import "./Thread.css";
import { useNavigate, useParams } from "react-router-dom";
import { ThreadContext } from "./ThreadProvider";
import { UserContext } from "../users/UserProvider";
import { useContext, useEffect, useState } from "react";
import ThreadSettings from "./ThreadSettings";

export default function Thread() {
  const { threads, getThreadById } = useContext(ThreadContext);
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

  const getThread = async () => {
    await getThreadById(id).then((response) => {
      setThread(response);
    });
  };

  const moderatorCheck = () => {
    if (thread.moderators.includes(1)) {
      console.log(user, "Moderator!");
      setIsModerator(true);
    }
  };

  return (
    <>
      {thread ? (
        <>
          <h2>{thread.name}</h2>
        </>
      ) : null}
      {isModerator ? <ThreadSettings thread={thread} /> : null}
    </>
  );
}

// add thread settings. Check if moderator, delete, update
