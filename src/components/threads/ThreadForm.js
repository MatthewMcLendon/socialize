import "./ThreadForm.css";
import Card from "../style/Card";
import { UserContext } from "../users/UserProvider";
import { useContext, useState } from "react";

export default function ThreadForm() {
  const { users, user } = useContext(UserContext);

  const [moderators, setModerators] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();

    console.log("Submit");
  };

  const addModeratorHandler = () => {
    const formText = document.querySelector("#moderator-search").value;
    const moderator = moderatorCheck(formText);

    if (moderator) {
      setModerators([...moderators, moderator]);
      document.querySelector("#moderator-search").value = "";
    }
  };

  const moderatorCheck = (username) => {
    const foundModerator = users.find((user) => user.username === username);
    return foundModerator;
  };

  const moderatorList = (
    <ul className="moderator-list">
      {moderators.map((moderator) => {
        return <li key={moderator.id}>{moderator.username}</li>;
      })}
    </ul>
  );

  return (
    <Card>
      <form id="thread-form" onSubmit={submitHandler}>
        <input type="hidden" />
        <input type="text" placeholder="Thread name" required />
        <textarea
          name="description"
          id=""
          cols="30"
          rows="10"
          placeholder="Thread description"
        />
        <input type="search" id="moderator-search" placeholder="Moderators" />
        <button type="button" onClick={addModeratorHandler}>
          Add moderator
        </button>
        {moderatorList}
      </form>
      <button type="submit" form="thread-form">
        Submit
      </button>
    </Card>
  );
}
