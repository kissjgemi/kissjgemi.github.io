<?php

echo '<pre>'; 
print_r($menu_titles); 
echo '</pre>'; 
	
fwrite( $targetfile , '<select name="sectionlist" style="margin-left: 10%;">' . "\n" );
	for ($row = 1; $row < $menu_titles["number_of_section"] ; $row++) {
		$dummy = substr ( ('0' . $row) , -2 );
		fwrite( $targetfile , '<option value="' );
		fwrite( $targetfile , $row . '"> ' . $dummy . '. ' );
		fwrite( $targetfile , $menu_titles[ "section$row"] . ' </option>' );
		fwrite( $targetfile , "\n" );
	}
fwrite( $targetfile , '</select>' . "\n" );
fwrite( $targetfile , '   <br />' . "\n" );
fwrite( $targetfile , '   <br />' . "\n" );

?>