import React from "react";
import renderHTML from 'react-render-html';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

class Renderchart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const chart = renderHTML(this.props.)
        if (this.props.device === "temperature") {

        }
        return (
            <Card>
                <CardHeader>
                    <Row>
                        <Col className="text-left" sm="6">
                            <h5 className="card-category">Process Line {this.props.line}</h5>
                            <CardTitle tag="h3">
                                {this.props.device}
                            </CardTitle>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                        <TemperatureChart1 />
                    </div>
                </CardBody>
            </Card>
        );
    }
}