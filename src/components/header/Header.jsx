import Styles from "./header.module.css";
import { ChatAlt2Icon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const Header = ({ user }) => {
  return (
    <header className={Styles.container}>
      <Link className={Styles.link} to={"/chatrooms"}>
        <ChatAlt2Icon className={Styles.chatIcon} />
      </Link>
      <Navbar />
      {user ? (
        <h3 className={Styles.userTitle}>
          UserName: <br /> <span className={Styles.userName}>{user}</span>
        </h3>
      ) : (
        <h3 className={Styles.userTitle}>UserName: No User</h3>
      )}
    </header>
  );
};

export default Header;
