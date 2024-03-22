const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_monthly_data', {
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'post',
        key: 'id_post'
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    money: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'post_monthly_data',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "post_monthly_data_pkey",
        unique: true,
        fields: [
          { name: "id_post" },
          { name: "year" },
          { name: "month" },
        ]
      },
    ]
  });
};
