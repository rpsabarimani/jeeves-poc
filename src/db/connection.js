const { Sequelize } = require('sequelize');
let sequelize = null

if (process.env.NODE_ENV === "production") {
    try {

        sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialectOptions: {
                ssl: {
                    rejectUnauthorized: false
                }
            }
        });
        module.exports = sequelize;
    }
    catch (e) {
        console.log(e, "failed to connect");
    }
} else {
    sequelize = new Sequelize('jeeves-poc', 'postgres', 'root', {
        host: 'localhost',
        dialect: 'postgres',
        databaseVersion: "12.1.0", // Provide version to enable IF NOT EXISTS in createSchema
    });
}

module.exports = sequelize;