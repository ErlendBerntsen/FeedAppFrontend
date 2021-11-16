import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PollPage from "./pages/PollPage";
import PollResultPage from "./pages/PollResultPage";
import ProfilePage from "./pages/ProfilePage";
import UserListPage from "./pages/UserListPage";
import CreateUserPage from "./pages/CreateUserPage"
import CreatePollPage from "./pages/CreatePollPage"

import PollList from "./components/PollList";
import "./app.css"

class Main extends Component {
    render() {

        return (
            <BrowserRouter>
                <div>
                    <div className="content">
                        <Route exact path="/" component={HomePage} />
                        <Route path="/users" component={UserListPage} />
                        <Route path="/createUser" component={CreateUserPage} />
                        <Route path="/profile/:id" component={ProfilePage} />
                        <Route path="/createPoll" component={CreatePollPage} />
                        <Route path="/poll" component={PollPage} />
                        <Route path="/pollList" component={PollList} />
                        <Route path="/result" component={PollResultPage} />
                    </div>
                </div>
            </BrowserRouter>

        );
    }
}

export default Main;