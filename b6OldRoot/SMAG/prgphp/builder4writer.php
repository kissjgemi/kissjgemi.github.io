<?php

fwrite( $targetfile , '   <br />' . "\n");
fwrite( $targetfile , '   <hr />' . "\n\n");

for ($row = 1; $row < 17; $row++) 
	{
	$title = "section" . strval($row);
	
	$jumpTo = "s" . substr("0" . strval($row) , -2);
	
	$number_of_titles = $articles [$title][0];
	if ( $number_of_titles > 0 ) {
		echo "- jumpTo - " . $jumpTo . "<br />";
		
		fwrite( $targetfile , '<a name="' . $jumpTo . '">&nbsp;</a>' . "\n\n");

		fwrite( $targetfile , '   <div id="' . $title . '" style="background-position: 50%;">' . "\n");
		fwrite( $targetfile , '   <div class="section-header"><h2>&nbsp;<font color="#FFFFFF">' . "\n");
		fwrite( $targetfile , '   <span style="background-color: #000000;">' . "\n");
		fwrite( $targetfile , '   &nbsp; ' . $menu_titles [$title] . ' &nbsp;</span>' . "\n");
		fwrite( $targetfile , '   </font> </h2></div>' . "\n");
		fwrite( $targetfile , '   </div>' . "\n");
		
		echo "<p><b>" . $menu_titles [$title] . "</b></p>";		
		echo "<ul>";

		for ($col = 1; $col < $number_of_titles + 1 ; $col++) 
		{
		$jumpToTxt = $jumpTo . "_" . strval($col);
		echo "- jumpTo - " . $jumpToTxt . "<br />";		
		echo "<li>" . $articles [$title][$col] . "</li>";
		
			fwrite( $targetfile , '   <a name="' . $jumpToTxt . '">&nbsp;</a>' . "\n");
			fwrite( $targetfile , '   	<h3>' . $articles [$title][$col] . '</h3>' . "\n\n");

			if ( $administrator_state ){
				if ( ($row == 1) && ($col == 1) ){
					$button = " Frissítsd az adatokat ";
				fwrite( $targetfile , '<center>' . "\n");
				fwrite( $targetfile , '<form action="' . $prg_dirs['php']. $filenames['refresh_weather'] );
				fwrite( $targetfile , '" method="post">' . "\n");
				}elseif( ($row == 3) && ($col == 1) ){
					$button = " Frissítsd a listát ";
				fwrite( $targetfile , '<center>' . "\n");
				fwrite( $targetfile , '<form action="' . $prg_dirs['php']. $filenames['refresh_lotto'] );
				fwrite( $targetfile , '" method="post">' . "\n");
				}else{	
					$button = " Töröld a MAGazinból ";
				fwrite( $targetfile , '<center>' . "\n");
				fwrite( $targetfile , '<form action="' . $prg_dirs['php']. $filenames['delete_article'] );
				fwrite( $targetfile , '" method="post">' . "\n");
				}
				fwrite( $targetfile , '	<input type="hidden" name="section" value= "' . $row );
				fwrite( $targetfile , '" />' . "\n");
				fwrite( $targetfile , '	<input type="hidden" name="article" value= "' . $col );
				fwrite( $targetfile , '" />' . "\n");
				fwrite( $targetfile , '    <input type="submit" value="' . $button . '" />' . "\n" );
				fwrite( $targetfile , '</form>' . "\n");
				fwrite( $targetfile , '</center>' . "\n");
			}
			
			$article_path = $prg_dirs["sections"] . $title . '/';
			$article_name = $jumpToTxt . ".btxt";
			
			insert_template ( $article_path , $article_name , $targetfile );
						
			fwrite( $targetfile , '   <hr /><hr /><br />' . "\n\n");
		}
	echo "</ul>";
	}
}
fwrite( $targetfile , '   </div>' . "\n\n");

?>