import React from "react";
import authBG from "../../assets/auth.png";
import Register from "../../components/Register/Register";

const RegisterPage = () => {
  return (
    <div style={{ display: "flex", maxHeight: "100vh", maxWidth: "100vw" }}>
      <Register />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img
          src={authBG}
          style={{
            position: "absolute",
            maxHeight: "100vh",
            width: "50vw",
            zIndex: 0,
          }}
          alt="Register Cover"
        />
        <h1
          style={{
            position: "relative",
            color: "white",
            zIndex: 1,
            left: "50%",
          }}
        >
          Your Personal Job Finder
        </h1>
      </div>
    </div>
  );
};

export default RegisterPage;
