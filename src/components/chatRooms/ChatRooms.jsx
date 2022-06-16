import { useState } from "react";
import ChatRoom from "../chatRoom/ChatRoom";
import Styles from "./chatRooms.module.css";

const ChatRooms = () => {
  const [rooms, setRoooms] = useState([]);
  console.log(rooms);

  const addRoom = () => {
    const room = prompt("Add roomname");
    if (room.length > 12) {
      alert("max length is 12 charachters, please try again");
    } else {
      setRoooms([...rooms, room]);
    }
  };

  return (
    <main className={Styles.container}>
      <ChatRoom />
      <section className={Styles.chatRoomContainer}>
        <h3 className={Styles.roomsTitle}>Rooms</h3>
        <div className={Styles.rooms}>
          {rooms.length > 0 ? (
            rooms.map((room) => {
              return <h4 className={Styles.roomTitle}>{room}</h4>;
            })
          ) : (
            <p className={Styles.userTitle}> No active rooms at the moment</p>
          )}
        </div>
        <button
          style={{
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
