import React from "react";
import { Line } from "react-chartjs-2";
import graphql2chartjs from "graphql2chartjs";
import { Subscription, Query } from "react-apollo";
import gql from "graphql-tag";


class WeightChart extends React.Component {
  constructor(props) {
    super(props);
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
          if (loading) return null;
          const newdata = data;

          return <Query query={gql`${this.querystr}`}>
            {({ data, loading }) => {
              if (loading) return null;

              data.weights.push(newdata.newWeight);
              while (data.weights.length > 15) data.weights.shift();
              // create graphql2chartjs instance
              let g2c = new graphql2chartjs(data, () => {
                return {
                  chartType: 'bar',
                  pointBackgroundColor: '#d048b6',
                  borderColor: '#d048b6',
                  backgroundColor: "rgba(29,140,248,0.1)",
                  pointHoverBackgroundColor: 'red',
                  borderWidth: 1
                };
              });

              // render chart with g2c data :)
              return (
                <Line data={g2c.data}
                  options={{
                    maintainAspectRatio: false,
                    legend: {
                      display: false
                    },
                    tooltips: {
                      backgroundColor: "#f5f5f5",
                      titleFontColor: "#333",
                      bodyFontColor: "#666",
                      bodySpacing: 4,
                      xPadding: 12,
                      mode: "nearest",
                      intersect: 0,
                      position: "nearest"
                    },
                    responsive: true,
                    scales: {
                      yAxes: [{
                        gridLines: {
                          drawBorder: false,
                          color: "rgba(225,78,202,0.1)",
                          zeroLineColor: "transparent"
                        },
                        ticks: {
                          suggestedMin: 0,
                          suggestedMax: 100,
                          padding: 20,
                          fontColor: "#9e9e9e"
                        }
                      }],
                      xAxes: [
                        {
                          gridLines: {
                            drawBorder: false,
                            color: "rgba(225,78,202,0.1)",
                            zeroLineColor: "transparent"
                          },
                          ticks: {
                            padding: 20,
                            fontColor: "#9e9e9e"
                          }
                        }
                      ]
                    }
                  }} />
              );
            }}
          </Query>
        }}
      </Subscription>
    );
  };
}

export default WeightChart;