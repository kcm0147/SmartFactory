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

// reactstrap component
// import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

class Map extends React.Component {
  render() {
    return (
      <div className="content">
        <h2>Registration Section</h2>
        {/* <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>Google Maps</CardHeader>
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <MapWrapper
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
      </div>
    );
  }
}

export default Map;
