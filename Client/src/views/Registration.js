import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Switch, useParams, Link, Route, BrowserRouter as Router } from "react-router-dom"
import DeviceForm from "./DeviceForm.js";

class Registration extends React.Component {
  render() {
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
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <Link to="/admin/deviceform/1/Temperature">
                        <button style={{ background: "#11ffee00", width: "100%" }} className="font-icon-detail">
                          <i className="tim-icons icon-alert-circle-exc" />
                          <p style={{ fontSize: 16, fontWeight: "bold" }}>공정라인 1</p>
                          <p style={{ fontSize: 14 }}>Temperature</p>
                        </button>
                      </Link>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <Link to="/admin/deviceform/3/Humidity">
                        <button style={{ background: "#11ffee00", width: "100%" }} className="font-icon-detail">
                          <i className="tim-icons icon-alert-circle-exc" />
                          <p style={{ fontSize: 16, fontWeight: "bold" }}>공정라인 3</p>
                          <p style={{ fontSize: 14 }}>Humidity</p>
                        </button>
                      </Link>
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

export default Registration;
