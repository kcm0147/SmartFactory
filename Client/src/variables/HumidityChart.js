import React from "react";
import { Line } from "react-chartjs-2";
import graphql2chartjs from "graphql2chartjs";
import { Subscription, Query } from "react-apollo";
import gql from "graphql-tag";


class HumidityChart extends React.Component {
  constructor(props) {
    super(props);
    this.mine = true;
    this.myhum = { humidities: new Array() };
    this.querystr = gql`query {
      humidities {
        label: id
        data: humidity
      }
    }`
    this.subscribestr = `
    subscription {
      newHumidity{
        label: id
        data: humidity
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
          if (data.newHumidity.label != this.props.line) this.mine = false;
          else this.mine = true;
          const newdata = data;

          return <Query query={gql`${this.querystr}`}>
            {({ data, loading }) => {
              if (loading) return null;

              data.humidities.push(newdata.newHumidity);
              while (data.humidities.length > 20) data.humidities.shift();

              if (this.mine) {
                data.humidities.push(newdata.newHumidity);
                this.myhum.humidities = [];
                let length = data.humidities.length;
                for (let i = 0; i < length; i++)
                  if (data.humidities[i].label == this.props.line) this.myhum.humidities.push(data.humidities[i]);
                while (data.humidities.length > 40) data.humidities.shift();
                // console.log(data);
                // console.log(this.mytemp);
              }

              // create graphql2chartjs instance
              let g2c = new graphql2chartjs(this.myhum, () => {
                return {
                  chartType: 'line',
                  pointBackgroundColor: 'green',
                  borderColor: 'green',
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
                          suggestedMin: 0,
                          suggestedMax: 100
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

export default HumidityChart;