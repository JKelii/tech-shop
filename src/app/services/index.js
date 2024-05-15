import { GraphQLClient, gql } from "graphql-request";
import { api_endpoint } from "../constants";

const graphQLClient = new GraphQLClient(api_endpoint);

export const shopSection = async () => {
  const query = gql`
    query Assets {
      assets {
        id
        publishedAt
        fileName
        url
        updatedAt
        size
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return response;
};
