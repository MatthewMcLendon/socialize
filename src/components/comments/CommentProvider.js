import { createContext } from "react";

// create context for comments
export const CommentContext = createContext();

// provide data and related functions to props for comments
export default function CommentProvider(props) {
  // get comments for specific post
  const getCommentsByPostId = (postId) => {
    return fetch(`http://localhost:8088/comments`)
      .then((response) => response.json())
      .then((response) =>
        response.filter((comment) => comment.post === postId)
      );
  };

  // add a comment
  const addComment = (comment) => {
    return fetch(`http://localhost:8088/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
  };

  // edit a comment

  // delete a comment

  // create provider
  return (
    <CommentContext.Provider value={{ getCommentsByPostId, addComment }}>
      {props.children}
    </CommentContext.Provider>
  );
}
