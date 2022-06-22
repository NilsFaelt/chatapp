import { useEffect, useState } from "react";
import ChatRoom from "../chatRoom/ChatRoom";
import Styles from "./chatRooms.module.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4001/");

const ChatRooms = ({ user }) => {
  const [choosenRooom, setChoosenRoom] = useState("");
  const [rooms, setRoooms] = useState([]);
  const [activate, setActivate] = useState(false);
  const [activateTitle, setActivateTitle] = useState(true);
  const [getThemRooms, setGetThemrooms] = useState(false);

  const updateRooms = () => {
    setGetThemrooms(!getThemRooms);
  };

  const addRoom = () => {
    setActivate(!activate);
    const room = prompt("Add roomname");
    const checkIfRoom = rooms.find(
      (existingRoom) => existingRoom.name === room
    );
    if (checkIfRoom) {
      alert("room already exists, choose different name");
    } else if (room.length > 12 || room.length < 1) {
      alert("name must be between 1 and  12 charachters, please try again");
    } else {
      socket.emit("join_room", room);
      setChoosenRoom(room);
      socket.emit("addRoom", {
        room: room,
      });
    }
  };

  const chooseRoom = (room) => {
    setActivateTitle(false);
    socket.emit("join_room", room);
    console.log(room, "join roooom");

    setChoosenRoom(room);
    // socket.emit("send_message", {
    //   message: "Welcome",
    //   room: "roo2",
    //   user: "Admin",
    //   date: "",
    // });
    console.log(room);
  };

  if (!activateTitle) {
    setTimeout(() => {
      setActivateTitle(true);
    }, 2000);
  }

  useEffect(() => {
    socket.emit("get_rooms");
    socket.on("get_rooms", (data) => {
      setRoooms(data);
    });
  }, [activate, getThemRooms]);

  return (
    <main onMouseOver={updateRooms} className={Styles.container}>
      {choosenRooom ? (
        <ChatRoom
          activateTitle={activateTitle}
          setActivate={setActivate}
          activate={activate}
          choosenRooom={choosenRooom}
          user={user}
          setChoosenRoom={setChoosenRoom}
        />
      ) : (
        <h2 className={Styles.chooseRoomTitle}>No room Choosen </h2>
      )}
      <section className={Styles.chatRoomContainer}>
        <h3 className={Styles.roomsTitle}>Rooms</h3>
        <div className={Styles.rooms}>
          {rooms.length > 0 ? (
            rooms.map((room) => {
              return (
                <h4
                  key={room.name}
                  onClick={() => chooseRoom(room.name)}
                  className={Styles.roomTitle}
                >
                  {room.name}
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
