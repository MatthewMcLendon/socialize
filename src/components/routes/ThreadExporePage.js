import ThreadForm from "../threads/ThreadForm";
import ThreadList from "../threads/ThreadList";

export default function ThreadExplorePage() {
  return (
    <main>
      <h2>Threads</h2>
      <ThreadForm />
      <ThreadList />
    </main>
  );
}
