# Meta-Evolution Lab
Online Lab for Open-ended AI through Hierarchical Evolution

## Description
This project is a custom neural network framework for creating artificial intelligence without the normal restrictions. The neural networks are trained through
natural selection of partly random mutations rather than gradient descent (backpropagation) similar to genetic algorithms. This frees the neural networks to grow 
and change in myriad ways not possible with supervised learning, such as incremental neural architecture changes. However, unlike simple genetic algorithms, the 
mutations are not totally random and the natural selection is hierarchical. For example, groups of AI have an average fitness enabling the selection of one group over another, with different groups having divergent properties such as mutation rate, neural architecture, population size and generation length.

Evolution occurs in a Phaser.js world, which handles collisions and 2d vector physics quite efficiently. 

