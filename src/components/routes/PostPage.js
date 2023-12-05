import { useParams } from "react-router-dom";
import { UserContext } from "../users/UserProvider";
import { PostContext } from "../posts/PostProvider";
import { ThreadContext } from "../threads/ThreadProvider";
import { useContext, useEffect, useState } from "react";
import Post from "../posts/Post";
import PostSettings from "../posts/PostSettings";

export default function PostPage() {
  const [post, setPost] = useState({});

  const [isEditable, setIsEditable] = useState(false);
  const [isModerator, setIsModerator] = useState(false);

  const { user } = useContext(UserContext);
  const { id } = useParams();

  const { getThreadById } = useContext(ThreadContext);
  const { getPostById } = useContext(PostContext);

  useEffect(() => {
    const populateData = async () => {
      const foundPost = await getPostById(id);
      setPost(foundPost);

      if (foundPost.user === user.id) {
        setIsEditable(true);
      }

      const foundThread = await getThreadById(foundPost.thread);
      setIsModerator(foundThread.moderators.includes(user.id));
    };

    if (user) {
      populateData();
    }
  }, [user, getPostById, getThreadById, id]);

  return (
    <main>
      <h1>PostPage</h1>
      {post ? <Post post={post} /> : <p>Loading...</p>}
      {isEditable || isModerator ? (
        <PostSettings isModerator={isModerator} isEditable={isEditable} />
      ) : null}
    </main>
  );
}
