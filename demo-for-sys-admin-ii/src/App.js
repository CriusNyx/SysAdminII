import React from 'react';
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
          <Route path="/FileManager">
            <FileManager/>
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
