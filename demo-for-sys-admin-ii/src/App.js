import React from 'react';
//import React, {useState} from 'react';
//import {AppContext} from "./libs/contextLib";
import logo from './logo.svg';
import './App.css';
import TableButton from './Controls/TableButton.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Main from "./Main.js";
import Notepad from './Notepad.js';
import ProjectInfo from './ProjectInfo.js';
import FileManager from './FileManager.js'
import PrivacyPolicy from './PrivacyPolicy.js'
import SignIn from './SignIn.js';
import TeamMembers from './TeamMembers.js';
import Demo from "./Demo.js";
import ProjectAccess from "./ProjectAccess.js";
import Steps from "./Steps.js";
//import {useCookies} from 'react-cookie';



function App() {
  
  return (
    <>
      
      <Router>
        <Switch>
          <Route path="/Notepad">
            <Notepad/>
          </Route>
          <Route path="/ProjectInfo">
            <ProjectInfo/>
          </Route>
          <Route path="/PrivacyPolicy">
            <PrivacyPolicy/>
          </Route>
          <Route path="/FileManager">
            <FileManager/>
          </Route>
          <Route path="/SignIn">
            <SignIn/>
          </Route>
          <Route path="/TeamMembers">
            <TeamMembers/>
          </Route>
          <Route path="/Demo">
            <Demo/>
          </Route>
          <Route path="/ProjectAccess">
            <ProjectAccess/>
          </Route>
          <Route path="/Steps">
            <Steps/>
          </Route>
          <Router path='/'>
            <Main/>
          </Router>
        </Switch>
      </Router>
      
    </>
  );
}

export default App;
