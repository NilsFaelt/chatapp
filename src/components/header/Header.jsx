import Styles from "./header.module.css";
import { ChatIcon } from "@heroicons/react/outline";
import { ChatAlt2Icon } from "@heroicons/react/solid";
import Navbar from "../navbar/Navbar";

const Header = () => {
  return (
    <header className={Styles.container}>
      <ChatAlt2Icon className={Styles.chatIcon} />
      <Navbar />
    </header>
  );
};

export default Header;
