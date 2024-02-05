import "./Thread.css";
import { useParams } from "react-router-dom";
import { ThreadContext } from "./ThreadProvider";
import { PostContext } from "../posts/PostProvider";
import { ModeratorContext } from "../moderators/ModeratorProvider";
import ThreadSettings from "./ThreadSettings";
import PostForm from "../posts/PostForm";
import PostList from "../posts/PostList";
import { useContext, useEffect } from "react";

// Take the current thread and render it
export default function Thread() {
  // import required info for rendering thread and related posts. Pull id from parameters
  const { getThreadById, currentThread } = useContext(ThreadContext);
  const { posts } = useContext(PostContext);
  const { isModerator } = useContext(ModeratorContext);

  const { id } = useParams();

  // set the current thread based on the id parameter
  useEffect(() => {
    const getData = async () => {
      await getThreadById(id);
    };

    getData();
  }, [id]);

  // render
  return (
    <>
      {currentThread ? (
        <>
          <h2>{currentThread.name}</h2>
          <p>{currentThread.description}</p>
          {isModerator ? <ThreadSettings thread={currentThread} /> : null}
          <PostForm threadId={id} />
          <PostList posts={posts} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
