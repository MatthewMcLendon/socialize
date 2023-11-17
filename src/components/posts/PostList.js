import Post from "./Post";

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </ul>
  );
}
