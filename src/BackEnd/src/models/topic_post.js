const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('topic_post', {
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'post',
        key: 'id_post'
      }
    },
    id_topic: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'topic',
        key: 'id_topic'
      }
    }
  }, {
    sequelize,
    tableName: 'topic_post',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "topic_post_pkey",
        unique: true,
        fields: [
          { name: "id_post" },
          { name: "id_topic" },
        ]
      },
    ]
  });
};
