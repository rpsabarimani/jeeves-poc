import { DataTypes } from 'sequelize';

let Topics = {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    topicId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mediaPath: {
        type: DataTypes.ARRAY(DataTypes.STRING(1000)),
        allowNull: false
    },
}
module.exports = Topics