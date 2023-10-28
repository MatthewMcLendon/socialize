import { useContext } from "react";
import { ThreadContext } from "../threads/ThreadProvider";
import { useNavigate } from "react-router-dom";

export default function ThreadList() {
  const { threads } = useContext(ThreadContext);

  const navigate = useNavigate();

  const navigationHandler = (thread) => {
    navigate(`/threads/${thread.id}`);
  };

  const threadList = threads ? (
    <ul>
      {threads.map((thread) => (
        <li
          key={thread.id}
          onClick={() => {
            navigationHandler(thread);
          }}
        >
          {thread.name}
        </li>
      ))}
    </ul>
  ) : (
    <p>Loading....</p>
  );

  return <>{threadList}</>;
}

// May change to use a provided list instead of context for user subscriptions.
