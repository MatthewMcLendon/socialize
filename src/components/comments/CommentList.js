import { useContext, useEffect, useState } from "react";
import { CommentContext } from "./CommentProvider";
import Comment from "./Comment";

export default function CommentList({ post }) {
  const { getCommentsByPostId } = useContext(CommentContext);

  const [comments, setComments] = useState();

  useEffect(() => {
    const getComments = async () => {
      const commentList = await getCommentsByPostId(post.id);
      setComments(commentList);
    };

    if (post) {
      getComments();
    }
  }, [post, getCommentsByPostId]);

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
