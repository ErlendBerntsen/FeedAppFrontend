import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserService from "../services/UserService";
import PollList from "./PollList";
import AuthService from "../services/AuthService";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      contentReady: false,
      currentUser: { username: '', id: '' },
      content: {},
      error: ''
    };
    this.handleDelete = this.handleDelete.bind(this);
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

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    if (!this.state.contentReady) {
      return null
    }
    const { content } = this.state

    return (
      <div>
        <h2>Profile</h2>
        <ul>
          <li>Username: {content.username}</li>
          <li>User Type: {content.userType}</li>
          <li>Number of Total Votes: {content.votesId.length}</li>
          <li>Number of Created Polls: {content.createdPollsId.length}</li>
        </ul>
        <button onClick={this.handleDelete}>
          Delete User
        </button>
        <p>
          <span style={{ color: "red" }}>{this.state.error}</span>
        </p>
        <PollList user={true} />
      </div>
    );
  }
}

export default Profile