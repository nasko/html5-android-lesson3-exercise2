var pause = false;
var xCenter = 75;
var xDirection = 'positive';

//init function
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
}

//handle deviceready event
function onDeviceReady() {
    // Now it is safe to start the animation
    window.requestAnimationFrame(draw);
}

//handle pause event
function onPause() {
    pause = true;
}

//handle resume event
function onResume() {
    pause = false;
    window.requestAnimationFrame(draw);
}

//Draw the Sun, the Earth and its orbit
function draw() {
    if (true === pause) {
        return;
    }
    var c = document.getElementById("draw");
    var ctx = c.getContext("2d");

    //Clear the canvas
    ctx.clearRect(0,0,300,300);

    ctx.beginPath();
    ctx.arc(xCenter,75,25,0,Math.PI*2,true); // circle

    // body
    ctx.moveTo(xCenter,100);
    ctx.lineTo(xCenter,175);

    // left leg
    ctx.lineTo((xCenter - 30),225);

    // right leg
    ctx.moveTo(xCenter,175);
    ctx.lineTo((xCenter + 30),225);

    // right hand
    ctx.moveTo(xCenter,130);
    ctx.lineTo((xCenter + 30),150);

    // left hand
    ctx.moveTo(xCenter,130);
    ctx.lineTo((xCenter - 30),150);

    ctx.stroke();

    //Save the entire default state of the canvas
    ctx.save();

    //Move the canvas and its origin x horizontally and y vertically
    //to the center of our drawing area.
    if(270 > xCenter && 'positive' === xDirection) {
        xCenter++;
    } else if(270 == xCenter && 'positive' === xDirection) {
        xCenter--;
        xDirection = 'negative';
    } else if(270 > xCenter && 30 != xCenter && 'negative' === xDirection) {
        xCenter--;
    } else if(30 < xCenter && 'negative' === xDirection) {
        xCenter--;
    } else if(30 == xCenter && 'negative' === xDirection) {
        xCenter++;
        xDirection = 'positive';

    }
    //xCenter += 1;

    //Restore the most recently saved canvas state.
    ctx.restore();

    //Indirect recursion through callback to draw the next frame
    window.requestAnimationFrame(draw);
}