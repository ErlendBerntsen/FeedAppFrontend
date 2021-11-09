import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Polls from "./Polls";
import Users from "./Users";
import CreateUser from "./components/CreateUser"
import Login from "./components/Login"
import Profile from "./components/Profile"
import CreatePoll from "./components/CreatePoll"
import Poll from "./components/Poll"
import PollList from "./components/PollList";
import PollResults from "./components/PollResults"
import "./app.css"
import Navbar from './components/Navbar';

class Main extends Component {
    render() {

        const currentUser = localStorage.getItem("user")
        const login = !currentUser ? false : true
        return (

            <BrowserRouter>
                <div>
                    <Navbar user={login} />
                    <div className="content">
                        <Route exact path="/" component={Home} />
                        <Route path="/polls" component={Polls} />
                        <Route path="/users" component={Users} />
                        <Route path="/signIn" component={Login} />
                        <Route path="/createUser" component={CreateUser} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/createPoll" component={CreatePoll} />
                        <Route path="/poll" component={Poll} />
                        <Route path="/pollList" component={PollList} />
                        <Route path="/result" component={PollResults} />
                    </div>
                </div>
            </BrowserRouter>

        );
    }
}

export default Main;