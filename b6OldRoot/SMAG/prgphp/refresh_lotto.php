<?php

	include_once ("builder_filenames.php");

	$administrator_state = true;

echo '<pre>'; 
print_r($_POST); 
echo '</pre>'; 

$section_path = $prg_dirs['sections'] . 'section3';
if (chdir( $section_path )){
include( "download_all_files.php" );
include( "get_info_from_file.php" );
}

$php_path = '../../prgphp';
if (chdir( $php_path )){
include('topicwriter.php');
}

?>

 <script language="javascript" type="text/javascript">
     <!--
	 setTimeout(function() {window.location="../b6admin.html";},1250);
     // -->
 </script>
 