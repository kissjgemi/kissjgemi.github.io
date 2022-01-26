<?php
	include_once ("builder_filenames.php");
	include_once ("builder_variable_pathes.php");

	$administrator_state = false;
	
	echo "Scienction Magazin encoding to html...<br />";
	
	$aktualtimestamp = time() ;
	$lastModifiedDate = date("D, d M Y H:i:s \G\M\T", $aktualtimestamp);
	$expiredDate = date("D, d M Y H:i:s \G\M\T", $aktualtimestamp + 24*3600*3 );
	$todayDate = date("Y.m.d", $aktualtimestamp);

echo "start - " . $lastModifiedDate . "<br />";

// ---- F U N C T I O N S - S T A R T

function insert_template ( $source_dir , $source_name , $targetfile  ) {

$source_path = $source_dir.$source_name ;
$sourcefile = fopen( $source_path , "r") or exit("Unable to open the $source_path file!");

while(!feof($sourcefile))
  {
fwrite($targetfile,fgets($sourcefile));
  }
fclose($sourcefile);
}

// ---- F U N C T I O N S - F I N I S H

// ---- M A I N
 
$target_path = $prg_dirs['index'] . $filenames['index'] ;
$targetfile = fopen( $target_path , "w") or exit("Unable to open $target_path file!");

// ---- H E A D E R

insert_template ( $prg_dirs['templates'] , "heading01.btxt" , $targetfile );
  echo "- head - 01<br />";

$titel = $txt_titel['title00'] ;
fwrite( $targetfile , '<title>' . $titel . " " . $todayDate . '</title>');
  echo "- title - ". $titel . " " . $todayDate . "<br />";

insert_template ( $prg_dirs['templates'] , "heading02.btxt" , $targetfile );
  echo "- head - 02<br />";

$keyword = $txt_keyword['keyword00'] ;
fwrite( $targetfile , '  <meta name="keywords" content="' . $keyword . '" />'."\n");
  echo "- keywords - " . $keyword . "<br />";
	
$description = $txt_description['description00'] ;
fwrite( $targetfile , '  <meta name="description" content="' . $description . '" />');
  echo "- description - " . $description . "<br />";

insert_template ( $prg_dirs['templates'] , "heading03.btxt" , $targetfile );
  echo "- head - 03<br />";

fwrite( $targetfile , '  <meta http-equiv="date" content="Fri, 11 Dec 2015 09:40:18 GMT" />' . "\n");
  echo "- date - Fri, 11 Dec 2015 09:40:18 GMT<br />";
fwrite( $targetfile , '  <meta http-equiv="last-modified" content="' . $lastModifiedDate . '" />' . "\n");
  echo "- date - " . $lastModifiedDate . "<br />";
//fwrite( $targetfile , '  <meta http-equiv="expires" content="' . $expiredDate . '" />' . "\n");
//  echo "- expires - " . $expiredDate . "<br />";
fwrite( $targetfile, '  <meta name="revisit" content="' . $revisit01 . '" />' . "\n");
  echo "- revisit - " . $revisit01 . "<br />";

fwrite( $targetfile , '  <link rel="icon" type="image/x-icon" href="' . $prg_url01.'favicon.ico" />' . "\n");
fwrite( $targetfile , '  <link rel="shortcut icon" type="image/x-icon" href="' . $prg_url01 . 'favicon.ico" />' . "\n");
  echo "- image/x-icon - " . $prg_url01 . "<br />";
  
$css_styles = $prg_dirs[ 'styles' ] . $filenames[ 'styles' ];
fwrite( $targetfile , '  <link rel="stylesheet" type="text/css" href="' . $css_styles . '" />' . "\n");
  echo "- stylesheet - " . $css_styles . "<br />";
  
$js_in = $prg_dirs[ 'js' ] . $filenames[ 'js' ];
fwrite( $targetfile , '  <script type="text/javascript" src="' . $js_in . '">' . "\n");
fwrite( $targetfile , '  </script>' . "\n");
  echo "- javascript - " . $js_in . "<br />";

fwrite( $targetfile , '  <link rel="made" title="e-Mail" href="' . $mail_to01 . '" />' . "\n");
  echo "- mailTo - " . $mail_to01 . "<br />";

fwrite( $targetfile , "</head> \n <body> \n ");
  echo "- head - ready" . "<br />";
  echo "<br />";

  echo "- body - start" . "<br />";
                                                           
// ---- B O D Y - M E N U

include("builder4menu.php");
  echo "- menu -" . "<br />";

fwrite( $targetfile , '<div id="page-wrap">' . "\n");

// ---- B O D Y - F R O N T - C O V E R

fwrite( $targetfile , '   <br />' . "\n");
fwrite( $targetfile , '   <hr />' . "\n\n");

if ( $administrator_state ) {
insert_template ( $prg_dirs['templates'] , "admin_cover.btxt" , $targetfile );	
} else {
insert_template ( $prg_dirs['templates'] , "cover.btxt" , $targetfile );
};

  echo "- covertxt -" . "<br />";


// ---- B O D Y - T O P I C S

include("builder4topics.php");
  echo "- topics -" . "<br />";

// ---- B O D Y - I M P R E S S U M

insert_template ( $prg_dirs['templates'] , "impresszum.btxt" , $targetfile );
  echo "- impresszum -" . "<br />";

fwrite( $targetfile , "</body> \n </html> \n ");
fclose($targetfile);
  echo "<br />";
  echo "ready!";
 
?>

 <script language="javascript" type="text/javascript">
     <!--
     window.location="../";
     // -->
 </script>
 