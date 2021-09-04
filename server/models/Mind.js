const { Schema, model } = require('mongoose');
//const layerSchema = require('./Layer');

const mindSchema = new Schema({
  net: {
    type: Object,
    required: true,
  },
});

const Mind = model('Mind', mindSchema);

module.exports = Mind;
