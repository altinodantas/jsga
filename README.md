# JsGA
is a simple example on how to optimize a multimodal function by using a canonical Genetic Algorithm implemented with JavaScript. The algorithm performs over the [Function F6](http://www.cs.unm.edu/~neal.holts/dga/benchmarkFunction/schafferf6.html), which is formally defined as:

![](https://latex.codecogs.com/svg.latex?f(x,y)=0.5&plus;\frac{\sin^2(\sqrt{x^2&space;&plus;&space;y^2})-0.5}{[1&plus;0.001&space;\cdot&space;(x^2&space;&plus;&space;y^2)]^2})

with the follow landscape:
<center>
<img align="center" src="https://github.com/altinodantas/jsga/blob/master/assets/img/multimodal.PNG">
 </center>

By considering above information, optimize **function F6** consists of finding values for *x* and *y* that archive the mininal score for *z*, i.e, f(x,y).

## Characteristics
 + Solution is represented as a binary vector with 44 bits, 22 for each variable *x* and *y*;
 + One-point crossover;
 + Bit flip mutation;
 + Parents selection based on a tournament between *k* individuals;
 + Merging population and offspring based on total ranking;
 
## Parameters
The page presents some parameters through which one may notice their impact in the algorithm behavior. Such parameters and their default values are:  
 - *Population size:* **100** 
 - *Mutation rate:* **0.05**
 - *Crossover rate:* **0.80**
 - *Maximal of generations:* **200**
 - *K-tournament:* **3**

#### External libs
  - [jQuery](http://jquery.com) - Help js codification
  - [Plotly](https://plot.ly/javascript) - Plot the graph
  - [Bootstrap](https://getbootstrap.com) - Deal with front page appearance
