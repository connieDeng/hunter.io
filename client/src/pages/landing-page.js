import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import auth from './../components/auth';
import Axios from "axios";
import socket from "../socket";

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
        socket.emit('setNickname',nickname);
    }
   
    return(
<<<<<<< HEAD

        <div style={{backgroundImage:'url("background.jpg")',backgroundColor:'pink',height:'1000px',width:'100%',marginTop:'0px'}}>  
                 
            <div></div>
            <div style={{ textAlign:"center"}}>
                <h1 style={{fontSize:'60px' ,textAlign:"center",color:'purple'}}>Hunter.io</h1>
=======
        <div>
            <div>Hunter.io landing page</div>
            
            <div>
                <h1>Login</h1>
>>>>>>> parent of d400ba3 (update)
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
<<<<<<< HEAD
            <a href="/register-page.js">Not registered? Click here to register now.</a>
            </div>
            <br/>
=======
>>>>>>> parent of d400ba3 (update)
            <br/>
            <section>
                <span>Enter Nickname Here:</span>
                <input onChange={(e) => setNickname(e.target.value)}></input>
                <button onClick={() => submitToFFA(nickname)}>Play FFA</button>
            </section>
        </div> 
    );
    
}