import Styles from "./header.module.css";
import { ChatAlt2Icon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const Header = () => {
  return (
    <header className={Styles.container}>
      <Link className={Styles.link} to={"/chatrooms"}>
        <ChatAlt2Icon className={Styles.chatIcon} />
      </Link>
      <Navbar />
    </header>
  );
};

export default Header;
