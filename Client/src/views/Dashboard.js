import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  // chartExample1,
  // chartExample2,
  chartExample3,
  // chartExample4
} from "variables/charts.js";

import Renderchart from "../variables/Renderchart.js";
class Dashboard extends React.Component {
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
  render() { // Dashboard row 시작되는 위치
    return (
        <div className="content">
          <Row>
            <Renderchart line="1" device="Temperature"/>
            <Renderchart line="1" device="Humidity"/>
          </Row>
          <Row>
            <Renderchart line="2" device="Temperature"/>
            <Renderchart line="2" device="Humidity"/>
          </Row>
          <Row>
            <Renderchart line="3" device="Temperature"/>
            <Renderchart line="3" device="Humidity"/>
            <Renderchart line="3" device="Weight"/>
          </Row>
          <Row>
          <Col xs="6">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Process Line 3</h5>
                  <CardTitle tag="h3">
                    Camera
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div>
                    <img src="http://192.168.43.179:8091/?action=stream"></img>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }
}

export default Dashboard;
