var imageURLv = [	"g2/g2art_img/2016/Review_Hearthstone_400X800.png",
					"g2/g2art_img/2016/Review_Dark%20Souls_400X400.png",
					"g2/g2art_img/2016/Review_Bioshock_400X400.png",
					"g2/g2art_img/2016/Review_Half%20Life%202_400X800.png",
					"g2/g2art_img/2016/Review_SimCity%202000_400X800.png",
					"g2/g2art_img/2016/Review_Warcraft%202_400X400.png"
					];			
var imageURLh = [	"g2/g2art_img/2016/Review_Hearthstone_400X400.png",
					"g2/g2art_img/2016/Review_Dark%20Souls_400X200.png",
					"g2/g2art_img/2016//Review_Bioshock_400X200.png",
					"g2/g2art_img/2016/Review_Half%20Life%202_400X400.png",
					"g2/g2art_img/2016/Review_SimCity%202000_400X400.png",
					"g2/g2art_img/2016//Review_Warcraft%202_400X200.png"
					];

function setHOMEimages(){
	document.getElementById("articleItemImg01h").setAttribute("src", imageURLh[0] );
	document.getElementById("articleItemImg01v").setAttribute("src", imageURLv[0] );
	document.getElementById("articleItemImg02h").setAttribute("src", imageURLh[1] );
	document.getElementById("articleItemImg02v").setAttribute("src", imageURLv[1] );
	document.getElementById("articleItemImg03h").setAttribute("src", imageURLh[2] );
	document.getElementById("articleItemImg03v").setAttribute("src", imageURLv[2] );
	document.getElementById("articleItemImg04h").setAttribute("src", imageURLh[3] );
	document.getElementById("articleItemImg04v").setAttribute("src", imageURLv[3] );
	document.getElementById("articleItemImg05h").setAttribute("src", imageURLh[4] );
	document.getElementById("articleItemImg05v").setAttribute("src", imageURLv[4] );
	document.getElementById("articleItemImg06h").setAttribute("src", imageURLh[5] );
	document.getElementById("articleItemImg06v").setAttribute("src", imageURLv[5] );
}

var targetURL = [	"g2/g2art_reviews/Review%20-%20Hearthstone%20-%20Heroes%20of%20Warcraft.html",
					"g2/g2art_reviews/Review%20-%20Dark%20Souls.html",
					"g2/g2art_reviews/Review%20-%20Bioshock.html",
					"g2/g2art_reviews/Review%20-%20Half%20Life%202.html",
					"g2/g2art_reviews/Review%20-%20Simcity%202000.html",
					"g2/g2art_reviews/Review%20-%20Warcraft%202%20-%20Tides%20of%20darkness.html"
					];

function setURLs(){
	document.getElementById("articleitem01").href= targetURL[0]; 
	document.getElementById("articleitem02").href= targetURL[1]; 
	document.getElementById("articleitem03").href= targetURL[2]; 
	document.getElementById("articleitem04").href= targetURL[3]; 
	document.getElementById("articleitem05").href= targetURL[4]; 
	document.getElementById("articleitem06").href= targetURL[5]; 
}

var targetNAME = [	'Hearthstone:<br />Heroes of Warcraft',
					'Dark Souls',
					'Bioshock',
					'Half Life 2',
					'SimCity 2000',
					'Warcraft 2'
					];

function setNAMEs(){
	document.getElementById("artItemText01").innerHTML = targetNAME[0];
	document.getElementById("artItemText02").innerHTML = targetNAME[1];
	document.getElementById("artItemText03").innerHTML = targetNAME[2];
	document.getElementById("artItemText04").innerHTML = targetNAME[3];
	document.getElementById("artItemText05").innerHTML = targetNAME[4];
	document.getElementById("artItemText06").innerHTML = targetNAME[5];
}

var urlOFtarget = "#!";
var lines = [], newlines = [];
var articelCounterId ="articleCounter";
var counter = 0;
var g2nameOFpathTOtextfile = "g2/reviews.btxt",
	nameOFpathTOtextfile = g2nameOFpathTOtextfile;

function loadXMLDoc( pathTOtextfile ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      textfile_content = this.responseText;
	  newlines = textfile_content.split("\n");
	  counter = parseInt( newlines.length / 5 );
	  document.getElementById( articelCounterId ).innerHTML = counter;
	  makeTARGETs();
	  writeTARGETs();
    }
  };
  xhttp.open("GET", pathTOtextfile , true);
  xhttp.send();
}

function makeTARGETs(){
var j = 0;
var	i = Math.floor(Math.random() * counter);
	lines = newlines;
	while ( j < 6 ){
		while ( lines[ i * 5 + 4 ].length < 4  ) {
					i = Math.floor(Math.random() * counter);
				}
		if ( j == 0 || j == 3 || j == 4 ){
			imageURLv[j] = lines[ i * 5 + 3 ];
			imageURLh[j] = lines[ i * 5 + 2 ];
		} else {
			imageURLv[j] = lines[ i * 5 + 2 ];
			imageURLh[j] = lines[ i * 5 + 1 ];
		}
		targetNAME[j] = lines[ i * 5 + 0 ];
		targetURL[j] = lines[ i * 5 + 4 ];

		lines[ i * 5 + 1 ] = "#!";
		lines[ i * 5 + 2 ] = "#!";
		lines[ i * 5 + 3 ] = "#!";
		lines[ i * 5 + 4 ] = "#!";
		j++;
	}
}

function writeTARGETs(){
	setHOMEimages();
	setURLs();
	setNAMEs();
}

loadXMLDoc( nameOFpathTOtextfile );