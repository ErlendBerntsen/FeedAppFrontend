import React, { Component } from "react";
import PollService from "../services/PollService";
import { Link } from "react-router-dom";


class PollList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentReady: false,
            currentUser: { username: '', id: '' },
            content: {},
            error: ''
        };
    }


    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        this.setState({ currentUser: currentUser })
        PollService.getAllPolls("?isPrivate=false") //get all public polls. TODO: get public and polls created by current user
            .then(response => {
                this.setState({ content: response.data, contentReady: true })
            },
                error => {
                    this.setState({ error: error.message })
                })
    }

    //creates a link to the poll page of all polls. The id of the poll is sent in the state variable
    createLinks() {
        const { content } = this.state
        const links = []
        for (let i = 0; i < content.length; i++) {
            links[i] = (
                <li key={content[i].id}> {
                    <Link to={{
                        pathname: '/poll',
                        state: {
                            id: content[i].id
                        }
                    }}>{content[i].question}</Link>}
                </li>)
        }
        return links
    }

    render() {
        if (!this.state.contentReady) {
            return null
        }
        const links = this.createLinks()
        return (
            <div>
                <h2>Poll List</h2>
                <ul> {links} </ul>
                <span style={{ color: "red" }}>{this.state.error}</span>
            </div>
        );
    }
}

export default PollList