import { createContext } from "react";

export const CommentContext = createContext();

export default function CommentProvider(props) {
  return (
    <CommentContext.Provider value={{}}>
      {props.children}
    </CommentContext.Provider>
  );
}
