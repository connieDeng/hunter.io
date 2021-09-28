import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import auth from './../components/auth';
import Axios from "axios";

export const LandingPage = (props) => {
    const history = useHistory();
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [nickname, setNickname] = useState("");
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

    const submitToFFA = (nickname) =>{ 
        console.log(nickname)
        history.push({
            pathname: "/game",
            state : { nickname: nickname }
        });
    }
   
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
                <button onClick={() => login}>Submit</button>
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
            <br/>
            <br/>
            <section>
                <span>Enter Nickname Here:</span>
                <input onChange={(e) => setNickname(e.target.value)}></input>
                <button onClick={() => submitToFFA(nickname)}>Play FFA</button>
            </section>
        </div> 
    );
    
}