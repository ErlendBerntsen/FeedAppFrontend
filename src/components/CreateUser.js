import React from "react";
import AuthService from "../services/AuthService";


class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { username: '', password1: '', password2: '' },
            errors: '',
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
                        const mes = !error.response ? error.message : error.response.data
                        this.setState({ errors: mes })
                    })
        }
        event.preventDefault();
    }

    //returns true if all input fields are valid
    handleValidation() {
        let fields = this.state.fields;
        //TODO: check if username exists
        if (!fields["username"]) {
            this.setState({ errors: "Username cannot be empty" });
            return false
        }
        if (fields["password1"].length < 8) {
            this.setState({ errors: "Password must be at least 8 characters" });
            return false
        }
        if (fields["password1"] !== fields["password2"]) {
            this.setState({ errors: "Passwords do not match" });
            return false
        }
        return true
    }

    render() {
        return (
            <div>
                <h2 style={{ color: 'orange' }}>Create new user</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" name="username" placeholder="Username" value={this.state.fields["username"]} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        <input type="password" name="password1" placeholder="Password" value={this.state.fields["password1"]} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        <input type="password" name="password2" placeholder="Confirm Password" value={this.state.fields["password2"]} onChange={this.handleChange} />
                    </label>
                    <br />
                    <input type="submit" value="Create" />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors}</span>
                </form>
            </div>
        );
    }
}

export default CreateUser