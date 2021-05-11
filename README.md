- This image-carousel can be used directly as a library by including the carousel.js file. 
- There's no need to add any CSS by the user as everything is added dynamically using JavaScript.
- The user must create a parent div, a wrapper div inside the parent div and add images inside the wrapper div.
- In order to create a carousel add, 
        var carousel = new Carousel (classname, pixelsToChange, transitionTime)
          
         where, 
          classname refers to the name of the parent div
          pixelToChange refers to the no of pixels to change on each transition between images. The more it's value, the faster the image transitions. 
          transitionTime refers to the time after which the carousel slides automatically. You can leave this field blank if you don't want this effect.
          
- The carousel can be used for any number of images. However, each image must be of the same size.
