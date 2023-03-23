const sequelize = require('../config/connection');
const { User, Blog} = require('../models');

const blogData = require('./blogData.json');
const usersData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(usersData, {
        individualHooks: true,
        returning: true,
    });

    for (const blog of blogData) {
        await Blog.create({
            ...blog
        });
    }

    process.exit(0);
};

seedDatabase();