const userResolvers = require('./user');
const orderResolvers = require('./order');
const shopifyResolvers = require('./shopify');

module.exports = [
    userResolvers, 
    orderResolvers, 
    shopifyResolvers
];