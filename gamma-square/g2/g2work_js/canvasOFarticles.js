var drawLoop;
var colorOFbackground = '#fefefe', colorOFcell = '#f6f6f6', colorHOVERcell = '#000000', colorOFfont = "#000000";
var fontTypeh3 = "small-caps normal 20px Josefin Sans";
var fontTypeh5 = "italic normal 12px Josefin Sans";
var fontType_p = "14px Josefin Slab";
var margins_p = 28, marginsH3 = 16, marginsH5 = 28;
var xmouseOVERcanvas, ymouseOVERcanvas, mouseISpointer;

var urlOFtarget = "#!";
var lines = [], newlines = [];
var articelCounterId ="articleCounter";
var counter = 0;

var requestAnimFrame = (function(){
    return  window.requestAnimationFrame   || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(callback, element){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame          	||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame     	||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout
} )();

function setCookie( cookiename , cookievalue ) {
    var date = new Date();
    date.setTime( date.getTime() + ( cookie_expires*24*60*60*1000 ));
    var expires = "expires=" + date.toGMTString();
    document.cookie = cookiename + "=" + cookievalue + "; " + expires;
}

function getCookie( cookiename ) {
   var name = cookiename + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function g2loadCookies() {
	startcolumn = getCookie( cookie_startcolumn );
    if ( startcolumn == "" ) {
		startcolumn = 0;
	}
	startcolumn = parseInt( startcolumn );
	startrow = getCookie( cookie_startrow );
    if ( startrow == "" ) {
		startrow = 0;
	}
	startrow = parseInt( startrow );
	nameOFpathTOtextfile = getCookie( cookie_nameOFpathTOtextfile );
    if ( nameOFpathTOtextfile	== "" ) {
		nameOFpathTOtextfile = g2nameOFpathTOtextfile;
	}
}

function loadXMLDoc( pathTOtextfile ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      textfile_content = this.responseText;
	  newlines = textfile_content.split("\n");
	  counter = parseInt(newlines.length / 5 );
	  document.getElementById( articelCounterId ).innerHTML = counter;
    }
  };
  xhttp.open("GET", pathTOtextfile , true);
  xhttp.send();
}

var cookie_startcolumn = "g2cookie_startcolumn",
	cookie_startrow = "g2cookie_startrow",
	cookie_nameOFpathTOtextfile = "g2cookie_nameOFpathTOtextfile",
	cookie_expires = 30;
var g2nameOFpathTOtextfile = "g2/articles_info.btxt";

var	startcolumn = "",
	startrow = "",
	nameOFpathTOtextfile = g2nameOFpathTOtextfile;

g2loadCookies();
//	alert( startcolumn + " , " + startrow );
loadXMLDoc(nameOFpathTOtextfile);



var c = document.getElementById('myArticles'), 
	ctx = c.getContext('2d');

var widthOFwindow, heightOFwindow;
var width, height;

var verticalLimit3to4 = 692,
	horizontalLimit0 = 800,
	horizontalLimit1to2 = 1024,
	horizontalLimit2to3 = 1344;
var minimalBoxWidth = 380,
	minimalBoxHeight = 120,
	maximalCanvasWidth = 1148,
	maximalCanvasHeight = 608;
var boxWidth =280, 
	boxHeight = 160, 
	numberOFcolumn = 1, 
	numberOFrow = 8;
var deltaScroll = 1, 
	scroll_shift,
	shiftXOFbox = 0,
	shiftYOFbox = 0;

function getsizeCanvas(){
	widthOFwindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	heightOFwindow = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	if ( widthOFwindow > horizontalLimit0 ){
	width = widthOFwindow - 300;
	height = heightOFwindow -140;
	if ( width > maximalCanvasWidth ){ width = maximalCanvasWidth; }
	if ( height > maximalCanvasHeight ){ height = maximalCanvasHeight; }
	} else {
	width = widthOFwindow - 70;
	height = 1280;
	}
	c.width = width;
	c.height = height;
	if ( widthOFwindow > horizontalLimit0 ){
		numberOFcolumn = parseInt( width / minimalBoxWidth );
		boxWidth = parseInt( width / numberOFcolumn );
		numberOFrow = parseInt( height / minimalBoxHeight );
		boxHeight = parseInt( height / numberOFrow );
	} else {
		boxWidth = width;
		boxHeight = 160;
		numberOFcolumn = 1;
		numberOFrow = 8;
		}

	if ( startrow < 0 ){
		startrow = 0;
	}
	if ( startcolumn < 0 ){
		startcolumn = 0;
	}
}

