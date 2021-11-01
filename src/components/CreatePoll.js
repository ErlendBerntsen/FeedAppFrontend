import React, { Component } from "react";
import PollService from "../services/PollService";
import { Redirect } from "react-router-dom";

class CreatePoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            fields: { question: '', isPrivate: false },
            errors: { question: '', response: '' }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser) this.setState({ redirect: "/signIn" }); //redirect to login if no current user
    }

    handleChange(event) {
        const target = event.target;
        let fields = this.state.fields
        const value = target.name === 'isPrivate' ? target.checked : target.value; //for checkbox use
        fields[target.name] = value
        this.setState({ fields });
    }

    handleSubmit(event) {
        const votingStart = "2021-09-19T22:00:00.000+00:00" //placeholders
        const votingEnd = "2022-09-29T22:00:00.000+00:00"
        let fields = this.state.fields;
        let errors = this.state.errors;
        if (this.handleValidation()) {
            PollService.createPoll(fields.question, votingStart, votingEnd, fields.isPrivate)
                .then(() => {
                    alert("Poll created")
                    //TODO: redirect to poll
                },
                    error => {
                        errors["response"] = error.message //potential error from post request
                        this.setState({ errors: errors })
                        
                    })

        }
        event.preventDefault();
    }

    handleValidation() {
        let fields = this.state.fields
        let errors = this.state.errors
        let isValid = true
        if (!fields["question"]) {
            isValid = false
            errors["question"] = "Question cannot be empty"
        }
        this.setState({ errors: errors });
        return isValid
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <h2>Create new Poll</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" name="question" placeholder="Question" value={this.state.fields["question"]} onChange={this.handleChange} />
                    </label>
                    <span style={{ color: "red" }}>{this.state.errors["question"]}</span>
                    <br />
                    Set private <input type="checkbox" name="isPrivate" checked={this.state.fields["isPrivate"]} onChange={this.handleChange} />
                    <br />
                    <input type="submit" value="Submit" />

                    <span style={{ color: "red" }}>{this.state.errors["response"]}</span>
                </form>
            </div>
        );
    }
}

export default CreatePoll

