import React from "react";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col
  } from "reactstrap";

class Renderchart extends React.component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Card>
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6">
                  <h5 className="card-category">Process Line {props.line}</h5>
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
        );
    }
}

export default Renderchart;