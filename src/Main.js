import React, { Component } from "react";
import {Route, NavLink, BrowserRouter} from "react-router-dom";
import Home from "./Home";
import Polls from "./Polls";
import Users from "./Users";
import UserCreationPage from "./UserCreationPage"

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
                        <li><NavLink to="/createUser">UserCreationPage</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/polls" component={Polls}/>
                        <Route path="/users" component={Users}/>
                        <Route path="/createUser" component={UserCreationPage}/>
                    </div>
                </div>
            </BrowserRouter>
      
        );
    }
}

export default Main;