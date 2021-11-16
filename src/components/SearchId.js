import React, { Component } from "react";
import PollService from "../services/PollService";
import { Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
class SearchId extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            code: '',
            pollId: '',
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value
        this.setState({ code: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (await this.handleValidation()) {
            this.setState({ redirect: "/poll" });
        }
    }

    async handleValidation() {
        const requestParam = "?code=" + this.state.code
        let isValid = false
        await PollService.getAllPolls(requestParam)
            .then(response => {
                this.setState({ pollId: response.data.id })
                isValid = true
            },
                error => {
                    const mes = !error.response ? error.message : error.response.data
                    this.setState({ error: mes })
                    isValid = false
                })
        return isValid
    }



    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: this.state.redirect,
                state: { id: this.state.pollId }
            }} />
        }

        return (
            <Container>
            <Form >
                
                <Row>
                    <Col  md="auto" style={{display: "flex", alignItems: "center", }}>
                    <Form.Control type="number" 
                                placeholder="Enter code"
                                value={this.state.code}
                                onChange={this.handleChange}/>
                    </Col>
                    <Col xs ="auto">
                    <Button variant="theme" type="submit" onClick={(e) => this.handleSubmit(e)}><b>Go To Poll</b></Button>

                    </Col>
                </Row>
                <Row>
                    <span style={{ color: "red" }}>{this.state.error}</span>
                </Row>
            </Form>
        </Container>
          
        )
    }

}

export default SearchId