const { Schema, model } = require('mongoose');

const neuronSchema = new Schema({
  weights: [Float],
});

const Neuron = model('Neuron', neuronSchema);

module.exports = Neuron;
