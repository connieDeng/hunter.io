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
        history.push({
            pathname: "/game",
            state : { nickname: nickname }
        });
        socket.emit('saveNickname', nickname);
    }
   
    return(

        <div style={{ backgroundImage: 'url("background.jpg")', backgroundColor: 'pink', height: '1000px', width: '100%', marginTop: '0px' }}>

            <div style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: '60px', textAlign: "center", color: 'purple' }}>Hunter.io</h1>
                <input
                    placeholder="username"
                    onChange={(e) => setLoginUsername(e.target.value)} />
                <input
                    placeholder="password"
                    onChange={(e) => setLoginPassword(e.target.value)} />
                <button onClick={() => login}>Submit</button>
            

            <button
                onClick={() => {
                    auth.login(() => {
                        props.history.push("/hunter.io");
                    });
                } }
            >
                Login
            </button>
            
            <br />
            <a href="/register-page.js">Not registered? Click here to register now.</a>
            </div>
        <br/>
        <br/>
            <section  style={{position:'absolute',bottom:'30%',left:"45%", marginLeft:'-100px'}}>
                <span>Enter Nickname Here:</span>
                <input onChange={(e) => setNickname(e.target.value)}></input>
                <button onClick={() => submitToFFA(nickname)}>Play FFA</button>
            </section>
        </div>
    );
    
}