import { createContext, useContext, useEffect, useState } from "react";
import { ThreadContext } from "../threads/ThreadProvider";
import { UserContext } from "../users/UserProvider";

// create context
export const ModeratorContext = createContext();

// let other components know if the logged in user is a moderator for the content
export default function ModeratorProvider(props) {
  // import data for checking if the current user is a moderator
  const { user } = useContext(UserContext);
  const { currentThread } = useContext(ThreadContext);

  // create state to be passed to other components
  const [isModerator, setIsModerator] = useState(false);

  // update isModerator state when the current user or current thread changes
  useEffect(() => {
    // check if current user is a moderator of the current thread and set isModerator state
    const moderatorCheck = () => {
      if (currentThread) {
        currentThread.moderators.includes(user.id) ? setIsModerator(true) : setIsModerator(false);
      }
    };

    moderatorCheck();
  }, [user, currentThread]);

  // create provider
  return (
    <ModeratorContext.Provider value={{ isModerator }}>{props.children}</ModeratorContext.Provider>
  );
}

// Continue here: need to test this code and hook it up to the CommentForm. Finish CommentForm and rework other components for new ModProvider.
// Add comments to all components.
