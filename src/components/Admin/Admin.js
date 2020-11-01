import React from 'react';
import Content from './Content';
import LogOut from './LogOut';

class Admin extends React.Component {
    render(){
        return (
            <div>
                <LogOut/>
                <Content />
            </div>
        )
    }
}

export default Admin;