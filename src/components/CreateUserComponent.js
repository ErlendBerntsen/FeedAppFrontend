import React from "react";
import AuthService from "../services/AuthService";


class CreateUserComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { username: '', password1: '', password2: '' },
            errors: { username: '', password1: '', password2: '', response: '' },
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
            AuthService.register(fields.username, fields.password1)
                .then(response => {
                    if (response.status === 201) {
                        alert('User created successfully');
                        this.props.history.push("/signIn"); //redirect to login
                        window.location.reload();
                    }
                },
                    error => {
                        errors["response"] = error.message //potential error from post request
                        this.setState({ errors: errors })
                    })
        }
        event.preventDefault();
    }

    //returns true if all input fields are valid
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let isValid = true;
        //TODO: check if username exists
        if (!fields["username"]) {
            isValid = false
            errors["username"] = "Username cannot be empty"
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
                        <input type="text" name="username" placeholder="Username" value={this.state.fields["username"]} onChange={this.handleChange} />
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

export default CreateUserComponent