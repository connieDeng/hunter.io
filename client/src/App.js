import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LandingPage } from './pages/landing-page';
import "./App.css";
import { SuccessLogin } from './pages/success-login';
import { Game } from './pages/game';
// import gameCanvas from './pages/gameCanvas';
import { ProtectedRoute } from './components/protected-route';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/hunter.io" component={SuccessLogin} />
        <Route exact path="/game" component={Game} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
