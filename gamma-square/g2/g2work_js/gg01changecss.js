var g2dir = 'g2/g2work_css/';

function changeUsedCSS(cssFileName, cssLinkIndex) {

    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);
	var cssFile = g2dir + cssFileName + ".css";	
    var newlink = document.createElement("link");
 
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}

changeUsedCSS('g2randzero4home', 0 );