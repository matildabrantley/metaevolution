const { Schema, model } = require('mongoose');
const layerSchema = require('./Layer');

const netSchema = new Schema({
  numLayers: {
    type: Number,
    required: true,
  },
  layers: [layerSchema],
});

const Net = model('Net', netSchema);

module.exports = Net;
