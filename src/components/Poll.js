import React, { Component } from "react";



class Poll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            currentUser: { username: '', id: '' },
            content: props.location.state,
            error: ''
        };
    }


    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        this.setState({ currentUser: currentUser })

    }

    render() {
        const { content } = this.state

        return (
            <div>
                <h2>Poll</h2>
                {JSON.stringify(content)}
            </div>
        );
    }
}

export default Poll