import Styles from "./createUser.module.css";
import { Link } from "react-router-dom";

const CreateUser = () => {
  return (
    <div className={Styles.container}>
      <h3 className={Styles.title}>Create user</h3>
      <form type='submit' className={Styles.form}>
        <label className={Styles.label} htmlFor=''>
          Username:
        </label>
        <input className={Styles.input} type='text' />
        <label className={Styles.label} htmlFor=''>
          Password:
        </label>
        <input className={Styles.input} type='text' />
        <label className={Styles.label} htmlFor=''>
          Confirm Password:
        </label>
        <input className={Styles.input} type='text' />
        <Link className={Styles.link} to={"/login"}>
          Login?
        </Link>
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateUser;
