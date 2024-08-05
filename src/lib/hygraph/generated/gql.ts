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
    "mutation CreateAccount($email: String!, $password: String!, $name: String!) {\n  createAccount(data: {email: $email, password: $password, name: $name}) {\n    id\n  }\n}": types.CreateAccountDocument,
    "query GetAccount($email: String!) {\n  account(where: {email: $email}, stage: DRAFT) {\n    id\n    email\n    password\n  }\n}": types.GetAccountDocument,
    "mutation CreateCartAuthorized($quantity: Int!, $slug: String!, $email: String!) {\n  createCart(\n    data: {cartProducts: {create: {quantity: $quantity, product: {connect: {slug: $slug}}, accounts: {connect: {email: $email}}}}}\n  ) {\n    id\n  }\n}\n\nmutation CreateCartUnAuthorized($quantity: Int!, $slug: String!) {\n  createCart(\n    data: {cartProducts: {create: {quantity: $quantity, product: {connect: {slug: $slug}}}}}\n  ) {\n    id\n  }\n}": types.CreateCartAuthorizedDocument,
    "query GetCartById($id: ID!) {\n  cart(where: {id: $id}, stage: DRAFT) {\n    cartProducts {\n      id\n      quantity\n      product {\n        slug\n        name\n        price\n        images(first: 1) {\n          url\n        }\n      }\n    }\n  }\n}": types.GetCartByIdDocument,
    "mutation UpdateCartProduct($quantity: Int!, $cartProductId: ID!) {\n  updateCartProduct(where: {id: $cartProductId}, data: {quantity: $quantity}) {\n    id\n  }\n}\n\nmutation DeleteCartProduct($cartProductId: ID!) {\n  deleteCartProduct(where: {id: $cartProductId}) {\n    id\n  }\n}\n\nmutation UpdateCartQuantity($quantity: Int!, $cartProductId: ID!) {\n  updateCartProduct(where: {id: $cartProductId}, data: {quantity: $quantity}) {\n    id\n  }\n}": types.UpdateCartProductDocument,
    "query GetProductBySlug($slug: String!) {\n  product(where: {slug: $slug}) {\n    description\n    id\n    name\n    price\n    reviews {\n      content\n      name\n    }\n    images {\n      fileName\n      url\n    }\n    slug\n  }\n}": types.GetProductBySlugDocument,
    "query GetProducts {\n  products {\n    description\n    id\n    name\n    price\n    images {\n      fileName\n      url\n      productImages {\n        id\n        reviews {\n          content\n          rating\n        }\n      }\n    }\n    slug\n  }\n}": types.GetProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateAccount($email: String!, $password: String!, $name: String!) {\n  createAccount(data: {email: $email, password: $password, name: $name}) {\n    id\n  }\n}"): typeof import('./graphql').CreateAccountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAccount($email: String!) {\n  account(where: {email: $email}, stage: DRAFT) {\n    id\n    email\n    password\n  }\n}"): typeof import('./graphql').GetAccountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateCartAuthorized($quantity: Int!, $slug: String!, $email: String!) {\n  createCart(\n    data: {cartProducts: {create: {quantity: $quantity, product: {connect: {slug: $slug}}, accounts: {connect: {email: $email}}}}}\n  ) {\n    id\n  }\n}\n\nmutation CreateCartUnAuthorized($quantity: Int!, $slug: String!) {\n  createCart(\n    data: {cartProducts: {create: {quantity: $quantity, product: {connect: {slug: $slug}}}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CreateCartAuthorizedDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCartById($id: ID!) {\n  cart(where: {id: $id}, stage: DRAFT) {\n    cartProducts {\n      id\n      quantity\n      product {\n        slug\n        name\n        price\n        images(first: 1) {\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').GetCartByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateCartProduct($quantity: Int!, $cartProductId: ID!) {\n  updateCartProduct(where: {id: $cartProductId}, data: {quantity: $quantity}) {\n    id\n  }\n}\n\nmutation DeleteCartProduct($cartProductId: ID!) {\n  deleteCartProduct(where: {id: $cartProductId}) {\n    id\n  }\n}\n\nmutation UpdateCartQuantity($quantity: Int!, $cartProductId: ID!) {\n  updateCartProduct(where: {id: $cartProductId}, data: {quantity: $quantity}) {\n    id\n  }\n}"): typeof import('./graphql').UpdateCartProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductBySlug($slug: String!) {\n  product(where: {slug: $slug}) {\n    description\n    id\n    name\n    price\n    reviews {\n      content\n      name\n    }\n    images {\n      fileName\n      url\n    }\n    slug\n  }\n}"): typeof import('./graphql').GetProductBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProducts {\n  products {\n    description\n    id\n    name\n    price\n    images {\n      fileName\n      url\n      productImages {\n        id\n        reviews {\n          content\n          rating\n        }\n      }\n    }\n    slug\n  }\n}"): typeof import('./graphql').GetProductsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
