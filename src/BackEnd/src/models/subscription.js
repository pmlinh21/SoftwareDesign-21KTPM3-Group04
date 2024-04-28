const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subscription', {
    id_subscription: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id_user'
      }
    },
    id_membership: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'membership',
        key: 'id_membership'
      }
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'subscription',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "subscription_pkey",
        unique: true,
        fields: [
          { name: "id_subscription" },
          { name: "id_user" },
        ]
      },
    ]
  });
};
