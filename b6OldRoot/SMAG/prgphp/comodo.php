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

<div id="footer-wrap">	
<center>
<p class="onecolumn">
	<h2>
	<font color="#FFFFFF"> 
	<span style="background-color: #000000;">&nbsp; :) Number 5 has input (: &nbsp;</span>           
	</font><br />
	&nbsp;<br />
    Scienction MAGazin<br />  
	</h2>
    új cikk bevitele<br />
	&nbsp;<br />
</p>
</center>

	&nbsp;<br />
	&nbsp; A témakör jele: &nbsp;
	<font color="#FFFFFF"><span style="background-color: #000000;">&nbsp; 
<?php
function check_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$my_section = check_input($_POST["sectionlist"]);
echo "section" . $my_section;
?>
 &nbsp;</span> </font>
	&nbsp;<br />
	&nbsp;<br />

	&nbsp; A lejárat lenyomata: &nbsp;
	<font color="#FFFFFF"><span style="background-color: #000000;">&nbsp; 
<?php
$my_expiration = check_input($_POST["expirationlist"]);
echo "expiration" . $my_expiration;
?>
 &nbsp;</span> </font>
	&nbsp;<br />
	&nbsp;<br />

<fieldset>
	&nbsp;<br />
	&nbsp; A cikk címe: &nbsp;
	<font color="#FFFFFF"><span style="background-color: #000000;">&nbsp; 
<?php

$my_title = check_input($_POST["article_title"]);
$my_article_head = check_input($_POST["article_head"]);
$my_article_body = check_input($_POST["article_body"]);
$my_article_footer = check_input($_POST["article_footer"]);

if ( strcmp( $my_title , "" ) == 0 ){
	$my_strings = explode( PHP_EOL , $my_article_head );
//echo '<pre>'; 
//print_r($my_strings); 
//echo '</pre>'; 
	$my_title = trim($my_strings[0]);
	$my_article_head = trim($my_strings[2]);
	$my_article_body = "";
	$size_my_strings = sizeof($my_strings) ;
	for ( $row = 4; $row < $size_my_strings-5 ; $row++ ){
		$my_article_body .= trim($my_strings[$row]) . "<br />" . "\n";
	}
	$my_article_footer = trim($my_strings[$size_my_strings - 1]);
}else{
	
	$my_strings = explode( PHP_EOL , $my_article_head );
	$my_article_head = "";
	$size_my_strings = sizeof($my_strings) ;
	for ( $row = 0; $row < $size_my_strings ; $row++ ){
		$my_article_head .= trim($my_strings[$row]) . "<br />" . "\n";
	}
	$my_strings = explode( PHP_EOL , $my_article_body );
	$size_my_strings = sizeof($my_strings) ;
	$my_article_body = "";
	for ( $row = 0; $row < $size_my_strings ; $row++ ){
		$my_article_body .= trim($my_strings[$row]) . "<br />" . "\n";
	}
}

echo $my_title;
?>
 &nbsp;</span> </font>
	&nbsp;<br />
	&nbsp;<br />

<div class="parabellum">
<p class="main">          
<?php
echo $my_article_head;
?>
</p>
<div id="more-article" style="display: none;"><a onclick="show('less-article'); hide('more-article')" >
<p class="showline">Mutass többet!</p></a>
<br />
</div>
<div id="less-article" style="background-color: lightgray">
<a onclick="show('more-article'); hide('less-article')" >
<p class="showline">Rejtsd el!</p></a> 
<br />
<p class="main">
<?php
echo $my_article_body;
?>
</p>
</div>

<p class="headfoot" align="right">
	&nbsp; Forrás: &nbsp;
	<font color="#FFFFFF"><span style="background-color: #000000;">&nbsp; 
<?php
echo $my_article_footer;
?>
 &nbsp;</span> </font></p>
</div>

<?php
//die;
?>

<center>

<form action="article_add2sectionfolder.php" method="post">
	<input type="hidden" name="section" value= "<?php echo $my_section; ?>" />
	<input type="hidden" name="expiration" value= "<?php echo $my_expiration; ?>" />
	<input type="hidden" name="title" value= "<?php echo $my_title; ?> " />
	<input type="hidden" name="head" value= "<?php echo $my_article_head; ?> " />
	<input type="hidden" name="body" value= "<?php echo $my_article_body; ?> " />
	<input type="hidden" name="footer" value= "<?php echo $my_article_footer; ?> " />
    <input type="submit" value=" Add a MAGazinhoz " />
</form>
</center>
 </fieldset>

<p class="main">
<center>
	Adminisztrátor:<br />
	sry@sryer.com, administrator@sryer.com, administrator@b6.hu <br />
	&nbsp;<br />
	<p align="center">
	<img border="0" src="../aMAGazinImages/header/yinguInTheSky1.gif" width="200" height="141"></p>           
	&nbsp;<br />
	&nbsp;<br />
	<hr><hr>
	&nbsp;<br />
</center>
</p>

</div>

</body>

</html>
