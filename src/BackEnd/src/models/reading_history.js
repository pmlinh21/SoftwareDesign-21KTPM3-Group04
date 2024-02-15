const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reading_history', {
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
    },
    reading_time: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
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
          { name: "id_post" },
          { name: "id_user" },
          { name: "reading_time" },
        ]
      },
    ]
  });
};
