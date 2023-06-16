// IMPORTS
const sequelize = require("../config/connection");
const { User, BlogPost, Comments } = require("../models");

const userData = require("./userData.json");
const blogPostData = require("./blogPostData.json");
const commentsData = require("./commentsData.json");

// SEED DATABASE FUNCTION - async/await
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogPost of blogPostData) {
    await BlogPost.create({
      ...blogPost,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const comments = await Comments.bulkCreate(commentsData);

  process.exit(0);
};

// CALL SEED DATABASE FUNCTION
seedDatabase();
