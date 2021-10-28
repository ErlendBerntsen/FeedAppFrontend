import React from "react";
import axios from "axios";


class UserCreationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //update state with input in textfields
    handleChange(event) {
        const target = event.target;
        let fields = this.state.fields
        fields[target.name] = target.value
        this.setState({
            fields
        });
    }

    //performs a post request with current fields when pressing submit button
    handleSubmit(event) {
        let fields = this.state.fields;
        let errors = this.state.errors;
        if (this.handleValidation()) {
            let success = true
            const url = "http://localhost:8080/users"
            const body = { username: fields["userName"], password: fields["password1"], userType: "REGULAR" }
            axios.post(url, body)
                .then(response => response.data)
                .catch(error => {
                    errors["response"] = error.message 
                    this.setState({ errors: errors });
                    success = false
                });
            if (success) {
                alert('User created successfully');
            }
        }
        event.preventDefault();
    }

    //returns true if all input fields are valid
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let isValid = true;
        //TODO: check if username exists
        if (!fields["userName"]) {
            isValid = false
            errors["userName"] = "Username cannot be empty"
        }
        if (fields["password1"].length < 8) {
            isValid = false
            errors["password1"] = "Password must be at least 8 characters"
        }
        if (fields["password1"] !== fields["password2"]) {
            isValid = false
            errors["password2"] = "Passwords do not match"
        }
        this.setState({ errors: errors });
        return isValid
    }

    render() {
        return (
            <div>
                <h2>Create new User</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" name="userName" placeholder="Username" value={this.state.fields["userName"]} onChange={this.handleChange} />
                    </label>
                    <span style={{ color: "red" }}>{this.state.errors["userName"]}</span>
                    <br />
                    <label>
                        <input type="text" name="password1" placeholder="Password" value={this.state.fields["password1"]} onChange={this.handleChange} />
                    </label>
                    <span style={{ color: "red" }}>{this.state.errors["password1"]}</span>
                    <br />
                    <label>
                        <input type="text" name="password2" placeholder="Confirm Password" value={this.state.fields["password2"]} onChange={this.handleChange} />
                    </label>
                    <span style={{ color: "red" }}>{this.state.errors["password2"]}</span>
                    <br />
                    <input type="submit" value="Submit" />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["response"]}</span>
                </form>
            </div>
        );
    }
}

export default UserCreationPage