import React from "react";
// nodejs library that concatenates classes
// import classNames from "classnames";
// react plugin used to create charts
import { Bar } from "react-chartjs-2";

// reactstrap components
import {
  // Button,
  // ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  //DropdownToggle,
  //DropdownMenu,
  //DropdownItem,
  //UncontrolledDropdown,
  //Label,
  //FormGroup,
  //Input,
  //Table,
  Row,
  Col,
  //UncontrolledTooltip
} from "reactstrap";

// core components
import {
  // chartExample1,
  // chartExample2,
//   chartExample3,
  // chartExample4
} from "variables/charts.js";

import TemperatureChart1 from "line1/chart/TemperatureChart1.js"
import HumidityChart1 from "line1/chart/HumidityChart1.js"

class Lineboard1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1"
    };
  }

  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  render() { // Lineboard1
    return (
      <>
        <div className="content">
          <Row>
          <Col xs="6">
              <Card>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                    <h5 className="card-category">Process Line 1</h5>
                      <CardTitle tag="h3">
                        <i className="tim-icons icon-single-02" />
                        Temperature
                      </CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <TemperatureChart1/>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="6">
              <Card>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                    <h5 className="card-category">Process Line 1</h5>
                      <CardTitle tag="h3">
                      <i className="tim-icons icon-single-02" />
                        Humidity
                      </CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <HumidityChart1/>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Lineboard1;
