import React from "react";

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

import TemperatureChart1 from "line1/chart/TemperatureChart1.js"
import HumidityChart1 from "line1/chart/HumidityChart1.js"
import TemperatureChart2 from "line2/chart/TemperatureChart2.js"
import HumidityChart2 from "line2/chart/HumidityChart2.js"
import TemperatureChart3 from "line3/chart/TemperatureChart3.js"
import HumidityChart3 from "line3/chart/HumidityChart3.js"
import WeightChart3 from "line3/chart/WeightChart3.js"

import Renderchart from "variables/Renderchart.js"

import { Query } from "react-apollo";
import gql from "graphql-tag";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.querystr = gql`query {
      devicelist {
        line, device
      }
    }`
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
    return <Query query={gql`${this.querystr}`}>
      {({ data, loading }) => {
        if (loading) return null;

        let size = data.devicelist.length, complist = [];
        for(let i=0; i<size; i+=2){
          if(i+2<size)
            complist.push(<Row><Renderchart line={data.devicelist[i].line}/><Renderchart line={data.devicelist[i+1].line}/></Row>);
          else
            complist.push(<Row><Renderchart line={data.devicelist[i].line}/></Row>);
        }

        return (
          <div className="content">
            {complist}
          </div>
        );
      }}
    </Query>
  }
}

export default Dashboard;
