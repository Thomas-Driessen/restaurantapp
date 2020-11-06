import React from "react";
import UsernameInput from "./UsernameInput";
import SubmitButton from "./SubmitButton";
import UserStore from "./UserStore";
import PasswordInput from "./PasswordInput";
import { runInAction } from 'mobx';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      buttonDisabled: false,
      logInFailed: false
    };
  }

  setInputValue(property, val) {
    this.setState({
      [property]: val,
    });
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  resetForm() {
    this.setState({
      username: "",
      password: "",
    });
  }

  async doLogin() {
    fetch(
      `/api/User/username=` +
        this.state.username +
        `&password=` +
        this.state.password
    )
      .then((res) => {
        if (res.status !== 200) {
            this.setState({logInFailed: true})
          sessionStorage.setItem("sessionUserStore", JSON.stringify(UserStore));
        } else{ 
          runInAction(() => {
            UserStore.loading = true;
          });
            return res.json();
        }
      })
      .then((data) => {
        if (data !== undefined) {
          runInAction(() => {
          UserStore.loading = false;
          UserStore.isLoggedIn = true;
          UserStore.username = this.state.username;
          });

          sessionStorage.setItem("sessionUserStore", JSON.stringify(UserStore));
        }
      })
      .catch(console.log);
  }
  
  render() {
    return (
      <div className="loginForm">
        <div className="box">
          Log in
          <UsernameInput
            id="username"
            type="text"
            label="Username"
            value={this.state.username ? this.state.username : ""}
            onChange={(val) => this.setInputValue("username", val)}
          />
          <PasswordInput
            id="password"
            label="Password"
            name="password"
            value={this.state.password ? this.state.password : ""}
            onChange={this.onChange}
          />
          <SubmitButton
            text="Login"
            disabled={this.state.buttonDisabled}
            onClick={() => this.doLogin()}
          />
            {this.state.logInFailed ? (
                <div className = "failLogInBox">Sorry, your credentials were incorrect.</div>
            ) : null}
        </div>
      </div>
    );
  }
}

export default LoginForm;
