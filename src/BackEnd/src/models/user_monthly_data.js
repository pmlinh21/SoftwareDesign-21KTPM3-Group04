const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_monthly_data', {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'post',
        key: 'id_user'
      }
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    subscriber: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'user_monthly_data',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_monthly_data_pkey",
        unique: true,
        fields: [
          { name: "id_user" },
          { name: "time" },
        ]
      },
    ]
  });
};
