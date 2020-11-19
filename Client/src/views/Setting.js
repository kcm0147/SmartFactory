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

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

// reactstrap component
// import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

class Setting extends React.Component {
  render() {
    return (
      <div className="content">
        <h2>Setting Section</h2>
        <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h4 className="title">공정라인별 설정 테이블 보기</h4>
                  <p className="category">
                    각 공정라인 버튼을 클릭해 공정라인 센서 세부 설정을 변경하십시오.
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
                      <button style={{background:"#11ffee00",width:"100%"}} className="font-icon-detail">
                        <i className="tim-icons icon-alert-circle-exc" />
                        <p style={{fontSize:16,fontWeight:"bold"}}>공정라인 1</p>
                        <p style={{fontSize:14}}>Temperature</p>
                      </button>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <button style={{background:"#11ffee00",width:"100%"}} className="font-icon-detail">
                        <i className="tim-icons icon-alert-circle-exc" />
                        <p style={{fontSize:16,fontWeight:"bold"}}>공정라인 2</p>
                        <p style={{fontSize:14}}>Humidity</p>
                      </button>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <button style={{background:"#11ffee00",width:"100%"}} className="font-icon-detail">
                        <i className="tim-icons icon-alert-circle-exc" />
                        <p style={{fontSize:16,fontWeight:"bold"}}>공정라인 3</p>
                        <p style={{fontSize:14}}>Humidity</p>
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

export default Setting;
