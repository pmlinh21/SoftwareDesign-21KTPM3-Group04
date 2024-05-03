var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _block = require("./block");
var _highlight = require("./highlight");
var _like_post = require("./like_post");
var _list = require("./list");
var _list_post = require("./list_post");
var _membership = require("./membership");
var _notification = require("./notification");
var _post = require("./post");
var _post_monthly_data = require("./post_monthly_data");
var _reading_history = require("./reading_history");
var _report_post = require("./report_post");
var _report_response = require("./report_response");
var _report_type = require("./report_type");
var _response = require("./response");
var _subscribe = require("./subscribe");
var _subscription = require("./subscription");
var _topic = require("./topic");
var _topic_post = require("./topic_post");
var _topic_user = require("./topic_user");
var _user = require("./user");
var _user_monthly_data = require("./user_monthly_data");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var block = _block(sequelize, DataTypes);
  var highlight = _highlight(sequelize, DataTypes);
  var like_post = _like_post(sequelize, DataTypes);
  var list = _list(sequelize, DataTypes);
  var list_post = _list_post(sequelize, DataTypes);
  var membership = _membership(sequelize, DataTypes);
  var notification = _notification(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var post_monthly_data = _post_monthly_data(sequelize, DataTypes);
  var user_monthly_data = _user_monthly_data(sequelize, DataTypes);
  var reading_history = _reading_history(sequelize, DataTypes);
  var report_post = _report_post(sequelize, DataTypes);
  var report_response = _report_response(sequelize, DataTypes);
  var report_type = _report_type(sequelize, DataTypes);
  var response = _response(sequelize, DataTypes);
  var subscribe = _subscribe(sequelize, DataTypes);
  var subscription = _subscription(sequelize, DataTypes);
  var topic = _topic(sequelize, DataTypes);
  var topic_post = _topic_post(sequelize, DataTypes);
  var topic_user = _topic_user(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  list.belongsToMany(post, { as: 'saved_posts', through: list_post, foreignKey: "id_list", otherKey: "id_post" });
  post.belongsToMany(list, { as: 'is_saved', through: list_post, foreignKey: "id_post", otherKey: "id_list" });
  post.belongsToMany(topic, { as: 'list_topic', through: topic_post, foreignKey: "id_post", otherKey: "id_topic" });
  post.belongsToMany(user, { as: 'id_user_users', through: like_post, foreignKey: "id_post", otherKey: "id_user" });
  post.belongsToMany(user, { as: 'id_user_user_reading_histories', through: reading_history, foreignKey: "id_post", otherKey: "id_user" });
  topic.belongsToMany(post, { as: 'id_post_post_topic_posts', through: topic_post, foreignKey: "id_topic", otherKey: "id_post" });
  topic.belongsToMany(user, { as: 'id_user_user_topic_users', through: topic_user, foreignKey: "id_topic", otherKey: "id_user" });
  user.belongsToMany(post, { as: 'id_post_posts', through: like_post, foreignKey: "id_user", otherKey: "id_post" });
  user.belongsToMany(post, { as: 'id_post_post_reading_histories', through: reading_history, foreignKey: "id_user", otherKey: "id_post" });
  user.belongsToMany(topic, { as: 'id_topic_topic_topic_users', through: topic_user, foreignKey: "id_user", otherKey: "id_topic" });
  user.belongsToMany(user, { as: 'user_users', through: block, foreignKey: "block", otherKey: "user" });
  user.belongsToMany(user, { as: 'block_users', through: block, foreignKey: "user", otherKey: "block" });
  user.belongsToMany(user, { as: 'user_user_subscribes', through: subscribe, foreignKey: "subscriber", otherKey: "user" });
  user.belongsToMany(user, { as: 'subscriber_users', through: subscribe, foreignKey: "user", otherKey: "subscriber" });
  list_post.belongsTo(list, { as: "id_list_list", foreignKey: "id_list"});
  list.hasMany(list_post, { as: "list_posts", foreignKey: "id_list"});
  highlight.belongsTo(post, { as: "id_post_post", foreignKey: "id_post"});
  post.hasMany(highlight, { as: "highlights", foreignKey: "id_post"});
  like_post.belongsTo(post, { as: "id_post_post", foreignKey: "id_post"});
  post.hasMany(like_post, { as: "like_posts", foreignKey: "id_post"});
  list_post.belongsTo(post, { as: "id_post_post", foreignKey: "id_post"});
  post.hasMany(list_post, { as: "list_posts", foreignKey: "id_post"});
  notification.belongsTo(post, { as: "post_ìnfo", foreignKey: "id_post"});
  post.hasMany(notification, { as: "notifications", foreignKey: "id_post"});
  post_monthly_data.belongsTo(post, { as: "id_post_post", foreignKey: "id_post"});
  post.hasMany(post_monthly_data, { as: "post_monthly_datas", foreignKey: "id_post"});
  reading_history.belongsTo(post, { as: "id_post_post", foreignKey: "id_post"});
  post.hasMany(reading_history, { as: "reading_histories", foreignKey: "id_post"});
  report_post.belongsTo(post, { as: "id_post_post", foreignKey: "id_post"});
  post.hasMany(report_post, { as: "report_posts", foreignKey: "id_post"});
  response.belongsTo(post, { as: "id_post_post", foreignKey: "id_post"});
  post.hasMany(response, { as: "responses", foreignKey: "id_post"});
  topic_post.belongsTo(post, { as: "id_post_post", foreignKey: "id_post"});
  post.hasMany(topic_post, { as: "topic_posts", foreignKey: "id_post"});
  user.belongsTo(post, { as: "id_pinned_post_post", foreignKey: "id_pinned_post"});
  post.hasMany(user, { as: "users", foreignKey: "id_pinned_post"});
  report_post.belongsTo(report_type, { as: "id_report_type_report_type", foreignKey: "id_report_type"});
  report_type.hasMany(report_post, { as: "report_posts", foreignKey: "id_report_type"});
  report_response.belongsTo(report_type, { as: "id_report_type_report_type", foreignKey: "id_report_type"});
  report_type.hasMany(report_response, { as: "report_responses", foreignKey: "id_report_type"});
  notification.belongsTo(response, { as: "response_info", foreignKey: "id_response"});
  response.hasMany(notification, { as: "notifications", foreignKey: "id_response"});
  report_response.belongsTo(response, { as: "id_response_response", foreignKey: "id_response"});
  response.hasMany(report_response, { as: "report_responses", foreignKey: "id_response"});
  topic_post.belongsTo(topic, { as: "id_topic_topic", foreignKey: "id_topic"});
  topic.hasMany(topic_post, { as: "topic_posts", foreignKey: "id_topic"});
  topic_user.belongsTo(topic, { as: "id_topic_topic", foreignKey: "id_topic"});
  topic.hasMany(topic_user, { as: "topic_users", foreignKey: "id_topic"});
  block.belongsTo(user, { as: "block_user", foreignKey: "block"});
  user.hasMany(block, { as: "blocks", foreignKey: "block"});
  block.belongsTo(user, { as: "user_user", foreignKey: "user"});
  user.hasMany(block, { as: "user_blocks", foreignKey: "user"});
  highlight.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(highlight, { as: "highlights", foreignKey: "id_user"});
  like_post.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(like_post, { as: "like_posts", foreignKey: "id_user"});
  list.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(list, { as: "lists", foreignKey: "id_user"});
  subscription.belongsTo(membership, { as: "membership", foreignKey: "id_membership"});
  membership.hasMany(subscription, { as: "subscriptions", foreignKey: "id_membership"});
  notification.belongsTo(user, { as: "creator_user", foreignKey: "creator"});
  user.hasMany(notification, { as: "notifications", foreignKey: "creator"});
  notification.belongsTo(user, { as: "receiver_user", foreignKey: "receiver"});
  user.hasMany(notification, { as: "receiver_notifications", foreignKey: "receiver"});
  post.belongsTo(user, { as: "author", foreignKey: "id_user"});
  user.hasMany(post, { as: "posts", foreignKey: "id_user"});
  reading_history.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(reading_history, { as: "reading_histories", foreignKey: "id_user"});
  report_post.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(report_post, { as: "report_posts", foreignKey: "id_user"});
  report_response.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(report_response, { as: "report_responses", foreignKey: "id_user"});
  response.belongsTo(user, { as: "user", foreignKey: "id_user"});
  user.hasMany(response, { as: "responses_user", foreignKey: "id_user"});
  subscribe.belongsTo(user, { as: "subscriber_user", foreignKey: "subscriber"});
  user.hasMany(subscribe, { as: "subscribes", foreignKey: "subscriber"});
  subscribe.belongsTo(user, { as: "user_user", foreignKey: "user"});
  user.hasMany(subscribe, { as: "user_subscribes", foreignKey: "user"});
  subscription.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(subscription, { as: "subscriptions", foreignKey: "id_user"});
  topic_user.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(topic_user, { as: "topic_users", foreignKey: "id_user"});
  user_monthly_data.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(user_monthly_data, { as: "user_monthly_datas", foreignKey: "id_user"});
  return {
    admin,
    block,
    highlight,
    like_post,
    list,
    list_post,
    membership,
    notification,
    post,
    post_monthly_data,
    reading_history,
    report_post,
    report_response,
    report_type,
    response,
    subscribe,
    subscription,
    topic,
    topic_post,
    topic_user,
    user,
    user_monthly_data
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
