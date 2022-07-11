const userType = require('./user')
const orderType = require('./order')
const shopifyType = require('./shopify')

const rootType = `
type Query {
     root: String
}
type Mutation {
     root: String
}
`;

module.exports = [rootType, userType, orderType, shopifyType];