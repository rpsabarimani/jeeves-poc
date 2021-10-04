import sequelize from './connection';

const UsersSchema = sequelize.define('users', require('./schemas/users'), { schema: "users" });
const TopicsSchema = sequelize.define('topics', require('./schemas/posts/topics'), { schema: "posts" });
TopicsSchema.belongsTo(UsersSchema, { foreignKey: 'createdBy' })

module.exports = {
    UsersSchema,
    TopicsSchema
}