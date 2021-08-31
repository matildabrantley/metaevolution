# Meta-Evolution Lab
Online Lab for Open-ended AI through Hierarchical Evolution

### By: Matilda Brantley

## Description
This project is a custom neural network framework for creating artificial intelligence without the normal restrictions. The neural networks are trained through
natural selection of partly random mutations (similar to genetic algorithms) rather than gradient descent (backpropagation). This frees the neural networks to grow 
and change in myriad ways not possible with supervised learning, such as incremental neural architecture changes. 

Unlike genetic algorithms, however, the mutations are not totally random and the natural selection is hierarchical. For example, groups of AI have an average fitness enabling the selection of one group over another, with different groups having divergent properties such as mutation rate, neural architecture, population size and generation length.

Evolution occurs in a Phaser.js world, which handles collisions and 2d vector physics quite efficiently. 

## Libraries and Frameworks
#### Client
* Phaser 3
* React, React-Router, React-Bootstrap, React-Spring
#### Server
* Express, Node
* MongoDB, Mongoose
* GraphQL, Apollo Server Express and Apollo Client

## Classes 
* __Net__: Custom neural network with zero-centered charges and weights to work
best in a 2D simulation in which origin is an agent's own location.
    * Three architectures so far: Feedforward, RNN and LSTM
    * When the agent a Net belongs to doesn't get selected for next generation or "dies" for whatever reason, another agent's Net in the same Group simply clones its weights into this Net to increase efficiency, i.e. no object deletion/construction (exception to this at Genus level).
* __Mind__: Higher-level architectures exist here, in which Nets connect together
into multidimensional constructs. Each Net acts as a kind of neuron, wiring upto other Nets. 
SenseNet is the entry point and BehaviorNet is the endpoint. All other Nets are bundled into inner Regions.
* __Life__: Extends Phaser's Arcade Physics Sprite class. Contains sprites, animations, coordinates, fitness. This class activates and feeds formatted input into Mind
* __Group__: Extends Phaser's Group class. Manages the fitness calculations, selection and collision events of all of its Life objects. All members of a class have the same neural architecture to enable mixing of neural weights, as well as the same sprite/animation.
* __Species__: Also extends Phaser's Group class. Manages fitness calculations of
each subgroup, the group-level selection and collision events between different species. Each Group within a Species also has the same higher-level Mind architecture (Net of Nets), and also a very similar Net-level architecture to enable gene flow. Different Species can have predator/prey relationships.
* __Genus__: Basically just a higher level version of Species to enable selection of entire Species over one another. Also highly divergent neural architectures can arise at this level of selection. Will use _cloneDeep when overwriting Minds of entirely different architectures.
* __World__: Extends Phaser's Scene. The world can be a room, an environment, a level of a game. Enable gravity for platformer or leave it disabled for top-down scenes (like Ecosystem). Assets are imported here so tiles (tileset + JSON tilemap data), sprites (single image) and animations (spritesheet + JSON frame data) can be configured and passed into different Groups.

## Components and Pages
* __PhaserWorld__: Builds Phaser config object from props and instantiates a Phaser game instance based on the type of scene passed as a prop, with options for lab, ecosystem, game, and a variety of example scenes. Also removes Phaser's canvas on component unmount.
* __Register__ & __Login__: User registration/login forms that send authenticated data to server.
* __Navigation__: Navbar with links to pages, external sites (Learning Rooms, my GitHub and portfolio) and Register/Login buttons. Uses react-bootstrap.
* __HomePage__: Figures with popout image links to each other pages.
* __LabPage__: Build and see neural networks here.
* __EcosystemPage__: Instantiates a large PhaserWorld top-down scene.
* __GamePage__: Instantiates platformer (sidescrolling) PhaserWorld scene.
* __Popout__: Children wrapped in this component taps into react-spring to slightly pop out of the page in the third dimension (without moving around other elements). Used for buttons and links.
* __Jumpout__: Children wrapped in this component leaps from the page and their state holds R, G and B values that can randomly when hovered over. Used for EvoLab logo letters.
* __Flipout__: Children wrapped in this component swings back and forth like shop sign in the wind as long as user holds down mouse.
* __Glide__: Children wrapped in this component smoothly glide onto the page.

## Tools
* Piskel used for small sprites and spritesheets design.
* DeepDreamGenerator used to design or re-imagine many art assets and backgrounds.

## Screenshots
#### Ecosystem
![Ecosystem](/client/src/assets/ecopage.png)

#### Lab
![Lab](/client/src/assets/labpage.png)

## Videos
