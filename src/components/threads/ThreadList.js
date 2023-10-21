import { useContext } from "react";
import { ThreadContext } from "../threads/ThreadProvider";
import Thread from "../threads/Thread";

export default function ThreadList() {
  const { threads } = useContext(ThreadContext);

  return (
    <>
      {threads.map((thread) => (
        <Thread thread={thread} />
      ))}
    </>
  );
}
