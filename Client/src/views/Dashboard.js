import React from "react";
import { Row } from "reactstrap";

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

        console.log(data);
        let size = data.devicelist.length, complist = [];
        for(let i=0; i<size; i+=2){
          if(i+2<=size)
            complist.push(<Row><Renderchart line={data.devicelist[i].line} device={data.devicelist[i].device}/>
            <Renderchart line={data.devicelist[i+1].line} device={data.devicelist[i+1].device}/></Row>);
          else
            complist.push(<Row><Renderchart line={data.devicelist[i].line} device={data.devicelist[i].device}/></Row>);
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
