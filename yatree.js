


var r = 4,
	rl = 30,
	x, y,
	cx, cy,
	lx = 0, ly = 0,
	a,
	count = 0,
	delay = 40,
	maxNodes = 100,
	branChance = 10,
	midAngle = 180,
	angleRange = 30,
	b_x_right, b_x_left, b_y_down, b_y_up,
	debugMode = false,
	myC, myRed;

var d = r * 2;

var setup = function() {
   createCanvas(windowWidth, windowHeight);
   angleMode(DEGREES);
   frameRate(60);
   blendMode(ADD);
   noLoop();

   // buttons
   var grow = createButton('grow');
   grow.position(20,20);
   var harvest = createButton('harvest');
   harvest.position(80,20);
   var toggle = createButton('toggle foliage');
   toggle.position(160,20);

   grow.mousePressed(reGrow);
   harvest.mousePressed(reSet);
   toggle.mousePressed(toggleDebug);

   // color setup
   background(0);
   myC = color(255, 64);
   myRed = color(255, 0, 0, 64);
   stroke(myC);
   fill(myC);

   // var setup
   x = width / 2;
   y = height / 2;
   ty = height;

   cx = x;
   cy = y;

   b_x_right = width / 2;
   b_x_left = b_x_right * (-1);
   b_y_down = 0;
   b_y_up = height * (-1)

   b_x_right -= 50;
   b_x_left += 50;
   b_y_down -= 50;	
   b_y_up += 50;
}

var draw = function() {
	translate(x, ty);
  	randomPoint(0, -60, midAngle);
}

var randomPoint = function(rx, ry, ra) {

	// borders
	if(rx <= b_x_left || rx >= b_x_right || ry > b_y_down || ry <= b_y_up ){
		// don't render
	}else{
		count++;
		
		var linec = calcNewCoords(rx, ry, rl, ra);
		line(rx, ry, linec.x, linec.y);

		if(getRanGed(1, 10) === 1){
			fill(myRed);
		}else{
			fill(myC);
		}
		ellipse(linec.x, linec.y, d, d);

		if(debugMode){
			text(Math.round(linec.x), linec.x - 20, linec.y);
			text(Math.round(linec.y), linec.x + 10, linec.y);
		}

		if(count < maxNodes){
			window.setTimeout(function(){
				randomPoint(linec.x, linec.y, linec.a);
				if(getRanGed(0, branChance) === 0){
					randomPoint(linec.x, linec.y, linec.a);
				}
			
			}, delay);
		}
	}
}

var calcNewCoords = function(_x, _y, _r, _a){
	var angle = getRanGed(_a - angleRange, _a + angleRange);
	var nx = sin(angle) * _r;
	var ny = cos(angle) * _r;
	return { x: _x + nx, y: _y + ny, a: angle };
}
 
var getRanGed = function(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

var reGrow = function(){
	count = 0;
	redraw();
}

var reSet = function(){
	blendMode(NORMAL);
	background(0);
	blendMode(ADD);
}

var toggleDebug = function(){
	debugMode = !debugMode;
}

var mousePressed = function(){
	if(mouseY > 50){
		reGrow();
	}
}