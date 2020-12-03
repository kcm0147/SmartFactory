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

import { Query } from "react-apollo";
import gql from "graphql-tag";

// core components
import {
  // chartExample1,
  // chartExample2,
  chartExample3,
  // chartExample4
} from "variables/charts.js";

import TemperatureChart1 from "line1/chart/TemperatureChart1.js"
import HumidityChart1 from "line1/chart/HumidityChart1.js"
import TemperatureChart2 from "line2/chart/TemperatureChart2.js"
import HumidityChart2 from "line2/chart/HumidityChart2.js"
import TemperatureChart3 from "line3/chart/TemperatureChart3.js"
import HumidityChart3 from "line3/chart/HumidityChart3.js"
import WeightChart3 from "line3/chart/WeightChart3.js"

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1"
    };
    this.querystr = gql`query {
      devicelist {
        line, device
      }
    }`
  }

  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  render() { // Dashboard row 시작되는 위치
    return (
      <>
      <Query query={gql`${this.querystr}`}>
            {({ data, loading }) => {
              if (loading) return null;

              console.log(data);

              // render chart with g2c data :)
              return (
                <div className="content">
          <Row>
          <Col xs="6">
              <Card>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                    <h5 className="card-category">Process Line 1</h5>
                      <CardTitle tag="h3">
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
          <Row>
            <Col xs="6">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                    <h5 className="card-category">Process Line 2</h5>
                      <CardTitle tag="h3">
                        Temperature
                      </CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div>
                    <TemperatureChart2/>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="6">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                    <h5 className="card-category"> Process Line 2</h5>
                      <CardTitle tag="h3">
                        Humidity
                      </CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div>
                    <HumidityChart2/>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Process Line 3</h5>
                  <CardTitle tag="h3">
                    Temperature
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div>
                    <TemperatureChart3/>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="6">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Process Line 3</h5>
                  <CardTitle tag="h3">
                    Humidity
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div>
                    <HumidityChart3/>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
          <Col xs="6">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Process Line 3</h5>
                  <CardTitle tag="h3">
                    Weight
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div>
                    <WeightChart3/>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
              );
            }}
          </Query>
      </>
    );
  }
}

export default Dashboard;
