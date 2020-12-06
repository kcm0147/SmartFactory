import React from "react";

import { Subscription, Query } from "react-apollo";
import gql from "graphql-tag";

class Flamedetectsensor extends React.Component {
    constructor(props) {
        super(props);
        this.querystr = gql`query {
          fires {
            label: id
            data: fire
          }
        }`
        this.subscribestr = `
        subscription {
          newFire{
            label: id
            data: fire
          }
        }
      `;
    }

    render() {
        return (
            <Subscription subscription={gql`${this.subscribestr}`}>
                {({ data, loading }) => {
                    if (loading) return null;
                    const newdata = data;

                    return (
                        <div style={{color:"yellow", textAlign:"center", fontWeight:"bold", fontSize:"20px"}}> SAFE </div>
                    );
                }}
            </Subscription>
        );
    };
}

export default Flamedetectsensor;