<?php

function download_remote($url , $save_path)
{
    $f = fopen( $save_path , 'w');
     
    $handle = fopen($url , "rb");
	
	$x = 0;
     
    while (!feof($handle)) 
    {
        $contents = fread($handle, 8192);
        fwrite($f , $contents);
		$x++;
		if ( $x > 2) break;
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

function getSslPage($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_REFERER, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}

?>
