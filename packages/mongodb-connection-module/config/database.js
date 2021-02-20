const prefix = require('./environment');

module.exports = {
  mongodb: {
    uri: process.env[`${prefix}MONGODB_URI`] || '',
    user: process.env[`${prefix}MONGODB_USER`] || '',
    pass: process.env[`${prefix}MONGODB_PASS`] || '' 
  }
}