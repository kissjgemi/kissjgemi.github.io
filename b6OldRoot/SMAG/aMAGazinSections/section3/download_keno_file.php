<?php

include_once ("download_a_remote_file.php");

$datafile = "data_keno.btxt";
$remotefile = "https://bet.szerencsejatek.hu/cmsfiles/keno.html";

$data = getSslPage($remotefile) ;
echo ( $data );

   $f = fopen( $datafile , 'w');
   fwrite($f , $data);
   fclose($f);

//file_put_contents( $datafile , fopen( $remotefile , 'r' ));
//download_remote( $remotefile , $datafile );
//popup2browser( $datafile );

?>