function isMouseOverBox ( x, y ){
	if (xmouseOVERcanvas > ( x * boxWidth + 4 ) &&
		xmouseOVERcanvas < (( x + 1 ) * boxWidth - 4 ) &&
		ymouseOVERcanvas > ( y * boxHeight + 4 ) &&
		ymouseOVERcanvas < (( y + 1 ) * boxHeight - 4 )){
		urlOFtarget = lines[ 5 * ((x + startcolumn) * numberOFrow + y + startrow ) + 4];
			if ( urlOFtarget.length > 3 ){
				return true;
			}
		}
return false;
}

function setCanvasArrows(){
	if ( widthOFwindow > 800 ){
		arrow_up.style.top = String( 77 ) +"px";
		arrow_dn.style.top = String( 105 + height ) +"px";
		arrow_rt.style.top = String( 55 + parseInt ( height / 2 ) ) +"px";
		arrow_lt.style.top = String( 55 + parseInt ( height / 2 ) ) +"px";
			arrow_up.style.right = String( 75 + parseInt ( width / 2 ) ) +"px";
			arrow_dn.style.right = String( 75 + parseInt ( width / 2 ) ) +"px";
			arrow_rt.style.right = String( 35 ) +"px";
			arrow_lt.style.right = String( 63 + width ) +"px";
	} else {
		arrow_up.style.right = String( 50 + parseInt ( width / 2 ) ) +"px";
		arrow_dn.style.right = String( 50 + parseInt ( width / 2 ) ) +"px";
		arrow_rt.style.right = String( 25 ) +"px";
		arrow_lt.style.right = String( 53 + width ) +"px";
		if ( widthOFwindow < 501 || heightOFwindow < 401 ){
		arrow_up.style.top = String( 109 ) +"px";
		arrow_dn.style.top = String( 133 + height ) +"px";
		arrow_rt.style.top = String( 87 + parseInt ( height / 2 ) ) +"px";
		arrow_lt.style.top = String( 87 + parseInt ( height / 2 ) ) +"px";
		} else {
		arrow_up.style.top = String( 162 ) +"px";
		arrow_dn.style.top = String( 190 + height ) +"px";
		arrow_rt.style.top = String( 140 + parseInt ( height / 2 ) ) +"px";
		arrow_lt.style.top = String( 140 + parseInt ( height / 2 ) ) +"px";
		}
	}
	if ( startcolumn + startrow == 0 ){
		arrow_up.style.display = "none";
		arrow_lt.style.display = "none";
	} else {
		if ( widthOFwindow > 800 ){
		arrow_up.style.display = "none";
		arrow_lt.style.display = "block";
		arrow_lt.style.opacity = arrow_ul_opacity;	
		} else {
		arrow_up.style.display = "block";
		arrow_up.style.opacity = arrow_ul_opacity;	
		arrow_lt.style.display = "none";
		}
	}
	if ( ( (startcolumn + numberOFcolumn) * numberOFrow + startrow ) * 5 >= lines.length -1 ){
		arrow_dn.style.display = "none";
		arrow_rt.style.display = "none";
	} else {
		if ( widthOFwindow > 800 ){
		arrow_dn.style.display = "none";
		arrow_rt.style.display = "block";
		arrow_rt.style.opacity = arrow_dr_opacity;	
		} else {
		arrow_dn.style.display = "block";
		arrow_dn.style.opacity = arrow_dr_opacity;	
		arrow_rt.style.display = "none";
		}
	}
}

function splitText2Width( text2split , margin ){
	var lastCharacter = text2split.length - 2;
	while (ctx.measureText(text2split).width > boxWidth - margin ){
		while ( text2split[lastCharacter] !== " " ) {
			lastCharacter--;
		}
		text2split = text2split.slice( 0, lastCharacter );
	}

return lastCharacter;
}

