<?php

function download_remote($url , $save_path)
{
    $f = fopen( $save_path , 'w');
     
    $handle = fopen($url , "rb");
     
    while (!feof($handle)) 
    {
        $contents = fread($handle, 8192);
        fwrite($f , $contents);
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

download_remote('http://www.mti.hu/mti/Default.aspx', "login.btxt");
popup2browser("login.btxt");

?>
