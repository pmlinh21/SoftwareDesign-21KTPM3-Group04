const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('topic', {
    id_topic: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    topic: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'topic',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "topic_pkey",
        unique: true,
        fields: [
          { name: "id_topic" },
        ]
      },
    ]
  });
};
