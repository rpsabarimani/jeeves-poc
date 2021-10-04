import sequelize from './connection';

const UsersSchema = sequelize.define('users', require('./schemas/users'), { schema: "users" });

const TopicsSchema = sequelize.define('topics', require('./schemas/posts/topics'), { schema: "posts" });
TopicsSchema.belongsTo(UsersSchema, { foreignKey: 'createdBy' })

const PostsSchema = sequelize.define('posts', require('./schemas/posts'), { schema: "posts" });
PostsSchema.belongsTo(TopicsSchema, { foreignKey: 'topicId' })
PostsSchema.belongsTo(UsersSchema, { foreignKey: 'createdBy' })

const CommentSchema = sequelize.define('comments', require('./schemas/posts/comments'), { schema: "posts" });
CommentSchema.belongsTo(PostsSchema, { foreignKey: 'postId' })
PostsSchema.hasMany(CommentSchema, { foreignKey: 'postId' })
CommentSchema.belongsTo(UsersSchema, { foreignKey: 'createdBy' })

module.exports = {
    UsersSchema,
    TopicsSchema,
    PostsSchema,
    CommentSchema
}