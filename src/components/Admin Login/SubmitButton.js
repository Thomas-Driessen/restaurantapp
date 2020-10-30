import React from 'react';
import { Button } from '@material-ui/core';

class SubmitButton extends React.Component{

    render(){
        return(
            <div className = "submitButton">
                <Button
                    className ='btn'
                    disabled = {this.props.disabled}
                    onClick={() => this.props.onClick()}
                    variant="outlined"
                >
                    {this.props.text}
                </Button>
            </div>
        )
    }
}

export default SubmitButton;