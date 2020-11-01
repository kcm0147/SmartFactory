import React from "react";
import { Line } from "react-chartjs-2";
import graphql2chartjs from "graphql2chartjs";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const querystr = gql`query {
  items {
    label: id
    data: weight
  }
}`

const subscribestr = gql`
subscription{
  newItem {
    label: id
    data: weight
  }
}`
let unsubscribe = null;

// Chart component
const PracChart = () => (
  <Query query={gql`${querystr}`}>
    {({ loading, data, subscribeToMore }) => {
      if (loading)  return null;

      // create graphql2chartjs instance
      const g2c = new graphql2chartjs(data, () => {
        return {
          pointBackgroundColor: 'yellow'
        };
      });

      if(!unsubscribe){
        unsubscribe = subscribeToMore({
          document: subscribestr,
          updateQuery: (prev, {subscriptionData}) => {
            if(!subscriptionData.data) return prev;
            const {newItem} = subscriptionData.data;
            // data.items.push(newItem);
            // console.log(data);
            // g2c.add(data, "line");
            return {
              ...prev,
              newItem: [...prev.items, newItem],

            };
          },
        })
      }
      // add graphql data to graphql2chartjs instance
      g2c.add(data, "line");
      console.log(data);
      // render chart with g2c data :)
      return <Line data={g2c.data} />;
    }}
  </Query>
);

export { PracChart };
