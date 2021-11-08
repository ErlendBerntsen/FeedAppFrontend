import React, { Component } from "react";
import PollService from "../services/PollService";

class PollResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            contentReady: '',
            content: '',
            error: ''
        };
    }

    componentDidMount() {
        const pollId = this.props.location.state.id
        const question = this.props.location.state.question
        this.setState({ question: question })
        PollService.getResults(pollId)
            .then(response => {
                this.setState({ content: response.data, contentReady: true })
            })
    }

    render() {
        if (!this.state.contentReady) {
            return null
        }
        return (
            <div>
                <h3>{this.state.question}</h3>
                Yes: {this.state.content.yesVotes}
                <br />
                No: {this.state.content.noVotes}
            </div>
        );
    }

}

export default PollResults
