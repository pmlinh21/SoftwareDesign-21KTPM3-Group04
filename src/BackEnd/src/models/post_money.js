const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_money', {
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'post',
        key: 'id_post'
      }
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    money: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'post_money',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "post_money_pkey",
        unique: true,
        fields: [
          { name: "id_post" },
          { name: "time" },
        ]
      },
    ]
  });
};
