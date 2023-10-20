import { useContext } from "react";
import { ThreadContext } from "../threads/ThreadProvider";

export default function ThreadPage() {
  const { threads } = useContext(ThreadContext);

  return (
    <main>
      <h2>Threads</h2>
    </main>
  );
}
