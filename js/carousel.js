function Carousel(className, pixelOffset, transitionDelay) {
  this.className = className;
  this.pixelOffset = pixelOffset;
  this.transitionDelay = transitionDelay;

  this.currentImageIndex = 0;
  this.currentMarginLeft = 0;
  this.targetMarginLeft = 0;

  this.carouselElement = document.querySelector('.' + this.className);
  this.carouselWrapperElement = this.carouselElement.querySelector('.carousel-wrapper');
  this.imageList = this.carouselElement.querySelectorAll('img');
  this.totalImages = this.imageList.length;
  this.imageWidth = this.imageList[0].width;
  this.imageHeight = this.imageList[0].height;

  //Layout and styling of carousel div
  this.carouselElement.style.display = "inline-block";
  this.carouselElement.style.width = this.imageWidth + 'px';
  this.carouselElement.style.height = this.imageHeight + 'px';
  this.carouselElement.style.position = 'relative';
  this.carouselElement.style.overflow = 'hidden';


  // Layout and styling of carousel-wrapper
  this.carouselWrapperElement.style.height = this.imageHeight + 'px';
  this.carouselWrapperElement.style.position = 'relative';
  this.carouselWrapperElement.style.overflow = 'hidden';

  // Layout of each image
  this.imageList.forEach(
    function (element, index) {
      element.style.position = 'absolute';
      element.style.float = 'left';
      element.style.top = '0px';
      element.style.left = index * this.imageWidth + 'px';
    }.bind(this)
  );

  // Layout of a div that wraps all the dots
  this.dotWrapper = document.createElement('div');
  this.dotWrapper.style.position = "absolute";
  this.dotWrapper.style.left = "42%";
  this.dotWrapper.style.bottom = "5%";
  this.dotWrapper.setAttribute("class", "clearfix")
  this.carouselElement.append(this.dotWrapper);

  //Styling of each dot
  this.imageList.forEach(function (element, index) {
    this.dot = document.createElement("div");
    this.dot.style.float = "left";
    this.dot.style.margin = "0px 10px";
    this.dot.style.width = "15px";
    this.dot.style.height = "15px";
    this.dot.style.borderRadius = "50%";
    this.dot.style.backgroundColor = "white";
    (index === this.currentImageIndex) ? this.dot.style.opacity = 1.0 : this.dot.style.opacity = 0.6;
    this.dot.setAttribute("class", "dots");

    this.dotWrapper.append(this.dot);
  }.bind(this));

  this.dots = this.carouselElement.querySelectorAll(".dots");


  //Layout and events of left arrow
  this.leftArrow = document.createElement('img');
  this.leftArrow.src = './images/left.png';
  this.leftArrow.style.position = 'absolute';
  this.leftArrow.style.height = '15%';
  this.leftArrow.style.top = '45%';
  this.leftArrow.style.opacity = '0.6';
  this.leftArrow.onmouseover = function (e) {
    e.target.style.opacity = '1.0';
  };
  this.leftArrow.onmouseout = function (e) {
    e.target.style.opacity = '0.6';
  };

  this.leftArrow.addEventListener('click', function () {
    this.leftArrowClick();
  }.bind(this));


  //Triggered by click of left arrow
  this.leftArrowClick = function () {
    if (this.currentImageIndex == 0) {
      this.targetMarginLeft = -this.imageWidth * (this.totalImages - 1);
    }
    else {
      this.targetMarginLeft += this.imageWidth;
    }
    this.dots[this.currentImageIndex].style.opacity = 0.6;
    this.leftInterval = setInterval(this.animateLeft, 10)
  }.bind(this);


  //The below function runs on a defined interval after left arrow is clicked to show transition effect
  this.animateLeft = function (noOfMoves = 1) {
    if (this.currentImageIndex == 0) {
      this.currentMarginLeft -= this.pixelOffset * this.totalImages;
      if (this.currentMarginLeft <= this.targetMarginLeft) {
        this.currentMarginLeft = this.targetMarginLeft;
        this.currentImageIndex = this.totalImages - 1;
        this.dots[this.currentImageIndex].style.opacity = 1.0;
        clearInterval(this.leftInterval);
      }
    }
    else {
      this.currentMarginLeft += this.pixelOffset * noOfMoves;
      if (this.currentMarginLeft >= this.targetMarginLeft) {
        clearInterval(this.leftInterval);
        this.currentMarginLeft = this.targetMarginLeft;
        this.currentImageIndex -= noOfMoves;
        this.dots[this.currentImageIndex].style.opacity = 1.0;
        clearInterval(this.leftInterval);
      }
    }
    this.carouselWrapperElement.style.marginLeft = this.currentMarginLeft + "px";

  }.bind(this)

  this.carouselElement.append(this.leftArrow);


  //Layout and styling of right arrow
  this.rightArrow = document.createElement('img');
  this.rightArrow.src = './images/right.png';
  this.rightArrow.style.position = 'absolute';
  this.rightArrow.style.height = '15%';
  this.rightArrow.style.top = '45%';
  this.rightArrow.style.right = 0;
  this.rightArrow.style.opacity = '0.6';
  this.rightArrow.onmouseover = function (e) {
    e.target.style.opacity = '1.0';
  };
  this.rightArrow.onmouseout = function (e) {
    e.target.style.opacity = '0.6';
  };

  this.rightArrow.addEventListener('click', function () {
    this.rightArrowClick();
  }.bind(this));


  //Triggered by click of right arrow
  this.rightArrowClick = function () {
    if (this.currentImageIndex == this.totalImages - 1) {
      this.targetMarginLeft = 0;
    }
    else {
      this.targetMarginLeft -= this.imageWidth;
    }
    this.dots[this.currentImageIndex].style.opacity = 0.6;
    this.rightInterval = setInterval(this.animateRight, 10)
  };

  //The below function runs on a defined interval after right arrow is clicked to show transition effect
  this.animateRight = function (noOfMoves = 1) {
    if (this.currentImageIndex == this.totalImages - 1) {
      this.currentMarginLeft += this.pixelOffset * this.totalImages;
      if (this.currentMarginLeft >= this.targetMarginLeft) {
        this.currentMarginLeft = this.targetMarginLeft;
        this.currentImageIndex = 0;
        this.dots[this.currentImageIndex].style.opacity = 1.0;
        clearInterval(this.rightInterval);
      }
    }

    else {
      this.currentMarginLeft -= this.pixelOffset * noOfMoves;
      if (this.currentMarginLeft <= this.targetMarginLeft) {
        this.currentMarginLeft = this.targetMarginLeft;
        this.currentImageIndex += noOfMoves;
        //console.log(this.currentImageIndex);
        this.dots[this.currentImageIndex].style.opacity = 1.0;
        clearInterval(this.rightInterval);
      }
    }

    this.carouselWrapperElement.style.marginLeft = this.currentMarginLeft + 'px';


  }.bind(this)

  this.carouselElement.append(this.rightArrow);


  this.dots.forEach(function (dot, index) {
    dot.addEventListener("click", function (e) {
      this.dots[this.currentImageIndex].style.opacity = 0.6;
      let noOfMoves = Math.abs(index - this.currentImageIndex);
      let distanceToMove = noOfMoves * this.imageWidth;
      // this.targetMarginLeft = this.imageList[index].left;
      // let distanceToMove = Math.abs(this.targetMarginLeft - this.currentMarginLeft)
      if (index > this.currentImageIndex) {
        this.targetMarginLeft = this.currentMarginLeft - distanceToMove;
        this.rightInterval = setInterval(() => this.animateRight(noOfMoves), 10)
      }
      else {
        this.targetMarginLeft = this.currentMarginLeft + distanceToMove;
        this.leftInterval = setInterval(() => this.animateLeft(noOfMoves), 10)
      }

      e.target.style.opacity = 1.0;
    }.bind(this))

  }.bind(this))


  //Transitions occur automatically after defined interval
  this.autoTransition = function () {
    this.rightArrowClick();
  }.bind(this);

  if (this.transitionDelay !== undefined) {
    setInterval(this.autoTransition, this.transitionDelay)
  }

}
