const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subscribe', {
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id_user'
      }
    },
    subscriber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id_user'
      }
    },
    subscriber_time: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'subscribe',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "subscribe_pkey",
        unique: true,
        fields: [
          { name: "user" },
          { name: "subscriber" },
          { name: "subscriber_time" },
        ]
      },
    ]
  });
};
