import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
// import { Switch, useParams, Link, Route, BrowserRouter as Router } from "react-router-dom"
// import Registerform from "./Registerform.js";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import Renderregistration from "variables/Renderregistration.js"

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.querystr = gql`query {
      requestlist {
        line, device
      }
    }`
  }
  render() {
    return <Query query={gql`${this.querystr}`}>
      {({ data, loading }) => {
        if (loading) return null;

        console.log(data);
        let size = data.requestlist.length, registerlist = [];
        for (let i = 0; i < size; i++) {
          registerlist.push(<Renderregistration 
            line={data.requestlist[i].line} device={data.requestlist[i].device}/>)
        }

        return (
          <div className="content">
            <h2> Registration Section </h2>
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <h4 className="title">현재 신청 대기 센서 항목</h4>
                    <p className="category">
                      신청 대기 항목을 등록해 센싱 정보를 실시간으로 모니터링 해보십시오.
                  </p>
                  </CardHeader>
                  <CardBody className="all-icons">
                    <Row>
                      {registerlist}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        );
      }}
    </Query>
  }
}

export default Registration;
