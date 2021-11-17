import React, { Component } from "react";
import PollService from "../services/PollService";
import { Redirect } from "react-router-dom";
import Countdown from 'react-countdown';
import { MasterPage } from "./MasterPage";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import COLORS from '../configurations/CSSConfiguration'





class PollPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOwner: false,
            voting: '',
            countdownTime: null,
            pollId: '',
            answer: '',
            anonymous: false,
            redirect: null,
            guest: false,
            contentReady: false,
            currentUser: { username: '', id: '', userType: '' },
            content: '',
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }


    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser) {
            this.setState({ guest: true })
        }
        this.setState({ currentUser: currentUser })
        if (!this.props.location.state) {
            //TODO: set redirect if no id?
        }
        else {
            const pollId = this.props.location.state.id //get poll id from the clicked link
            this.setState({ pollId: pollId }) //get content for this poll
            PollService.getPoll(pollId)
                .then(response => {
                    this.setState({ content: response.data, contentReady: true })
                    if (!this.state.guest) {
                        if (currentUser.id === response.data.creatorId) {
                            this.setState({ isOwner: true })
                        }
                    }
                    this.checkPollOpen(response.data.votingStart, response.data.votingEnd)
                },
                    error => {
                        this.setState({ error: error.message })
                    })
        }
    }

    handleChange(event) {
        const target = event.target
        if (target.type === "checkbox") {
            this.setState({ anonymous: target.checked });
        }
        else {
            this.setState({ answer: target.value });
        }

    }

    checkPollOpen(startDate, endDate) {
        const current = new Date()
        const start = new Date(startDate)
        const end = new Date(endDate)
        console.log("current: " + current)
        console.log("start: " + start)
        console.log("end: " + end)


        if (current < start) {
            this.setState({ voting: "notStarted" });
            this.setState({ countdownTime: start});
        }
        else if(end < current){
            this.setState({ voting: "ended" });
        }
        else if(start <= current && current <= end){
            this.setState({ voting: "started" });
            this.setState({ countdownTime: end});
        }
 

    }

    handleClick() {
        this.setState({ redirect: "/result" })
    }

    handleSubmit(event) {
        event.preventDefault()
        if (this.handleValidation() && !this.alreadyVoted()) {
            const voteType = this.state.guest ? "GUEST" : this.state.anonymous ? "ANONYMOUS" : "USER"
            PollService.addVote(this.state.pollId, this.state.answer, voteType)
                .then(() => {
                    alert("Vote sent!")
                    this.setVoted()
                    this.setState({ redirect: "/result" })
                },
                    error => {
                        this.setState({ error: error.message })
                    })
        }
    }

    alreadyVoted() {
        let currentPolls = JSON.parse(localStorage.getItem("polls"))
        if (!currentPolls) {
            currentPolls = { polls: [] }
            localStorage.setItem("polls", JSON.stringify(currentPolls))
        }
        if (currentPolls.polls.indexOf(this.state.pollId) === -1) {
            return false
        }
        this.setState({ error: "You have already voted on this poll!" })
        return true
    }


    setVoted() {
        let currentPolls = JSON.parse(localStorage.getItem("polls"))
        currentPolls.polls.push(this.state.pollId)
        localStorage.setItem("polls", JSON.stringify(currentPolls))
    }

    handleValidation() {
        let isValid = true
        if (!this.state.answer) {
            isValid = false
            this.setState({ error: "Select Yes or No" })
        }
        return isValid
    }

    handleDelete() {
        PollService.deletePoll(this.state.pollId)
            .then(() => {
                alert("Poll deleted!")
                this.props.history.push("/");
                window.location.reload();
            },
                error => {
                    this.setState({ error: error.message })
                })
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: this.state.redirect,
                state: { id: this.state.pollId, question: this.state.content.question }
            }} />
        }

        if (!this.state.contentReady) {
            return null
        }
        const countdown = () => {
            console.log(this.state.voting)
            console.log(this.state.countdownTime)
            if (this.state.countdownTime) { 
                return (
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <h3>{this.state.voting === 'notStarted'? "Voting starts in" : "Voting ends in"}</h3>
                        </Col>
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <h4>{<Countdown date={this.state.countdownTime}></Countdown>}</h4>
                            </Col>
                        </Row>
                    </Row>
                )
            }
            return null
        }

        const { content } = this.state
        const anonBox = () => {
            if (!this.state.guest) { //only display this option if the user i logged in
                return (
                    <Form.Check type="checkbox" 
                    name="anonymous"
                    value="No"
                    label="Vote anonymously?"
                    checked={this.state.anonymous}
                    onChange={this.handleChange}/>
                )
            }
            return null
        }

        const ownerOpt = () => {
            if (this.state.isOwner || (this.state.currentUser && this.state.currentUser["userType"] === "ADMIN")) { //only display this option if the user is owner
                return (
                     <Button variant="theme" onClick={this.handleDelete}>
                        Delete Poll
                     </Button>
                );
            }
            return null
        }

        const vote = () => {
            if (this.state.voting === "started"){ //only display vote button if poll is open
                return (
                    <Form>
                
                    <Row>
                        <Col>
                            <Row>
                            <Col style={{display: "flex", alignItems: "center", }}>
                                <Form.Check type="radio" 
                                            name="answer"
                                            label="Yes"
                                            value="Yes"
                                            checked={this.state.answer === "Yes"}
                                            onChange={this.handleChange}>
                                </Form.Check>
                                            
                            </Col>
                            <Col style={{display: "flex", alignItems: "center", }}>
                                <Form.Check type="radio" 
                                            name="answer"
                                            value="No"
                                            label="No"
                                            checked={this.state.answer === "No"}
                                            onChange={this.handleChange}>
                                </Form.Check>
                            </Col>
                            </Row>
                        <br/>
                        <Row >
                            <Col >
                                {anonBox()}
                            </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Button variant="theme" size="lg" type="submit" value="Vote" onClick={(e) => this.handleSubmit(e)}>
                                 <b>Vote</b>
                             </Button>
                
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <h5><a href={"https://dweet.io/follow/" + this.state.content.id} target="_blank" rel="noreferrer" style={{color: COLORS.complementary}}>
                                Follow the results on dweet here
                            </a>
                        </h5>
                    </Row>
                   
            
                </Form>);
                   
            }
            if(this.state.voting === "ended"){
                return (
                    <Row>
                        <h5>Voting has ended!</h5>
                        <h5><a href={"https://dweet.io/follow/" + this.state.content.id} target="_blank" rel="noreferrer" style={{color: COLORS.complementary}}>
                                See the results on dweet here
                            </a>
                        </h5>
                    </Row>
                );
            }
            return (<></>);
         
        }

        return (
            <MasterPage>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                    <h2>{content.question}</h2>
                    <h4>CODE: {content.code}</h4>
                    <br/>
                    {vote()}
                    <br/>
                    <span style={{ color: "red" }}>{this.state.error}</span>
                    <br/>
                    <br/>
                    <Row>
                        {this.state.voting === "notStarted"? <></>
                            :
                            <Col>
                                <Button variant="theme2" onClick={this.handleClick}>
                                        Show Results
                                </Button>
                            </Col> 
                        }
                
                        <Col>
                            {ownerOpt()}
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    {countdown()}
                    </Col>
                </Row>
                  
            </MasterPage>
      
        );
    }
}

export default PollPage;