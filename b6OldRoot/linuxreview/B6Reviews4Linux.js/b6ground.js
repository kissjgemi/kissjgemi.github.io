
// When the user scrolls down 180px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 180 || document.documentElement.scrollTop > 180) {
        document.getElementById("button2top").style.display = "block";
    } else {
        document.getElementById("button2top").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;	
}
