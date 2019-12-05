'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_role = sequelize.define('user_role', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    }
  }, {
    freezeTableName: true,
  });
  user_role.associate = function(models) {
    // associations can be defined here
  };
  return user_role;
};
