
<?php
	include_once ("builder_filenames.php");

	$administrator_state = true;

function check_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    // $data = htmlspecialchars($data);
    return $data;
}

echo '<pre>'; 
print_r($_POST); 
echo '</pre>'; 
	
	$section = $_POST['section'];

		$bg_path = "background image path";
		$section_titles = array();
		$topic_titles = array();
		include ("variable_pathes2read.php");
		
	$dummy = $topic_titles[$section][0];
	$dummy++;
	$topic_titles[$section][0] = $dummy;

	$my_title = check_input($_POST['title']);
	array_push ( $topic_titles[$section] , $my_title );

echo "<pre>";
   print_r($topic_titles);
echo "</pre>";

	include ("variable_pathes2write.php");

$article_textname = "s" . substr( ("0" . $section ) , -2 ) . "_" . $topic_titles[$section][0]; 	
$article_textfile = $article_textname . ".btxt";
$article_inifile = $article_textname . ".bexp";
echo "name:" . $article_textfile . '<br />';
$article_textpath = "../aMAGazinSections/section" . $section . "/" . $article_textfile;
$article_inipath = "../aMAGazinSections/section" . $section . "/" . $article_inifile;
echo "path:" . $article_textpath . "<br /><br />";

$inifile = fopen( $article_inipath , "w" )  or exit ("Unable to open the source file!"); 

	$my_expiration = check_input($_POST['expiration']);
 
fwrite( $inifile , $my_expiration . "\n" );
fclose( $inifile );

$targetfile = fopen( $article_textpath , "w" )  or exit ("Unable to open the source file!");  

fwrite( $targetfile , '<div class="parabellum">' . "\n" );
fwrite( $targetfile , '<p class="main">' . "\n" );

$my_head = check_input($_POST['head']);
fwrite( $targetfile , $my_head );
fwrite( $targetfile , '</p>' . "\n" );

	$aktualtimestamp = time() ;
	
$my_body = check_input($_POST['body']);

if ( strlen($my_body) > 5 ){
fwrite( $targetfile , '<div id="more-article' . $aktualtimestamp . '">' );
fwrite( $targetfile , '<a onclick="show(\'less-article' . $aktualtimestamp . '\'); ' );
fwrite( $targetfile , 'hide(\'more-article' . $aktualtimestamp . '\')" >' . "\n" );

fwrite( $targetfile , '<p class="showline">Mutass többet!</p></a>' . "\n" );
fwrite( $targetfile , '<br />' . "\n" );
fwrite( $targetfile , '</div>' . "\n" );
fwrite( $targetfile , '<div id="less-article' . $aktualtimestamp . '" ' );
fwrite( $targetfile , 'style="display: none; background-color: lightgray">' . "\n" );
fwrite( $targetfile , '<a onclick="hide(\'less-article' . $aktualtimestamp . '\'); ' );
fwrite( $targetfile , 'show(\'more-article' . $aktualtimestamp . '\')" >' . "\n" );

fwrite( $targetfile , '<p class="showline">Rejtsd el!</p></a> ' . "\n" );
fwrite( $targetfile , '<br />' . "\n" );
fwrite( $targetfile , '<p class="main">' . "\n" );
fwrite( $targetfile , $my_body );
fwrite( $targetfile , '</p>' . "\n" );
fwrite( $targetfile , '</div>' . "\n" );	
}

$my_footer = check_input($_POST['footer']);
fwrite( $targetfile , '<p class="headfoot" align="right">' . "\n" );
fwrite( $targetfile , '	&nbsp; Forrás: &nbsp;' . "\n" );
fwrite( $targetfile , '	<font color="#FFFFFF"><span style="background-color: #000000;">&nbsp; ' . "\n" );
fwrite( $targetfile , $my_footer . "\n" );
fwrite( $targetfile , ' &nbsp;</span> </font></p>' . "\n" );

fwrite( $targetfile , '</div>' . "\n" );
fwrite( $targetfile , '   <br />' . "\n" );

fclose ($targetfile);

include('topicwriter.php');

echo "<hr /><br />";

?>

 <script language="javascript" type="text/javascript">
     <!--
	 setTimeout(function() {window.location="../b6admin.html";},1250);
     // -->
 </script>
 