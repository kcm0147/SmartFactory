import React from "react";

import TemperatureChart from "variables/TemperatureChart.js"
import HumidityChart from "variables/HumidityChart.js"
import WeightChart from "variables/WeightChart.js"

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

class Renderchart extends React.Component {
  // constructor(props) {
  //   super(props); // line : process line, device : sensor kind
  // }

  render() {
    let devComp;
    switch (this.props.device) {
      case "temperature":
        devComp = <TemperatureChart line={this.props.line} />
        break;
      case "humidity":
        devComp = <HumidityChart line={this.props.ling} />
        break;
      case "weight":
        devComp = <WeightChart line={this.props.line} />
        break;
      default:
        devComp = <></>;
    } // 센서별 적합한 차트 컴포넌트 선택

    return (
      <Card>
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">Process Line {this.props.line}</h5>
              <CardTitle tag="h3">
                {this.props.device.toUpperCase()}
              </CardTitle>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div className="chart-area">
            {devComp}
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Renderchart;