import { encodePassword } from '../utils/passwordUtil';

export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 25],
        is: {
          args: /^[a-z']+$/i,
          msg: "First name field must contain only alphabets"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 25],
        is: {
          args: /^[a-z']+$/i,
          msg: "Last name field must contain only alphabets"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Field must be a valid email ID'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [11, 16],
        is: {
          args: /^[0-9]+$/
        }
      }
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    freezeTableName: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password = await encodePassword(user.password);
        user.email = await user.email.toLowerCase()
      }
    }
  });
  user.associate = function(models) {
    user.belongsToMany(models.roles, {
      through: 'user_role',
      foreignKey: 'userId'
    });
  };
  return user;
}
