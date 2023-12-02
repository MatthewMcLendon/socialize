import Post from "./Post";
import { Link } from "react-router-dom";

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <Post post={post} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
