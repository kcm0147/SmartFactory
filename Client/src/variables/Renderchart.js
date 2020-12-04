import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

import TemperatureChart from "./TemperatureChart.js";
import HumidityChart from "./HumidityChart.js";
import WeightChart from "./WeightChart.js";

class Renderchart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.device === "Temperature") {
      return (
        <Card>
          <CardHeader>
              <Col className="text-left" sm="6">
                <h5 className="card-category">Process Line {this.props.line}</h5>
                <CardTitle tag="h3">
                  {this.props.device}
                </CardTitle>
              </Col>
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              <TemperatureChart />
            </div>
          </CardBody>
        </Card>
      );
    } else if (this.props.device === "Humidity") {
      return (
        <Card>
          <CardHeader>
              <Col className="text-left" sm="6">
                <h5 className="card-category">Process Line {this.props.line}</h5>
                <CardTitle tag="h3">
                  {this.props.device}
                </CardTitle>
              </Col>
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              <HumidityChart />
            </div>
          </CardBody>
        </Card>
      );
    } else if (this.props.device === "Weight") {
      return (
        <Card>
          <CardHeader>
              <Col className="text-left" sm="6">
                <h5 className="card-category">Process Line {this.props.line}</h5>
                <CardTitle tag="h3">
                  {this.props.device}
                </CardTitle>
              </Col>
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              <WeightChart />
            </div>
          </CardBody>
        </Card>
      );
    }
  }
}
export default Renderchart;