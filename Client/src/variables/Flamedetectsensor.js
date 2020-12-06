import React from "react";

import { Subscription } from "react-apollo";
import gql from "graphql-tag";

class Flamedetectsensor extends React.Component {
    constructor(props) {
        super(props);
        this.firecomponent = <dev></dev>
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

                    if(newdata.newFire.data == 1) this.firecomponent = <div style={{color:"red", textAlign:"center", fontWeight:"bold", fontSize:"30px"}}> FIRE DETECT </div>
                    else this.firecomponent = <div style={{color:"yellow", textAlign:"center", fontWeight:"bold", fontSize:"30px"}}> SAFE STATE </div>
                    return this.firecomponent;
                }}
            </Subscription>
        );
    };
}

export default Flamedetectsensor;