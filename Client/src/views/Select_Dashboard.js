/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Switch, Link } from 'react-router-dom';
import Processline from "./Processline"

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="content">
        <Switch>
          <Route path="/admin/dashboard/processline" component={Processline} />
        </Switch>
        <h2> Dashboard </h2>
        <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h4 className="title">공정라인 리스트</h4>
                  <p className="category">
                    모니터링할 공정라인을 선택하세요.
                  </p>
                </CardHeader>
                <CardBody className="all-icons">
                  <Row>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="4"
                      md="3"
                      sm="4"
                    >
                      <Link to="/admin/dashboard/processline">
                        <button style={{background:"#11ffee00",width:"100%"}} className="font-icon-detail">
                          <i className="tim-icons icon-alert-circle-exc" />
                          <p style={{fontSize:16,fontWeight:"bold"}}>공정라인 1</p>
                        </button>
                      </Link>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="4"
                      md="3"
                      sm="4"
                    >
                      <button style={{background:"#11ffee00",width:"100%"}} className="font-icon-detail">
                        <i className="tim-icons icon-alert-circle-exc" />
                        <p style={{fontSize:16,fontWeight:"bold"}}>공정라인 2</p>
                      </button>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="4"
                      md="3"
                      sm="4"
                    >
                      <button style={{background:"#11ffee00",width:"100%"}} className="font-icon-detail">
                        <i className="tim-icons icon-alert-circle-exc" />
                        <p style={{fontSize:16,fontWeight:"bold"}}>공정라인 3</p>
                      </button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
      </div>
    );
  }
}

export default Dashboard;
