'use strict';
module.exports = (sequelize, DataTypes) => {
  const permission = sequelize.define('permission', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 105],
        is: {
          args: /^[a-z0-9 ']+$/i,
          msg: "invalid character in permission name or its too lengthy"
        }
      }
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {});
  permission.associate = function(models) {
    permission.belongsToMany(models.roles, {
      through: 'role_permission',
      foreignKey: 'permId'
    })
  };
  return permission;
};
