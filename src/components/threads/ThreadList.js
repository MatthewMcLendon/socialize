import { useContext } from "react";
import { ThreadContext } from "../threads/ThreadProvider";
import { useNavigate } from "react-router-dom";

export default function ThreadList() {
  const { threads, setThread } = useContext(ThreadContext);

  const navigate = useNavigate();

  const navigationHandler = (thread) => {
    setThread(thread);
    navigate(`/threads/${thread.id}`);
  };

  return (
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
  );
}
