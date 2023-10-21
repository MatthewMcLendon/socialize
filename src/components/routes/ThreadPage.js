import { useContext } from "react";
import { ThreadContext } from "../threads/ThreadProvider";
import ThreadForm from "../threads/ThreadForm";
import Thread from "../threads/Thread";

export default function ThreadPage() {
  const { threads } = useContext(ThreadContext);

  return (
    <main>
      <h2>Threads</h2>
      <ThreadForm />
      {threads.map((thread) => (
        <Thread thread={thread} />
      ))}
    </main>
  );
}
