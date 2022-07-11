module.exports = `
    type ShopifyOrder {
        id: String
        email: String
        name: String
        status: String
        subtotal_price: String
    }
    type ShopifyProduct {
        id: String
        title: String
        body_html: String
        status: String
        vendor: String
        product_type: String
    }
    
    extend type Query {
        ShopifyDraftOrders(order_id: String, orderStatus: String): [ShopifyOrder]
        ShopifyOrders(order_id: String, orderStatus: String): [ShopifyOrder]
        ShopifyProducts(product_id: String): [ShopifyProduct]
        
    }
    extend type Mutation {
        ShopifyProductUpdates(product_id: String!,title: String!): [ShopifyProduct]
        ShopifyDraftOrdersComplete(order_id: String!): [ShopifyOrder]
        ShopifyOrdersUpdate(order_id: String!): [ShopifyOrder]
     }
`;