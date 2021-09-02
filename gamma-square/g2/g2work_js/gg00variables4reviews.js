var administratorMode = true,
	toggledBgColor =  { wrapper:"gray",
						logoDivLeft:"blue",
						logoDivRight:"blue",
						naviDiv:"yellow",
						newsDiv1:"lightgray",
						newsDiv2:"lightgray",
						footerDivCenter:"darkgray"},
	bodyBgColor = "green",
	isTransparent = false;

function toggleColor(){
	// alert(toggledBgColor['naviDivCenter']);
	if (isTransparent && administratorMode)	{
		document.body.style.backgroundColor = bodyBgColor;
		document.getElementById("wrapper").style.backgroundColor = toggledBgColor['wrapper'];
		document.getElementById("logoDivLeft").style.backgroundColor = toggledBgColor['logoDivLeft'];
		document.getElementById("logoDivRight").style.backgroundColor = toggledBgColor['logoDivRight'];
		document.getElementById("naviDiv").style.backgroundColor = toggledBgColor['naviDiv'];
		document.getElementById("newsDiv1").style.backgroundColor = toggledBgColor['newsDiv1'];
		document.getElementById("newsDiv2").style.backgroundColor = toggledBgColor['newsDiv2'];
		document.getElementById("footerDivCenter").style.backgroundColor = toggledBgColor['footerDivCenter'];
		document.getElementById("wrapper").style.borderColor =  "white";
		document.getElementById("footerDivCenter").style.borderColor = bodyBgColor;
	} else {
		document.body.style.backgroundColor = "transparent";
		document.getElementById("wrapper").style.backgroundColor = "transparent";
		document.getElementById("logoDivLeft").style.backgroundColor = "transparent";
		document.getElementById("logoDivRight").style.backgroundColor = "transparent";
		document.getElementById("naviDiv").style.backgroundColor = "transparent";
		document.getElementById("newsDiv1").style.backgroundColor = "transparent";
		document.getElementById("newsDiv2").style.backgroundColor = "transparent";
		document.getElementById("footerDivCenter").style.backgroundColor = "black";
		document.getElementById("wrapper").style.borderColor =  "transparent";
		document.getElementById("footerDivCenter").style.borderColor = toggledBgColor['footerDivCenter'];
	}
	isTransparent = !isTransparent;
}

