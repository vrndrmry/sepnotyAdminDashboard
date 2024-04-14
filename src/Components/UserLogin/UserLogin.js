import React, { useContext, useState } from "react";
import "./userLogin.css";
import sepnotyLogo from "../../assets/sepnotyLogo.svg";
import resource from "../../assets/resource.svg";
import { UserContext } from "../../Context/userContext.js";
import { Navigate } from "react-router-dom";

export default function UserLogin() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);
  const { userInfo,setUserInfo } = useContext(UserContext);

  

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const initializeForm = () =>{
    setUserDetails({
      username: "",
      password: "",
    });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8800/login`, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        credentials: "include",
      },
    });

    const responseData = await response.json();
    if (response.status === 200) {
      setRedirect(true);
      initializeForm()
      setUserInfo(responseData)
    }else{
      initializeForm();
      alert("Invalid credentials")
    }
  };

    if(redirect){
      return <Navigate to={`/${userInfo.id}/dashboard`}></Navigate>
    }
  return (
    <div className="admin">
      <div className="admincontainer">
        <div className="login-info">
          <img src={sepnotyLogo} alt="sepnotylogo" />
          <h2>Welcome</h2>
          <p>Sign in to continue Access</p>
          <img className="adminimg" src={resource} alt="adminimg" />
        </div>
        <div className="login">
          <p>Sign In</p>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Email Address"
              name="username"
              value={userDetails.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userDetails.password}
              onChange={handleChange}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
