module.exports = (sequelize, type, table) => {
    const Server = sequelize.define(table.prefix.concat("servers"), {        
        name: {
            type: type.STRING(255),
            allowNull: false
        },
        description: {
            type: type.STRING(255),
            allowNull: true
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