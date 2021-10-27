import React from "react";

class UserCreationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { usrName: '', password1: '', password2: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.usrName);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>Create new User</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="usrName" value={this.state.usrName} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="text" name="password1" value={this.state.password1} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Repeat password:
                        <input type="text" name="password2" value={this.state.password2} onChange={this.handleChange} />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default UserCreationPage