module.exports = (sequelize, type, table) => {
    const Server = sequelize.define(table.prefix.concat("episodes"), {        
        name: {
            type: type.STRING(255),
            allowNull: false
        },
        slug: {
            type: type.STRING(255),
            defaultValue: ""
        },
        url: {
            type: type.STRING(255),
            allowNull: true
        },
        description: {
            type: type.TEXT,
            defaultValue: ""
        },
        note: {
            type: type.TEXT,
            defaultValue: ""
        },
        id_old: {
            type: type.INTEGER,
            defaultValue: 0
        },
        numsort: {
            type: type.INTEGER,
            defaultValue: 0
        },
        isblock: {
            type: type.BOOLEAN,
            defaultValue: false
        }
    }, {
        engine: table.engine,
        underscored: true,
        timestamp: true
    });

    return Server;
}