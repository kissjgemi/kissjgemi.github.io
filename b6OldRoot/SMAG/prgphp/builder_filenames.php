<?php

$current_date = getdate();
$current_year = date("Y");
$current_month = date("Y-m");

$none = "";

$back_to_prg_root = "../";			// "http://mag.b6.hu/";

$filenames = array ("index" => "index.html",
			"administrator" => "b6admin.html",
			"sections" => "section.btxt",
			"section_styles" => "04_sections.css",
			"styles" => "styles.css",
			"js" => "jscript.js",
			"frontpage" => $back_to_prg_root . 'aMAGazinImages/bg.jpg',
			"builder4index" => "builder4index.php",
			"topicwriter" => "topicwriter.php",
			"delete_article" => "delete_article.php",
			"refresh_weather" => "refresh_weather.php",
			"refresh_lotto" => "refresh_lotto.php",
			"builder_variables" => $back_to_prg_root . "builder_variable_pathes.php",
			"builder_filenames" => "builder_filenames.php");

$prg_dirs = array (	"index" => $back_to_prg_root,
					"archiv" => $back_to_prg_root . 'aMAGazinArchives/' . $current_year . "/",
					"images" => $back_to_prg_root . '_uploaded_images/' . $current_month . "/",
					"images4article" => '_uploaded_images/' . $current_month . "/",
					"backgrounds" => $back_to_prg_root . 'aMAGazinImages/backgrounds/',
					"administrator" => $back_to_prg_root,
                    "sections" => $back_to_prg_root . 'aMAGazinSections/',
					"sections_styles" => 'aMAGazinStyles/',
                    "styles" => 'aMAGazinStyles/',
                    "js" => 'prgjs/',
                    "php" => 'prgphp/',
                    "templates" => $back_to_prg_root . 'prgtemplates/');

$txt_titel = array ( "title00" => "MAGazin",
                     "title01" => "MAGazin writer",
                     "title02" => "02",
                     "title99" => "SRYER.COM"
                     );
$txt_keyword = array ( "keyword00" => "magazin, napilap, újság, média, mti, szórakozás, életmód, tájékoztatás",
                       "keyword01" => "01",
                       "keyword02" => "02",
                       "keyword99" => "SRYER.COM"
                       );
$txt_description = array ( 	"description00" => "tudományosan szórakoztató magazin",
							"description01" => "01",
							"description02" => "02",
							"description99" => "SRYER.COM"
							);

$revisit01 = "3 day";
$mail_to01 = "sry@sryer.com";
$prg_url01 = "http://mag.b6.hu/";


?>
