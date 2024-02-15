const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('like_post', {
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'post',
        key: 'id_post'
      }
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id_user'
      }
    }
  }, {
    sequelize,
    tableName: 'like_post',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "like_post_pkey",
        unique: true,
        fields: [
          { name: "id_post" },
          { name: "id_user" },
        ]
      },
    ]
  });
};
