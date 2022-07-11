const { Shopify, DataType, ApiVersion } = require('@shopify/shopify-api');
const { Product } = require('@shopify/shopify-api/dist/rest-resources/2022-04/index.js');
const order = require('../schemas/order');
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_SCOPES, SHOPIFY_API_VERSION, SHOPIFY_SHOP, SHOPIFY_ADMIN_TOKEN, SHOPIFY_END_POINT, HOST_SCHEME } = process.env;

module.exports = {
    Query: {
        ShopifyDraftOrders: async (parent, args, context) => {
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; // Remove SSL Certificate Error
            const order_id = args.order_id;
            const orderStatus = args.orderStatus || 'open';

            const client = new Shopify.Clients.Rest(SHOPIFY_END_POINT, SHOPIFY_ADMIN_TOKEN);
            var result = [];
            const body = {
                status: orderStatus
            };
            if (order_id) {
                try {
                    const response = await client.get({
                        path: 'draft_orders/' + order_id,
                        type: DataType.JSON,
                        query: body
                    });
                    result = [response.body.draft_order]
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const response = await client.get({
                        path: 'draft_orders',
                        type: DataType.JSON,
                        query: body
                    });
                    result = response.body.draft_orders
                } catch (error) {
                    console.log(error);
                }
            }

            return result;
        },
        ShopifyOrders: async (parent, args, context) => {
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; // Remove SSL Certificate Error
            const order_id = args.order_id;
            const orderStatus = args.orderStatus || 'open';

            const client = new Shopify.Clients.Rest(SHOPIFY_END_POINT, SHOPIFY_ADMIN_TOKEN);
            var result = [];
            const body = {
                status: orderStatus
            };
            if (order_id) {
                try {
                    const response = await client.get({
                        path: 'orders/' + order_id,
                        type: DataType.JSON,
                        query: body
                    });
                    result = [response.body.order]
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const response = await client.get({
                        path: 'orders',
                        type: DataType.JSON,
                        query: body
                    });
                    result = response.body.orders
                } catch (error) {
                    console.log(error);
                }
            }

            return result;
        },
       
        ShopifyProducts: async (parent, args, context) => {
            const product_id = args.product_id;
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; // Remove SSL Certificate Error
            const client = new Shopify.Clients.Rest(SHOPIFY_END_POINT, SHOPIFY_ADMIN_TOKEN);
            var data = [];
            var result = [];
            if (product_id) {
                try {
                    const response = await client.get({
                        path: 'products/' + product_id,
                        type: DataType.JSON,
                    });
                    result = [response.body.product]
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const response = await client.get({
                        path: 'products',
                        type: DataType.JSON,
                    });
                    result = response.body.products
                } catch (error) {
                    console.log(error);
                }
            }
            return result;
        },
        
    },
    Mutation: {
        ShopifyProductUpdates: async (parent, args, context) => {
            const product_id = parseInt(args.product_id);
            const title = args.title;
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; // Remove SSL Certificate Error
            const client = new Shopify.Clients.Rest(SHOPIFY_END_POINT, SHOPIFY_ADMIN_TOKEN);
            var result = [];
            const body = {
                product: {
                    id: product_id,
                    title: title
                }
            };
            try {
                const response = await client.put({
                    path: 'products/' + product_id,
                    data: body,
                    type: DataType.JSON,
                });
                result = [response.body.product]
            } catch (error) {
                console.log(error);
            }
            return result;
        },
        ShopifyDraftOrdersComplete: async (parent, args, context) => {
            const order_id = parseInt(args.order_id);
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; // Remove SSL Certificate Error
            const client = new Shopify.Clients.Rest(SHOPIFY_END_POINT, SHOPIFY_ADMIN_TOKEN);
            var result = [];
            const body = {
                draft_order: {
                    draft_order_id: order_id,
                }
            };
            try {
                const response = await client.put({
                    path: 'draft_orders/' + order_id + "/complete",
                    data: body,
                    type: DataType.JSON,
                });
                result = [response.body.draft_order]
            } catch (error) {
                console.log(error);
            }
            return result;
        },
        ShopifyOrdersUpdate: async (parent, args, context) => {
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; // Remove SSL Certificate Error
            const order_id = args.order_id;

            const client = new Shopify.Clients.Rest(SHOPIFY_END_POINT, SHOPIFY_ADMIN_TOKEN);
            var result = [];
            const body = {
                order: {
                    order_id: order_id,
                }
            };
            if (order_id) {
                try {
                    const response = await client.put({
                        path: 'orders/' + order_id,
                        type: DataType.JSON,
                        query: body
                    });
                    result = [response.body.order]
                } catch (error) {
                    console.log(error);
                }
            } 
            return result;
        },
    }
};