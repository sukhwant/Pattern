// Larger Circle center and radius.
var largeCentre = {
	x : 600,
	y : 500,
	radius : 400
},
// smaller Circle center and radius.
smallCentre = {
	x : 600,
	y : 840,
	radius : 100
};

var el = document.getElementById('myCanvas');
var ctx = el.getContext('2d');
var myReq;
var factor = 8;
var colors = ['#ff0000','#00ff00','#0000ff','#000000', '#DC143C','#00008B','#FF00FF','#008000', '#66CDAA','#0000CD','#FF4500','#FFA500','#800080','#FFFF00'];

var btn = document.getElementById('submitBtn');
btn.onclick = function(){submit();};
var clr = document.getElementById('Clear');
clr.onclick = function(){clear();};
var stop = document.getElementById('Stop');
stop.onclick = function(){onStop();};
var resume = document.getElementById('Resume');
resume.onclick = function(){onResume();};

var theta = 0,	// Controls the revolution of the smaller circle.
phi = 0;		// Controls the rotation of the smaller circle.
var oldX=0,oldY=0;

// Holds the current center of smaller circle.
var currentCentre = {
	x : largeCentre.radius - smallCentre.radius,
	y : largeCentre.radius - smallCentre.radius
},
// Holds the pen-point's coordinate.
currentPoint = {
	x : smallCentre.radius,
	y : smallCentre.radius
}
var thetaIncrement,phiIncrement;

function clear(){
	window.cancelAnimationFrame(myReq);
	ctx.clearRect ( 0 , 0 , el.width, el.height );
}
function onStop(){
	window.cancelAnimationFrame(myReq);
}
function onResume(){
	myReq = requestAnimationFrame(animate);
}
function submit(){

	window.cancelAnimationFrame(myReq);
	  
	var curr = Math.floor(Math.random()*colors.length);
	ctx.strokeStyle = colors[curr];
	  
	theta = 0;
	phi = 0;
	
	largeCentre.radius = document.getElementById('large').value;
	smallCentre.radius = document.getElementById('small').value;
	
	currentCentre.x = largeCentre.radius - smallCentre.radius;
	currentCentre.y = largeCentre.radius - smallCentre.radius;
	
	
	var value3 = document.getElementById('currentX').value;
	var value4= document.getElementById('currentY').value;
	
	currentPoint.x = smallCentre.radius - value3;
	currentPoint.y= smallCentre.radius - value4;
	
	thetaIncrement= parseFloat(document.getElementById('theta').value);
	factor= parseFloat(document.getElementById('factor').value);
	phiIncrement=factor*largeCentre.radius*thetaIncrement/smallCentre.radius;
	
	// Old x and old y.
	oldX = currentCentre.x  + currentPoint.x + largeCentre.x;
	oldY = largeCentre.y;
	
	animate();
}

function animate() {
		
	// Center of smaller circle in the reference frame of larger circle.
	var smallCircleX = (currentCentre.x) * Math.cos(theta);
	var smallCircleY = (currentCentre.y) * Math.sin(theta);

	// Position of pen-point in reference frame of smaller circle.
	var x = currentPoint.x * Math.cos(phi);
	var y = currentPoint.y * Math.sin(phi);

	// Position of pen-point in reference frame of larger circle
	var finalX = smallCircleX + x;
	var finalY = smallCircleY + y;

	// Position of pen-point in the canvas reference frame.
	//drawPixels(largeCentre.x + finalX, largeCentre.y + finalY);
	
	ctx.beginPath();
	ctx.moveTo(oldX,oldY);
	ctx.lineTo(largeCentre.x + finalX,largeCentre.y + finalY);
	ctx.stroke();

	// Update oldX and oldY.
	oldX = largeCentre.x + finalX;
	oldY = largeCentre.y + finalY;
	
	// Increment theta and phi.
	theta += thetaIncrement;
	phi += phiIncrement;
	myReq = requestAnimationFrame(animate);
}
