import React from 'react'
import Login from '../../components/Login/Login'
import authBg from '../../assets/auth.png'

const LoginPage = () => {
  return (
    <div style={{ display: "flex", maxHeight: "100vh", maxWidth: "100vw" }}>
        <Login />
        <div>
            <img src={authBg} alt="" style={{
                position: "absolute",
                maxHeight: "100v",
                width: "50vw",
                zIndex: 0,
            }}/>
            <h1 
                style={{
                    position: "relative",
                    color: "white",
                    zIndex: 1,
                    left: "50%"
                }}
            >
                Your Personal Job Finder
            </h1>
        </div>
    </div>
  )
}

export default LoginPage