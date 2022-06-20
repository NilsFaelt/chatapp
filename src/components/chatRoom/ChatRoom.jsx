import { useEffect, useState } from "react";
import Styles from "./chatRoom.module.css";
import io from "socket.io-client";
import { getTime } from "../../timeFunc";

const socket = io.connect("http://localhost:4001/");

const ChatRoom = ({ choosenRooom, user, setChoosenRoom }) => {
  const [recivedMessage, setRecivedMessage] = useState("");
  const [recivedFromUser, setRecivedFromUser] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [date, setDate] = useState();
  const [messageAlert, setMessageAlert] = useState(false);

  const sendMessage = () => {
    if (user === "No name") {
      alert("please login to send messages");
    } else if (!choosenRooom) {
      alert("you have to join room to send messages");
    } else {
      setDate(getTime());
      socket.emit("send_message", {
        message: messageInput,
        room: choosenRooom,
        user: user,
        date: date,
      });
      if (messageInput === "") {
        setMessageAlert(true);
      }
    }
    setMessageInput("");
  };

  if (messageAlert) {
    setTimeout(() => {
      setMessageAlert(false);
    }, 100);
  }

  const leaveRoom = () => {
    setChoosenRoom("");
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

  const deleteRoom = () => {
    socket.emit("delete_room", choosenRooom);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.wrapperRoomAndTitle}>
        {choosenRooom ? (
          <h3 className={Styles.title}>Room: {choosenRooom}</h3>
        ) : (
          <h3 className={Styles.title}>No choosen rooom</h3>
        )}
        <p className={Styles.username}>Username: {user}</p>
        {choosenRooom ? (
          <button
            onClick={() => deleteRoom()}
            style={{
              marginBottom: "2vh",
              width: "10vw",
              height: "3vh",
            }}
          >
            Delete room
          </button>
        ) : (
          <p
            style={{
              marginBottom: "2vh",
              width: "10vw",
              height: "3vh",
            }}
          ></p>
        )}
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
              <p style={{ marginLeft: "0.5vw", fontSize: "1vw" }}>
                {recivedMessage}
              </p>
            ) : (
              "no messages..."
            )}
            {recivedMessage ? <p className={Styles.date}>{date}</p> : ""}
          </div>

          <textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder='Write messeage....'
            className={messageAlert ? Styles.alertInput : Styles.input}
            type='text'
          />
        </div>
        <section className={Styles.displayUsers}>
          <h4 className={Styles.userTitle}>Active users</h4>
        </section>
      </div>
      <button onClick={() => sendMessage()}>Send</button>
      <button
        onClick={() => leaveRoom()}
        type='submit'
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
