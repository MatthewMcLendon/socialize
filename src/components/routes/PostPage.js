import { useParams } from "react-router-dom";
import { UserContext } from "../users/UserProvider";
import { PostContext } from "../posts/PostProvider";
import { useContext, useEffect, useState } from "react";
import Post from "../posts/Post";

export default function PostPage() {
  const [post, setPost] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  const { users, user } = useContext(UserContext);
  const { posts } = useContext(PostContext);
  const { id } = useParams();

  useEffect(() => {
    if (posts && users && user) {
      const foundpost = posts.find((post) => post.id === Number(id));
      setPost(foundpost);
    }
  }, [posts, users, user]);

  return (
    <main>
      <h1>PostPage</h1>
      {post ? <Post post={post} /> : <p>Loading...</p>}
    </main>
  );
}
