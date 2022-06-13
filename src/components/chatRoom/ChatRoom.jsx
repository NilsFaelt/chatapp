import Styles from "./chatRoom.module.css";
const room = "The Room";
const ChatRoom = () => {
  return (
    <div className={Styles.container}>
      <h3 className={Styles.title}>{room}</h3>
      <div className={Styles.messaegAndUserContainer}>
        <div className={Styles.messeageContainer}>
          <div className={Styles.displayMessage}></div>
          <input
            placeholder='Write messeage....'
            className={Styles.input}
            type='text'
          />
        </div>
        <section className={Styles.displayUsers}>
          <h4 className={Styles.userTitle}>Active users</h4>
        </section>
      </div>
      <button>Send</button>
    </div>
  );
};

export default ChatRoom;
