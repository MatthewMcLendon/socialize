export default function PostList(posts) {
  return (
    <ul>
      {posts.map((post) => {
        return <li></li>;
      })}
    </ul>
  );
}
