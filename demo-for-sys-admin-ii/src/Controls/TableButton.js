import React from 'react';
import './Controls.css';

class TableButton extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {onClick: props.onClick};
    }

    render()
    {
        return ( 
        <td>
            <button className='Fill-Parent' onClick={this.props.onClick}>
                {this.props.children}
            </button>
        </td>)

    }
}

export default TableButton;