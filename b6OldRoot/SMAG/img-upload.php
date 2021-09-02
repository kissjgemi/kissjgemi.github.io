<?php
   if(isset($_FILES['image'])){
      $errors= array();
      $file_name = $_FILES['image']['name'];
      $file_size =$_FILES['image']['size'];
      $file_tmp =$_FILES['image']['tmp_name'];
      $file_type=$_FILES['image']['type'];
      $file_ext=strtolower(end(explode('.',$_FILES['image']['name'])));
      
      $expensions= array("jpeg","jpg","png");
      
      if(in_array($file_ext,$expensions)=== false){
         $errors[]="extension not allowed, please choose a JPEG or PNG file.";
      }
      
      if($file_size > 2097152){
         $errors[]='File size must be excately 2 MB';
      }
      
      if(empty($errors)==true){
         move_uploaded_file($file_tmp,"_uploaded_images/".$file_name);
         echo "Success";
      }else{
         print_r($errors);
      }
   }
?><!DOCTYPE html>

<html lang="hu">
<head>
<title>MAGazin writer 2016.01.04</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <meta http-equiv="Content-Style-Type" content="text/css" />
  <meta http-equiv="Content-Script-Type" content="text/javascript" />
  <meta http-equiv="content-language" content="hu" /> 
  <meta name="author" content="Kiss J. Gábor" />
  <meta name="designer" content="Kiss J. Gábor"/>
  <meta name="copyright" content="Copyright @ 2015 sryer.com"/>
  <meta name="keywords" content="magazin, napilap, újság, média, mti, szórakozás, életmód, tájékoztatás" />
  <meta name="description" content="tudományosan szórakoztató magazin" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow"/>
  <meta name="MSNBOT" content="INDEX,FOLLOW" /> 
  <meta name="ROBOTS" content="ALL" /> 
  <meta http-equiv="date" content="Fri, 18 Dec 2015 21:51:04 GMT" />
  <meta http-equiv="last-modified" content="Mon, 04 Jan 2016 20:28:04 GMT" />
  <meta http-equiv="expires" content="Thu, 07 Jan 2016 20:28:04 GMT" />
  <meta name="revisit" content="3 day" />
  <link rel="icon" type="image/x-icon" href="http://magazin.sryer.com/favicon.ico" />
  <link rel="shortcut icon" type="image/x-icon" href="http://magazin.sryer.com/favicon.ico" />
  <link rel="stylesheet" type="text/css" href="aMAGazinStyles/styles.css" />
  <script type="text/javascript" src="prgjs/jscript.js">
  </script>
  <link rel="made" title="e-Mail" href="sry@sryer.com" />
</head> 
<html>
   <body>
      <form action="" method="POST" enctype="multipart/form-data">
         <input type="file" name="image" />
         <input type="submit"/>
      </form>
      
   </body>
</html>