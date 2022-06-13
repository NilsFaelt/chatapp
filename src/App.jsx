import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatRooms from "./components/chatRooms/ChatRooms";
import CreateUser from "./components/createuser/CreateUser";
import Footer from "./components/footer/footer";
import Header from "./components/header/Header";
import Login from "./components/login/login";
import Search from "./components/search/Search";

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/chatrooms' element={<ChatRooms />} />
        <Route path='/search' element={<Search />} />
        <Route path='/createuser' element={<CreateUser />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
