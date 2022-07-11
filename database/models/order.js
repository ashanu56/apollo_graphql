module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'Order',
        {
            orders_id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.STRING
            },
            user_id: DataTypes.STRING,
            customers_name: DataTypes.STRING,
            customers_company: DataTypes.STRING,
        },
        {
            // defaultScope: {
            //     rawAttributes: { exclude: [] },
            // },
            timestamps: false,
            tableName: 'orders'
        },
    );

    Order.sync() //--- Create a Table if not exist
    
    return Order;
};