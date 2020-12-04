import React from "react";

import TemperatureChart1 from "line1/chart/TemperatureChart1.js"

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

class Renderchart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Col xs="6">
        <Card>
          <CardHeader>
            <Row>
              <Col className="text-left" sm="6">
                <h5 className="card-category">Process Line {this.props.line}</h5>
                <CardTitle tag="h3">
                  Temperature
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
      </Col>
    );
  }
}

export default Renderchart;