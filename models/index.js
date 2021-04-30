const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');

//1 to many
User.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

//1 to many
User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

//1 to 1
Posts.belongsTo(User, {
    foreignKey: 'user_id',
});

//1 to many
Posts.hasMany(Comments, {
    foreignKey: 'post_id',
});

//1 to 1
Comments.belongsTo(User, {
    foreignKey: 'user_id',
});

//1 to 1
Comments.belongsTo(Posts, {
    foreignKey: 'post_id',
});



module.exports = { User, Posts, Comments, };