const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('report_type', {
    id_report_type: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    report_type: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'report_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "report_type_pkey",
        unique: true,
        fields: [
          { name: "id_report_type" },
        ]
      },
    ]
  });
};
