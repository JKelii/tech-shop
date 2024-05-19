/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query GetAccount($email: String!) {\n  account(where: {email: $email}, stage: DRAFT) {\n    id\n    email\n    password\n  }\n}": types.GetAccountDocument,
    "query GetProducts {\n  products {\n    description\n    id\n    name\n    price\n  }\n}": types.GetProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAccount($email: String!) {\n  account(where: {email: $email}, stage: DRAFT) {\n    id\n    email\n    password\n  }\n}"): typeof import('./graphql').GetAccountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProducts {\n  products {\n    description\n    id\n    name\n    price\n  }\n}"): typeof import('./graphql').GetProductsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
