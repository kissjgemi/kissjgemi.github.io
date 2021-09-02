<?php
	include_once ("builder_filenames.php");
	$administrator_state = true;
	
function imageresize ( $images, $new_images, $width ){

	// $images = $my_archivfile;
	// $new_images = $my_menuimage;
	// $width=400;
			// Fix Width & Heigh auto calculate
$size=GetimageSize($images);
$height=round($width*$size[1]/$size[0]);
$images_orig = ImageCreateFromJPEG($images);
$photoX = ImagesX($images_orig);
$photoY = ImagesY($images_orig);
$images_fin = ImageCreateTrueColor($width, $height);
ImageCopyResampled($images_fin, $images_orig, 0, 0, 0, 0, $width+1, $height+1, $photoX, $photoY);
ImageJPEG($images_fin, $new_images);
ImageDestroy($images_orig);
ImageDestroy($images_fin);

return true;	
}
?>


<!DOCTYPE html>

<html lang="hu">
<head>
<title>MAGazin Edit Article</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <meta http-equiv="Content-Style-Type" content="text/css" />
  <meta http-equiv="Content-Script-Type" content="text/javascript" />
  <meta http-equiv="content-language" content="hu" /> 
  <meta name="author" content="Kiss J. Gábor" />
  <meta name="designer" content="Kiss J. Gábor"/>
  <meta name="copyright" content="Copyright @ 2015 sryer.com"/>
  <meta name="keywords" content="magazin, napilap, újság, média, mti, szórakozás, életmód, tájékoztatás />
  <meta name="description" content="tudományosan szórakoztató magazin" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow"/>
  <meta name="MSNBOT" content="INDEX,FOLLOW" /> 
  <meta name="ROBOTS" content="ALL" /> 
  <meta http-equiv="date" content="Fri, 11 Dec 2015 09:40:18 GMT" />
  <link rel="icon" type="image/x-icon" href="http://magazin.sryer.com/favicon.ico" />
  <link rel="shortcut icon" type="image/x-icon" href="http://magazin.sryer.com/favicon.ico" />
  <link rel="stylesheet" type="text/css" href="../aMAGazinStyles/styles.css" />
  <script type="text/javascript" src="../prgjs/jscript.js">
  </script>
  <link rel="made" title="e-Mail" href="sry@sryer.com" />
</head> 
 <body> 

 	&nbsp;<br />
	&nbsp; Kép feltöltés &nbsp;
	<font color="#FFFFFF"><span style="background-color: #000000;">&nbsp; 
<?php

echo '<pre>'; 
print_r($_POST); 
echo '</pre>';

$my_section = $_POST['section'];

	
   if(isset($_FILES['image'])){
      $errors= array();
      $my_image_file = $_FILES['image']['name'];
      $file_size =$_FILES['image']['size'];
      $file_tmp =$_FILES['image']['tmp_name'];
      $file_type=$_FILES['image']['type'];
      $file_ext=strtolower(end(explode('.',$_FILES['image']['name'])));
      
	$my_archiv = $prg_dirs["backgrounds"] . substr( ("0" . $my_section ) , -2 ) . "/" ;
	$my_archivfile = $my_archiv . $my_image_file;

    $expensions= array("jpeg","jpg");

	if ( (int)$section > 0 ) {
	$my_bgfile = $prg_dirs["backgrounds"] . "s" . $my_section . "." . $expensions[1];
	$my_menuimage = $prg_dirs["backgrounds"] . "s" . $my_section . "-menu." . $expensions[1];
	}else{
	$my_bgfile =  $filenames["frontpage"];		
	}
    
      if(in_array($file_ext,$expensions)=== false){
         $errors[]="extension not allowed, please choose a JPEG or PNG file.";
      }
      
      if($file_size > 2097152){
         $errors[]='File size must be excately 2 MB';
      }
      
      if(empty($errors)==true){
		  if (!file_exists( $my_archiv )){
						mkdir( $my_archiv );
					}
         move_uploaded_file( $file_tmp, $my_archivfile ) ;
         echo "sikeres.";
         echo "<br />";
			imageresize ( $my_archivfile, $my_bgfile, 1920 );  // 	copy( $my_archivfile,$my_bgfile );
		if ( (int)$section > 0 ) {
			imageresize ( $my_archivfile, $my_menuimage, 400 );
		}
         echo "<br />";
		 
		
      }else{
        // print_r($errors);
		echo "nem történt.";
        echo "<br />";
        echo "<br />";
		$my_image_file = $none;
		//die;
      }
}else{
	echo "nem történt.";
    echo "<br />";
    echo "<br />";
	$my_image_file = $none;
//die;
}

?>
 &nbsp;</span> </font>
	&nbsp;<br />
	&nbsp;<br />
<?php

// die;

?>

 <script language="javascript" type="text/javascript">
     <!--
	 setTimeout(function() {window.location="../b6admin.html";},1250);
     // -->
 </script>
 
</body>

</html>
