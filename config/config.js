// config/config.js
require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGODB_URI,
    port: process.env.PORT || 3003,
    jwtSecret: process.env.JWT_SECRET
};