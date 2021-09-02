
<?php

	include_once ("builder_filenames.php");

echo '<pre>'; 
print_r($_POST); 
echo '</pre>'; 

	$aktualtimestamp = time() ;
	$arch_ticle_section = $_POST['section'];
	$arch_ticle_number = $_POST['article'];
	$article_number = $arch_ticle_number;

$arch_ticle_name = "s" . substr("0" . $arch_ticle_section , -2) . "_" . $arch_ticle_number ;
$arch_ticle_file = $aktualtimestamp . $arch_ticle_name . ".btxt";
$arch_ticle_path = $prg_dirs["archiv"] . $arch_ticle_file;

$article_name = $arch_ticle_name;
$article_file = $article_name . ".btxt";
$article_path = $prg_dirs["sections"] . "section" . $arch_ticle_section . "/" . $article_file ;
$exp_file = $article_name . ".bexp";
$exp_path = $prg_dirs["sections"] . "section" . $arch_ticle_section . "/" . $exp_file ;

if (!file_exists($prg_dirs["archiv"])){
	mkdir($prg_dirs["archiv"]);
}
rename( $article_path , $arch_ticle_path );

unlink( $exp_path );

$arch_ticle_number++;
$next_name =  "s" . substr("0" . $arch_ticle_section , -2) . "_" . $arch_ticle_number ;
$next_file = $next_name . ".btxt";
$next_path = $prg_dirs["sections"] . "section" . $arch_ticle_section . "/" . $next_file ;
$next_exp = $next_name . ".bexp";
$next_expiration_path = $prg_dirs["sections"] . "section" . $arch_ticle_section . "/" . $next_exp ;

while ( file_exists($next_path)) {
	rename( $next_path , $article_path );
	$article_path = $next_path;
	rename( $next_expiration_path , $exp_path );
	$exp_path = $next_expiration_path;
	
$arch_ticle_number++;
$next_name =  "s" . substr("0" . $arch_ticle_section , -2) . "_" . $arch_ticle_number ;
$next_file = $next_name . ".btxt";
$next_path = $prg_dirs["sections"] . "section" . $arch_ticle_section . "/" . $next_file ;
$next_exp = $next_name . ".bexp";
$next_expiration_path = $prg_dirs["sections"] . "section" . $arch_ticle_section . "/" . $next_exp ;
}

		$bg_path = "background image path";
		$section_titles = array();
		$topic_titles = array();
		include ("variable_pathes2read.php");
		
echo '<pre>'; 
print_r($topic_titles); 
echo '</pre>'; 

	$row = $topic_titles[$arch_ticle_section][0];
	$row--;
	$topic_titles[$arch_ticle_section][0] = $row;
	
while ( $article_number <= $row ) {
	$topic_titles[$arch_ticle_section][$article_number] = $topic_titles[$arch_ticle_section][$article_number + 1];
	$article_number++;
}
unset($topic_titles[$arch_ticle_section][$row + 1]);

echo '<pre>'; 
print_r($topic_titles); 
echo '</pre>'; 

	include ("variable_pathes2write.php");

	include('topicwriter.php');

echo "<hr /><br />";
?>

 <script language="javascript" type="text/javascript">
     <!--
	 setTimeout(function() {window.location="../b6admin.html";},1250);
     // -->
 </script>
 