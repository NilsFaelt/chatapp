import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import "./App.css";
import ChatRooms from "./components/chatRooms/ChatRooms";
import CreateUser from "./components/createuser/CreateUser";
import Footer from "./components/footer/footer";
import Header from "./components/header/Header";
import Login from "./components/login/login";
import Search from "./components/search/Search";

const socket = io.connect("http://localhost:4001/");

function App() {
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
      {/* 
      <Footer /> */}
    </div>
  );
}

export default App;
