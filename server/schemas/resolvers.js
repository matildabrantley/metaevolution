const { Net } = require('../models');

const resolvers = {
  Query: {
    nets: async () => {
      return Net.find();
    },

    net: async (parent, { netId }) => {
      return Net.findOne({ _id: netId });
    },
  },

  //Currently just addNet, addLayer and removeNet
  //TODO: addNeuron
  Mutation: {
    addNet: async (parent, { name }) => {
      return Net.create({ name });
    },
    addLayer: async (parent, { netId, layer }) => {
      return Net.findOneAndUpdate(
        { _id: netId },
        {
          $addToSet: { layers: layer },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeNet: async (parent, { netId }) => {
      return Net.findOneAndDelete({ _id: netId });
    },
  },
};

module.exports = resolvers;
