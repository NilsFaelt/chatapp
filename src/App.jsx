import { useEffect } from "react";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "./App.css";
import ChatRooms from "./components/chatRooms/ChatRooms";
import CreateUser from "./components/createuser/CreateUser";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Search from "./components/search/Search";

//url till backend
const url = "https://chat-app-server-cme.herokuapp.com/";
const socket = io.connect(url);

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
  const [user, setUser] = useState("No name");
  return (
    <div className='App'>
      <Header user={user} />
      <Routes>
        <Route
          path='/login'
          element={<Login setUser={setUser} user={user} />}
        />
        <Route path='/chatrooms' element={<ChatRooms user={user} />} />
        <Route path='/search' element={<Search />} />
        <Route path='/createuser' element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default App;
