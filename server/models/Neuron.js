const { Schema, model } = require('mongoose');

const neuronSchema = new Schema({
  weights: [Number],
});

module.exports = neuronSchema;
