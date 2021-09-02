<?php

include_once ("download_a_remote_file.php");

$datafile = "data_totogol.btxt";
$remotefile = "https://bet.szerencsejatek.hu/cmsfiles/goltoto.html";
$data = getSslPage($remotefile) ;
echo ( $data );
   $f = fopen( $datafile , 'w');
   fwrite($f , $data);
   fclose($f);

$datafile = "data_toto.btxt";
$remotefile = "https://bet.szerencsejatek.hu/cmsfiles/toto.html";
$data = getSslPage($remotefile) ;
echo ( $data );
   $f = fopen( $datafile , 'w');
   fwrite($f , $data);
   fclose($f);

$datafile = "data_luxor.btxt";
$remotefile = "https://bet.szerencsejatek.hu/cmsfiles/luxor.html";
$data = getSslPage($remotefile) ;
echo ( $data );
   $f = fopen( $datafile , 'w');
   fwrite($f , $data);
   fclose($f);

$datafile = "data_lotto7.btxt";
$remotefile = "https://bet.szerencsejatek.hu/cmsfiles/skandi.html";
$data = getSslPage($remotefile) ;
echo ( $data );
   $f = fopen( $datafile , 'w');
   fwrite($f , $data);
   fclose($f);

$datafile = "data_lotto6.btxt";
$remotefile = "https://bet.szerencsejatek.hu/cmsfiles/hatos.html";
$data = getSslPage($remotefile) ;
echo ( $data );
   $f = fopen( $datafile , 'w');
   fwrite($f , $data);
   fclose($f);

$datafile = "data_lotto5.btxt";
$remotefile = "https://bet.szerencsejatek.hu/cmsfiles/otos.html";
$data = getSslPage($remotefile) ;
echo ( $data );
   $f = fopen( $datafile , 'w');
   fwrite($f , $data);
   fclose($f);

$datafile = "data_keno.btxt";
$remotefile = "https://bet.szerencsejatek.hu/cmsfiles/keno.html";
$data = getSslPage($remotefile) ;
echo ( $data );
   $f = fopen( $datafile , 'w');
   fwrite($f , $data);
   fclose($f);

$datafile = "data_joker.btxt";
$remotefile = "https://bet.szerencsejatek.hu/cmsfiles/joker.html";
$data = getSslPage($remotefile) ;
echo ( $data );
   $f = fopen( $datafile , 'w');
   fwrite($f , $data);
   fclose($f);

$datafile = "data_eurojackpot.btxt";
$remotefile = "https://bet.szerencsejatek.hu/cmsfiles/eurojackpot.html";
$data = getSslPage($remotefile) ;
echo ( $data );
   $f = fopen( $datafile , 'w');
   fwrite($f , $data);
   fclose($f);

?>
