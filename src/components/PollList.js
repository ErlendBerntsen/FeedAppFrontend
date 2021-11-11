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
        if (!currentUser && this.props.user) { //to fix crash logging out on profile page
            return
        }
        this.setState({ currentUser: currentUser })
        const requestParam = this.props.user ? "?creator=" + currentUser.id : "?isPrivate=false"
        PollService.getAllPolls(requestParam)
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
                    }}><h4>{content[i].question}</h4></Link>}
                </li>)
        }
        return links
    }

    render() {
        const header = !this.props.user ? "Public polls" : "My polls"
        const links = !this.state.contentReady ? null : this.createLinks()
        return (
            <div>
                <h3>{header}</h3>
                <ul> {links} </ul>
                <span style={{ color: "red" }}>{this.state.error}</span>
            </div>

        );
    }
}

export default PollList