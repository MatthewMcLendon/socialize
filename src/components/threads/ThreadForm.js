import "./ThreadForm.css";
import Card from "../style/Card";

export default function ThreadForm() {
  const submitHandler = (event) => {
    event.preventDefault();

    console.log("Submit");
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="hidden" />
      <input type="text" placeholder="Thread name" required />
      <textarea
        name="description"
        id=""
        cols="30"
        rows="10"
        placeholder="Thread description"
      />
      <input type="text" placeholder="Moderators" />

      <button type="submit">Submit</button>
    </form>
  );
}
