module.exports = `
 type User {
    userid: Int!
    firstname: String!
    email: String
    password: String
 }

 extend type Mutation {
    register(input: RegisterInput!): RegisterResponse
    login(input: LoginInput!): LoginResponse
 }

 extend type Query {
        getAllUsers(limit: Int, offset: Int, firstname: String, status: String): [User]
    }

 type RegisterResponse {
    userid: Int!
    firstname: String!
    email: String!
 }

 input RegisterInput {
     firstname: String!
     email: String!
     password: String!
 }

input LoginInput {
     email: String!
     password: String!
 }

  type LoginResponse {
    userid: Int!
    firstname: String!
    email: String!
    token: String!
 }

`;