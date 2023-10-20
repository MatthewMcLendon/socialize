import { useContext } from "react";
import { ThreadContext } from "../threads/ThreadProvider";
import ThreadForm from "../threads/ThreadForm";

export default function ThreadPage() {
  const { threads } = useContext(ThreadContext);

  return (
    <main>
      <h2>Threads</h2>
      <ThreadForm />
    </main>
  );
}
