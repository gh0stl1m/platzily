const { Schema } = require('mongoose');

const dbConnection = require('../repositories/mongoDB/dbClient');

const LinkSchema = new Schema({
  originalUrl: { type: String, required: true },
  hash: { type: String, required: true }
}, { timestamps: true });

LinkSchema.index({ hash: 1});

module.exports = dbConnection.model('link', LinkSchema);
