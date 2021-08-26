const { Schema, model } = require('mongoose');

const neuronSchema = new Schema({
  weights: [Decimal128],
});

const Neuron = model('Neuron', neuronSchema);

module.exports = Neuron;
