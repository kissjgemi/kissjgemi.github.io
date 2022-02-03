<?php

include_once ("download_a_remote_file.php");

$datafile = "data_totogol.btxt";
$remotefile = "https://bet.szerencsejatek.hu/cmsfiles/goltoto.html";

$data = getSslPage($remotefile) ;
echo ( $data );

   $f = fopen( $datafile , 'w');
   fwrite($f , $data);
   fclose($f);

?>
