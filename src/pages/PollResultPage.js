import React, { Component } from "react";
import PollService from "../services/PollService";
import { MasterPage } from "./MasterPage";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { PieChart } from 'react-minimal-pie-chart';
import COLORS from '../configurations/CSSConfiguration'


class PollResultPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            contentReady: '',
            content: '',
            error: ''
        };
    }

    componentDidMount() {
        const pollId = this.props.location.state.id
        const question = this.props.location.state.question
        this.setState({ question: question })
        PollService.getResults(pollId)
            .then(response => {
                this.setState({ content: response.data, contentReady: true })
            })
    }

    render() {
        if (!this.state.contentReady) {
            return <MasterPage></MasterPage>
        }
        const yes = this.state.content.yesVotes
        const no = this.state.content.noVotes
        return (
            <MasterPage>
               <Row className="justify-content-md-center">
                            <Col md="auto">
                                <Row className="justify-content-md-center">
                                    <Col md="auto">
                                    <h1>Results</h1>\
                                    </Col>
                                </Row>
                                <h1 style={{ color: 'white' }}>{this.state.question}</h1>
                                <PieChart
                                        data={[
                                            { title: 'Yes', value: yes, color: COLORS.complementary},
                                            { title: 'No', value: no, color:  COLORS.primary },
                                        ]}
                                        radius={PieChart.defaultProps.radius - 5}
                                        segmentsShift={(index) => (index === 0 ? 5 : 0.5)}
                                        label={({ dataEntry }) => dataEntry.value === 0? '' : dataEntry.title + ": " + dataEntry.value  + "(" +  Math.round(dataEntry.percentage) + '%)'}
                                        labelStyle={() => ({
                                            fontSize: '5px',
                                            fontFamily: 'Poppins',
                                            fill: "white",
                                        })}
                                        labelPosition={60}
                                        animate
                                        />
                                <Row className="justify-content-md-center">
                                    <Col md="auto">
                                    <h3>{yes + no} Total Votes</h3>
                                    </Col>
                                </Row>
                                </Col>
                        </Row>
  
            </MasterPage>

        );
    }

}

export default PollResultPage
