'use strict';
module.exports = (sequelize, DataTypes) => {
  const role_permission = sequelize.define('role_permission', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
      
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    permId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'permission',
        key: 'id'
      }
    }
  }, {
    freezeTableName: true,
  });
  role_permission.associate = function(models) {
    // associations can be defined here
  };
  return role_permission;
};
