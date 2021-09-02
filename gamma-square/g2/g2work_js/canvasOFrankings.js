var articelCounterId ="articleCounter";
var drawLoop;
var colorOFbackground = '#fefefe', colorOFcell = '#f6f6f6', colorHOVERcell = '#000000', colorOFfont = "#000000";
var fontTypeh3 = "small-caps normal 24px Josefin Sans";
var fontTypeh3R = "normal bold 24px Josefin Sans";
var fontTypeh5 = "italic normal 20px Josefin Sans";
var fontType_p = "14px Josefin Slab";
var marginsH3R = 16, marginsH3 = 16, marginsH5 = 0;
var xmouseOVERcanvas, ymouseOVERcanvas, mouseISpointer;
var urlOFtarget = "#!";
var dataRows = 6;

var lines = [], newlines = [];

var list50title = document.getElementById('listTitle'),
	list50subtitle = document.getElementById('listSubTitle');

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
		startrow = 1;
	}
	startrow = parseInt( startrow );
	nameOFpathTOtextfile = getCookie( cookie_nameOFpathTOtextfile );
    if ( nameOFpathTOtextfile	== "" ) {
		nameOFpathTOtextfile = g2nameOFpathTOtextfile;
	}
}

function loadXMLDoc( pathTOtextfile ) {
	newlines = [];
	setCookie( cookie_nameOFpathTOtextfile, pathTOtextfile );
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			textfile_content = this.responseText;
			newlines = textfile_content.split("\n");
			countertext = newlines.length / dataRows - 1;
				if ( newlines[3].length < 4 ){
					arrow_rt.style.display = "none";
					nameOFpathTOnext = nameOFpathTOtextfile;
				} else {
					arrow_rt.style.display = "block";
					nameOFpathTOnext = newlines[3];
				}
				if ( newlines[5].length < 4 ){
					arrow_lt.style.display = "none";
					nameOfpathTOprevious = nameOFpathTOtextfile;
				} else {
					arrow_lt.style.display = "block";
					nameOfpathTOprevious = newlines[5];
				}
				list50title.innerHTML = newlines[0];
				list50subtitle.innerHTML = newlines[1];
			document.getElementById( articelCounterId ).innerHTML = countertext.toFixed(0);
		}
	};
	xhttp.open("GET", pathTOtextfile , true);
	xhttp.send();
}

var cookie_startcolumn = "g2cookie_rankingcolumn",
	cookie_startrow = "g2cookie_rankingrow",
	cookie_nameOFpathTOtextfile = "g2cookie_nameOFrankingTOtextfile",
	cookie_expires = 30;
var g2nameOFpathTOtextfile = "g2/Top50November2016.btxt";

var startcolumn = 0,
	startrow = 1,
	nameOFpathTOtextfile = g2nameOFpathTOtextfile,
	nameOFpathTOnext = "",
	nameOfpathTOprevious = "";

g2loadCookies();
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
	minimalBoxHeight = 70,
	maximalCanvasWidth = 1148,
	maximalCanvasHeight = 608;
var boxWidth =380, 
	boxHeight = 70, 
	numberOFcolumn = 1, 
	numberOFrow = 50;
var deltaScroll = 1, 
	scroll_shift = 0,
	shiftXOFbox = 0,
	shiftYOFbox = 0;

function getsizeCanvas(){
	widthOFwindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	heightOFwindow = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	if ( widthOFwindow > horizontalLimit0 ){
	width = widthOFwindow - 298;
	height = heightOFwindow -140;
	if ( width > maximalCanvasWidth ){ 
		width = maximalCanvasWidth; 
		}
	} else {
	width = widthOFwindow - 20;
	height = 3504;
	}
	if ( widthOFwindow > horizontalLimit0 ){
		numberOFcolumn = parseInt( width / minimalBoxWidth );
		boxWidth = parseInt( width / numberOFcolumn );
		numberOFrow = parseInt( 50 / numberOFcolumn + .5);
		height = numberOFrow * 70;
	} else {
		if ( width > 480 ){
		boxWidth = 240 + width / 2 ;
		width = boxWidth;
		} else {
		boxWidth = width;
		}
		boxHeight = 70;
		numberOFcolumn = 1;
		numberOFrow = 51;
	}
	c.width = width;
	c.height = height;
}

function isMouseOverBox ( x, y ){
	if (xmouseOVERcanvas > ( x * boxWidth + 4 ) &&
		xmouseOVERcanvas < (( x + 1 ) * boxWidth - 4 ) &&
		ymouseOVERcanvas > ( y * boxHeight + 4 ) &&
		ymouseOVERcanvas < (( y + 1 ) * boxHeight - 4 )){
		urlOFtarget = lines[ dataRows * (y * numberOFcolumn + x + startcolumn + startrow ) + 0 ];
			if ( urlOFtarget.length > 3 ){
				return true;
			}
		}
return false;
}

