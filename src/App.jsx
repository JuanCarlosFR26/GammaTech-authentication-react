import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import UserListProvider, { UserProvider } from "./context/UserListProvider";
import "./styles/index.css";
import UserList from "./components/UserList";
// import { useContext, useEffect  } from "react";

function App() {

  return (
    <UserListProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </BrowserRouter>
    </UserListProvider>
  );
}

export default App;
