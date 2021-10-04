import sequelize from './connection';

export const UsersSchema = sequelize.define('users', require('./schemas/users'));