import { GraphQLClient } from "graphql-request";

export const graphQLClient = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clw3ni7c5000001w6fhaa4kdw/master",
  {
    headers: {
      "x-api-key":
        "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clw3ni7c5000001w6fhaa4kdw/master",
    },
  },
);