function writeTexth3( x, y, text2write ){
	ctx.beginPath();
	ctx.fillStyle = colorOFfont;
	ctx.font = fontTypeh3;
	if (ctx.measureText(text2write).width > boxWidth - marginsH3 ){
		text2write = text2write.slice( 0, splitText2Width(text2write , marginsH3) + 1 ) + "...";
	}
	ctx.fillText( text2write, x, y );
	ctx.closePath();
}

function writeTexth5( x, y, text2write ){
	ctx.beginPath();
	ctx.fillStyle = colorOFfont;
	ctx.font = fontTypeh5;
	if (ctx.measureText(text2write).width > boxWidth - marginsH5 ){
		text2write = text2write.slice( 0, splitText2Width(text2write , marginsH5)) + "...";
	}
	ctx.fillText( text2write, x, y );
	ctx.closePath();
}

function writeText_p( x, y, text2write ){
	var w, row, sliceAtCharacter, slicedString = [], words = [], wordsLength = 0, space, spaceSumme, spaceExtra;
	ctx.beginPath();
	ctx.fillStyle = colorOFfont;
	ctx.font = fontType_p;
	while (ctx.measureText(text2write).width > boxWidth - margins_p ){
		sliceAtCharacter = splitText2Width(text2write , margins_p);
		slicedString.push( text2write.slice( 0, sliceAtCharacter ));
		text2write = text2write.slice( sliceAtCharacter + 1 );
	}
	for ( row = 0; row < slicedString.length ; row++){
		words = slicedString[row].split(" ");
		wordsLength = 0;
		for ( w = 0; w < words.length; w++){
			wordsLength += ctx.measureText(words[w]).width;
		}
		spaceSumme = boxWidth - margins_p - wordsLength;
		space = parseInt( spaceSumme / ( words.length - 1 ));
		
		spaceExtra = boxWidth - wordsLength - margins_p - space * ( words.length - 1 );

		var xx = x;
		for ( w = 0; w < words.length; w++){
			ctx.fillText( words[w], xx, y );

			if ( spaceExtra > 0 ){
				spaceExtra--;
				xx++;
			}
			if ( spaceExtra < 0 ){
				spaceExtra++;
				xx--;
			}
			xx += ctx.measureText(words[w]).width;
			xx += space;
		}
	y = y + 16;
	}
	ctx.fillText( text2write, x, y );
	ctx.closePath();
}

function writeTextBoxes( deltax, deltay  ){
	if ( lines.length == 0){
		return false;
	}
	
var row = 0, column = 0;
for ( column = 0; column < numberOFcolumn; column++ ) { 
		for ( row = 0; row < numberOFrow; row++) { 
		if ( 5 * ((column + startcolumn) * numberOFrow + row + startrow) + 5 < lines.length ){
			writeTexth5( column * boxWidth + marginsH5 / 4  - deltax, row * boxHeight + 20 + deltay, lines[ 5 * (( column + startcolumn ) * numberOFrow + row + startrow ) + 1 ] );
			writeTexth3( column * boxWidth + marginsH3 / 4  - deltax, row * boxHeight + 44 + deltay, lines[ 5 * (( column + startcolumn ) * numberOFrow + row + startrow ) + 2 ] );
			writeText_p( column * boxWidth + margins_p / 4  - deltax, row * boxHeight + 66 + deltay, lines[ 5 * (( column + startcolumn ) * numberOFrow + row + startrow ) + 3 ] );
			}
		}
	}
}

function fillBox( fillColor, x1, y1, w, h ){
	ctx.fillStyle = fillColor;
	ctx.beginPath();
	ctx.rect( x1, y1, w, h);
	ctx.closePath();
	ctx.fill();
}

function drawBox( strokeColor, x1, y1, w, h ){
	ctx.strokeStyle = strokeColor;
	ctx.beginPath();
	ctx.rect( x1, y1, w, h);
	ctx.closePath();
	ctx.stroke();
}

function clearCanvas(){
	fillBox( colorOFbackground, 0, 0, width, height );
}

