import Styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const Login = ({ setUser, user }) => {
  const [dummyLogin, setDummyLogin] = useState("");
  const loginUser = (e) => {
    e.preventDefault();
    setDummyLogin(user);
  };
  return (
    <div className={Styles.container}>
      <h3 className={Styles.title}>Login</h3>
      <form type='submit' className={Styles.form}>
        <label className={Styles.label} htmlFor=''>
          Username: {dummyLogin ? dummyLogin : "no user"}
        </label>
        <input
          onChange={(e) => setUser(e.target.value)}
          className={Styles.input}
          type='text'
        />
        {/* <label className={Styles.label} htmlFor=''>
          Password:
        </label>
        <input className={Styles.input} type='text' /> */}
        <Link className={Styles.link} to={"/createuser"}>
          Create user?
        </Link>
        <button
          onClick={(e) => {
            loginUser(e);
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
