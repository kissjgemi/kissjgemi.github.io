var selectedItemId,
	name4selected = 'selected',
	administratormode = 'true';

function setSelectedItemTo(item){
	if(undefined != selectedItemId){
	document.getElementById(selectedItemId).className = document.getElementById(selectedItemId).className.replace(new RegExp('(?:^|\\s)'+ name4selected + '(?:\\s|$)'), ' ');
	}
	selectedItemId = item;
	document.getElementById(selectedItemId).className += ' ' + name4selected;
}

function hideItem(item){
	document.getElementById(item).style.display = 'none';
}

function showItem(item){
	document.getElementById(item).style.display = 'block';
}

function changeNavitemTo(item){
	if(undefined != selectedItemId){
		switch (item){
			case 'navitemdiv02':
				showItem('summaryPanel');
				hideItem('listDiv');
				break;
			case 'navitemdiv03':
				showItem('listDiv');
				hideItem('summaryPanel');
				break;
			default:

			}
	setSelectedItemTo(item);
	}
}

function showWindowSize(){
	var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var b6window = "Browser inner window width: <i><u>" + w + "</u></i> px, height: <i><u>" + h + "</u></i> px.";
	
	//document.getElementById("fullScreenDiv").setAttribute("style","width:"+w+"px");
	//document.getElementById("fullScreenDiv").setAttribute("style","height:"+h+"px");
	
	//document.getElementById("fullScreenDiv").style.width = w+"px";
	//document.getElementById("fullScreenDiv").style.height = h+"px";
	//document.getElementById("fullScreenDiv").style.textAlign = "center";
	
	var colW = w/5, colH;
	
	if( w > h ){
		colH = 3*colW/4;
	}else{
		colH = 4*colW/3;
	}
	//document.getElementById("navItemImg01").style.width = colW+"px";
	//document.getElementById("navItemImg01").style.height = colH+"px";
	//document.getElementById("navItemImg02").style.width = colW+"px";
	//document.getElementById("navItemImg02").style.height = colH+"px";
	//document.getElementById("navItemImg03").style.width = colW+"px";
	//document.getElementById("navItemImg03").style.height = colH+"px";

	colW = document.getElementById("navItemImg01").width;
	colH = document.getElementById("navItemImg01").height;
	
	if (administratormode){
		document.getElementById("windowWidth").innerHTML = b6window;

		var b6image = " Image width: <i><u>" + colW + "</u></i> px, height: <i><u>" + colH + "</u></i> px.";
		document.getElementById("windowWidth").innerHTML += b6image;
	}
}

//window.addEventListener("resize", showWindowSize);
//showWindowSize();
