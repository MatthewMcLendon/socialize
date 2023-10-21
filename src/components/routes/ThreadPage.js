import ThreadForm from "../threads/ThreadForm";
import ThreadList from "../threads/ThreadList";

export default function ThreadPage() {
  return (
    <main>
      <h2>Threads</h2>
      <ThreadForm />
      <ThreadList />
    </main>
  );
}
