import { useEffect, useState } from "react";
import ChatRoom from "../chatRoom/ChatRoom";
import Styles from "./chatRooms.module.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4001/");

const ChatRooms = ({ user }) => {
  const [choosenRooom, setChoosenRoom] = useState("");
  const [rooms, setRoooms] = useState([]);

  const addRoom = () => {
    const room = prompt("Add roomname");
    const checkIfRoom = rooms.find((existingRoom) => existingRoom === room);
    if (checkIfRoom) {
      alert("room already exists, choose different name");
    } else if (room.length > 12 || room.length < 1) {
      alert("name must be between 1 and  12 charachters, please try again");
    } else {
      setRoooms([...rooms, room]);
      socket.emit("join_room", room);
      setChoosenRoom(room);
    }
  };
  const chooseRoom = (room) => {
    socket.emit("join_room", room);
    console.log(room, "join roooom");
    setChoosenRoom(room);
  };

  return (
    <main className={Styles.container}>
      <ChatRoom
        choosenRooom={choosenRooom}
        user={user}
        setChoosenRoom={setChoosenRoom}
      />
      <section className={Styles.chatRoomContainer}>
        <h3 className={Styles.roomsTitle}>Rooms</h3>
        <div className={Styles.rooms}>
          {rooms.length > 0 ? (
            rooms.map((room) => {
              return (
                <h4
                  onClick={() => chooseRoom(room)}
                  className={Styles.roomTitle}
                >
                  {room}
                </h4>
              );
            })
          ) : (
            <p className={Styles.userTitle}> No active rooms at the moment</p>
          )}
        </div>
        <button
          style={{
            marginTop: "2vh",
            width: "10vw",
          }}
          onClick={addRoom}
        >
          Add new room
        </button>
      </section>
    </main>
  );
};

export default ChatRooms;
