import { useContext } from "react";
import { PostContext } from "../posts/PostProvider";
import { UserContext } from "../users/UserProvider";
import UserSettings from "../users/UserSettings";
import PostList from "../posts/PostList";

export default function ProfilePage() {
  const { posts } = useContext(PostContext);
  const { user } = useContext(UserContext);

  return (
    <main>
      <h2>Profile page</h2>
      <UserSettings />
      <PostList posts={posts.filter((post) => post.user === user.id)} />
    </main>
  );
}
