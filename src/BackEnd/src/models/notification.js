const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notification', {
    id_noti: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    creator: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id_user'
      }
    },
    receiver: {
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
    id_response: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'response',
        key: 'id_response'
      }
    },
    noti_type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    noti_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'notification',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "notification_pkey",
        unique: true,
        fields: [
          { name: "id_noti" },
        ]
      },
    ]
  });
};
