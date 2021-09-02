<?php


function move_template ( $source_file , $file2  ) {

$source_open = $source_file ;
$file1 = fopen( $source_open , "r") or exit("Unable to open the source file: $source_file !");

while(!feof($file1))
  {
fwrite($file2,fgets($file1));
  }
fclose($file1);

}

?>
