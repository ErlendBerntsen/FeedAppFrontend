import React from "react";

class UserCreationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {}
          }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        let fields = this.state.fields
        fields[target.name] = target.value
        this.setState({
            fields
        });
    }

    handleSubmit(event) {
        
        if (this.handleValidation()) {
            //const url = "http://localhost:8080/users"
            alert('Sent form');
        }
        else {
            alert('An error occured');
        }
        
        event.preventDefault();
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let isValid = true;
        if(!fields["userName"]) {
            isValid = false
            errors["userName"] = "Username cannot be empty"
        }
        if(!fields["password1"]) {
            isValid = false
            errors["password1"] = "Password cannot be empty"
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
                </form>
            </div>
        );
    }
}

export default UserCreationPage