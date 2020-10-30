import React from 'react';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, withStyles } from '@material-ui/core';
import { RemoveRedEye } from '@material-ui/icons';
import PropTypes from 'prop-types';

class UsernameInput extends React.Component{

    

    render(){
        return(
            <div className = "inputField">
                <TextField
                    id="outlined-search" 
                    label={this.props.label} 
                    variant="outlined"
                    className = 'input'
                    type={this.props.type}
                    value={this.props.value}
                    onChange={(e) => this.props.onChange(e.target.value)}
                />
            </div>
            
        )
    }
}

export default UsernameInput;