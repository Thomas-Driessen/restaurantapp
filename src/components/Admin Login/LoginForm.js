import React from 'react';
import UsernameInput from './UsernameInput';
import SubmitButton from './SubmitButton';
import UserStore from './UserStore';
import PasswordInput from './PasswordInput';


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

    onChange = event => {
        const { name, value } = event.target;
    
        this.setState({ [name]: value });
      };

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
          if(data!==null){
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
        const { password } = this.state;
        return(
            <div className = "loginForm">
                <div className = "box">
                    Log in
                    <UsernameInput
                        type='text'
                        label='Username'
                        value={this.state.username ? this.state.username : ''}
                        onChange = {(val) => this.setInputValue('username', val)}
                    />
                    <PasswordInput
                        label="Password"
                        name="password"
                        value={this.state.password ? this.state.password : ''}
                        onChange={this.onChange}
                    />
                    <SubmitButton
                        text='Login'
                        disabled = {this.state.buttonDisabled}
                        onClick={()=>this.doLogin()}
                    />
                </div>
            </div>
        );
    }
}

export default LoginForm;