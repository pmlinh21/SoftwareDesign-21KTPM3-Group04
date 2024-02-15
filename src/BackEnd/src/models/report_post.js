const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('report_post', {
    id_report: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'post',
        key: 'id_post'
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
    tableName: 'report_post',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "report_post_pkey",
        unique: true,
        fields: [
          { name: "id_report" },
        ]
      },
    ]
  });
};
