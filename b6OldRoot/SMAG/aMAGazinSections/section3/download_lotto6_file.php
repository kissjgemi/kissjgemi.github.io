<?php

include_once ("download_a_remote_file.php");

$datafile = "data_lotto6.btxt";
$remotefile = "https://bet.szerencsejatek.hu/cmsfiles/hatos.html";

$data = getSslPage($remotefile) ;
echo ( $data );

   $f = fopen( $datafile , 'w');
   fwrite($f , $data);
   fclose($f);

?>
