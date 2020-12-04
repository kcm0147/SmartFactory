import React from "react";
// nodejs library that concatenates classes
// import classNames from "classnames";
// react plugin used to create charts
import { Bar } from "react-chartjs-2";

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
        </div>
    );
  }
}

export default Dashboard;
