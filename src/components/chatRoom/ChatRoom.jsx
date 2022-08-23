import { useEffect, useState } from "react";
import Styles from "./chatRoom.module.css";
import io from "socket.io-client";
import { getTime } from "../../timeFunc";
import { useNavigate } from "react-router-dom";
const url = process.env.SERVER;
const socket = io.connect(url);

const ChatRoom = ({
  djungel,
  choosenRooom,
  user,
  setChoosenRoom,
  setActivate,
  activate,
  activateTitle,
  chooseRoom,
}) => {
  const navigate = useNavigate();
  const [recivedMessage, setRecivedMessage] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [date, setDate] = useState();
  const [messageAlert, setMessageAlert] = useState(false);

  useEffect(() => {
    setDate(getTime());
  }, [messageInput]);

  const sendMessage = () => {
    if (user === "No name") {
      alert("please login to send messages");
    } else if (!choosenRooom) {
      alert("you have to join room to send messages");
    } else {
      const newMessage = {
        message: messageInput,
        room: choosenRooom,
        user: user,
        date: date,
      };
      if (newMessage.message !== "") {
        setRecivedMessage([...recivedMessage, newMessage]);
      }
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
    setRecivedMessage("");
    setChoosenRoom("");
    socket.emit("leave_room", { choosenRooom: choosenRooom, user: user });
    navigate("/chatrooms");
    console.log("levaing");
  };

  const deleteRoom = () => {
    const confirmed = confirm(
      `Sure you wanna delete room: ${choosenRooom}, all messages will be deleted`
    );
    if (!confirmed) {
      return;
    }
    navigate("/chatrooms");
    setChoosenRoom("");
    setRecivedMessage([]);
    socket.emit("delete_room", choosenRooom);
    socket.emit("leave_room", { choosenRooom: choosenRooom, user: user });
    setActivate(!activate);
  };

  useEffect(() => {
    socket.emit("join_room", { choosenRooom: choosenRooom, user: user });
    socket.on("recive_message", (data) => {
      setRecivedMessage(data);
    });
    socket.on("back_to_room", (data) => {
      setRecivedMessage(data);
    });
  }, [socket, choosenRooom, chooseRoom]);

  return (
    <div className={djungel ? Styles.djungleContainer : Styles.container}>
      <div className={Styles.wrapperRoomAndTitle}>
        {choosenRooom ? (
          <h3 className={activateTitle ? Styles.title : Styles.alertTitle}>
            {" "}
            {choosenRooom}
          </h3>
        ) : (
          <h3 className={Styles.title}>No choosen rooom</h3>
        )}
        <p className={Styles.username}>Username: {user}</p>
        {choosenRooom ? (
          <button
            className='buttonWarning'
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
            {recivedMessage
              ? recivedMessage.map((message) => {
                  return (
                    <div key={message.date}>
                      <h3 className={Styles.sentFromUser}>
                        {message.user} says
                      </h3>
                      <h3 className={Styles.tex}>{message.message}</h3>
                      <p className={Styles.date}>{message.date}</p>
                    </div>
                  );
                })
              : "no messages..."}
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
