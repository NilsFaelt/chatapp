import { useEffect, useState } from "react";
import Styles from "./chatRoom.module.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4001/");

const ChatRoom = ({ choosenRooom }) => {
  const [recivedMessage, setRecivedMessage] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", {
      message: messageInput,
      room: choosenRooom,
    });
    setMessageInput("");
  };

  useEffect(() => {
    socket.emit("join_room", choosenRooom);
    socket.on("recive_message", (data) => {
      setRecivedMessage(data.message);
      console.log(data);
    });
  }, [socket, choosenRooom]);

  return (
    <div className={Styles.container}>
      <h3 className={Styles.title}>
        {choosenRooom ? choosenRooom : "No room choosen"}
      </h3>
      <div className={Styles.messaegAndUserContainer}>
        <div className={Styles.messeageContainer}>
          <div className={Styles.displayMessage}></div>
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
    </div>
  );
};

export default ChatRoom;
