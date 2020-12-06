import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

// import { Link } from "react-router-dom"

// import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class Settingform extends React.Component {
  constructor(props) {
    super(props);
    let url = this.props.location.pathname.split('/');
    this.line = url[3];
    this.device = url[4];
    // gql에 this.line, this.device 넣으면 됨
    this.mutatestr = gql`
    mutation deviceData($line: String!, $device: String!) {
      addDevicelist(line: $line, device: $device) 
    }
    `
  }

  handleSubmit(e) {
    alert("센서 설정이 수정되었습니다!")
  }

  render() {
    // 서버에서 requestList 에 있는 공정라인의 번호와 디바이스를 
    // 가지고 와서 동적으로 띄워야함.
    // console.log(this.props);
    // let line, device ;
    // let path = this.props.location.pathname.split('/');
    // line = path[3];
    // device = path[4];
    var lineName = "공정라인 " + this.line;
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
                          <label style={{ fontSize: 16, fontWeight: "bold" }}>공정라인 위치 (disabled)</label>
                          <Input
                            style={{ fontSize: 14, fontWeight: "bold" }}
                            defaultValue={lineName}
                            disabled
                            placeholder="Line"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <label style={{ fontSize: 16, fontWeight: "bold" }}>센서 종류 (disabled)</label>
                          <Input
                            style={{ fontSize: 14, fontWeight: "bold" }}
                            defaultValue={this.device}
                            disabled
                            placeholder="Sensor"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label style={{ fontSize: 16, fontWeight: "bold" }}> Update Max Value</label>
                          <Input
                            placeholder="25"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label style={{ fontSize: 16, fontWeight: "bold" }} > Update Min Value</label>
                          <Input
                            placeholder="21"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="8">
                        <FormGroup>
                          <label style={{ fontSize: 16, fontWeight: "bold" }}>기타 사항</label>
                          <Input
                            cols="80"
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
                  <a href="http://localhost:3000/admin/Setting" className="btn-fill" color="primary" type="submit">
                  {/* <Mutation mutation={this.mutatestr} variables={{line:this.line, device:this.device}}> */}
                    {/* {postMutation => (<Button className="btn-fill" color="primary" type="submit" onClick={postMutation}> */}
                    <Button className="btn-fill" color="primary" type="submit" onClick={this.handleSubmit}>
                      Update
                    </Button>
                    {/* </Button>)} */}
                  {/* </Mutation> */}
                  </a>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Settingform;
