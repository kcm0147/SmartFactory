import React from "react";
import { Line } from "react-chartjs-2";
import graphql2chartjs from "graphql2chartjs";
import { Query, Subscription } from "react-apollo";
import gql from "graphql-tag";

// query {
//   items {
//     label: id
//     data: weight
//   }
// }

// Chart component
const LiveChart = () => (
  <Query
    query={gql`
    query {
      Item: items{
        label: id
        data: weight
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      // if (loading || error) {
      //   if (error) console.error(error);
      //   return <div className="loadingIndicator">Please wait </div>;
      // }
      // create graphql2chartjs instance
      const g2c = new graphql2chartjs(data, (datasetName, dataPoint) => {
        return{
          pointBackgroundColor: 'yellow'
        };
      });
      // add graphql data to graphql2chartjs instance
      g2c.add(data, "line");
      console.log(data);
      // render chart with g2c data :)
      return <Line data={g2c.data} />;
    }}
  </Query>
);

export { LiveChart };
