import React, { Component } from "react";
import PollService from "../services/PollService";
import { Redirect } from "react-router-dom";

class SearchId extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            code: '',
            pollId: '',
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value
        this.setState({ code: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (await this.handleValidation()) {
            this.setState({ redirect: "/poll" });
        }
    }

    async handleValidation() {
        const requestParam = "?code=" + this.state.code
        let isValid = false
        await PollService.getAllPolls(requestParam)
            .then(response => {
                this.setState({ pollId: response.data.id })
                isValid = true
            },
                error => {
                    this.setState({ error: "Invalid Poll Code" })
                    isValid = false
                })
        return isValid
    }



    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: this.state.redirect,
                state: { id: this.state.pollId }
            }} />
        }

        const stylee = {
            width: "20%",
            padding: "5px 20px",
            margin: "8px 20px",
        }

        return (
            <div>
                Find poll by Code
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="number" style={stylee}
                            placeholder="Enter Poll Code"
                            value={this.state.code}
                            onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                    <br />
                    <span style={{ color: "red" }}>{this.state.error}</span>
                </form>
            </div>
        )
    }

}

export default SearchId