import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
const SignUp = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmP: "",
    phoneNumber: "",
    dob: "",
  });
  const defaultError = {
    userName: "",
    email: "",
    password: "",
    confirmP: "",
    phoneNumber: "",
    dob: "",
  };
  const [error, setError] = useState({
    userName: "",
    email: "",
    password: "",
    confirmP: "",
    phoneNumber: "",
    dob: "",
  });
  const [valid, setValid] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.userName === "") {
      setError({ ...defaultError, userName: "Enter a name" });
    } else if (user.userName.length <= 2 || user.userName.length >= 21) {
      setError({
        ...defaultError,
        userName: "name length should be in the range of 3 to 20",
      });
    } else if (user.email.indexOf("@") === -1) {
      setError({ ...defaultError, email: "enter a valid email" });
    } else if (user.password.length <= 5) {
      setError({
        ...defaultError,
        password: "password lenght should more than 5",
      });
    } else if (user.password !== user.confirmP) {
      setError({ ...defaultError, confirmP: "Password didn't match." });
    } else if (user.phoneNumber.length !== 10) {
      setError({ ...defaultError, phoneNumber: "invalid phone number" });
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      setValid(true);
    }
  };

  valid && history.push("/");

  return (
    <div className="container">
      <h4 style={{ marginBottom: 15 }}>SIGN UP TO LET'S SHOP</h4>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName"> User Name : </label>
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
          <input
            className="input"
            type="password"
            id="password"
            autoComplete
            value={user.password}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{error.password}</div>
          <br />

          <label htmlFor="confirmP"> Confirm Password : </label>
          <input
            className="input"
            type="password"
            id="confirmP"
            value={user.confirmP}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{error.confirmP}</div>
          <br />
          <label htmlFor="phoneNumber"> Phone Number : </label>
          <input
            className="input"
            type="number"
            id="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{error.phoneNumber}</div>
          <br />
          <input className="btn" type="submit" value="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
