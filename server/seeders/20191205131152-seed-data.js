const uuidv4 = require('uuid/v4');
const faker = require('faker');
const roleList = [
  {id: uuidv4(), name: 'premium', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()},
  {id: uuidv4(), name: 'super-admin', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()},
  {id: uuidv4(), name: 'regular', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()},
  {id: uuidv4(), name: 'admin', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()}
];

const permissionList = [
  {
    id: uuidv4(),
    name: 'UPDATE user role',
    description: 'only the super admin have this priviledge',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'UPDATE any resource',
    description: 'super admin and admin can update any resource',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'DELETE any resource',
    description: 'super admin and admin can delete any resource',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'DEACTIVATE user',
    description: 'only the super admin have this permission',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'READ any resource',
    description: 'any user can read any resource',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'WRITE only a number of resources',
    description: 'A regular user can create less than or equal to 10 resources',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'WRITE as many resources as possible',
    description: 'A premium user can write as many resources as he so desires',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'DELETE my resources',
    description: 'user should be be able to delete his resources',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'UPDATE my resources',
    description: 'user should be able to update his resource',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]
const rolepermissionList = []
const userList = [];
for (let i=0; i<4; i++) {
  userList.push({
    id: uuidv4(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.lorem.word(),
    phone: '0'+faker.phone.phoneNumberFormat().replace(/-/g, '')+'2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}
const userRoleList = [];
const rolePermList = []

for (let i=0; i<permissionList.length; i++) {
  rolePermList.push({
    id: uuidv4(),
    roleId: roleList[1].id,
    permId: permissionList[i].id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
  if (permissionList[i].name === 'UPDATE user role' || permissionList[i].name === 'DEACTIVATE user') {
    continue;
  }
  rolepermissionList.push({
    id: uuidv4(),
    roleId: roleList[3].id,
    permId: permissionList[i].id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
  if (
    permissionList[i].name === 'UPDATE any resource' || 
    permissionList[i].name === 'DELETE any resource') {
      continue;
  }
  rolePermList.push({
    id: uuidv4(),
    roleId: roleList[0].id,
    permId: permissionList[i].id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
  if (permissionList[i].name === 'WRITE as many resources as possible') {
    continue
  }
  rolePermList.push({
    id: uuidv4(),
    roleId: roleList[2].id,
    permId: permissionList[i].id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}
 
for (let i=0; i<userList.length; i++) {
  userRoleList.push({
    id: uuidv4(),
    userId: userList[i].id,
    roleId: roleList[i].id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
}

module.exports = {
  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('role', roleList, {});
    await queryInterface.bulkInsert('permission', permissionList, {});
    await queryInterface.bulkInsert('user', userList, {});
    await queryInterface.bulkInsert('role_permission', rolePermList, {});
    await queryInterface.bulkInsert('user_role', userRoleList, {})
  },
}
