import React from "react";
import { Line } from "react-chartjs-2";
import graphql2chartjs from "graphql2chartjs";
import { Subscription, Query } from "react-apollo";
import gql from "graphql-tag";


class TemperatureChart extends React.Component {
  constructor(props) {
    super(props);
    this.mine = true;
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
                  if (data.temperatures[i].label == this.props.line) this.mytemp.temperatures.push(data.temperatures[i]);
                while (data.temperatures.length > 40) data.temperatures.shift();
                // console.log(data);
                // console.log(this.mytemp);
              }

              // create graphql2chartjs instance
              let g2c = new graphql2chartjs(this.mytemp, () => {
                return {
                  chartType: 'line',
                  pointBackgroundColor: 'yellow',
                  borderColor: 'yellow',
                  backgroundColor: "rgba(29,140,248,0.1)",
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
                  }} />
              );
            }}
          </Query>
        }}
      </Subscription>
    );
  };
}

export default TemperatureChart;