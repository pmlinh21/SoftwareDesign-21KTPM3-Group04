const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('topic_user', {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id_user'
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
    tableName: 'topic_user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "topic_user_pkey",
        unique: true,
        fields: [
          { name: "id_user" },
          { name: "id_topic" },
        ]
      },
    ]
  });
};
