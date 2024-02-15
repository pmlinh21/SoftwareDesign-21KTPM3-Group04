const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('response', {
    id_response: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id_user'
      }
    },
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'post',
        key: 'id_post'
      }
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    response_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    reply: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reply_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'response',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "response_pkey",
        unique: true,
        fields: [
          { name: "id_response" },
        ]
      },
    ]
  });
};
