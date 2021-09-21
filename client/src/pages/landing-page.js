import React, { useState } from "react";
import auth from './../components/auth';
import Axios from "axios";

export const LandingPage = (props) => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [data, setData] = useState(null);
    const login = () => {
        Axios({
          method: "POST",
          data: {
            username: loginUsername,
            password: loginPassword,
          },
          withCredentials: true,
          url: "http://localhost:4000/login",
        }).then((res) => console.log(res));
      };
    return(
        <div>
            <div>Hunter.io landing page</div>
            
            <div>
                <h1>Login</h1>
                <input
                placeholder="username"
                onChange={(e) => setLoginUsername(e.target.value)}
                />
                <input
                placeholder="password"
                onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button onClick={login}>Submit</button>
            </div>

            <button
                onClick={() => {
                    auth.login(() => {
                        props.history.push("/hunter.io");
                    });
                }}
            >
                Login
            </button>
        </div> 
    );
    
}