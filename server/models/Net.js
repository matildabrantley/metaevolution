const { Schema, model } = require('mongoose');

const netSchema = new Schema({
  numLayers: {
    type: Int,
    required: true,
  },
  layers: [Layer],
});

const Net = model('Net', netSchema);

module.exports = Net;
