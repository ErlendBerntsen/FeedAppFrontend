import React from "react";
import axios from "axios";

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {username: '', password:''},
            errors: {username: '', password:'', response: ''}
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
        let errors = this.state.errors;
        if (this.handleValidation()) {
            const url = "http://localhost:8080/login"
            const body = { username: fields["username"], password: fields["password"] }
            axios.post(url, body) //perform post request with given username and pass
                .then(response => {
                    if (response.headers.authorization) { //user was authenticated
                        const auth = {
                            'token': response.headers.authorization
                        }
                        //stores username, id and token in one json string. please change this if you know a better way.
                        localStorage.setItem("user", JSON.stringify(Object.assign({}, response.data, auth)))                              
                        this.props.history.push("/profile"); //navigate to profile page
                        window.location.reload();
                    }
                })
                .catch(error => {
                    errors["response"] = error.message //potential error from post request
                    this.setState({ errors: errors });
                });
        }
        event.preventDefault();
    }

    //check that no inputfields are empty
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let isValid = true;
        if (!fields["username"]) {
            isValid = false
            errors["username"] = "Username cannot be empty"
        }
        if (!fields["password"]) {
            isValid = false
            errors["password"] = "Password cannot be empty"
        }
        this.setState({ errors: errors });
        return isValid
    }

    render() {
        return (
            <div>
                <h2>Sign In</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" name="username" placeholder="Username" value={this.state.fields["username"]} onChange={this.handleChange} />
                    </label>
                    <span style={{ color: "red" }}>{this.state.errors["username"]}</span>
                    <br />
                    <label>
                        <input type="text" name="password" placeholder="Password" value={this.state.fields["password"]} onChange={this.handleChange} />
                    </label>
                    <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                    <br />
                    <input type="submit" value="Submit" />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors["response"]}</span>
                </form>
            </div>
        );
    }
}

export default LoginComponent