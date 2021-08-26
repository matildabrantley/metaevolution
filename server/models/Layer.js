const { Schema, model } = require('mongoose');

const layerSchema = new Schema({
  layerWidth: {
    type: Number,
    required: true,
  },
  neurons: [Neuron],
});

const Layer = model('Layer', layerSchema);

module.exports = Layer;
