import { useEffect, useState } from "react";
import Styles from "./chatRoom.module.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4001/");

const ChatRoom = ({ choosenRooom, user }) => {
  const [recivedMessage, setRecivedMessage] = useState("");
  const [recivedFromUser, setRecivedFromUser] = useState("");
  const [messageInput, setMessageInput] = useState("");
  console.log(user);

  const sendMessage = () => {
    if (user === "No name") {
      alert("please login to send messages");
    } else if (messageInput === "") {
      alert("pleasee add message before send");
    } else if (!choosenRooom) {
      alert("you have to join room to send messages");
    } else {
      socket.emit("send_message", {
        message: messageInput,
        room: choosenRooom,
        user: user,
      });
    }
    setMessageInput("");
  };

  const leaveRoom = () => {
    socket.emit("leave_room", { choosenRooom: choosenRooom, user: user });
    console.log("levaing");
  };

  useEffect(() => {
    socket.emit("join_room", { choosenRooom: choosenRooom, user: user });
    socket.on("recive_message", (data) => {
      setRecivedMessage(data.message);
      setRecivedFromUser(data.user);
    });
  }, [socket, choosenRooom]);

  return (
    <div className={Styles.container}>
      <div className={Styles.wrapperRoomAndTitle}>
        <h3 className={Styles.title}>
          {choosenRooom ? choosenRooom : "No room choosen"}
        </h3>
        <p className={Styles.username}>Username: {user}</p>
        <button
          style={{
            backgroundColor: "red",
            marginBottom: "2vh",
            width: "10vw",
            height: "3vh",
          }}
        >
          Delete room
        </button>
      </div>

      <div className={Styles.messaegAndUserContainer}>
        <div className={Styles.messeageContainer}>
          <div className={Styles.displayMessage}>
            {recivedFromUser ? (
              <p className={Styles.fromUser}>{recivedFromUser} Says:</p>
            ) : (
              ""
            )}
            {recivedMessage ? (
              <p style={{ marginLeft: "0.5vw" }}>{recivedMessage}</p>
            ) : (
              "no messages..."
            )}
          </div>
          <textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder='Write messeage....'
            className={Styles.input}
            type='text'
          />
        </div>
        <section className={Styles.displayUsers}>
          <h4 className={Styles.userTitle}>Active users</h4>
        </section>
      </div>
      <button onClick={sendMessage}>Send</button>
      <button
        onClick={() => leaveRoom()}
        style={{
          width: "8vw",
          height: "3vh",
          marginTop: "-4vh",
          marginLeft: "40vw",
        }}
      >
        Leave room
      </button>
    </div>
  );
};

export default ChatRoom;
