import Styles from "./login.module.css";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className={Styles.container}>
      <h3 className={Styles.title}>Login</h3>
      <form type='submit' className={Styles.form}>
        <label className={Styles.label} htmlFor=''>
          Username:
        </label>
        <input className={Styles.input} type='text' />
        <label className={Styles.label} htmlFor=''>
          Password:
        </label>
        <input className={Styles.input} type='text' />
        <Link className={Styles.link} to={"/createuser"}>
          Create user?
        </Link>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
