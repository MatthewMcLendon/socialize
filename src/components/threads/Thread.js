import "./Thread.css";
import { useParams } from "react-router-dom";
import { ThreadContext } from "./ThreadProvider";
import { PostContext } from "../posts/PostProvider";
import { UserContext } from "../users/UserProvider";
import { useContext, useEffect, useState } from "react";
import ThreadSettings from "./ThreadSettings";
import PostForm from "../posts/PostForm";
import PostList from "../posts/PostList";

export default function Thread() {
  const { threads } = useContext(ThreadContext);
  const { user } = useContext(UserContext);
  const { posts } = useContext(PostContext);

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

  const threadContent = (
    <>
      <h2>{thread.name}</h2>
      <p>{thread.description}</p>
      {isModerator ? <ThreadSettings thread={thread} /> : null}
      <PostForm threadId={id} />
      <PostList posts={posts.filter((post) => post.thread === id)} />
    </>
  );

  return <>{thread ? threadContent : <p>Loading...</p>}</>;
}
