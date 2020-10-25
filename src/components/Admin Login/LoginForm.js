import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './UserStore';


class LoginForm extends React.Component{

    constructor(props){
        super();
        this.state={
            username:'',
            password:'',
            buttonDisabled:false
        }
    }

    setInputValue(property, val){
        this.setState({
            [property]:val
        })
    }

    resetForm(){
        this.setState({
            username:'',
            password:'',
            buttonDisabled: false
        })
    }

    async doLogin(){
        UserStore.loading = true;
        fetch(`/api/User/username=`+this.state.username+`&password=`+this.state.password)
        .then(res => res.json())
        .then((data) => {
          if(data===true){
              UserStore.loading = false;
              UserStore.isLoggedIn = true;
              UserStore.username = this.state.username;
              sessionStorage.setItem('sessionUserStore', JSON.stringify(UserStore));
          }
          else{
              UserStore.loading = false;
              UserStore.loggedIn=false;
              sessionStorage.setItem('sessionUserStore', JSON.stringify(UserStore));
          }
        })
        .catch(console.log)
     }
    render(){
        return(
            <div className = "loginForm">
                Log in
                <InputField
                    type='text'
                    placeholder='Username'
                    value={this.state.username ? this.state.username : ''}
                    onChange = {(val) => this.setInputValue('username', val)}
                />
                <InputField
                    type='password'
                    placeholder='Password'
                    value={this.state.password ? this.state.password : ''}
                    onChange = {(val) => this.setInputValue('password', val)}
                />
                <SubmitButton
                    text='Login'
                    disabled = {this.state.buttonDisabled}
                    onClick={()=>this.doLogin()}
                />
            </div>
        );
    }
}

export default LoginForm;