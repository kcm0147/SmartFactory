import React from "react";
import { Line } from "react-chartjs-2";
import graphql2chartjs from "graphql2chartjs";
import { Subscription, Query } from "react-apollo";
import gql from "graphql-tag";


class WeightChart extends React.Component {
  constructor(props) {
    super(props);
    this.maxvalue = 50;
    this.outofbound = false;
    this.alertmsg = <div style={{ color: "yellow", textAlign: "center", fontWeight: "bold", fontSize: "20px" }}> SAFE CONDITION </div>;
    this.myweight = { temperatures: new Array() };
    this.querystr = gql`query {
      weights {
        label: id
        data: weight
      }
    }`
    this.subscribestr = `
    subscription {
      newWeight{
        label: id
        data: weight
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

          if (loading) return null;
          if (data.newWeight.label != this.props.line) this.mine = false;
          else this.mine = true;
          const newdata = data;

          return <Query query={gql`${this.querystr}`}>
            {({ data, loading }) => {
              if (loading) return null;

              if (this.mine) {
                data.weights.push(newdata.newWeight);
                this.myweight.weights = [];
                let length = data.weights.length;
                for (let i = 0; i < length; i++)
                  if (data.weights[i].label == this.props.line) {
                    this.myweight.weights.push(data.weights[i]);
                    if (data.weights[i].data > this.maxvalue) {
                      this.outofbound = true;
                      this.alertmsg = <div style={{ color: "red", textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>DETECT OUT OF BOUND VALUE</div>
                    }
                  }
                if (!this.outofbound) this.alertmsg = <div style={{ color: "yellow", textAlign: "center", fontWeight: "bold", fontSize: "20px" }}> SAFE CONDITION </div>;
                while (data.weights.length > 20) data.weights.shift();
              }

              let g2c;

              if (this.outofbound) {
                g2c = new graphql2chartjs(data, () => {
                  return {
                    chartType: 'bar',
                    pointBackgroundColor: '#d048b6',
                    borderColor: '#d048b6',
                    backgroundColor: "rgba(255,0,0,0.1)",
                    pointHoverBackgroundColor: 'red',
                    borderWidth: 1
                  };
                });
              }
              else {
                g2c = new graphql2chartjs(data, () => {
                  return {
                    chartType: 'bar',
                    pointBackgroundColor: '#d048b6',
                    borderColor: '#d048b6',
                    backgroundColor: "rgba(0, 255, 255, 0.1)",
                    pointHoverBackgroundColor: 'blue',
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

export default WeightChart;