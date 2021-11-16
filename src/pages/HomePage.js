import React, { Component } from "react";
import SearchId from "../components/SearchId";
import PollList from "../components/PollList";
import { MasterPage } from "./MasterPage";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
class HomePage extends Component {
    
    render() {
        const currentUser = localStorage.getItem("user")
        return (
            <MasterPage user={currentUser}>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <SearchId />
                        <br/>
                        <br/>
                        <br/>
                        <PollList />
                    </Col>
                </Row>
            </MasterPage>

        );
    }
}

export default HomePage;