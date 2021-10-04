import { DataTypes } from 'sequelize';

let Comments = {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postId: {
        type: DataTypes.STRING,
        allowNull: false
    },
}
module.exports = Comments