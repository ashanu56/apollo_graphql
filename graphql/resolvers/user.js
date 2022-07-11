const { Op } = require('sequelize')
const { User } = require('../../database/models');
const Auth = require('./../../services/auth.service');

module.exports = {
    Query: {
        getAllUsers: async (parent, args, context) => {
            if (!context.user) throw new Error('You must be authenticated!')
            args.name = args.name || '';
            args.status == undefined ? args.status = ["1","0"]: args.status = [args.status];
            return User.findAll({
                where: {
                    firstname: {
                        [Op.like]: '%' + args.name + '%'
                    },
                    status: {
                        [Op.in]: args.status
                    }
                }, limit: args.limit, offset: args.offset
            });
        },
    },
    Mutation: {
        register: async (parent, args, context) => {
            const { firstname, email, password } = args.input;
            var user = await User.create({ firstname, email, password });
            return user;
        },

        login: async (parent, args, context) => {
            const { email, password } = args.input;
            const user = await User.findOne({ where: { email } });
            if (!user) throw new Error('Unknown user')
            const correctPassword = await Auth.matchPasswords(password, user.password)
            if (user && correctPassword) {
                const token = Auth.generateJwt({
                    userId: user.userid,
                    username: user.name,
                    email: user.email
                });
                return { ...user.toJSON(), token };
            }
            return Promise.reject(
                new Error('Invalid Credentials!')
            );
        },
    },
    // User: {
    //     orders: async (parent, args, context) => Order.findAll({ where: { user_id: parent.userid } }),
    // },
};