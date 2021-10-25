module.exports = (sequelize, type, table) => {
    const tbName = table.prefix.concat("categories");
    const Categories = sequelize.define(tbName, {
        parentid: {
            type: type.INTEGER,
            allowNull: true
        },
        slug: {
            type: type.STRING(255),
            allowNull: false
        },
        fullslug: {
            type: type.TEXT,
            allowNull: true
        },        
        title: {
            type: type.TEXT,
            allowNull: false
        },
        description: {
            type: type.TEXT,
            allowNull: true
        },
        seotitle: {
            type: type.TEXT,
            allowNull: false
        },
        seodescription: {
            type: type.TEXT,
            allowNull: false
        },
        postcount: {
            type: type.INTEGER,
            defaultValue: 0
        },
        hirarchylevel: {
            type: type.INTEGER,
            defaultValue: 1
        },
        catetype: {
            type: type.STRING(45), // category, tag
            allowNull: false
        },
        catestatus: {
            type: type.STRING(20), // pending, published, trash
            allowNull: false,
            defaultValue: "pending"
        },        
        islikemain: {
            type: type.BOOLEAN,
            defaultValue: true
        },
        allowindex: {
            type: type.BOOLEAN,
            defaultValue: false
        },
        allowfollow: {
            type: type.BOOLEAN,
            defaultValue: false
        },
        ratingcount: {
            type: type.INTEGER,
            defaultValue: 0
        },
        ratingaverage: {
            type: type.DECIMAL(2, 1),
            defaultValue: 0
        },
        likecount: {
            type: type.INTEGER,
            defaultValue: 0
        },
        viewcountweek: {
            type: type.INTEGER,
            defaultValue: 0
        },
        id_cate_old: {
            type: type.INTEGER,
            defaultValue: 0
        },
        id_country_old: {
            type: type.INTEGER,
            defaultValue: 0
        },
        keyword_old: {
            type: type.TEXT,
            defaultValue: ""
        },
        type_cate_old: {
            type: type.TEXT,
            defaultValue: ""
        }
    }, {
        indexes: [{
            unique: true,
            fields: ['slug']
        }]
    }, {
        engine: table.engine,
        underscored: true,
        timestamp: true
    });

    Categories.findAllChildIds = async(parentId) => {
        const tableName = tbName;
        const query = `SELECT GROUP_CONCAT(lv SEPARATOR ',') ids 
                        FROM (
                        SELECT @pv:=(SELECT GROUP_CONCAT(id SEPARATOR ',') 
                        FROM ${tableName} 
                        WHERE parentid IN (@pv)) AS lv FROM ${tableName} JOIN (SELECT @pv:=${parentId})tmp
                        WHERE parentid IN (@pv)) a;`;
        var cates = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        var ids = (cates[0].ids == null) ? [] : cates[0].ids.split(",");
        return ids;
    }

    Categories.findAllParents = async(childId) => {
        const tableName = tbName;
        const query = `SELECT category.id, category.parentid, category.slug, category.title, category.islikemain
                        FROM (
                            SELECT
                                @r AS _id,
                                (SELECT @r := parentid FROM ${tableName} WHERE id = _id) AS parentid,
                                @l := @l + 1 AS lvl
                            FROM
                                (SELECT @r := ${childId}, @l := 0) vars,
                                ${tableName} m
                            WHERE @r <> 0) subcategory
                        JOIN ${tableName} category ON subcategory._id = category.id
                        ORDER BY subcategory.lvl DESC`;
        const cates = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        return cates;
    }

    Categories.findAllParentsSEO = async(childId, langId) => {
        const tableName = tbName;
        const tbCateLangName = table.prefix.concat("catelangs");
        const query = `SELECT category.id, category.parentid, category.slug, category.fullslug, category.islikemain, 
                            COALESCE(catelang.title, category.title) title, 
                            COALESCE(catelang.seotitle, category.seotitle) seotitle, 
                            COALESCE(catelang.description, category.description) description, 
                            COALESCE(catelang.seodescription, category.seodescription) seodescription 
                        FROM (
                            SELECT
                                @r AS _id,
                                (SELECT @r := parentid FROM ${tableName} WHERE id = _id) AS parentid,
                                @l := @l + 1 AS lvl
                            FROM
                                (SELECT @r := ${childId}, @l := 0) vars,
                                ${tableName} m
                            WHERE @r <> 0
                        ) subcategory JOIN ${tableName} category ON subcategory._id = category.id 
                        LEFT JOIN ${tbCateLangName} catelang ON category.id = catelang.cateid AND catelang.langid = '${langId}' 
                        ORDER BY subcategory.lvl DESC`;
        const cates = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        return cates;
    }

    Categories.findAllParentsWithLang = async(cateId, langId) => {
        const tableName = tbName;
        const tbCateLangName = table.prefix.concat("catelangs");
        const query = `SELECT category.id, category.parentid, category.slug, COALESCE(catelang.title, category.title) title, category.islikemain
                        FROM (
                            SELECT
                                @r AS _id,
                                (SELECT @r := parentid FROM ${tableName} WHERE id = _id) AS parentid,
                                @l := @l + 1 AS lvl
                            FROM
                                (SELECT @r := ${cateId}, @l := 0) vars,
                                ${tableName} m
                            WHERE @r <> 0
                        ) subcategory JOIN ${tableName} category ON subcategory._id = category.id LEFT JOIN ${tbCateLangName} catelang ON category.id = catelang.cateid
                        WHERE catelang.langid = '${langId}' OR (category.islikemain=1 AND catelang.langid is null)
                        ORDER BY subcategory.lvl DESC`;
        const cates = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        return cates;
    }

    Categories.findCateLangAvailable = async(curLangid, cateId) => {
        const tbCateName = tbName,
            tbCateLangName = table.prefix.concat("catelangs"),
            tbLanguageName = table.prefix.concat("languages"),
            query = `SELECT lang.id, lang.codelang, lang.name, lang.ismain
                    FROM ${tbLanguageName} lang
                    WHERE lang.ismain = true AND lang.id not like '${curLangid}'
                    UNION ALL 
                    SELECT lang.id, lang.codelang, lang.name, lang.ismain
                    FROM(
                        SELECT DISTINCT IF(p.islikemain, l.id, pl.langid) langid
                        FROM ${tbCateName} p 
                            LEFT JOIN ${tbCateLangName} pl ON p.id = pl.cateid
                            INNER JOIN ${tbLanguageName} l 
                        WHERE p.id = ${cateId} AND l.ismain = false AND l.isblock = false
                    ) xxx INNER JOIN ${tbLanguageName} lang ON xxx.langid = lang.id
                    WHERE lang.id not like '${curLangid}'`;
        const catelangs = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        return catelangs;
    };

    Categories.findCateLangAvailableFull = async(cateId) => {
        const tbCateName = tbName,
            tbCateLangName = table.prefix.concat("catelangs"),
            tbLanguageName = table.prefix.concat("languages"),
            query = `SELECT lang.id, lang.name, lang.ismain
                    FROM ${tbLanguageName} lang
                    WHERE lang.ismain = true 
                    UNION ALL 
                    SELECT lang.id, lang.name, lang.ismain
                    FROM(
                        SELECT DISTINCT IF(p.islikemain, l.id, pl.langid) langid
                        FROM ${tbCateName} p 
                            LEFT JOIN ${tbCateLangName} pl ON p.id = pl.cateid
                            INNER JOIN ${tbLanguageName} l 
                        WHERE p.id = ${cateId} AND l.ismain = false AND l.isblock = false
                    ) xxx INNER JOIN ${tbLanguageName} lang ON xxx.langid = lang.id`;
        const catelangs = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        return catelangs;
    };

    Categories.findCateLangAvailableFullText = async(cateId) => {
        var cates = await Categories.findCateLangAvailableFull(cateId);
        return cates.map(a => a.id).join(",");
    }

    Categories.getRootSlug = async(childId) => {
        var cates = await Categories.findAllParents(childId);
        return cates.map(a => a.slug).join("/");
    }

    Categories.getCateMinHirarchyLevel = async(postId) => {
        const tbCate = tbName,
            tbPostCate = table.prefix.concat("post_cates"),
            query = `select c.id, c.title
                        from ${tbPostCate} pc JOIN ${tbCate} c ON pc.cateid = c.id AND pc.postid=${postId}
                        order by c.hirarchylevel, c.id
                        limit 1`;
        const pcate = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        return (pcate.length > 0) ? pcate[0].id : null;
    }

    Categories.getCateMinHirarchyLevel2 = async(postId) => {
        const tbCate = tbName,
            tbPostCate = table.prefix.concat("post_cates"),
            query = `select c.id
                        from ${tbPostCate} pc JOIN ${tbCate} c ON pc.cateid = c.id AND pc.postid=${postId}
                        order by c.hirarchylevel, c.id
                        limit 1`;
        const pcate = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        return (pcate.length > 0) ? pcate[0].id : null;
    }

    Categories.getTagsOfPost = async(postId, cateType) => {
        const tbCate = tbName,
            tbPostCate = table.prefix.concat("post_cates"),
            query = `SELECT distinct pc.cateid
                        FROM ${tbPostCate} pc JOIN ${tbCate} c ON pc.cateid=c.id
                        AND c.catetype='${cateType}' 
                        AND pc.postid=${postId}`;
        const pcate = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        var ids = [];
        for(var c of pcate){
            ids.push(c.cateid);
        }
        return ids;
    }

    return Categories;
}