import { useContext, useEffect, useState } from "react";
import { CommentContext } from "./CommentProvider";
import Comment from "./Comment";

// render a list of comments for a post from props
export default function CommentList({ post }) {
  // import get route for comments by id from context, initialize state for storing those comments
  const { getCommentsByPostId } = useContext(CommentContext);
  const [comments, setComments] = useState([]);

  // get comments from db
  useEffect(() => {
    const getComments = async () => {
      const commentList = await getCommentsByPostId(post.id);
      setComments(commentList);
    };

    if (post) {
      getComments();
    }
  }, [post, getCommentsByPostId]);

  // render
  return (
    <ul>
      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            <Comment comment={comment} />
          </li>
        );
      })}
    </ul>
  );
}
