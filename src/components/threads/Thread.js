import "./Thread.css";
import { useParams } from "react-router-dom";
import { ThreadContext } from "./ThreadProvider";
import { UserContext } from "../users/UserProvider";
import { useContext, useEffect, useState } from "react";
import ThreadSettings from "./ThreadSettings";

export default function Thread() {
  const { threads } = useContext(ThreadContext);
  const { user } = useContext(UserContext);

  const [isModerator, setIsModerator] = useState(false);
  const [thread, setThread] = useState();

  const { id } = useParams();

  useEffect(() => {
    const moderatorCheck = (thread) => {
      if (thread.moderators.includes(user.id)) {
        setIsModerator(true);
      }
    };

    if (threads && user) {
      const loadedThread = threads.find((thread) => thread.id === Number(id));
      setThread(loadedThread);
      moderatorCheck(loadedThread);
    }
  }, [threads, user, id]);

  return (
    <>
      {thread ? (
        <>
          <h2>{thread.name}</h2>
          <p>{thread.description}</p>
        </>
      ) : null}
      {isModerator ? <ThreadSettings thread={thread} /> : null}
    </>
  );
}
