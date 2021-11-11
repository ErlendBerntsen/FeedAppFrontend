import React, { Component } from "react";
import SearchId from "./components/SearchId";
import PollList from "./components/PollList";

class Home extends Component {
    
    render() {
        return (
            <div>
                <h2>Home</h2>
                <br />
                <SearchId />
                <PollList />
            </div>
        );
    }
}

export default Home;