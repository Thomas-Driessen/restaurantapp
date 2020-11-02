import React from 'react';
import Content from '../components/Admin/Content';
import LogOut from '../components/Admin/LogOut';

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