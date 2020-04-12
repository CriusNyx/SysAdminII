import React from 'react';
import './App.css';
import TableButton from './Controls/TableButton.js';
//import { useCookies } from 'react-Cookie';


const serverurl = 'http://localhost:8000'
//const [cookies, setCookie] = useCookies(['name']);


class SignIn extends React.Component{
    constructor(props){ 
        super(props);

        this.state = {username: '', password: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(event, field){
        var o = {}
        o[field] = event.target.value;
        this.setState(o);
    } 

    handleSubmit(event){
         fetch(serverurl + '/api/sign-in',{
            headers:{
                'Content-Type': "application/json"
            },
            method:"POST",
           body: JSON.stringify({username:this.state.username, password: this.state.password})
        }).then((res) =>{
            return res.json();
        }).then((data) => {
            if(data.success){
                alert(Buffer.from(data.result));
                //setCookie('loginSuccess', {username: this.state.username, password: this.state.password}, {path: '/'});
            }
            else{
               alert("Failed");
            }
        });
    }

    render(){ 
        return (
            <div className="App">
            <header className="App-header">
                <h1>
                    Sign In
                </h1>
                <form onSubmit={this.handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <input type='text' onChange={e => this.handleChange(e, 'username')} text={this.state.username} placeholder="Username">
                        </input>
                        </tr> 
                        <tr>
                            <input type='password' onChange={e => this.handleChange(e, 'password')} text={this.state.password} placeholder="Password">
                        </input>
                        </tr>
                        <tr>
                            <input type="submit" value="Sign In">
                            </input>
                        </tr>
                    </tbody>
                </table>
                </form>
            </header>
        </div>
        )
    }
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



export default SignIn;