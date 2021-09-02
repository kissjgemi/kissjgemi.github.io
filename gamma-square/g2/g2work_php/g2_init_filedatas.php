<?php

// ---
// konstansok

$current_date = getdate();

$init_filenevek = "g2_init_filenames.php";

$domain_root = "http://gamma-square.com/";

$prg_dirs = array (	"artreviews"=> "g2/g2art_reviews/",
					"artsystems"=> "g2/g2art_systems/",
					"artimages"=> "g2/g2art_img/",
					"workcss"=> "g2/g2work_css/",
					"workimages"=> "g2/g2work_img/",
					"workjs"=> "g2/g2work_js/",
					"workphp"=> "g2/g2work_php/",
					"worktemplates"=> "g2/g2work_templates/"
					);

$menu_list = array ( "name" => array (	"000",
										"Articles",
										"Rankings",
										"Systems",
										"04.",
										"05.",
										"06.",
										"07.",
										"08.",
										"09.",
										"10." 
										) , 
                       "dir" => array (	"g2/",
										"../",
										"../",
										"../",
										"",
										"",
										"",
										"",
										"",
										"",
										""
										) ,
                       "url" => array (	3,
										$domain_root."indexOFreviews.html",
										$domain_root."indexOFrankings.html",
										$domain_root."indexOFsystems.html",
										"04",
										"05",
										"06",
										"07",
										"08",
										"09",
										"10"
										)
										);  

// url


$css_pre_url = $prg_dirs['workcss']."g2prehistorik.css";

$css_home_grandzero_url = $prg_dirs['workcss']."g2randzero4home.css";
$css_home_large_url = $prg_dirs['workcss']."g2randlandscape4home.css";
$css_home_small_url = $prg_dirs['workcss']."g2randportrait4home.css";

$css_reviews_grandzero_url = $prg_dirs['workcss']."g2randzero4reviews.css";
$css_reviews_large_url = $prg_dirs['workcss']."g2randlandscape4reviews.css";
$css_reviews_small_url = $prg_dirs['workcss']."g2randportrait4reviews.css";

$css_rankings_grandzero_url = $prg_dirs['workcss']."g2randzero4ranking.css";
$css_rankings_large_url = $prg_dirs['workcss']."g2randlandscape4ranking.css";
$css_rankings_small_url = $prg_dirs['workcss']."g2randportrait4ranking.css";

$css_systems_grandzero_url = $prg_dirs['workcss']."g2randzero4systems.css";
$css_systems_large_url = $prg_dirs['workcss']."g2randlandscape4systems.css";
$css_systems_small_url = $prg_dirs['workcss']."g2randportrait4systems.css";

$css_article_grandzero_url = $prg_dirs['workcss']."g2randzero4reviewArticle.css";
$css_article_large_url = $prg_dirs['workcss']."g2randlandscape4reviewArticle.css";
$css_article_small_url = $prg_dirs['workcss']."g2randportrait4reviewArticle.css";

$mail_to_01 = "b6@b6.hu";

$prg_url_home = $domain_root;

// ---
// html programok

$prg_pages = array ( "index"=> "index.html",
                     "page02"=> "",
                     "page03"=> "",
                     "page04"=> "",
                     "page05"=> "",
                     "page06"=> "",
                     );

// ---

$txt_titel = array ( "index"=> "Gamma-square A1",
                     "title01"=> "",
                     "title02"=> "",
                     "title03"=> "",
                     "title04"=> "",
                     "title05"=> "",
                     "title06"=> "",
                     );

// ---
$txt_keyword = array ( "keyword00"=> "reviews, rankings, good game, games",
                       "keyword01"=> "",
                       "keyword02"=> "",
                       "keyword03"=> "",
                       "keyword04"=> "",
                       "keyword05"=> "",
                       "keyword06"=> "",
                       );

// ---
$txt_description = array ( "description00"=> "egyedi öteletek, szolgáltatások, korn ranyt, egyedi megoldások",
                           "description01"=> "",
                           "description02"=> "",
                           "description03"=> "",
                           "description04"=> "",
                           "description05"=> "",
                           "description06"=> "",
                           );

// ---

?>