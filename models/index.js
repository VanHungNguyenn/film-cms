const config = require("config");
const cfDatabase = config.get("database");
const cfTable = config.get('database.table');
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    cfDatabase.database,
    cfDatabase.username,
    cfDatabase.password, {
        host: cfDatabase.host,
        dialect: cfDatabase.dialect,
        pool: {
            max: cfDatabase.pool.max,
            min: cfDatabase.pool.min,
            acquire: cfDatabase.pool.acquire,
            idle: cfDatabase.pool.idle
        },
        logging: cfDatabase.logging
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// Option
db.option = require("../models/option.model.js")(sequelize, Sequelize, cfTable);
// User and Role table
db.user = require("../models/user.model.js")(sequelize, Sequelize, cfTable);
db.role = require("../models/role.model.js")(sequelize, Sequelize, cfTable);
db.user.belongsTo(db.role, { as: "role", foreignKey: "roleid", constraints: false });
db.user.belongsTo(db.user, { as: 'Author', foreignKey: 'author', constraints: false });
// Auth token
db.auth = require("../models/auth.model.js")(sequelize, Sequelize, cfTable);
// Language table
db.language = require("../models/language.model.js")(sequelize, Sequelize, cfTable);
// Type table
db.type = require("../models/type.model.js")(sequelize, Sequelize, cfDatabase.table);
db.type.belongsToMany(db.type, { as: "catetype", through: cfTable.prefix + "post_cate_types", foreignKey: "ptypeid", constraints: false });
db.type.belongsToMany(db.type, { as: "posttype", through: cfTable.prefix + "post_cate_types", foreignKey: "ctypeid", constraints: false });
// Category table
db.category = require("../models/category.model.js")(sequelize, Sequelize, cfDatabase.table);
db.category.belongsTo(db.category, { as: 'Parent', foreignKey: 'parentid', constraints: false });
db.category.hasMany(db.category, { as: "Childrens", foreignKey: 'parentid', constraints: false });
db.category.belongsTo(db.user, { as: 'Author', foreignKey: 'author', constraints: false });
db.category.belongsTo(db.type, { as: 'Type', foreignKey: 'catetype', constraints: false });
// CateLang table
db.catelang = require("../models/catelang.model.js")(sequelize, Sequelize, cfDatabase.table);
db.catelang.belongsTo(db.category, { as: 'Cate', foreignKey: 'cateid', constraints: false, onDelete: 'cascade' });
db.category.hasMany(db.catelang, { as: "CateLang", foreignKey: 'cateid', constraints: false });
db.catelang.belongsTo(db.language, { as: "Lang", foreignKey: 'langid', constraints: false });
// Post table
db.post = require("../models/post.model.js")(sequelize, Sequelize, cfDatabase.table);
db.post.belongsTo(db.type, { as: 'Type', foreignKey: 'posttype', constraints: false });
db.post.belongsTo(db.post, { as: 'Parent', foreignKey: 'parentid', constraints: false });
db.post.hasMany(db.post, { as: "Children", foreignKey: 'parentid', constraints: false });
db.post.belongsTo(db.user, { as: 'Author', foreignKey: 'author', constraints: false });
db.post.belongsToMany(db.category, { as: "categories", through: cfTable.prefix + "post_cates", foreignKey: "postid", otherKey: "cateid", constraints: false });
db.post.belongsToMany(db.category, { as: "tags", through: cfTable.prefix + "post_cates", foreignKey: "postid", otherKey: "cateid", constraints: false });
db.category.belongsToMany(db.post, { as: "posts", through: cfTable.prefix + "post_cates", foreignKey: "cateid", otherKey: "postid", constraints: false });
db.post.belongsTo(db.category, { as: 'defaultcate', foreignKey: 'dcateid', constraints: false });
// PostLang table
db.postlang = require("../models/postlang.model.js")(sequelize, Sequelize, cfDatabase.table);
db.postlang.belongsTo(db.post, { as: 'Post', foreignKey: 'postid', constraints: false, onDelete: 'cascade' });
db.post.hasMany(db.postlang, { as: "PostLang", foreignKey: 'postid', constraints: false });
db.postlang.belongsTo(db.language, { as: "Lang", foreignKey: 'langid', constraints: false });
// Media table
db.media = require("../models/media.model.js")(sequelize, Sequelize, cfDatabase.table);
db.media.belongsTo(db.user, { as: 'Author', foreignKey: 'author', constraints: false });
db.category.belongsTo(db.media, { as: 'thumb', foreignKey: 'thumbnail', constraints: false });
db.post.belongsTo(db.media, { as: 'thumb', foreignKey: 'thumbnail', constraints: false });
db.post.belongsTo(db.media, { as: 'icon', foreignKey: 'imgicon', constraints: false });
// Menu table
db.menu = require("../models/menu.model.js")(sequelize, Sequelize, cfDatabase.table);
db.menuitem = require("../models/menuitem.model.js")(sequelize, Sequelize, cfDatabase.table);
db.menuitem.belongsTo(db.menu, { as: 'menu', foreignKey: 'menuid', constraints: false, onDelete: 'cascade' });
db.menu.hasMany(db.menuitem, { as: 'items', foreignKey: 'menuid', constraints: false });
db.menuitemlang = require("../models/menuitemlang.model.js")(sequelize, Sequelize, cfDatabase.table);
db.menuitemlang.belongsTo(db.menuitem, { as: 'menuitem', foreignKey: 'mitemid', constraints: false, onDelete: 'cascade' });
db.menuitem.hasMany(db.menuitemlang, { as: 'mitemlangs', foreignKey: 'mitemid', constraints: false });
// User Inter Active
db.interactive = require("../models/interactive.model.js")(sequelize, Sequelize, cfDatabase.table);
//Feedback
db.feedback = require("../models/feedback.model.js")(sequelize, Sequelize, cfDatabase.table);
//User UI
db.userui = require("../models/userui.model.js")(sequelize, Sequelize, cfDatabase.table);
//Tracer
db.tracer = require("../models/tracer.model.js")(sequelize, Sequelize, cfDatabase.table);
db.tracer.belongsTo(db.user, { as: 'Author', foreignKey: 'userid', constraints: false });
// Admin feature
db.sitefeature = require("../models/sitefeature.model.js")(sequelize, Sequelize, cfDatabase.table);
db.sitefeature.belongsTo(db.sitefeature, { as: 'parent', foreignKey: 'parentid', constraints: false });
// Role feature
db.rolefeature = require("../models/rolefeature.model.js")(sequelize, Sequelize, cfDatabase.table);
db.rolefeature.belongsTo(db.sitefeature, { as: 'sitefeature', foreignKey: 'sitefeatureid', constraints: false });
db.rolefeature.belongsTo(db.role, { as: 'role', foreignKey: 'roleid', constraints: false });
// Server Phim
db.server = require("../models/server.model")(sequelize, Sequelize, cfDatabase.table);
// Tập phim
db.episode = require("../models/episode.model")(sequelize, Sequelize, cfDatabase.table);
db.episode.belongsTo(db.post, { as: 'post', foreignKey: 'postid', constraints: false, onDelete: 'cascade' });
db.post.hasMany(db.episode, { as: 'episodes', foreignKey: 'postid', constraints: false });
db.episode.belongsTo(db.server, { as: 'server', foreignKey: 'serverid', constraints: false, onDelete: 'cascade' });
db.server.hasMany(db.episode, { as: 'episodes', foreignKey: 'serverid', constraints: false });

module.exports = db;