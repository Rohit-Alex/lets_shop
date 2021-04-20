import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, provider } from "../../firebase";
import "./style.css";

const FormValidate = ({ setRender }) => {
  const userDetails = JSON.parse(localStorage.getItem("user"));
  console.log(userDetails);
  let history = useHistory();
  const [user, setUser] = useState({ userName: "", email: "", password: "" });
  const [error, setError] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const defaultError = { userName: "", email: "", password: "" };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.userName === "") {
      setError({ ...defaultError, userName: "Enter a name" });
    } else if (user.email.indexOf("@") === -1) {
      setError({ ...defaultError, email: "enter a valid email" });
    } else if (
      userDetails === null ||
      user.userName !== userDetails?.userName
    ) {
      setError({ ...defaultError, userName: "***No record found***" });
    } else if (user.email !== userDetails?.email) {
      setError({ ...defaultError, email: "***No record found***" });
    } else if (user.password !== userDetails?.password) {
      setError({ ...defaultError, password: " ***password doesn't match***" });
    } else setRender(false);
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <div className="content">
        <div className="formCont">
          <form onSubmit={handleSubmit}>
            <label htmlFor="userName"> User Name : </label>
            <br />
            <input
              className="input"
              type="text"
              id="userName"
              value={user.userName}
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>{error.userName}</div>
            <br />
            <label htmlFor="email"> Email : </label>
            <br />
            <input
              className="input"
              type="text"
              id="email"
              value={user.email}
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>{error.email}</div>
            <br />
            <label htmlFor="password"> Password : </label>
            <br />
            <input
              className="input"
              type="password"
              id="password"
              value={user.password}
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>{error.password}</div>
            <br />
            <input className="btn_signin" type="submit" value="login" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="btn_google"
              type="button"
              onClick={() =>
                auth
                  .signInWithPopup(provider)
                  .catch((error) => alert(error.message))
              }
            >
              Sign in with Google
            </button>
          </form>
        </div>
        <div className="signupCont">
          <div>Don't have an Account 😢</div>
          <div>Sign Up / Register </div>
          <button
            className="btn"
            type="submit"
            onClick={() => history.push("/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
export default FormValidate;
