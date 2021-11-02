import React, { Component } from "react";
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Polls from "./Polls";
import Users from "./Users";
import CreateUser from "./components/CreateUser"
import Login from "./components/Login"
import Profile from "./components/Profile"
import AuthService from "./services/AuthService"
import CreatePoll from "./components/CreatePoll"

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1>FeedApp</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Home </NavLink></li>
                        <li><NavLink to="/polls">Polls</NavLink></li>
                        <li><NavLink to="/users">Users</NavLink></li>
                        <li><NavLink to="/profile">Profile</NavLink></li>
                        <li><NavLink to="/createUser">Create User</NavLink></li>
                        <li><NavLink to="/createPoll">Create Poll</NavLink></li>
                        <li><NavLink to="/signIn">Sign in</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home} />
                        <Route path="/polls" component={Polls} />
                        <Route path="/users" component={Users} />
                        <Route path="/signIn" component={Login} />
                        <Route path="/createUser" component={CreateUser} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/createPoll" component={CreatePoll} />
                    </div>
                    <div>
                        <br />
                        <button onClick={AuthService.logout}>Logout</button>
                    </div>
                </div>
            </BrowserRouter>

        );
    }
}

export default Main;