<?php

function download_remote($url , $save_path)
{
    $f = fopen( $save_path , 'w');
    $handle = fopen($url , "rb");	
	$x = 0; 
    while (!feof($handle)) 
    {        $contents = fread($handle, 8192);
        fwrite($f , $contents);
		$x++;
		if ( $x > 5) break;
    }
    fclose($handle);
    fclose($f);
}

function popup2browser ( $saved_path )
{
	$file_saved = fopen( $saved_path , "r") or exit("Unable to open target file!");
	while(!feof($file_saved))
		{
			echo fgets($file_saved);
		}
	fclose($file_saved);
}

$datafile = "data_totogol.btxt";
$remotefile = "http://www.szerencsejatek.hu/xls/goltoto.html";
download_remote( $remotefile , $datafile );
popup2browser( $datafile );

$datafile = "data_toto.btxt";
$remotefile = "http://www.szerencsejatek.hu/xls/toto.html";
download_remote( $remotefile , $datafile );
popup2browser( $datafile );

$datafile = "data_luxor.btxt";
$remotefile = "http://www.szerencsejatek.hu/xls/luxor.html";
download_remote( $remotefile , $datafile );
popup2browser( $datafile );

$datafile = "data_lotto7.btxt";
$remotefile = "http://www.szerencsejatek.hu/xls/skandi.html";
download_remote( $remotefile , $datafile );
popup2browser( $datafile );

$datafile = "data_lotto6.btxt";
$remotefile = "http://www.szerencsejatek.hu/xls/hatos.html";
download_remote( $remotefile , $datafile );
popup2browser( $datafile );

$datafile = "data_lotto5.btxt";
$remotefile = "http://www.szerencsejatek.hu/xls/otos.html";
download_remote( $remotefile , $datafile );
popup2browser( $datafile );

$datafile = "data_keno.btxt";
$remotefile = "http://www.szerencsejatek.hu/xls/keno.html";
download_remote( $remotefile , $datafile );
popup2browser( $datafile );

$datafile = "data_joker.btxt";
$remotefile = "http://www.szerencsejatek.hu/xls/joker.html";
download_remote( $remotefile , $datafile );
popup2browser( $datafile );

$datafile = "data_eurojackpot.btxt";
$remotefile = "http://www.szerencsejatek.hu/xls/eurojackpot.html";
download_remote( $remotefile , $datafile );
popup2browser( $datafile );

?>
