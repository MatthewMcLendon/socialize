import { useContext } from "react";
import { PostContext } from "./PostProvider";
import Post from "./Post";

export default function PostList({ threadId }) {
  const { posts } = useContext(PostContext);

  return (
    <ul>
      {posts
        .filter((post) => Number(post.thread) === Number(threadId))
        .map((post) => {
          return <Post key={post.id} post={post} />;
        })}
    </ul>
  );
}
