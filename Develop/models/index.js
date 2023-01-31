const Users = require('./Users');
const techBlog = require('./techBlog');

Users.hasMany(techBlog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

techBlog.belongsTo(Users, {
  foreignKey: 'user_id'
});

module.exports = { Users, techBlog };