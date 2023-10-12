import "./App.css";
import UserForm from "./components/users/UserForm";
import UserProvider from "./components/users/UserProvider";

function App() {
  return (
    <UserProvider>
      <UserForm />
    </UserProvider>
  );
}

export default App;
