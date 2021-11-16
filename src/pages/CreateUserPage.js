import React from "react";
import AuthService from "../services/AuthService";
import { MasterPage } from "./MasterPage";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'



class CreateUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { username: '', password1: '', password2: '' },
            errors: '',
            focused: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setFocused = this.setFocused.bind(this);

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
                        this.props.history.push("/"); //redirect to login
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
        if (fields["username"].length < 3) {
            this.setState({ errors: "Username must be at least 3 characters" });
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
        if (fields["username"].length > 1000 || fields["password1"].length > 1000) {
            this.setState({ errors: "Input is too big" });
            return false
        }
        return true
    }

    keyPress(e){
        var key = (e.keyCode || e.which);
        if((key === 13 || key === 3) && this.state.focused){
            this.handleSubmit(e);
        }
    }

    setFocused(isFocused){
        this.setState({focused: isFocused});
    }

    render() {
        return (
            <MasterPage>
            <Row className="justify-content-md-center">
                <Col md="auto">
                <h2>Create a new user</h2>
                <br/>
                <Form >
                <Row>
                    <Col>
                    <Form.Control type="text" 
                                name="username"
                                placeholder="Username"
                                value={this.state.fields["username"]}
                                onChange={this.handleChange}/>  
                    </Col>
          
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Form.Control type="password"
                                    name="password1"
                                    placeholder="Password"
                                    value={this.state.fields["password1"]}
                                    onChange={this.handleChange}/>  
                    </Col>
             
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Form.Control type="password"
                                    name="password2"
                                    placeholder="Confirm Password"
                                    value={this.state.fields["password2"]}
                                    onFocus={() => this.setFocused(true)}
                                    onBlur={() => this.setFocused(false)}
                                    onKeyPress={(e) => this.keyPress(e)}
                                    onChange={this.handleChange}/>
                    </Col>
              
                </Row>
                <Row>
                    <span style={{ color: "red" }}>{this.state.errors}</span>
                </Row>
                <br/>
                <Row >
                    <Col>
                    <Button className="w-100"  variant="theme" size="lg" onClick={(e) => this.handleSubmit(e)}>
                        <b>Create User</b>
                    </Button>
                    </Col>
                </Row>
           
            </Form>
            
                </Col>
            </Row>
               
            </MasterPage>
        );
    }
}

export default CreateUserPage