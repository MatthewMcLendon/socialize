import { createContext, useContext } from "react";
import { ThreadContext } from "../threads/ThreadProvider";
import { UserContext } from "../users/UserProvider";
import { PostContext } from "../posts/PostProvider";

// create context
export const ModeratorContext = createContext();

// provide other components with moderator data
export default function ModeratorProvider(props) {
  // import data for checking if the current user is a moderator

  const { user } = useContext(UserContext);
  const { getThreadById } = useContext(ThreadContext);
  const { getPostById } = useContext(PostContext);

  // check if current user is a moderator of a thread
  const moderatorCheck = async (input) => {
    // common functionality to all types
    const check = (thread) => {
      if (thread.moderators.includes(user.id)) {
        return true;
      } else {
        return false;
      }
    };

    // check for given input type if current user is moderator. input format = {data: query, type: "typeName"}
    switch (input) {
      case (input.type = "thread"):
        return check(input.data);
      case (input.type = "post"):
        const currentThread = await getThreadById(input.data.thread);
        return check(currentThread);
      case (input.type = "comment"):
        const currentPost = await getPostById(input.data.post);
        return check(await getThreadById(currentPost.thread));
      default:
        return false;
    }
  };

  // create provider
  return (
    <ModeratorContext.Provider value={{ moderatorCheck }}>
      {props.children}
    </ModeratorContext.Provider>
  );
}
