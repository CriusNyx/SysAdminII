import React from 'react';
import logo from './logo.svg';
import './App.css';
import TableButton from './Controls/TableButton.js';

function Main(){
    return (<div className="App">
        <header className="App-header">
            <h1>
            My New Super Cool Web File Server
            </h1>
            <p>
            This web portal allows you to access different apps, 
            and lets you save your progress locally or remotely.
            </p>
            <table>
            <tbody>
                <tr>
                {ButtonLink('Project Info', '/ProjectInfo')}
                {ButtonLink('Notepad', '/Notepad')}
                {ButtonLink('File Manager', '/FileManager')}
                </tr>
                <tr>
                {ButtonControl(4)}
                {ButtonControl(5)}
                {ButtonControl(6)}
                </tr>
                <tr>
                {ButtonControl(7)}
                {ButtonControl(8)}
                {ButtonControl(9)}
                </tr>
            </tbody>
            </table>
        </header>
    </div>)
}

function MessageForApplication(applicationNumber){
    return () => window.alert("Application " + applicationNumber + " is not ready yet.");
}
  
function ButtonControl(applicationNumber){
    return (<TableButton onClick={MessageForApplication(applicationNumber)}> Application {applicationNumber} </TableButton>)
}

function ButtonLink(name, href){
    return(
    <TableButton onClick={() => {window.location.href=href}}>
        {name}
    </TableButton>)
}

export default Main;