function drawBoxes( deltax, deltay ){
var row = 0, column = 0, color = "", is;
mouseISpointer = false;
urlOFtarget = "#!";
for ( column = 0; column < numberOFcolumn; column++ ) { 
		for ( row = 0; row < numberOFrow; row++) { 
			if ( 5 * ((column + startcolumn) * numberOFrow + row + startrow) + 5 < lines.length ){
				if ( is = isMouseOverBox ( column, row ) ){
					color = colorHOVERcell;
				}else{
					color = colorOFcell;
				}
				mouseISpointer = mouseISpointer || is;
				drawBox( 	color,
							column * boxWidth + 2 - deltax, row * boxHeight + 2 - deltay, 
							boxWidth - 3, boxHeight - 3  );
			}
		}
	}
}

function scrollCanvas( dx, dy ){
	getsizeCanvas();
	setCanvasArrows();
	clearCanvas();
	drawBoxes( dx, dy );
	writeTextBoxes( dx, dy );
}

function scrollCanvas_r(){
	shiftXOFbox -= scroll_shift;
	scroll_shift += scroll_shift;
	if ( shiftXOFbox >= -boxWidth ){
			scrollCanvas( shiftXOFbox, 0 );
			scrollLoop = requestAnimFrame( scrollCanvas_r );
		} else {
			startcolumn--;
			setCookie( cookie_startcolumn, startcolumn );
			drawLoop = requestAnimFrame( drawCanvas );
		}
}

function scrollCanvas_l(){
	shiftXOFbox += scroll_shift;
	scroll_shift += scroll_shift;
	if ( shiftXOFbox <= boxWidth ){
			scrollCanvas( shiftXOFbox, 0 );
			scrollLoop = requestAnimFrame( scrollCanvas_l );
		} else {
			startcolumn++;
			setCookie( cookie_startcolumn, startcolumn );
			drawLoop = requestAnimFrame( drawCanvas );
		}
}

function scrollCanvas_d(){
	shiftYOFbox -= scroll_shift;
	scroll_shift += scroll_shift / 2;
	if ( shiftYOFbox >= -boxHeight ){
			scrollCanvas( 0, shiftYOFbox );
			scrollLoop = requestAnimFrame( scrollCanvas_d );
		} else {
			startrow++;
			setCookie( cookie_startrow, startrow );
			drawLoop = requestAnimFrame( drawCanvas );
		}
}

function scrollCanvas_u(){
	shiftYOFbox += scroll_shift / 2;
	scroll_shift += scroll_shift;
	if ( shiftYOFbox <= boxHeight ){
			scrollCanvas( 0, shiftYOFbox );
			scrollLoop = requestAnimFrame( scrollCanvas_u );
		} else {
			startrow--;
			setCookie( cookie_startrow, startrow );
			drawLoop = requestAnimFrame( drawCanvas );
		}
}

function drawCanvas(){
	getsizeCanvas();
	setCanvasArrows();
	clearCanvas();
	drawBoxes( 0, 0 );
	writeTextBoxes( 0, 0 );
}

function resizeCanvas(){
	g2loadCookies();
	getsizeCanvas();
	if ( widthOFwindow > horizontalLimit0 ){
		if ( startrow > 0 ){
			startcolumn = parseInt( startrow / numberOFrow );
			startrow = 0;
			setCookie( cookie_startrow, startrow );
			setCookie( cookie_startcolumn, startcolumn );
		}
		if ( (numberOFcolumn + startcolumn) * numberOFrow > counter ){
			startcolumn = counter / numberOFrow - numberOFcolumn;
			setCookie( cookie_startcolumn, startcolumn );
		}
	} else {
		if ( startcolumn > 0 ) {
			startrow = startcolumn*numberOFrow;
			if ( startrow > counter - 8 ){
				startrow = counter - 8;
			}
			startcolumn = 0;
			setCookie( cookie_startrow, startrow );
			setCookie( cookie_startcolumn, startcolumn );
		}
	}
	setCanvasArrows();
	clearCanvas();
	drawBoxes( 0, 0 );
	writeTextBoxes( 0, 0 );
}



var fontISready = false;

