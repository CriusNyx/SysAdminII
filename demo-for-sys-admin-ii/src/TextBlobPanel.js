import React from 'react';
import TextAreaAutosize from 'react-autosize-textarea';
import Default from './Default.js';

class TextBlobPanel extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            className : Default(props.className, ''),
            style : Default(props.style, {}),
            name : Default(props.name, 'Plrease enter a name for panel'),
            backingVar : Default(props.backingVar, ''),
            placeholder : Default(props.placeholder, ''),
            text: Default(props.placeholder, ''),

            onChange : Default(props.onChange, () => {}),
        };

        this.render = this.render.bind(this);
        this.getText = this.getText.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render(){
        return(
            <div className={this.state.className} style={this.state.style}>
                <h4>
                    {this.state.name}
                </h4>
                <TextAreaAutosize 
                    className='stat-box' 
                    style={{fontSize: 'large', width: '95%'}} 
                    value={this.state.text}
                    placeholder = {this.state.placeholder}
                    onChange={this.onChange}
                />  
            </div>
        )
    }

    onChange(e){
        //alert(e.target.value);
        this.setState({text: e.target.value});
    }

    getText(){
        return this.state.text;
    }
}

export default TextBlobPanel;