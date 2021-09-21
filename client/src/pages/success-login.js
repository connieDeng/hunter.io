import React from "react";
import auth from './../components/auth';

export const SuccessLogin = (props) => {
    return (
        <div>
            <div>You made it; maybe snake game should be here</div> 
            <button
                onClick={() => {
                auth.logout(() => {
                    props.history.push("/");
                });
                }}
            >
                Logout
            </button>
        </div>
    ); 
}