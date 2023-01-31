const { Model, DataTypes } = require('sequelize');
const { DataTypes } = require("sequelize");


class techBlog extends Model { }

techBlog.init(
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
        modelName: 'album'
    }
);

module.exports = techBlog;