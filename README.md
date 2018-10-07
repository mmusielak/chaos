# Chaos and Fractals

Let's say we have three vertices defining a triangle and a point in random location within that triangle. Now let's play a game: pick a random vertex and jump half way towards it. Draw a pixel. Repeat the process.

Soon a pattern will start to emerge.

![Triangle][triangle]
(source: *fractals/triangle.js*)

Awesome, isn't it?

This can be also defined as starting in a point (0, 0) and picking at random one of three affine transformations:

![eq](https://latex.codecogs.com/svg.latex?x=\frac{-b\pm\sqrt{b^2-4ac}}{2a})

{f_1}({\bf{x}}) = \left[ {\begin{array}{*{20}{c}}
   {1/2} & 0  \\
   0 & {1/2}  \\
\end{array}} \right]{\bf{x}}

{f_2}({\bf{x}}) = \left[ {\begin{array}{*{20}{c}}
   {1/2} & 0  \\
   0 & {1/2}  \\
\end{array}} \right]{\bf{x}} + \left[ {\begin{array}{*{20}{c}}
   {1/2}  \\
   0  \\
\end{array}} \right]



## Running

If you want to make any changes you can run `npm install` and `npm start` will initiate a dev server with hot reload. Otherwise you can simply open `index.html` from `dist` folder and use arrow keys to switch between modes.

---

[1] https://en.wikipedia.org/wiki/Chaos_game

[fern]: illustrations/fern.png
[triangle]: illustrations/tri.png

---

This visualization is based on Edward Lorenz's paper called "Predictability: Does the Flap of a Butterfly’s Wings in Brazil set off a Tornado in Texas?" In this, he describes how a small change in the initial conditions for a given system can result in large differences in a later state. This became known as the "butterfly effect".

He was also known for his work on a dynamical system to model atmospheric convection.  The Lorenz system consists of three differential equations:

```math
dx/dt = sigma(y-x),
dy/dt = x(rho-z)-y,
dz/dt = xy - beta*z
```

Of note, Lorenz found that the system exhibited chaotic behavior when **sigma=10**, **rho=28**, and **beta=8/3**, so this uses Three.js to model a solution for this system.

```javascript
var lorenzSystem = function (pos, sigma, rho, beta) {
    var x = sigma * (pos.y - pos.x),
        y = pos.x * (rho - pos.z) - pos.y,
        z = pos.x * pos.y - (beta * pos.z);
    // Returns cartesian coordinates for lorenz system at a point in time
    return new Vector(x, y, z);
};
```

When rho is >= 1, there is a bifurcation, which appears as orbits around two equilibrium points.