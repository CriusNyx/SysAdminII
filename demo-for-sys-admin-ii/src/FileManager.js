import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TextBlobPanel from './TextBlobPanel';
import TreeNode from './data-structures/ThreadedTreeNode';

const textBlobPanel = new TextBlobPanel({ name: 'Notepad', className: 'Fill-Parent' });

class FileManager extends React.Component{
    constructor(props){
        super(props);

        this.state = {text: '', filename: '', files: null, currentFile: null};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Save = this.Save.bind(this);
        this.Open = this.Open.bind(this);
        this.GetFileButtons = this.GetFileButtons.bind(this);
        this.FilesToTree = this.FilesToTree.bind(this);
        this.AddFileWithPath = this.AddFileWithPath.bind(this);
        this.FilePathToArray = this.FilePathToArray.bind(this);
        this.UpOneLevel = this.UpOneLevel.bind(this);
        this.GetUpOneLevelButton = this.GetUpOneLevelButton.bind(this);
        this.GetCurrentFilePath = this.GetCurrentFilePath.bind(this);
    }

    render(){
        if(this.state.files == null){
            fetch('http://localhost:8000/api/get-all-files',{
            headers:{
                'Content-Type': "application/json"
            },
            method:"POST",
            body: JSON.stringify({ username:'rjreynoldsw@gmail.com' })
            }).then((res) => {
                return res.json()
            }).then((data)=>{
                if(data.success){
                    var tree = this.FilesToTree(data.files);
                    this.setState({files: tree, currentFile: tree});
                }
            });
        }
        return (
            <div className="App">
                <header className="App-header">
                    {this.GetCurrentFilePath()}
                    {this.GetUpOneLevelButton()}
                    {this.GetFileButtons()}
                    <from onSubmit={this.handleSubmit}>
                        <label>
                            File Text:
                        </label>
                        <input type='text' onChange={e => this.handleChange(e, 'text')} text={this.state.text}/>
                    </from>
                    <form onSubmit={this.handleSubmit}>
                        
                        <label>
                            Save New File:
                            <input type='text' onChange={e => this.handleChange(e, 'filename')} text={this.state.filename}/>
                            <button onClick={this.Save}>Save</button>
                        </label>
                    </form>
                </header>
            </div>);
    }

    handleChange(event, field){
        var o = {}
        o[field] = event.target.value;
        this.setState(o);
    }

    handleSubmit(event){
        event.preventDefault();
    }

    GetCurrentFilePath(){
        var currentFile = this.state.currentFile;
        if(currentFile != null){
        return <p>{currentFile.GetPath()}</p>
        }
    }

    GetUpOneLevelButton(){
        if(this.state.currentFile != null){
            if(this.state.currentFile !== this.state.files){
                return <button onClick={this.UpOneLevel}>..</button>
            }
        }
        return null;
    }

    GetFileButtons(){
        var files = this.state.files;
        var currentFile = this.state.currentFile;
        if(files == null){
            return null;
        }
        else if (currentFile == null){
            return null;
        }
        else{
            return currentFile.children.map(x => <button onClick={() => this.OpenNode(x)}>{x.key}</button>);
        }
    }

    Save(){
        var currentNode = this.state.currentFile;
        if(currentNode == null){
            return;
        }
        else{
            var path = currentNode.GetPath();
            path = path.substring(5);
            if(path === ''){
                path = path + this.state.filename;
            }
            else{
                path = path + '/' + this.state.filename;
            }
            fetch('http://localhost:8000/api/save',{
                headers:{
                    'Content-Type': "application/json"
                },
                method:"POST",
                body: JSON.stringify({ username:'rjreynoldsw@gmail.com', filepath: path, bytes: [...Buffer.from(this.state.text)] })
            });
        }
    }

    Open(filename = null){
        if(filename == null){
            filename = this.state.filepath
        }
        fetch('http://localhost:8000/api/open',{
            headers:{
                'Content-Type': "application/json"
            },
            method:"POST",
            body: JSON.stringify({ username:'rjreynoldsw@gmail.com', filepath: filename })
        }).then((res) =>{
            return res.json();
        }).then((data) => {
            if(data.success){
                alert(Buffer.from(data.result));
            }
            else{
                alert("Failed");
            }
        });
    }

    FilesToTree(files){
        var root = new TreeNode('root');
        files.forEach((item, index) => {
            var arr = this.FilePathToArray(item);
            this.AddFileWithPath(arr, root);
        })
        return root;
    }

    AddFileWithPath(path, root){
        var current = root;
        for(var i in path){
            current = current.GetOrAddChild(path[i]);
        }
    }

    FilePathToArray(path){
        var output = path.split('/');
        return output;
    }

    OpenNode(node){
        if(node.children.length == 0){
            var path = node.GetPath();
            path = path.substring(5);
            this.Open(path);
        }
        else{
            this.setState({currentFile: node});
        }
    }

    UpOneLevel(){
        if(this.state.currentFile != null){
            if(this.state.currentFile.parent != null){
                this.setState({currentFile: this.state.currentFile.parent});
            }
        }
    }
}

export default FileManager;