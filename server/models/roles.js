'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 25],
        is: {
          args: /^[a-z-']+$/i,
          msg: "role name field must contain only alphabets and -"
        }
      }
    }
  }, {});
  roles.associate = function(models) {
    roles.belongsToMany(models.user, {
      through: 'user_role',
      foreignKey: 'roleId'
    });
    roles.belongsToMany(models.permission, {
      through: 'role_permission',
      foreignKey: 'roleId'
    });
  };
  return roles;
};
