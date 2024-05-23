import React, { useState } from "react";
import { registerUser } from "../../api/auth";
import styles from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [isFormChecked, setIsFormChecked] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !formData.email ||
      formData.password ||
      formData.mobile ||
      formData.name
    ) {
      alert("Please enter all required fields");
      return;
    }

    if (!isFormChecked) {
      alert("Please accept the form T&C");
      return;
    }

    await registerUser(formData);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Create an account</h1>
      <h2 className={styles.h2}>Your personal job finder is here</h2>
      <input
        className={styles.input}
        name="name"
        onChange={handleChange}
        type={"text"}
        placeholder="Name"
      ></input>
      <input
        className={styles.input}
        name="email"
        onChange={handleChange}
        type={"email"}
        placeholder="Email"
      ></input>
      <input
        className={styles.input}
        name="mobile"
        onChange={handleChange}
        type={"tel"}
        placeholder="Mobile"
      ></input>
      <input
        className={styles.input}
        name="password"
        onChange={handleChange}
        type={"password"}
        placeholder="Password"
      ></input>

      <span>
        <input
          className={styles.grey}
          type="checkbox"
          onChange={(event) => setIsFormChecked(event.target.checked)}
          name="checkbox"
          id="check1"
        />
        <label
          className={styles.grey}
          style={{ fontSize: "12px" }}
          htmlFor="check1"
        >
          By creating an account, I agree to our terms of use and privacy policy
        </label>
      </span>
      <button onClick={handleSubmit} className={styles.button}>
        Create Account
      </button>
      <p className={styles.footer}>
        <span className={styles.grey}>Already have an account?</span>
        <span
          className={styles.underline}
          // onClick={() => navigate("/login")}
        >
          Sign in
        </span>
      </p>
    </div>
  );
};

export default Register;
