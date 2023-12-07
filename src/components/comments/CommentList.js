import { useContext, useEffect, useState } from "react";
import { CommentContext } from "./CommentProvider";
import Comment from "./Comment";

export default function CommentList({ post }) {
  const { getCommentsByPostId } = useContext(CommentContext);

  const [comments, setComments] = useState();

  const getComments = async () => {
    const commentList = await getCommentsByPostId(post.id);
    setComments(commentList);
  };

  useEffect(() => {
    if (post) {
      getComments();
    }
  }, [post]);

  return (
    <ul>
      {comments ? (
        comments.map((comment) => {
          return (
            <li key={comment.id}>
              <Comment comment={comment} />
            </li>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </ul>
  );
}
