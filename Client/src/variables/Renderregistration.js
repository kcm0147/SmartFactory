import React from "react";

import { Col } from "reactstrap";
import { Link } from "react-router-dom"

class Renderregistration extends React.Component {
    render() {
        let linkUrl = `/admin/registerform/${this.props.line}/${this.props.device}`
        return (
            <Col
                className="font-icon-list col-xs-6 col-xs-6"
                lg="2"
                md="3"
                sm="4"
            >
                <Link to={linkUrl}>
                    <button style={{ background: "#11ffee00", width: "100%" }} className="font-icon-detail">
                        <i className="tim-icons icon-alert-circle-exc" />
                        <p style={{ fontSize: 16, fontWeight: "bold" }}>공정라인 {this.props.line}</p>
                        <p style={{ fontSize: 14 }}>{this.props.device.toUpperCase()}</p>
                    </button>
                </Link>
            </Col>
        );
    }
}

export default Renderregistration;