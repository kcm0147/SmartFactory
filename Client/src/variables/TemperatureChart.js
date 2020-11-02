import React from "react";
import { Line } from "react-chartjs-2";
import graphql2chartjs from "graphql2chartjs";
import { Subscription, Query } from "react-apollo";
import gql from "graphql-tag";


class TemperatureChart extends React.Component {
  constructor(props) {
    super(props);
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
          if (loading) return null;
          const newdata = data;

          return <Query query={gql`${this.querystr}`}>
            {({ data, loading }) => {
              if (loading) return null;

              data.temperatures.push(newdata.newTemperature);
              while(data.temperatures.length >20) data.temperatures.shift();

              // create graphql2chartjs instance
              let g2c = new graphql2chartjs(data, () => {
                return {
                  chartType: 'line',
                  pointBackgroundColor: 'yellow',
                  borderColor: 'yellow',
                  backgroundColor:"rgba(29,140,248,0.1)",
                  pointHoverBackgroundColor: 'red',
                  borderWidth: 1
                };
              });

              // render chart with g2c data :)
              return (
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
                }}/>
              );
            }}
          </Query>
        }}
      </Subscription>
    );
  };
}

export default TemperatureChart;