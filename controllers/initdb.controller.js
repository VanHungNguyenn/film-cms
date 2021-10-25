const db = require("../models");
const Role = db.role;
const User = db.user;
const Category = db.category;
const Post = db.post;
const Language = db.language;
const Type = db.type;
const Option = db.option;

exports.initial = () => {
    Option.bulkCreate([{
        metakey: 'off_optimze_image_upload',
        metavalue: "",
        fieldlabel: 'Tắt tối ưu ảnh',
        inputtype: 'checkbox'
    }])

    Type.bulkCreate([{
            id: "post-film",
            name: "Phim",
            description: "Phim",
            type: "post"
        },
        {
            id: "category-qg",
            name: "Categories",
            description: "Quốc gia phim",
            type: "category"
        },
        {
            id: "category-tl",
            name: "Thể loại",
            description: "Thể loại phim",
            type: "category"
        },
        {
            id: "category-dv",
            name: "Diễn viên",
            description: "Diễn viên phim",
            type: "category"
        },
        {
            id: "category-dd",
            name: "Đạo diễn",
            description: "Đạo diễn phim",
            type: "category"
        },
        {
            id: "post-blog",
            name: "Bài viết",
            description: "Bài viết",
            type: "post"
        },
        {
            id: "category-blog",
            name: "Danh mục",
            description: "Danh mục bài viết",
            type: "category"
        },
        {
            id: "tags",
            name: "Tags",
            description: "Tags",
            type: "category"
        },
        {
            id: "post-page",
            name: "Trang",
            description: "Trang",
            type: "post"
        }
    ]).then(types => {
        types.forEach(type => {
            if (type.id == 'post-blog') {
                type.addCatetype('category-blog');
                type.addCatetype('tags');
            }
        });
        types.forEach(type => {
            if (type.id == 'post-film') {
                type.addCatetype('category-qg');
                type.addCatetype('category-tl');
                type.addCatetype('category-dv');
                type.addCatetype('category-dd');
                type.addCatetype('tags');
            }
        });
    });

    Language.bulkCreate([{
            id: "vn",
            name: "Tiếng việt",
            ismain: true
        }        
    ]);

    Role.bulkCreate([{
            id: 1,
            rolename: "Administrator",
            description: "Quản trị viên"
        },
        {
            id: 2,
            rolename: "Manager",
            description: "Duyệt, xóa bài viết danh mục"
        },
        {
            id: 3,
            rolename: "Editor",
            description: "Viết bài"
        }
    ]);

    Category.bulkCreate([{
        id: 1,
        slug: "uncategorized",
        title: "Chưa có danh mục",
        seotitle: "Chưa có danh mục",
        description: "",
        seodescription: "",
        catetype: "uncategorized"
    }]);

    Post.create({
        title: "Trang chủ",
        slug: "home",
        posttype: "post-page",
        poststatus: "published",
        seotitle: "",
        seodescription: "",
        islikemain: true
    });

    User.create({
        id: 1,
        username: "admin",
        password: bcrypt.hashSync("admin", 8),
        firstname: "Nguyễn",
        lastname: "Truyển",
        email: "truyennv888@gmail.com",
        phone: "0868959751"
    }).then(user => {
        user.setRoles([1]);
    });
}