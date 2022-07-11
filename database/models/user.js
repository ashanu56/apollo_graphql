const Auth = require('./../../services/auth.service');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
        userid: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      firstname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      defaultScope: {
        rawAttributes: { exclude: ['password'] },
      },
      timestamps: false,
      tableName: 'user_master'
    },
  );

  User.beforeCreate(async (user) => {
    user.password = await Auth.hashPassword(user.password);
  });
  User.sync() //--- Create a Table if not exist
  User.sync({ alter: true }) //--- Will Update table if any new column is added/droped in Model
  User.associate = function (models) {
    // associations can be defined here
    // User.hasMany(models.Order, { foreignKey: 'user_id', as: 'orders' });
  };
  return User;
};