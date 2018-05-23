# JsGA
is a simple example on how to optimize a multimodal function by using a canonical Genetic Algorithm implemented with JavaScript. The algorithm performs over the [Function F6](http://www.cs.unm.edu/~neal.holts/dga/benchmarkFunction/schafferf6.html), which is formally defined as:

![](https://latex.codecogs.com/svg.latex?f(x,y)=0.5&plus;\frac{\sin^2(\sqrt{x^2&space;&plus;&space;y^2})-0.5}{[1&plus;0.001&space;\cdot&space;(x^2&space;&plus;&space;y^2)]^2})

## Characteristics
 - Solution represented as binary vector with 44 bits, 22 for each variable;
 - One-point crossover;
 - Bit flip mutation;
 - Parents selection based on k tournament;
 - Merging population and offspring based on total ranking;
 
## Parameters
The page presents some parameters through which one may notices their impact on the algorithm behavior.  
 - Population size
 - Matation rate
 - Crossover rate
 - Maximal of generations
 - K-tournament
