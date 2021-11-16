import React, { Component } from "react";
import PollService from "../services/PollService";
import { Link } from "react-router-dom";


class PollList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentReady: false,
            currentUser: { username: '', id: '' },
            content: {},
            error: ''
        };
    }


    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser && this.props.user) { //to fix crash logging out on profile page
            return
        }
        this.setState({ currentUser: currentUser })
        const currentUserId = this.props.currentUser? currentUser.id : null
        const id = this.props.id? this.props.id : currentUserId
        const requestParam = this.props.user ? "?creator=" + id : "?isPrivate=false"
        const isAdmin = currentUser && currentUser.userType === "ADMIN"
        PollService.getAllPolls((!this.props.user && isAdmin)? "": requestParam)
            .then(response => {
                this.setState({ content: response.data, contentReady: true })
            },
                error => {
                    this.setState({ error: error.message })
                })
    }

    //creates a link to the poll page of all polls. The id of the poll is sent in the state variable
    createLinks() {
        const { content } = this.state
        const links = []
        for (let i = 0; i < content.length; i++) {
            links[i] = (
                <li key={content[i].id}> {
                    <Link to={{
                        pathname: '/poll',
                        state: {
                            id: content[i].id
                        }
                    }}><h4>{content[i].question}</h4></Link>}
                </li>)
        }
        return links
    }

    render() {
        const isAdmin = this.state.currentUser &&  this.state.currentUser.userType === "ADMIN"
        const title = isAdmin? "Polls" : "Public polls"
        const header = !this.props.user ? title : "My polls"
        const links = !this.state.contentReady ? null : this.createLinks()
        return (
                    <div>
                    <h3>{header}</h3>
                    <ul> {links} </ul>
                    <span style={{ color: "red" }}>{this.state.error}</span>
                    </div>
    
          
        );
    }
}

export default PollList