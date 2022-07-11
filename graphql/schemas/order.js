module.exports = `
    type Order {
        orders_id: Int!
        user_id: Int!
        name: String!
        customers_name: String!
        customers_company: String!
    }
    extend type Query {
        getAllOrders(limit: Int, pagenumber: Int, name: String,sort:String): [Order]
    }
`;