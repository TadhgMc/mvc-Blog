const sequelize = require('../config/connection');
const { User, Posts, Comments } = require('../models');

const userData = require('./Users.json');
const postData = require('./Posts.json');
const commentData = require('./Comments.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Posts.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });
  
  const comments = await Comments.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
//all needs updated