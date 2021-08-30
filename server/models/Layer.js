const { Schema, model } = require('mongoose');
const neuronSchema = require('./Neuron');

const layerSchema = new Schema({
  layerWidth: {
    type: Number,
    required: true,
  },
  neurons: [neuronSchema],
});

module.exports = layerSchema;
