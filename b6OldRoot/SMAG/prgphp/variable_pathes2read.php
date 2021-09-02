<?php

$datafile2read = $filenames ['builder_variables'];

$input_data = fopen( $datafile2read , "r") or exit("Unable to open source file!");

while(!feof($input_data)){
$newstring =  fgets ($input_data);

$pos = strpos( $newstring , '$cover_image_path');
	if ( $pos !== false )	{
		$pos = strpos( $newstring , "'");
		$newstring = substr ($newstring, $pos + 1);
		$pos = strpos( $newstring , "'");
		$newstring = substr ($newstring, 0, $pos );
		$bg_path = $newstring ;
		echo 'Background path :<br />';
		echo $bg_path ;
		echo '<br />';
	}
$pos = strpos( $newstring , '$menu_titles');
	if ( $pos !== false )	{
		
		echo 'Menü titles :<br />';
		$pos = strpos( $newstring , "=> '");
		$newstring = substr ($newstring, $pos + 4);
		$pos = strpos( $newstring , "'");
		$titlestring = substr ($newstring, 0, $pos );
		array_push ( $section_titles , $titlestring );
		echo 'Sections : ' . $section_titles[0] . " db.";
		echo '<br />';
		$newstring =  fgets ($input_data);
		
		for ($row = 1; $row <= $section_titles[0] ; $row++) {
		$pos = strpos( $newstring ,  "=> '");
		$newstring = substr ($newstring, $pos + 4);
		$pos = strpos( $newstring , "'");
		$titlestring = substr ($newstring, 0, $pos );
		echo $titlestring ;
		echo '<br />';
		array_push ( $section_titles , $titlestring );
		$newstring =  fgets ($input_data);
		}
	}
		echo '<br />';
		echo '<br />';
$pos = strpos( $newstring , '$articles');
	if ( $pos !== false )	{
		echo 'Topic titles :<br />';
		$pos = strpos( $newstring ,  "=> '");
		$newstring = substr ($newstring, $pos + 4);
		$pos = strpos( $newstring , "'");
		$titlestring = substr ($newstring, 0, $pos );
		array_push ( $topic_titles , $titlestring );
		echo 'Sections : ' . $topic_titles[0] . " db.";
		echo '<br />';
		$newstring =  fgets ($input_data);
		
		for ($row = 1; $row <= $topic_titles[0] ; $row++) {
		echo $section_titles[$row] . ' :<br />';
		$pos = strpos( $newstring , "array ('");
		$newstring = substr ($newstring, $pos + 8);
		$pos = strpos( $newstring , "'");
		$titlestring = substr ($newstring, 0, $pos );
		$dummyarray = array();
		array_push ( $dummyarray , $titlestring );
		echo 'Topics : ' . $dummyarray[0] . " db.";
		echo '<br />';
			for ($topictitle = 1; $topictitle <= $dummyarray[0] ; $topictitle++) {
				$newstring =  fgets ($input_data);
				$pos = strpos( $newstring , "'");
				$newstring = substr ($newstring, $pos + 1);
				$pos = strpos( $newstring , "'");
				$titlestring = substr ($newstring, 0, $pos );
				echo $titlestring ;
				echo '<br />';
				array_push ( $dummyarray , $titlestring );
			}
		array_push ( $topic_titles , $dummyarray );
		unset($dummyarray);
		$newstring =  fgets ($input_data);
		}
	}
}

fclose($input_data);

?> 