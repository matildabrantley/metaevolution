const { Schema, model } = require('mongoose');

const netSchema = new Schema({
  numLayers: {
    type: Number,
    required: true,
  },
  //layers: [Layer],
});

const Net = model('Net', netSchema);

module.exports = Net;
