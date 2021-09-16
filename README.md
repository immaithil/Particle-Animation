# Particle-Animation
This is a miniproject submitted during the 6 month training program in Newton School. It's hosting link is https://codepen.io/immaithil/full/VwWyZxV

Enter your first name in the box and then click on submit button. The particles will print your name and then move your mouse to see the magic.
Click on back button to try another name.

This is a particle animation written purely with help of JavaScript, HTML and CSS. No framework is used in this project.

Project- Details
The first file is index.html which contains the link of js and css file and an element Canvas is initialized inside it.

The second file is Style.css which contains basic css property of body and Canvas element.

The third file is script.js which has all the code related to animation of particle.



Animation-Code in JS
At first I have created a canvas variable and initiated an array for particles .

I have created an object named mouse which contains coordinates of mouse and its radius.

Then an event 'mousemove' is added to the code to inspect the coordinates of the mouse while it is moving.

Then Text 'ASHISH' is created by context property of the canvas.

Variable TextCoordinates is intiated as an array which contains all the data about pixels of the text inside it which I used later in assigning the correct position to particles as text.

Then I created a class for particles and a constructor inside it with parameters x and y as its position and giving other properties to it. Then a method draw is created inside this class to draw the particles using canvas properties like fillStyle, arc and fill etc. An another method update is defined inside it to update the position of particles when mouse will move close or go away from the corresponding particle. Inside method Update() I calculated distence between curosor and postion of a particle with help of pythagorus thoream and named this variable as distence. I have created another variable forceDirection to get distence ratio of moving particle form cursor so that I can apply physics on it. Then variable direction is created to update the particle speed according to there distence inside mouse radius. Then conditional statement if and else is used to move to particle at there correspoding speed when mouse moves near them.

Then outside the class function init() defined to fill the text pixels with particles. The array particleArray is filled with object of class particle usinig the data provided by textCoordinate array.

Then init() is called and under this we created a recursive function animate() calls draw and update method of each particle and render it on our webpage using canvas element.

And then I called animate function which rendered all the particle to its respective position by rendering the pixel of text provided via canvas.filltext property and then move ur mouse to see the magic.
