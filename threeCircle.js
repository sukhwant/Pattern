// Larger Circle center and radius.
var largeCentre = {
	x : 600,
	y : 700,
	radius : 300
},
// smaller Circle center and radius.
smallCentre = {
	x : 600,
	y : 900,
	radius : 100
},
biggestCentre = {
	x : 600,
	y : 500,
	radius : 500
};

function drawPixels(x, y) {

	ctx.fillRect(x, y, 2, 2);
}

var el = document.getElementById('myCanvas');
var ctx = el.getContext('2d');
var myReq;

var btn = document.getElementById('submitBtn');
btn.onclick = function(){submit();};
var clr = document.getElementById('Clear');
clr.onclick = function(){clear();};

var theta = 0,	// Controls the revolution of the smaller circle.
phi = 0,		// Controls the rotation of the smaller circle.
shi = 0;

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
var thetaIncrement,phiIncrement,shiIncrement;

function clear(){
	window.cancelAnimationFrame(myReq);
	ctx.clearRect ( 0 , 0 , el.width, el.height );
}
function submit(){

	window.cancelAnimationFrame(myReq);
	ctx.fillStyle = "rgb("+
	  Math.floor(Math.random()*256)+","+
	  Math.floor(Math.random()*256)+","+
	  Math.floor(Math.random()*256)+")";
	  
	theta = 0;
	phi = 0;
	shi = 0;
	
	largeCentre.radius = document.getElementById('large').value;
	smallCentre.radius = document.getElementById('small').value;
	
	
	var value3 = document.getElementById('currentX').value;
	var value4= document.getElementById('currentY').value;
	
	currentPoint.x = smallCentre.radius - value3;
	currentPoint.y= smallCentre.radius - value4;
	
	shiIncrement = parseFloat(document.getElementById('theta').value);
	
	//thetaIncrement = parseFloat(document.getElementById('theta').value);
	//phiIncrement= parseFloat(document.getElementById('phi').value);
	
	thetaIncrement= biggestCentre.radius*shiIncrement/largeCentre.radius;
	
	phiIncrement= largeCentre.radius*thetaIncrement/smallCentre.radius;
	
	animate();
}

function animate() {

	// Increment theta and phi.
	theta += thetaIncrement;
	phi += phiIncrement;
	shi += shiIncrement;
		
	// Center of smaller circle in the reference frame of larger circle.
	var smallCircleX = (currentCentre.x) * Math.cos(theta);
	var smallCircleY = (currentCentre.y) * Math.sin(theta);

	// Position of pen-point in reference frame of smaller circle.
	var x = currentPoint.x * Math.cos(phi);
	var y = currentPoint.y * Math.sin(phi);

	// Position of pen-point in reference frame of larger circle
	var semi_finalX = smallCircleX + x;
	var semi_finalY = smallCircleY + y;
	
	// Position of large circle centre in biggestcircle.
	var largeX = (biggestCentre.x - largeCentre.x )*Math.cos(shi);
	var largeY = (biggestCentre.y - largeCentre.y )*Math.cos(shi);
	
	var finalX = semi_finalX + largeX;
	var finalY= semi_finalY + largeY;

	// Position of pen-point in the canvas reference frame.
	drawPixels(biggestCentre.x + finalX, biggestCentre.y + finalY);
	
	myReq = requestAnimationFrame(animate);
}
