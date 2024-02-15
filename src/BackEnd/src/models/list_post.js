const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('list_post', {
    id_list: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'list',
        key: 'id_list'
      }
    },
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'post',
        key: 'id_post'
      }
    }
  }, {
    sequelize,
    tableName: 'list_post',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "list_post_pkey",
        unique: true,
        fields: [
          { name: "id_list" },
          { name: "id_post" },
        ]
      },
    ]
  });
};
