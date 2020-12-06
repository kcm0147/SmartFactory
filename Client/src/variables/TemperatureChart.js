import React from "react";
import { Line } from "react-chartjs-2";
import graphql2chartjs from "graphql2chartjs";
import { Subscription, Query } from "react-apollo";
import gql from "graphql-tag";

class TemperatureChart extends React.Component {
  constructor(props) {
    super(props);
    this.mine = true;
    this.maxvalue = 25;
    this.outofbound = false;
    this.alertmsg=<div style={{color:"yellow", textAlign:"center", fontWeight:"bold", fontSize:"20px"}}> SAFE CONDITION </div>;
    this.mytemp = { temperatures: new Array() };
    this.querystr = gql`query {
      temperatures {
        label: id
        data: temperature
      }
    }`
    this.subscribestr = `
    subscription {
      newTemperature{
        label: id
        data: temperature
      }
    }
  `;
  }

  // Chart component
  render() {
    return (
      <Subscription subscription={gql`${this.subscribestr}`}>
        {({ data, loading }) => {
          this.outofbound = false;
          // this.alertmsg=<div style={{color:"yellow", textAlign:"center", fontWeight:"bold", fontSize:"20px"}}> SAFE CONDITION </div>;;
          
          if (loading) return null;
          if (data.newTemperature.label != this.props.line) this.mine = false;
          else this.mine = true;
          const newdata = data;

          return <Query query={gql`${this.querystr}`}>
            {({ data, loading }) => {
              if (loading) return null;

              if (this.mine) {
                data.temperatures.push(newdata.newTemperature);
                this.mytemp.temperatures = [];
                let length = data.temperatures.length;
                for (let i = 0; i < length; i++)
                  if (data.temperatures[i].label == this.props.line) {
                    this.mytemp.temperatures.push(data.temperatures[i]);
                    if(data.temperatures[i].data > this.maxvalue){
                      this.outofbound = true;
                      this.alertmsg = <div style={{color:"red", textAlign:"center", fontWeight:"bold", fontSize:"20px"}}>DETECT OUT OF BOUND VALUE</div>
                    }
                  }
                if(!this.outofbound) this.alertmsg=<div style={{color:"yellow", textAlign:"center", fontWeight:"bold", fontSize:"20px"}}> SAFE CONDITION </div>;
                while (data.temperatures.length > 40) data.temperatures.shift();
              }

              let g2c;

              // create graphql2chartjs instance
              if (this.outofbound) {
                g2c = new graphql2chartjs(this.mytemp, () => {
                  return {
                    chartType: 'line',
                    pointBackgroundColor: 'yellow',
                    borderColor: 'yellow',
                    backgroundColor: "rgba(256,0,0,0.1)",
                    pointHoverBackgroundColor: 'red',
                    borderWidth: 1
                  };
                });
              }
              else {
                g2c = new graphql2chartjs(this.mytemp, () => {
                  return {
                    chartType: 'line',
                    pointBackgroundColor: 'yellow',
                    borderColor: 'yellow',
                    backgroundColor: "rgba(29,140,248,0.1)",
                    pointHoverBackgroundColor: 'red',
                    borderWidth: 1
                  };
                });
              }

              // render chart with g2c data :)
              return (
                <>
                {this.alertmsg}
                  <Line data={g2c.data}
                    options={{
                      scales: {
                        yAxes: [{
                          ticks: {
                            suggestedMin: 15,
                            suggestedMax: 30
                          }
                        }]
                      }
                    }} />
                </>
              );
            }}
          </Query>
        }}
      </Subscription>
    );
  };
}

export default TemperatureChart;