import React from "react";
import { Line } from "react-chartjs-2";
import graphql2chartjs from "graphql2chartjs";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const subscription = `
  subscription {
    Item: items{
      data_t: time
      data_y: weight
    }
  }
`;

// Chart component
const PreChart = () => (
  <Subscription
    subscription={gql`
      ${subscription}
    `}
  >
    {({ data, error, loading }) => {
    //   if (loading || error) {
    //     if (error) console.error(error);
    //     return <div className="loadingIndicator">Please wait </div>;
    //   }
      // create graphql2chartjs instance
      const g2c = new graphql2chartjs();
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
      console.log(data);
      // render chart with g2c data :)
      return (
        <Line
          data={g2c.data}
          options={{
            scales: {
              xAxes: [
                {
                  type: "time"
                }
              ]
            },
            animation: {
              duration: 0 // general animation time
            },
            bezierCurve: false
          }}
        />
      );
    }}
  </Subscription>
);

export { PreChart };