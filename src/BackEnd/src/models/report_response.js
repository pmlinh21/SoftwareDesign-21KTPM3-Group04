const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('report_response', {
    id_report: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_response: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'response',
        key: 'id_response'
      }
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id_user'
      }
    },
    id_report_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'report_type',
        key: 'id_report_type'
      }
    },
    is_reply: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    report_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'report_response',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "report_response_pkey",
        unique: true,
        fields: [
          { name: "id_report" },
        ]
      },
    ]
  });
};
