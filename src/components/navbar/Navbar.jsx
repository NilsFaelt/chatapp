import Styles from "./navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={Styles.container}>
      <Link className={Styles.link} to={"/chatrooms"}>
        Chatrooms
      </Link>
      <Link className={Styles.link} to={"/login"}>
        Login
      </Link>
      <Link className={Styles.link} to={"/search"}>
        Search
      </Link>
    </nav>
  );
};

export default Navbar;
