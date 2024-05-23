import React, { useState } from "react";
import styles from "./Login.module.css";
import { loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    if (!formData.email || !formData.password) {
      alert("Please fill all the fields");
      return;
    }

    const result = await loginUser(formData);
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Already have an account ?</h1>
      <h2 className={styles.h2}>Your personal job finder is here</h2>
      <input
        type={"email"}
        className={styles.input}
        name="email"
        onChange={handleFormChange}
        placeholder="Email"
      ></input>
      <input
        type={"password"}
        className={styles.input}
        name="password"
        onChange={handleFormChange}
        placeholder="Password"
      ></input>
      <button onClick={handleSubmit} className={styles.button}>
        Sign in
      </button>
      <p className={styles.footer}>
        Don't have an account?
        <span
          className={styles.underline}
          onClick={() => navigate("/register")}
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
