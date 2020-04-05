import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TextBlobPanel from './TextBlobPanel';

const textBlobPanel = new TextBlobPanel({ name: 'Notepad', className: 'Fill-Parent' });

class FileManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {text: '', filepath: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Save = this.Save.bind(this);
        this.Open = this.Open.bind(this);
    }

    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Text:
                            <input type='text' name='text' value={this.state.text} onChange={(x) => this.handleChange(x, 'text')}/>
                        </label>
                        <label>
                            Filepath:
                            <input type='text' name='filepath' value={this.state.filepath} onChange={(x) => this.handleChange(x, 'filepath')}/>
                        </label>
                    </form>
                    <button onClick={this.Save}>Save</button>
                    <button onClick={this.Open}>Open</button>
                </header>
            </div>);
    }

    handleChange(event, field){
        var o = {}
        o[field] = event.target.value;
        this.setState(o);
    }

    handleSubmit(event){
        alert(event.target.value);
        alert(this.state.filepath);
        event.preventDefault();
    }

    Save(){
        fetch('http://localhost:8000/api/save',{
            headers:{
                'Content-Type': "application/json"
            },
            method:"POST",
            body: JSON.stringify({ username:'rjreynoldsw@gmail.com', filepath:this.state.filepath, bytes: [...Buffer.from(this.state.text)] })
        });
    }

    Open(){
        fetch('http://localhost:8000/api/open',{
            headers:{
                'Content-Type': "application/json"
            },
            method:"POST",
            body: JSON.stringify({ username:'rjreynoldsw@gmail.com', filepath: this.state.filepath })
        }).then((res) =>{
            return res.json();
        }).then((data) => {
            alert(Buffer.from(data.result));
        });
    }
}

export default FileManager;