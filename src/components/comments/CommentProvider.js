import { createContext } from "react";

export const CommentContext = createContext();

export default function CommentProvider(props) {
  const getCommentByPostId = (postId) => {
    return fetch(`http://localhost:8088/comments`)
      .then((response) => response.json())
      .then((response) =>
        response.filter((comment) => comment.post === postId)
      );
  };

  const addComment = (comment) => {
    return fetch(`http://localhost:8088/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
  };

  return (
    <CommentContext.Provider value={{ getCommentByPostId, addComment }}>
      {props.children}
    </CommentContext.Provider>
  );
}
