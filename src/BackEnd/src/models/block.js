const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('block', {
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id_user'
      }
    },
    block: {
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
    tableName: 'block',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "block_pkey",
        unique: true,
        fields: [
          { name: "user" },
          { name: "block" },
        ]
      },
    ]
  });
};
