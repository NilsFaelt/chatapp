import { useState } from "react";
import Styles from "./search.module.css";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  console.log(searchInput);
  const handleCilck = (e) => {
    e.preventDefault();
    setSearchInput("");
  };
  return (
    <div className={Styles.container}>
      <h3 className={Styles.title}>Search</h3>
      <form type='submit' className={Styles.form}>
        <label className={Styles.label} htmlFor=''>
          Enter username or room id
        </label>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={Styles.input}
          type='text'
        />
        <button onClick={handleCilck}>Search</button>
      </form>
    </div>
  );
};

export default Search;
