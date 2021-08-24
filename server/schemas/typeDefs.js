const { gql } = require('apollo-server-express');

//TODO: Consider if Layer and Neuron are actually necessary
//      and look for ways to move everything into Net

//TODO: Mind type and model once Mind class development is finished
const typeDefs = gql`
  type Net {
    _id: ID
    numLayers: Int
    layers: [Layer]!
  }

  type Layer {
    _id: ID
    layerWidth: Int
    neurons: [Neuron]!
  }

  type Neuron {
    _id: ID
    weights: [Float]
  }
  
  type Query {
    nets: [Net]!
    net(netId: ID!): Net
  }

  type Mutation {
    addNet(name: String!): Net
    removeNet(netId: ID!): Net
  }
`;

module.exports = typeDefs;
