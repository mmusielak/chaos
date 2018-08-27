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
