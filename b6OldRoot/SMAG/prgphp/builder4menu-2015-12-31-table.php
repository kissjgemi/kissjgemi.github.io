<?php

fwrite( $targetfile , '<div id="menubutton">' . "\n");
fwrite( $targetfile , '<a onclick="show(\'main_menu\'); hide(\'menubutton\'); show(\'menuclosebutton\')"><img src="aMAGazinImages/buttons/menu_y.png"></a>' . "\n");
fwrite( $targetfile , '</div>' . "\n");
fwrite( $targetfile , '<div id="menuclosebutton">' . "\n");
fwrite( $targetfile , '<a onclick="hide(\'main_menu\'); show(\'menubutton\'); hide(\'menuclosebutton\')"><img src="aMAGazinImages/buttons/menu_y_close.png"></a>' . "\n");
fwrite( $targetfile , '</div>' . "\n");
fwrite( $targetfile , ' <div id="main_menu" class="menu">' . "\n");
fwrite( $targetfile , ' <table border="0" cellpadding="5" cellspacing="0" width="100%">' . "\n");
fwrite( $targetfile , '   <tr>' . "\n");
fwrite( $targetfile , '   <td onclick="window.location=\'#s00\'; hide(\'main_menu\'); show(\'menubutton\'); hide(\'menuclosebutton\')" align="center" height="40" valign="middle" width="50%">' . "\n");
fwrite( $targetfile , '   <h5>&nbsp; Címlap &nbsp;</h5></td>' . "\n");
fwrite( $targetfile , '   <td onclick="window.location=\'#s99\'; hide(\'main_menu\'); show(\'menubutton\'); hide(\'menuclosebutton\')" align="center" height="40" valign="middle" width="50%">' . "\n");
fwrite( $targetfile , '   <h5>&nbsp;  Impresszum &nbsp;</h5></td>' . "\n");
fwrite( $targetfile , '   </tr>' . "\n");
  
for ($row = 1; $row < 17; $row++) 
	{
	$title = "section" . strval($row);
	
	$jumpTo = "s" . substr("0" . strval($row) , -2);
	
	$number_of_titles = $articles [$title][0];
	if ( $number_of_titles > 0 ) {
		
		echo "- jumpTo - " . $jumpTo . "<br />";		
		
fwrite( $targetfile , '   <tr>' . "\n");
fwrite( $targetfile , '     <td onclick="window.location=\'#'. $jumpTo . '\'; hide(\'main_menu\'); show(\'menubutton\'); hide(\'menuclosebutton\')" align="left" colspan="2">' . "\n");
fwrite( $targetfile , '     <h5>&nbsp; ' . $menu_titles [$title] . ' &nbsp;</h5></td>' . "\n");

	echo "<p><b>" . $menu_titles [$title] . "</b></p>";		
	echo "<ul>";
		for ($col = 1; $col < $number_of_titles + 1 ; $col++) 
		{
		$jumpToTxt = $jumpTo . "_" . strval($col);
		echo "- jumpTo - " . $jumpToTxt . "<br />";		
		echo "<li>" . $articles [$title][$col] . "</li>";
		
		fwrite( $targetfile , '   </tr>' . "\n");
		fwrite( $targetfile , '   <tr>' . "\n");
		fwrite( $targetfile , '   <td onclick="window.location=\'#' . $jumpToTxt . '\'; hide(\'main_menu\'); show(\'menubutton\'); hide(\'menuclosebutton\')" align="left" colspan="2">' . "\n");
		fwrite( $targetfile , '   <b>> ' . $articles [$title][$col] . ' &nbsp;</b></td>' . "\n");
		}
	echo "</ul>";
	}
}

fwrite( $targetfile , '   </tr>' . "\n");
fwrite( $targetfile , '   </table>' . "\n");
fwrite( $targetfile , '   </div>' . "\n");

?>
