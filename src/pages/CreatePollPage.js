import React, { Component } from "react";
import PollService from "../services/PollService";
import { Redirect } from "react-router-dom";
import { MasterPage } from "./MasterPage";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import DateTimePicker from 'react-datetime-picker';



class CreatePollPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            fields: { question: '', isPrivate: false, votingStart: new Date(), votingEnd: '' },
            errors: { question: '', response: '' }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser) this.setState({ redirect: "/signIn" }); //redirect to login if no current user
    }

    handleChange(event) {
        const target = event.target;
        let fields = this.state.fields
        const value = target.name === 'isPrivate' ? target.checked : target.value; //for checkbox use
        fields[target.name] = value
        this.setState({ fields });
    }

    handleDate(name, event) {
        let fields = this.state.fields
        fields[name] = event
        this.setState({ fields })
    }

    handleSubmit(event) {
        let fields = this.state.fields;
        let errors = this.state.errors;
        if (this.handleValidation()) {
            PollService.createPoll(fields.question, fields.votingStart, fields.votingEnd, fields.isPrivate)
                .then((response) => {
                    alert("Poll created")
                    const pollLink = {
                        pathname: '/poll',
                        state: {
                            id: response.data.id
                        }}
                    this.setState({ redirect: pollLink })
             
                },
                    error => {
                        errors["response"] = error.message //potential error from post request
                        this.setState({ errors: errors })
                    })
        }
        event.preventDefault();
    }

    handleValidation() {
        let fields = this.state.fields
        let errors = this.state.errors
        let isValid = true
        if (!fields["question"]) {
            isValid = false
            errors["question"] = "Question cannot be empty"
        }
        if(!fields["votingStart"]){
            isValid = false
            errors["votingStart"] = "Voting start must be specified"
        }
        if(fields["votingEnd"] <= fields["votingStart"]){
            isValid = false
            errors["votingEnd"] = "Voting end must be after voting start"
        }
        if(!fields["votingEnd"]){
            isValid = false
            errors["votingEnd"] = "Voting end must be specified"
        }
     
        this.setState({ errors: errors });
        return isValid
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <MasterPage>

            <Row className="justify-content-md-center">
                <Col md="auto">
                <h2>Create a new poll</h2>
                <br/>
                <Form >
                <Row>
                    <Col>
                    <Form.Control type="text" 
                                name="question"
                                placeholder="Question"
                                value={this.state.fields["question"]}
                                onChange={this.handleChange}/>  
                    </Col>

                </Row>
                <span style={{ color: "red" }}>{this.state.errors["question"]}</span>
                <br/>
                <Row>
                    <Col>
                    <Form.Check type="checkbox" 
                    name="isPrivate"
                    value={this.state.fields["question"]}
                    label="Set private"
                    checked={this.state.fields["isPrivate"]}
                    onChange={this.handleChange}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                <Col> 
                <p>Set poll start</p>
                            <DateTimePicker className="date-time-picker"
                                onChange={(event) => this.handleDate("votingStart", event)}
                                value={this.state.fields["votingStart"]}
                            />   
                </Col>
                <span style={{ color: "red" }}>{this.state.errors["votingStart"]}</span>

                         
                </Row>
                <br/>
                <Row>
                    <Col>
                    <p>Set poll end</p>
                                <DateTimePicker className="date-time-picker"
                                    onChange={(event) => this.handleDate("votingEnd", event)}
                                    value={this.state.fields["votingEnd"]}
                                    minDate={this.state.fields["votingStart"]}

                                />
                    </Col>
                </Row>
                <span style={{ color: "red" }}>{this.state.errors["votingEnd"]}</span>

                <Row>
                    <span style={{ color: "red" }}>{this.state.errors["response"]}</span>
                </Row>
                <br/>
                <Row >
                    <Col>
                    <Button className="w-100"  variant="theme" size="lg" onClick={(e) => this.handleSubmit(e)}>
                        <b>Create Poll</b>
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

export default CreatePollPage