function setCanvasArrows(){
	if ( widthOFwindow > 800 ){
		arrow_lt.style.left = "auto";
		arrow_rt.style.top = String( 90 ) +"px";
		arrow_rt.style.right = String( 80 ) +"px";
		arrow_lt.style.top = String( 90 ) +"px";
		arrow_lt.style.right = String( 20 + width ) +"px";
	} else {
		arrow_lt.style.right = "auto";
		if ( widthOFwindow < 501 || heightOFwindow < 401 ){
			arrow_rt.style.right = String( 35 ) +"px";
			arrow_lt.style.left = String( 5 ) +"px";
			arrow_rt.style.top = String( 130 ) +"px";
			arrow_lt.style.top = String( 130 ) +"px";
		} else {
			arrow_rt.style.right = String( 45 ) +"px";
			arrow_lt.style.left = String( 15 ) +"px";
			arrow_rt.style.top = String( 185 ) +"px";
			arrow_lt.style.top = String( 185 ) +"px";
		}
	}
	arrow_lt.style.opacity = arrow_ul_opacity;	
	arrow_rt.style.opacity = arrow_dr_opacity;	
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
	ctx.textAlign = "start";      
	if (ctx.measureText(text2write).width > boxWidth - marginsH3 ){
		text2write = text2write.slice( 0, splitText2Width(text2write , marginsH3) + 1 ) + "...";
	}
	ctx.fillText( text2write, x, y );
	ctx.closePath();
}

function writeTexth3R( x, y, text2write ){
	ctx.beginPath();
	ctx.fillStyle = colorOFfont;
	ctx.font = fontTypeh3R;
	ctx.textAlign = "end";      
	ctx.fillText( text2write, x, y );
	ctx.closePath();
}

function writeTexth5( x, y, text2write ){
	ctx.beginPath();
	ctx.fillStyle = colorOFfont;
	ctx.font = fontTypeh5;
	ctx.textAlign = "start";      
	if (ctx.measureText(text2write).width > boxWidth - marginsH5 ){
		text2write = text2write.slice( 0, splitText2Width(text2write , marginsH5)) + "...";
	}
	ctx.fillText( text2write, x, y );
	ctx.closePath();
}

function writeTextBoxes( deltax, deltay  ){
	if ( lines.length == 0){
		return false;
	}
	
var row = 0, column = 0, h3text="", h5text="", year ="";
for ( row = 0; row < numberOFrow; row++ ) { 
		for ( column = 0; column < numberOFcolumn ; column++) { 
		if ( dataRows * ((column + startcolumn) * numberOFrow + row) + dataRows + 1 < lines.length ){
			h3text = String( row * numberOFcolumn + column  + startrow ) + ".";
			h3text += lines[ dataRows * ( row * numberOFcolumn + column + startcolumn  + startrow ) + 1 ];
			year = lines[ dataRows * ( row * numberOFcolumn + column + startcolumn  + startrow ) + 3 ];		
			year = year.slice( 0, 4 );
			h3text += "(" + year + ") ";
			writeTexth3( column * boxWidth + marginsH3 / 4 - deltax, row * boxHeight + 26 + deltay, h3text );
			h5text = lines[ dataRows * ( row * numberOFcolumn + column + startcolumn  + startrow ) + 4 ];
			writeTexth5( column * boxWidth + marginsH5 / 4 - deltax, row * boxHeight + 52 + deltay, h5text );
			h3text = lines[ dataRows * ( row * numberOFcolumn + column + startcolumn  + startrow ) + 5 ];
			writeTexth3R( ( column + 1 ) * boxWidth - marginsH3R - deltax, row * boxHeight + 52 + deltay, h3text );
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
			if ( dataRows * ((column + startcolumn) * numberOFrow + row) + dataRows + 1 < lines.length ){
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
	if ( -boxWidth <= shiftXOFbox ){
			scrollCanvas( shiftXOFbox, 0 );
			scrollLoop = requestAnimFrame( scrollCanvas_r );
		} else {
			lines = newlines;
			drawLoop = requestAnimFrame( drawCanvas );
		}
}

function scrollCanvas_l(){
	shiftXOFbox += scroll_shift;
	scroll_shift += scroll_shift;
	if ( boxWidth >= shiftXOFbox ){
			scrollCanvas( shiftXOFbox, 0 );
			scrollLoop = requestAnimFrame( scrollCanvas_l );
		} else {
			lines = newlines;
			drawLoop = requestAnimFrame( drawCanvas );
		}
}

function drawCanvas(){
	getsizeCanvas();
	setCanvasArrows();
	clearCanvas();
	drawBoxes( 0, 0 );
	writeTextBoxes( 0, 0 );
	if ( lines.length == 0 ){
			lines = newlines;
			drawLoop = requestAnimFrame( drawCanvas );
		}
}

function resizeCanvas(){
	g2loadCookies();
	drawCanvas();
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
		drawLoop = requestAnimFrame( drawCanvas );
	}
}



var arrow_lt = document.getElementById('leftArrow'),
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

	loadXMLDoc( nameOFpathTOnext );
	shiftXOFbox = 0;
	scroll_shift = deltaScroll;
	scrollLoop = requestAnimFrame( scrollCanvas_l );
};  

arrow_lt.onmousedown=function(e){
	var evt=window.event || e // evt.button ->> 1 = left, 2 = right, 4 = middle --  3 = (1+2) for left and right

	loadXMLDoc( nameOfpathTOprevious );
	shiftXOFbox = 0;
	scroll_shift = deltaScroll;
	scrollLoop = requestAnimFrame( scrollCanvas_r );
};  
