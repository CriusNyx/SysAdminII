import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TextBlobPanel from './TextBlobPanel';

const textBlobPanel = new TextBlobPanel({ name: 'Notepad', className: 'Fill-Parent' });

function Notepad(){
    return (
        <div className="App">
            <header className="App-header">
                {textBlobPanel.render()}
                <button onClick={()=>{Save(textBlobPanel)}}>
                    Save
                </button>
                <button onClick={()=>{Open(textBlobPanel)}}>
                    Open
                </button>
            </header>
        </div>);
}

function Open(textPanel){
    //alert(JSON.stringify(textPanel));
    alert(textPanel.getText());
}

function Save(textPanel){

}

export default Notepad;