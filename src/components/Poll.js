import React, { Component } from "react";
import PollService from "../services/PollService";
import { Redirect } from "react-router-dom";


class Poll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOwner: false,
            pollId: '',
            answer: '',
            anonymous: false,
            redirect: null,
            guest: false,
            contentReady: false,
            currentUser: { username: '', id: '' },
            content: '',
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }


    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser) {
            this.setState({ guest: true })
        }
        this.setState({ currentUser: currentUser })
        if (!this.props.location.state) {
            //TODO: set redirect if no id?
        }
        else {
            const pollId = this.props.location.state.id //get poll id from the clicked link
            this.setState({ pollId: pollId }) //get content for this poll
            PollService.getPoll(pollId)
                .then(response => {
                    this.setState({ content: response.data, contentReady: true })
                    if (!this.state.guest) {
                        if (currentUser.id === response.data.creatorId) {
                            this.setState({ isOwner: true })
                        }
                    }
                },
                    error => {
                        this.setState({ error: error.message })
                    })
        }
    }

    handleChange(event) {
        const target = event.target
        if (target.type === "checkbox") {
            this.setState({ anonymous: target.checked });
        }
        else {
            this.setState({ answer: target.value });
        }

    }

    handleSubmit(event) {
        event.preventDefault()
        if (this.handleValidation()) {
            const voteType = this.state.guest ? "GUEST" : this.state.anonymous ? "ANONYMOUS" : "USER"
            PollService.addVote(this.state.pollId, this.state.answer, voteType)
                .then(() => {
                    alert("Vote sent!")
                    this.setState({ redirect: "/result" })
                },
                    error => {
                        this.setState({ error: error.message })
                    })
        }
    }

    handleValidation() {
        let isValid = true
        if (!this.state.answer) {
            isValid = false
            this.setState({ error: "Select Yes or No" })
        }
        return isValid
    }

    handleDelete() {
        PollService.deletePoll(this.state.pollId)
            .then(() => {
                alert("Poll deleted!")
                this.props.history.push("/profile");
                window.location.reload();
            },
                error => {
                    this.setState({ error: error.message })
                })
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: this.state.redirect,
                state: { id: this.state.pollId, question: this.state.content.question }
            }} />
        }

        if (!this.state.contentReady) {
            return null
        }

        const { content } = this.state
        const anonBox = () => {
            if (!this.state.guest) { //only display this option if the user i logged in
                return (
                    <label>Set anonymous vote?
                        <input type="checkbox"
                            name="anonymous"
                            checked={this.state.anonymous}
                            onChange={this.handleChange} />
                    </label>)
            }
            return null
        }

        const delPoll = () => {
            if (this.state.isOwner) { //only display this option if the user i logged in
                return (
                    <button onClick={this.handleDelete}>
                        Delete Poll
                    </button>)
            }
            return null
        }

        return (
            <div>
                <h2>Poll</h2>
                <h4>CODE: {content.code}</h4>
                {content.question}
                <form onSubmit={this.handleSubmit}>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                name="answer"
                                value="Yes"
                                checked={this.state.answer === "Yes"}
                                onChange={this.handleChange}
                            />
                            Yes
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                name="answer"
                                value="No"
                                checked={this.state.answer === "No"}
                                onChange={this.handleChange}
                            />
                            No
                        </label>
                    </div>
                    <div>
                        {anonBox()}
                    </div>
                    <input type="submit" value="Submit" />
                </form>
                <br />
                {delPoll()}
                <span style={{ color: "red" }}>{this.state.error}</span>
            </div>
        );
    }
}

export default Poll