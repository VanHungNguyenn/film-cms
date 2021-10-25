module.exports = (sequelize, type, table) => {
    const tbName = table.prefix.concat("posts");
    const Post = sequelize.define(tbName, {
        parentid: {
            type: type.INTEGER,
            allowNull: true
        },
        slug: {
            type: type.STRING(255),
            allowNull: false
        },
        title: {
            type: type.TEXT,
            allowNull: false
        },
        description: {
            type: type.TEXT,
            defaultValue: ""
        },
        note: {
            type: type.TEXT,
            defaultValue: ""
        },
        content: {
            type: type.TEXT,
            defaultValue: ""
        },
        seotitle: {
            type: type.TEXT,
            defaultValue: ""
        },
        seodescription: {
            type: type.TEXT,
            defaultValue: ""
        },
        posttype: {
            type: type.STRING(45),
            defaultValue: ""
        },
        poststatus: {
            type: type.STRING(45),
            defaultValue: ""
        },
        publishedat: {
            type: type.DATE,
            allowNull: false
        },
        modifiedat: {
            type: type.DATE,
            allowNull: false
        },
        postorder: {
            type: type.INTEGER,
            defaultValue: 0
        },
        islikemain: {
            type: type.BOOLEAN,
            defaultValue: true
        },
        notenglish: {
            type: type.BOOLEAN,
            defaultValue: false
        },        
        viewcount: {
            type: type.INTEGER,
            defaultValue: 0
        },
        viewcountday: {
            type: type.INTEGER,
            defaultValue: 0
        },
        viewcountweek: {
            type: type.INTEGER,
            defaultValue: 0
        },
        viewcountmonth: {
            type: type.INTEGER,
            defaultValue: 0
        },
        ratingcount: {
            type: type.INTEGER,
            defaultValue: 0
        },
        ratingaverage: {
            type: type.DECIMAL(2, 1),
            defaultValue: 0
        },
        allowindex: {
            type: type.BOOLEAN,
            defaultValue: false
        },
        allowfollow: {
            type: type.BOOLEAN,
            defaultValue: false
        },
        nolink: {
            type: type.BOOLEAN,
            defaultValue: false
        },        
        thumbnail: {
            type: type.INTEGER,
            allowNull: true
        },
        imgicon: {
            type: type.INTEGER,
            allowNull: true
        },
        template: {
            type: type.STRING,
            allowNull: true
        },
        filmyear: {
            type: type.STRING(5),
            allowNull: true
        },
        filmtype: {
            type: type.STRING(45), // phim-le, phim-bo, anime
            allowNull: true
        },
        filmtime: {
            type: type.STRING(45),
            allowNull: true
        },
        imdb: {
            type: type.FLOAT,
            defaultValue: 0
        },        
        filmname: {
            type: type.STRING(255),
            allowNull: true
        },
        slider: {
            type: type.BOOLEAN,
            defaultValue: false
        },
        recommended: {
            type: type.BOOLEAN,
            defaultValue: false
        },
        copyright: {
            type: type.BOOLEAN,
            defaultValue: false
        },
        done: {
            type: type.BOOLEAN,
            defaultValue: false
        },
        channelplay: {
            type: type.STRING(45), //cinema, netflix
            defaultValue: ""
        },
        actor_old: {
            type: type.TEXT,
            defaultValue: ""
        },
        director_old: {
            type: type.TEXT,
            defaultValue: ""
        },
        keyword_old: {
            type: type.TEXT,
            defaultValue: ""
        },
        thumb_old: {
            type: type.TEXT,
            defaultValue: ""
        },
        banner_old: {
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

    Post.findPostLangAvailable = async(curLangId, postId) => {
        const tbPostName = tbName,
            tbPostLangName = table.prefix.concat("postlangs"),
            tbLanguageName = table.prefix.concat("languages"),
            query = `SELECT lang.id, lang.codelang, lang.name, lang.ismain
                    FROM ${tbLanguageName} lang
                    WHERE lang.ismain = true AND lang.id not like '${curLangId}'
                    UNION ALL 
                    SELECT lang.id, lang.codelang, lang.name, lang.ismain
                    FROM(
                        SELECT DISTINCT IF(p.islikemain, l.id, pl.langid) langid
                        FROM ${tbPostName} p 
                            LEFT JOIN ${tbPostLangName} pl ON p.id = pl.postid
                            INNER JOIN ${tbLanguageName} l 
                        WHERE p.id = ${postId} AND l.ismain = false AND l.isblock = false
                    ) xxx INNER JOIN ${tbLanguageName} lang ON xxx.langid = lang.id
                    WHERE lang.id not like '${curLangId}'`;
        const postlangs = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        return postlangs;
    }

    Post.findPostLangAvailableFull = async(postId) => {
        const tbPostName = tbName,
            tbPostLangName = table.prefix.concat("postlangs"),
            tbLanguageName = table.prefix.concat("languages"),
            query = `SELECT lang.id, lang.name, lang.ismain
                    FROM ${tbLanguageName} lang
                    WHERE lang.ismain = true 
                    UNION ALL 
                    SELECT lang.id, lang.name, lang.ismain
                    FROM(
                        SELECT DISTINCT IF(p.islikemain, l.id, pl.langid) langid
                        FROM ${tbPostName} p 
                            LEFT JOIN ${tbPostLangName} pl ON p.id = pl.postid
                            INNER JOIN ${tbLanguageName} l 
                        WHERE p.id = ${postId} AND l.ismain = false AND l.isblock = false
                    ) xxx INNER JOIN ${tbLanguageName} lang ON xxx.langid = lang.id`;
        const postlangs = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        return postlangs;
    };

    Post.findPostLangAvailableFullText = async(postId) => {
        var post = await Post.findPostLangAvailableFull(postId);
        return post.map(a => a.id).join(",");
    }

    return Post;
}