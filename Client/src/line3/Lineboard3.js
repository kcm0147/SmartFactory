import React from "react";
// nodejs library that concatenates classes
// import classNames from "classnames";
// react plugin used to create charts

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

import TemperatureChart3 from "line3/chart/TemperatureChart3.js"
import HumidityChart3 from "line3/chart/HumidityChart3.js"
import WeightChart3 from "line3/chart/WeightChart3.js"

class Lineboard3 extends React.Component {
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
                    <h5 className="card-category">Process Line 3</h5>
                      <CardTitle tag="h3">
                        <i className="tim-icons icon-single-02" />
                        Temperature
                      </CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <TemperatureChart3/>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="6">
              <Card>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                    <h5 className="card-category">Process Line 3</h5>
                      <CardTitle tag="h3">
                      <i className="tim-icons icon-single-02" />
                        Humidity
                      </CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <HumidityChart3/>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
          <Col xs="6">
              <Card>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                    <h5 className="card-category">Process Line 3</h5>
                      <CardTitle tag="h3">
                      <i className="tim-icons icon-single-02" />
                        Weight
                      </CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <WeightChart3/>
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

export default Lineboard3;
