import React from "react";
import { Line } from "react-chartjs-2";
import graphql2chartjs from "graphql2chartjs";
import { Subscription, Query } from "react-apollo";
import gql from "graphql-tag";


class PreChart extends React.Component {
  constructor(props) {
    super(props);
    this.querystr = gql`query {
      items {
        label: id
        data: weight
      }
    }`
    this.subscribestr = `
    subscription {
      newItem{
        labe: id
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
          console.log(newdata);
          return <Query query={gql`${this.querystr}`}>
            {({ data, loading }) => {
              if (loading) return null;

              // create graphql2chartjs instance
              const g2c = new graphql2chartjs();

              data.items.push(newdata);
              console.log(data);
              // total.items.push(newdata);
              // add graphql data to graphql2chartjs instance while adding different chart types and properties
              g2c.add(data, (dataSetName, dataPoint) => {
                return {
                  ...dataPoint,
                  chartType: "line",
                  borderColor: "#333538",
                  pointBackgroundColor: "#333538",
                  backgroundColor: "#333538",
                  fill: false
                };
              });

              // () => {this.props.onChangePage};

              // render chart with g2c data :)
              return (
                <Line
                  data={g2c.data}
                // options={{
                //   scales: {
                //     xAxes: [
                //       {
                //         type: "id"
                //       }
                //     ]
                //   },
                //   animation: {
                //     duration: 0 // general animation time
                //   },
                //   bezierCurve: false
                // }}
                />
              );
            }}
          </Query>
        }}
      </Subscription>
    );
  };
}

export default PreChart;