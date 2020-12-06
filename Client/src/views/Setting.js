import React from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Rendersetting from "variables/Rendersetting.js"

class Setting extends React.Component {
  constructor(props) {
    super(props)
    this.querystr = gql`query {
      devicelist {
        line, device
      }
    }`
  }
  render() {
    return <Query query={gql`${this.querystr}`}>
      {({ data, loading }) => {
        if (loading) return null;

        let size = data.devicelist.length, devicelist = [];
        for (let i = 0; i < size; i++) {
          devicelist.push(<Rendersetting
            line={data.devicelist[i].line} device={data.devicelist[i].device} />)
        }

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
                      {devicelist}
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

export default Setting;
