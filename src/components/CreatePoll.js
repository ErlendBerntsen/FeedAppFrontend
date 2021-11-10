import React, { Component } from "react";
import PollService from "../services/PollService";
import { Redirect } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';

class CreatePoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            fields: { question: '', isPrivate: false, votingStart: new Date(), votingEnd: '' },
            errors: { question: '', response: '' }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDate = this.handleDate.bind(this);
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

    handleDate(name, event) {
        let fields = this.state.fields
        fields[name] = event
        this.setState({ fields })
        console.log(this.state.fields["votingStart"])
    }

    handleSubmit(event) {
        let fields = this.state.fields;
        let errors = this.state.errors;
        if (this.handleValidation()) {
            PollService.createPoll(fields.question, fields.votingStart, fields.votingEnd, fields.isPrivate)
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
                    <div>
                        <input type="text" name="question" placeholder="Question" value={this.state.fields["question"]} onChange={this.handleChange} />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors["question"]}</span>
                        <br />
                        Set private <input type="checkbox" name="isPrivate" checked={this.state.fields["isPrivate"]} onChange={this.handleChange} />
                        <br />
                        <div>
                            <p>Set poll start</p>
                            <DateTimePicker
                                onChange={(event) => this.handleDate("votingStart", event)}
                                value={this.state.fields["votingStart"]}
                            /> <br />
                            <p>Set poll end</p>
                            <DateTimePicker
                                onChange={(event) => this.handleDate("votingEnd", event)}
                                value={this.state.fields["votingEnd"]}
                                minDate={this.state.fields["votingStart"]}

                            /><br /><br />
                        </div>
                        <input type="submit" value="Submit" />
                        <span style={{ color: "red" }}>{this.state.errors["response"]}</span>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreatePoll

