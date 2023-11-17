import Card from "../style/card";

export default function Post({ post }) {
  return (
    <Card>
      <p>{post.title}</p>
    </Card>
  );
}
