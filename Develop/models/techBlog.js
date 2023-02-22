const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model { }

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'blog'
    }
);

module.exports = Blog;