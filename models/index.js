//IMPORTS MODELS AND EXPORTS THEM
const User = require("./user");
const BlogPost = require("./blogPost");
const Comments = require("./comments");

//SET UP ASSOCIATIONS BETWEEN MODELS (USER HAS MANY BLOG POSTS, BLOG POST BELONGS TO USER)
User.hasMany(BlogPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

BlogPost.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Comments, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comments.belongsTo(User, {
  foreignKey: "user_id",
});

Comments.belongsTo(BlogPost, {
  foreignKey: "blogPost_id",
  onDelete: "CASCADE",
});

BlogPost.hasMany(Comments, {
  foreignKey: "blogPost_id",
  onDelete: "CASCADE",
});

// EXPORT MODELS
module.exports = { User, BlogPost, Comments };