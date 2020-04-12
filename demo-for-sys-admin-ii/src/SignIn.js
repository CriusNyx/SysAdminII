import React from 'react';
import './App.css';
import TableButton from './Controls/TableButton.js';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


const serverurl = 'http://127.0.0.1:8000'

class SignIn extends React.Component{

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };

    constructor(props){ 
        super(props);

        this.state = {username: '', password: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.makeform = this.makeform.bind(this);

    }

    render(){ 



        return (
            <div className="App">
            <header className="App-header">
                {this.makeform()}
            </header>
        </div>
        )
    }

    makeform(){
        const { cookies } = this.props
        
        var logininfo = cookies.get('login');

        const logout = ()=> { cookies.remove('login'); this.setState({}) }

        if(logininfo){
            return (
                <>
                    <p>
                        logged in as {logininfo.username}
                    </p>
                    <button onClick={logout}>
                        logout
                    </button>
                </>
            )
        }
        else{
            return (
                <>
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
                                    <input type="submit" value="Sign In"/>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </>
            )
        }
    }

    handleChange(event, field){
        var o = {}
        o[field] = event.target.value;
        this.setState(o);
    } 

    handleSubmit(event){
        
        const { cookies } = this.props

        event.preventDefault();
        fetch(serverurl + '/api/signin',{
            headers:{
                'Content-Type': "application/json"
            },
            method:"POST",
           body: JSON.stringify({username:this.state.username, password: this.state.password})
        }).then((res) =>{
            return res.json();
        }).then((data) => {
            if(data.success){
                cookies.set('login', {username: this.state.username, password: this.state.password}, {path: '/'});
            }
            else{
               alert("username or password isn't correct");
            }
        });
    }
}


export default withCookies(SignIn);