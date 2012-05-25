var curColor = "#cb3594",	
	curTool  = "crayon",
	curSize  = "5",
	curText  = "dummy"
	
function setColor(color){
	curColor = color;
}
function setTool(tool) {
	curTool = tool;
}
function setSize(size) {
	curSize = size;
}
function setText(text) {
	curText = text;
}
var coloringApp = (function() {
	
	"use strict";

	var clickColor = new Array();
	var clickSize = new Array();
	var clickTool = new Array();
	var clickText = new Array();
	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();
	var outlineImage = new Image();

	var canvas,
		context,
		paint,
		canvasWidth = 267,
		canvasHeight = 210,
		
		init = function () {
			// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
			canvas = document.createElement('canvas');
			canvas.setAttribute('width', canvasWidth);
			canvas.setAttribute('height', canvasHeight);
			canvas.setAttribute('id', 'canvas');
			document.getElementById('canvasDiv').appendChild(canvas);
			if (typeof G_vmlCanvasManager !== "undefined") {
				canvas = G_vmlCanvasManager.initElement(canvas);
			}
			context = canvas.getContext("2d"); // Grab the 2d canvas context
				
			// onload image loader
			outlineImage.src = 'images/watermelon-duck-outline.png';  
			outlineImage.onload = function(){
				context.drawImage(outlineImage,0,0,canvasWidth,canvasHeight);
			 }
			 
			// Mousedown Event
			$('#canvas').mousedown(function(e){
				if(curTool == "text")
				{	 	var mouseX = e.pageX - this.offsetLeft; // Computing mouse x-axis value
						var mouseY = e.pageY - this.offsetTop; // Computing mouse y-axis value
						
						
						// Set the boolean paint to on
						context.font = "normal " + ((curSize - 1) * 30 / 29 + 10) + "px Verdana";
       					context.fillStyle = curColor;
       					context.fillText($('#text-box').val(), mouseX, mouseY); 
						paint = false;
						//redraw(); // executing redraw function
				}
				else
				{
					var mouseX = e.pageX - this.offsetLeft; // Computing mouse x-axis value
					var mouseY = e.pageY - this.offsetTop; // Computing mouse y-axis value
					
					paint = true; // Set the boolean paint to on
					addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop); 
					redraw(); // executing redraw function
				}
			});
			
			// Mousemove Event
			$('#canvas').mousemove(function(e){
				if(paint){ // if paint value true ( when click and mouse move this function executes )
				addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
				redraw();
			  }
			});
			
			// Mouseup Event
			$('#canvas').mouseup(function(e){
			  paint = false; // Set the boolean paint to off
			});
			
			// Mouseleave Event
			$('#canvas').mouseleave(function(e){
			  paint = false; // Set the boolean paint to off
			});
			
			// Add Click function			
			function addClick(x, y, dragging)
			{
			  clickX.push(x);
			  clickY.push(y);
			  clickDrag.push(dragging);
			  if(curTool == "eraser"){
				clickColor.push("white");
			  }else {
				clickColor.push(curColor);
			  }
			  clickSize.push(curSize);
			  clickText.push(curText)
			}
				
	};

	// Redraw Function
			function redraw(e){
			  canvas.width = canvas.width; // Clears the canvas
      		  context.lineJoin = "round";
			 
			  	
			  for(var i=0; i < clickX.length; i++)
			  {		
				context.beginPath();
				if(clickDrag[i] && i){
				  context.moveTo(clickX[i-1], clickY[i-1]);
				 }else{
				   context.moveTo(clickX[i]-1, clickY[i]);
				 }
				 context.lineTo(clickX[i], clickY[i]);
				 context.closePath();
				 context.strokeStyle = clickColor[i];
				 context.lineWidth = clickSize[i];
				 context.fillText = clickText[i]; 
				 //context.fillText(clickText[i]); 
				 context.stroke();
				
			  }
			  context.restore();
			  
			  //context.globalAlpha = 1;
			  outlineImage.src = "images/watermelon-duck-outline.png";
			  context.drawImage(outlineImage,0, 0, canvasWidth, canvasHeight);
			  
			  
			}
	
	return {
		init: init
	};
}());