<?php

include_once ("download_a_remote_file.php");

$datafile = "data_lotto7.btxt";
$remotefile = "https://bet.szerencsejatek.hu/cmsfiles/skandi.html";

$data = getSslPage($remotefile) ;
echo ( $data );

   $f = fopen( $datafile , 'w');
   fwrite($f , $data);
   fclose($f);

?>
