import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserService from "../services/UserService";
import PollList from "./PollList";
import AuthService from "../services/AuthService";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeUsername: false,
      changePassword: false,
      updateOk: false,
      redirect: null,
      fields: { username: '', oldPass: '', password1: '', password2: '' },
      contentReady: false,
      currentUser: { username: '', id: '' },
      content: {},
      error: ''
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.togglePass = this.togglePass.bind(this);
    this.toggleUser = this.toggleUser.bind(this);
    this.handlePassSubmit = this.handlePassSubmit.bind(this);
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.validateCred = this.validateCred.bind(this);
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) this.setState({ redirect: "/" }); //redirect to home if no current user

    else {  //collect data for this user
      this.setState({ currentUser: currentUser })
      UserService.getUser(currentUser.id)
        .then(response => {
          this.setState({ content: response.data, contentReady: true })
        },
          error => {
            this.setState({ error: error.message })
          })
    }

  }

  handleChange(event) {
    const target = event.target;
    let fields = this.state.fields
    fields[target.name] = target.value
    this.setState({
      fields
    });
  }

  async validateCred() {
    let isValid = false
    await AuthService.login(this.state.content.username, this.state.fields["oldPass"])
      .then(() => {
        isValid = true
      },
        error => {
          this.setState({ error: error.message })
          isValid = false
        })
    return isValid
  }

  async handlePassSubmit(event) {
    event.preventDefault();
    if (this.passValidation() && await this.validateCred()) {
      UserService.updateUser(this.state.content.username, this.state.fields["password1"], this.state.content.id)
        .then(() => {
          alert("Changed password!")
          window.location.reload(false);
        },
          error => {
            this.setState({ error: error.message })
          })
    }
  }

  async handleUserSubmit(event) {
    event.preventDefault();
    if (await this.validateCred()) {
      UserService.updateUser(this.state.fields["username"], this.state.fields["oldPass"], this.state.content.id)
        .then(() => {
          alert("Changed username!")
          window.location.reload(false);
        },
          error => {
            this.setState({ error: error.message })
          })
    }
    
  }

  passValidation() {
    let fields = this.state.fields;
    if (fields["password1"].length < 8) {
      this.setState({ error: "Password must be at least 8 characters" });
      return false
    }
    if (fields["password1"] !== fields["password2"]) {
      this.setState({ error: "Passwords do not match" });
      return false
    }
    return true
  }

  async handleDelete() {
    let suc = false
    await UserService.deleteUser(this.state.currentUser.id)
      .then(() => {
        alert("User deleted!")
        suc = true
      },
        error => {
          this.setState({ error: error.message })
          suc = false
        })
    if (suc) {
      AuthService.logout()
    }
  }

  toggleUser() {
    this.setState({ changeUsername: !this.state.changeUsername, changePassword: false })
  }

  togglePass() {
    this.setState({ changeUsername: false, changePassword: !this.state.changePassword })
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    if (!this.state.contentReady) {
      return null
    }
    const { content } = this.state


    const changeUsername = () => {
      if (this.state.changeUsername) { //only display this option if the user i logged in
        return (
          <div>
            <form onSubmit={this.handleUserSubmit}>
              <label>
                <input type="text" name="username" placeholder="New Username" value={this.state.fields["username"]} onChange={this.handleChange} />
              </label>
              <br />
              <label>
                <input type="password" name="oldPass" placeholder="Password" value={this.state.fields["oldPass"]} onChange={this.handleChange} />
              </label>
              <br />
              <input type="submit" value="Submit" />
            </form>
          </div>)
      }
      return null
    }
    const changePassword = () => {
      if (this.state.changePassword) { //only display this option if the user i logged in
        return (
          <div>
            <form onSubmit={this.handlePassSubmit}>
              <label>
                <input type="password" name="oldPass" placeholder="Old Password" value={this.state.fields["oldPass"]} onChange={this.handleChange} />
              </label>
              <br />
              <label>
                <input type="password" name="password1" placeholder="New Password" value={this.state.fields["password1"]} onChange={this.handleChange} />
              </label>
              <br />
              <label>
                <input type="password" name="password2" placeholder="Confirm Password" value={this.state.fields["password2"]} onChange={this.handleChange} />
              </label>
              <br />
              <input type="submit" value="Submit" />
            </form>
          </div>)
      }
      return null
    }

    return (
      <div>
        <h2>Profile</h2>
        <ul>
          <li>Username: {content.username}</li>
          <li>User Type: {content.userType}</li>
          <li>Number of Total Votes: {content.votesId.length}</li>
          <li>Number of Created Polls: {content.createdPollsId.length}</li>
        </ul>
        <button onClick={this.toggleUser}>
          Change Username
        </button>
        <button onClick={this.togglePass}>
          Change Password
        </button>
        <button style={{ background: "red", color: "white" }} onClick={this.handleDelete}>
          Delete User
        </button>
        {changeUsername()}
        {changePassword()}
        <p><span style={{ color: "red" }}>{this.state.error}</span></p>
        <PollList user={true} />
      </div>
    );
  }
}

export default Profile