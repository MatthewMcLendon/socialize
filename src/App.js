import "./App.css";
import UserForm from "./components/users/UserForm";
import Navbar from "./components/navigation/Navbar";
import UserProvider from "./components/users/UserProvider";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <UserForm />
    </UserProvider>
  );
}

export default App;
