import React from "react";
import axios from "axios";

class LoginComponent extends React.Component {
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

    handleSubmit(event) {
        let fields = this.state.fields;
        let errors = this.state.errors;
        if (this.handleValidation()) {
            const url = "http://localhost:8080/login"
            const body = { username: fields["userName"], password: fields["password"] }
            axios.post(url, body)
                .then(response => {
                    if (response.headers.authorization) {
                        var auth = {
                            'token': response.headers.authorization
                        }
                        //stores username, id and token in one json string. please change this if you know a better way.
                        localStorage.setItem("user", JSON.stringify(Object.assign({}, response.data, auth))) 
                                                            
                        this.props.history.push("/profile");
                        window.location.reload();
                    }
                })
                .catch(error => {
                    errors["response"] = error.message
                    this.setState({ errors: errors });
                });
        }
        
        event.preventDefault();
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let isValid = true;
        if (!fields["userName"]) {
            isValid = false
            errors["userName"] = "Username cannot be empty"
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
                        <input type="text" name="userName" placeholder="Username" value={this.state.fields["userName"]} onChange={this.handleChange} />
                    </label>
                    <span style={{ color: "red" }}>{this.state.errors["userName"]}</span>
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