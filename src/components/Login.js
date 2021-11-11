import React from "react";
import AuthService from "../services/AuthService";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { username: '', password: '' },
            errors: ''
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

    handleSubmit(event) {
        let fields = this.state.fields;
        if (this.handleValidation()) {
            AuthService.login(fields.username, fields.password)
                .then(() => {
                    this.props.history.push("/profile"); //redirect to profile page
                    window.location.reload();
                },
                    error => {
                        this.setState({ errors: error.message })
                    })
        }
        event.preventDefault();
    }

    //check that no inputfields are empty
    handleValidation() {
        let fields = this.state.fields;
        if (!fields["username"]) {
            this.setState({ errors: "Username cannot be empty" });
            return false
        }
        if (!fields["password"]) {
            this.setState({ errors: "Password cannot be empty" });
            return false
        }
        return true
    }

    render() {
        return (
            <div>
                <h2>Sign In</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" name="username" placeholder="Username" value={this.state.fields["username"]} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        <input type="password" name="password" placeholder="Password" value={this.state.fields["password"]} onChange={this.handleChange} />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors}</span>
                </form>
            </div>
        );
    }
}

export default Login