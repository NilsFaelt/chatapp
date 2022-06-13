import ChatRoom from "../chatRoom/ChatRoom";
import Styles from "./chatRooms.module.css";

const ChatRooms = () => {
  return (
    <main className={Styles.container}>
      <ChatRoom />
      <section className={Styles.chatRoomContainer}>
        <h3 className={Styles.roomsTitle}>Rooms</h3>
        <div className={Styles.rooms}></div>
        <button
          style={{
            width: "10vw",
          }}
        >
          Add new room
        </button>
      </section>
    </main>
  );
};

export default ChatRooms;
