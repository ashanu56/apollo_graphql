const { Order } = require('../../database/models');
const { Op } = require('sequelize')

module.exports = {
    Query: {
        getAllOrders: async (parent, args, context) => {
            if (args.name == undefined) args.name = '';
            setSort = args.sort == 'D'? 'desc' : 'asc';
            if(args.pagenumber && args.limit){
                var from = (args.pagenumber - 1) * args.limit;
                if(args.pagenumber <= 1){
                    from = 0;
                }
            }
            return Order.findAll({ where: {
                customers_name: {
                  [Op.like]: '%' + args.name + '%'
                }
              }, limit: args.limit, offset: from, order : [['orders_id', setSort]] });
        },
    }
};