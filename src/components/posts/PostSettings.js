export default function PostSettings({ isEditable, isModerator }) {
  return (
    <div className="post-settings">
      {isEditable || isModerator ? <p>Delete</p> : null}
    </div>
  );
}
