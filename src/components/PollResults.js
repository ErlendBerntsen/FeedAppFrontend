import React, { Component } from "react";
import PollService from "../services/PollService";
import ProgressBar from "./ProgressBar";

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

        const yes = this.state.content.yesVotes
        const no = this.state.content.noVotes
        const yesP = yes === 0 && no === 0 ? 50 : ((yes / (yes + no)) * 100).toFixed(2)
        const noP = yes === 0 && no === 0 ? 50 : ((no / (yes + no)) * 100).toFixed(2)
        return (
            <div >
                <h2>{this.state.question}</h2>
                <ProgressBar bgcolor="orange" progress={yesP} label="YES" votes={yes} height={30} />
                <ProgressBar bgcolor="green" progress={noP} label="NO" votes={no} height={30} />
            </div>

        );
    }

}

export default PollResults
