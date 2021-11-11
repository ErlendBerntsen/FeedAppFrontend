import React, { Component } from "react";
import SearchId from "./components/SearchId";
import PollList from "./components/PollList";

class Home extends Component {
    
    render() {
        return (
            <div>
                <h1 style={{color:'green'}}>Home</h1>
                <br />
                <SearchId />
                <PollList />
            </div>
        );
    }
}

export default Home;