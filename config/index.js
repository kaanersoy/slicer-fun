require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    db_url: process.env.DB_URL,
    env: process.env.NODE_ENV
}
