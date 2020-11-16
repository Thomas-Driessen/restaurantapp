import React from 'react';
import { observer } from 'mobx-react';
import UserStore from '../components/Admin Login/UserStore';
import LoginForm from '../components/Admin Login/LoginForm';
import SubmitButton from '../components/Admin Login/SubmitButton';
import '../App.css';

class LoginPage extends React.Component {

    componentDidMount() {
        let data = sessionStorage.getItem('sessionUserStore');
        if (data != null) {
            data = JSON.parse(data);
            UserStore.isLoggedIn = data.isLoggedIn;
            UserStore.username = data.username;
            UserStore.loading = data.loading;
        }
    }

    async doLogout() {
        UserStore.isLoggedIn = false;
        UserStore.username = '';
        sessionStorage.setItem('sessionUserStore', JSON.stringify(UserStore));

    }

    render() {

        if (UserStore.loading) {
            return (
                <div className="app">
                    <div className='container'>
                        Loading, please wait....
                    </div>
                </div>
            );
        }
        else {

            if (UserStore.isLoggedIn) {
                return (
                    <div className="app">
                        <div className='container'>
                            Welcome {UserStore.username}

                            <SubmitButton
                                text={'Log out'}
                                disabled={false}
                                onClick={() => this.doLogout()}
                            />
                        </div>
                    </div>
                );
            }

            return (
                <div className="loginPage">
                    <div className='container'>
                        <LoginForm />
                    </div>
                </div>
            );

        }
    }
}

export default observer(LoginPage);