function startCanvas(){
	drawCanvas();
	fontISready = document.fonts.check('1em Josefin Sans');
		if ( lines.length == 0 ){
			lines = newlines;
		}
	if( !fontISready ){
		drawLoop = requestAnimFrame( startCanvas );
	} else {
		if ( lines.length == 0 ){
		drawLoop = requestAnimFrame( startCanvas );
		} else {
		drawLoop = requestAnimFrame( drawCanvas );
		}
	}
}



var arrow_up = document.getElementById('upArrow'),
	arrow_dn = document.getElementById('downArrow'),
	arrow_lt = document.getElementById('leftArrow'),
	arrow_rt = document.getElementById('rightArrow'),
	arrow_ul_opacity = 0.25,
	arrow_dr_opacity = 0.25;
var wrapperElement = document.getElementById('wrapper');



startCanvas();

window.addEventListener("resize", resizeCanvas);
	
	
	
document.onmousemove = function(e){
	if (e.pageX || e.pageY) { 
		xmouseOVERcanvas = e.pageX;
		ymouseOVERcanvas = e.pageY;
		}else { 
		xmouseOVERcanvas = e.clientX + document.body.scrollLeft + document.c.scrollLeft; 
		ymouseOVERcanvas = e.clientY + document.body.scrollTop + document.c.scrollTop; 
		} 
	xmouseOVERcanvas -= (c.offsetLeft + wrapperElement.offsetLeft + document.body.offsetLeft);
	ymouseOVERcanvas -= (c.offsetTop + wrapperElement.offsetTop +document.body.offsetTop);
	if ( mouseISpointer ){
		c.style.cursor = "pointer";
	} else {
		c.style.cursor = "default";
	}
	
if ( widthOFwindow > 800 ){	
	if ( xmouseOVERcanvas < 210){
		arrow_ul_opacity = 1 - xmouseOVERcanvas / 280;
		arrow_dr_opacity = 0.25;
	} else if( xmouseOVERcanvas > width - 210 ){
		arrow_dr_opacity = 1 - (width - xmouseOVERcanvas) / 280;
		arrow_ul_opacity = 0.25;
	} else {
		arrow_ul_opacity = 0.25;
		arrow_dr_opacity = 0.25;
	}
} else {
	if ( ymouseOVERcanvas < 210){
		arrow_ul_opacity = 1 - ymouseOVERcanvas / 280;
		arrow_dr_opacity = 0.25;
	} else if( ymouseOVERcanvas > height - 210 ){
		arrow_dr_opacity = 1 - (height - ymouseOVERcanvas) / 280;
		arrow_ul_opacity = 0.25;
	} else {
		arrow_ul_opacity = 0.25;
		arrow_dr_opacity = 0.25;
	}
}

drawCanvas();
} 

c.onmousedown=function(e){
	var evt=window.event || e // evt.button ->> 1 = left, 2 = right, 4 = middle --  3 = (1+2) for left and right
	// alert ( urlOFtarget );
    if ( mouseISpointer && urlOFtarget !== "#!" ){
		window.location.href = urlOFtarget;
	}
};  

arrow_rt.onmousedown=function(e){
	var evt=window.event || e // evt.button ->> 1 = left, 2 = right, 4 = middle --  3 = (1+2) for left and right

	shiftXOFbox = 0;
	scroll_shift = deltaScroll;
	scrollLoop = requestAnimFrame( scrollCanvas_l );
};  

arrow_lt.onmousedown=function(e){
	var evt=window.event || e // evt.button ->> 1 = left, 2 = right, 4 = middle --  3 = (1+2) for left and right

	shiftXOFbox = 0;
	scroll_shift = deltaScroll;
	scrollLoop = requestAnimFrame( scrollCanvas_r );
};  

arrow_dn.onmousedown=function(e){
	var evt=window.event || e // evt.button ->> 1 = left, 2 = right, 4 = middle --  3 = (1+2) for left and right

	shiftYOFbox = 0;
	scroll_shift = deltaScroll;
	scrollLoop = requestAnimFrame( scrollCanvas_d );
};  

arrow_up.onmousedown=function(e){
	var evt=window.event || e // evt.button ->> 1 = left, 2 = right, 4 = middle --  3 = (1+2) for left and right

	shiftYOFbox = 0;
	scroll_shift = deltaScroll;
	scrollLoop = requestAnimFrame( scrollCanvas_u );
};  

