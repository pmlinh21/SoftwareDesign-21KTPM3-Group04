const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reading_history', {
    id_reading_history: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id_post'
      }
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id_user'
      }
    },
    reading_time: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'reading_history',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "reading_history_pkey",
        unique: true,
        fields: [
          { name: "id_reading_history" },
        ]
      },
    ]
  });
};
