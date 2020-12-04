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
import {Link} from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  //CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { Query } from "react-apollo";
import gql from "graphql-tag";

class Registerform extends React.Component {
  constructor(props){
    super(props);
    let url = this.props.location.pathname.split('/');
    this.line = url[3];
    this.device = url[4];
    // gql에 this.line, this.device 넣으면 됨
    this.querystr = gql`query {
      devicelist {
        line, device
      }
    }`
  }
  
  handleSubmit(e){
    // render() { // Dashboard row 시작되는 위치
    //   return {<Query query={gql`${this.querystr}`}>
    //     {({ data, loading }) => {
    //       if (loading) return null;
    //     }}
    //   </Query>
    // }
    // };
  }

  render() {
    // 서버에서 requestList 에 있는 공정라인의 번호와 디바이스를 
    // 가지고 와서 동적으로 띄워야함.
    console.log(this.props);
    // let line, device ;
    // let path = this.props.location.pathname.split('/');
    // line = path[3];
    // device = path[4];
    var lineName = "공정라인 " + this.line;
    console.log(this.line + this.device);
     return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h3 className="title">Setting Table</h3>
                </CardHeader>
                <CardBody>
                    <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label style={{fontSize:16,fontWeight:"bold"}}>공정라인 위치 (disabled)</label>
                          <Input
                            style={{fontSize:14,fontWeight:"bold"}}
                            defaultValue={lineName}
                            disabled
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <label style={{fontSize:16,fontWeight:"bold"}}>센서 종류 (disabled)</label>
                          <Input
                            style={{fontSize:14,fontWeight:"bold"}}
                            defaultValue={this.device}
                            disabled
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label style={{fontSize:16,fontWeight:"bold"}}> Max Value</label>
                          <Input
                            //defaultValue="25"
                            placeholder="25"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label style={{fontSize:16,fontWeight:"bold"}} >Min Value</label>
                          <Input
                            //defaultValue="21"
                            placeholder="21"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue="Mike"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            defaultValue="Andrew"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input placeholder="ZIP Code" type="number" />
                        </FormGroup>
                      </Col>
                    </Row> */}
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <label style={{fontSize:16,fontWeight:"bold"}}>기타 사항</label>
                          <Input
                            cols="80"
                            //defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                            //that two seat Lambo."
                            placeholder="Here can be your description"
                            rows="4"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.handleSubmit}>
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Registerform;
