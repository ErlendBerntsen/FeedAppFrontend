import React, { Component } from "react";
import PollService from "../services/PollService";


class Poll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            contentReady: false,
            currentUser: { username: '', id: '' },
            content: '',
            error: ''
        };
    }


    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        this.setState({ currentUser: currentUser })
        const pollId = this.props.location.state.id //get the poll id from the clicked link
        PollService.getPoll(pollId)
            .then(response => {
                this.setState({ content: response.data, contentReady: true })
            },
                error => {
                    this.setState({ error: error.message })
                })
    }

    render() {
        if(!this.state.contentReady) {
            return null
        }
        const { content } = this.state

        return (
            <div>
                <h2>Poll</h2>
                {JSON.stringify(content)}
                <span style={{ color: "red" }}>{this.state.error}</span>
            </div>
        );
    }
}

export default Poll