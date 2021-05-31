const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

module.exports = { User, Post, Comment };

//None of these have cascade delete. I don't think it makes sense for anything to be deleted even if the user is deleted.

//User has many Posts
User.hasMany(Post, {
    foreignKey: 'user_id'
})
//Posts belong to User
Post.belongsTo(User, {
    foreignKey: 'user_id'
})
//User has many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
})
//Comments belong to User
Comment.belongsTo(User, {
    foreignKey: 'user_id'
})
//Post have many comments
Post.hasMany(Comment, {
    foreignKey: 'issue_id'
})
//Comments belong to Post
Comment.belongsTo(Post, {
    foreignKey: 'issue_id'
})

module.exports = { User, Post, Comment};