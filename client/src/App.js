import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LandingPage } from './pages/landing-page';
import "./App.css";
import { SuccessLogin } from './pages/success-login';
// import gameCanvas from './pages/gameCanvas';
import { ProtectedRoute } from './components/protected-route';
import io from "socket.io-client";

// individual socket connection to server
const socket = io.connect("http://localhost:4000");

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <ProtectedRoute exact path="/hunter.io" component={SuccessLogin} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
