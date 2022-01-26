<?php


$target_file = "s03_1.btxt";
$first_head = true;

function make_s03_1 ($source_path){

global $target_file, $file_s03_1, $first_head, $tablecell, $paragraph;
	
$file_stored = fopen( $source_path , 'r') or exit("Unable to open $source_path");
echo $source_path . "<br />";
$isbody = false;
$istable = false;
$tablerow = -1; // 0. a fejléc esetleg 1. is, ezért és 6-ig számolok
$newstring = "";

while(!feof($file_stored)){
if ( $tablerow < 7 ) {
	if ( $isbody ){
		if ( $istable ){
				echo $newstring;
				// fwrite ( $file_s03_1 , $newstring );
					$pos = strpos( $newstring , "<td");
						if ( $pos !== false )	{
						$pos = strpos( $newstring , ">");
						$newstring = substr ($newstring, $pos + 1);
						$pos = strpos( $newstring , "<");
						$newstring = substr ($newstring, 0, $pos );
						array_push ( $tablecell[$tablerow] , $newstring );
					}else{
						$pos = strpos( $newstring , "<th");
						if ( $pos !== false )	{
						$pos = strpos( $newstring , ">");
						$newstring = substr ($newstring, $pos + 1);
						$pos = strpos( $newstring , "<");
						$newstring = substr ($newstring, 0, $pos );
						array_push ( $tablecell[$tablerow] , $newstring );
						}
					}

		} else {
			$pos = strpos( $newstring , "<p");
			if ( $pos !== false )	{
				echo $newstring;
				// fwrite ( $file_s03_1 , $newstring );
				array_push ( $paragraph , $newstring );
			}
			$pos = strpos( $newstring , "<table");
			if ( $pos !== false )	{
				echo $newstring;
				$istable = true;
				// fwrite ( $file_s03_1 , $newstring );
			}
		}
	} else {
	if ( $first_head ){
	echo $newstring;
	}
	$startpos = 0;
	$pos = strpos( $newstring , "<body" , $startpos);
	if ( $pos !== false )	{
		$isbody = true;
		}
	}
} else {
	echo "</table><br /><br />";
	// fwrite ( $file_s03_1 , "</table><br /><br /> \n" );
	break;
}	
$newstring = fgets ($file_stored);

$pos = strpos( $newstring , "<tr");

if ( $pos !== false )	{
	$tablerow++;
	}
}
fclose($file_stored);

print_r ( $paragraph );
echo '<br />';
print_r ( $tablecell );
		
}

//-------------------------------------------------------------------
function lotto5(){
	
global $target_file, $file_s03_1, $first_head, $tablecell, $paragraph;

	echo '<br /><br /> function_exists' . '<br />';

fwrite( $file_s03_1 , '<p class="onecolumn"><b> Ötös lottó : </b><br />' . "\n");
echo '5-ös lottó - <br />';

for ($y = 11; $y < 15 ; $y++) {
fwrite( $file_s03_1 , $tablecell[1][$y] . ',' . "\n");
	}
fwrite( $file_s03_1 , $tablecell[1][15] . '</p>' . "\n");

fwrite( $file_s03_1 , '<div id="more-lotto5">');
fwrite( $file_s03_1 , '<a onclick="show(\'less-lotto5\'); hide(\'more-lotto5\')" >' . "\n");			
fwrite( $file_s03_1 , '<p class="showline">Mutass többet!</p></a>' . "\n");			
fwrite( $file_s03_1 , '</div>' . "\n");
fwrite( $file_s03_1 , '<div id="less-lotto5" style="display: none; background-color: lightgray">');
fwrite( $file_s03_1 , '<a onclick="show(\'more-lotto5\'); hide(\'less-lotto5\')" >' . "\n");			
fwrite( $file_s03_1 , '<p class="showline">Rejtsd el!</p></a>' . "\n");			

	for ($x = 1; $x < 6 ; $x++) {

fwrite( $file_s03_1 , '<p class="onecolumn">' . "\n");		

fwrite( $file_s03_1 , '<u>A ' . $tablecell[$x][0] . '.év ');
fwrite( $file_s03_1 , $tablecell[$x][1] . '.hét ( ');
fwrite( $file_s03_1 , $tablecell[$x][2] . ' )</u><br />' . "\n");
fwrite( $file_s03_1 , '<i>- eredményei: ' . "\n");
	for ($y = 11; $y < 15 ; $y++) {
fwrite( $file_s03_1 , $tablecell[$x][$y] . '|' . "\n");
	}
fwrite( $file_s03_1 , $tablecell[$x][15] . '<br />' . "\n");
fwrite( $file_s03_1 , '- nyereményei: ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">5 találat ' . $tablecell[$x][4] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][3] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">4 találat ' . $tablecell[$x][6] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][5] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">3 találat ' . $tablecell[$x][8] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][7] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">2 találat ' . $tablecell[$x][10] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][9] . ' db ).</span> ' . "\n");

echo $tablecell[$x][0] . '/' . $tablecell[$x][1] . '/' . $tablecell[$x][2] . '<br />';

fwrite( $file_s03_1 , '</i></p>' . "\n");
	if ( $x == 1 ) 	{

	}
	}
fwrite( $file_s03_1 , '</p></div>' . "\n");
}

//-------------------------------------------------------------------
function lotto6(){
	
global $target_file, $file_s03_1, $first_head, $tablecell, $paragraph;

	echo '<br /><br /> function_exists' . '<br />';

fwrite( $file_s03_1 , '<p class="onecolumn"><b> Hatos lottó : </b><br />' . "\n");
echo '6-os lottó - <br />';
	for ($y = 13; $y < 18 ; $y++) {
fwrite( $file_s03_1 , $tablecell[1][$y] . ',' . "\n");
	}
fwrite( $file_s03_1 , $tablecell[1][18] . '</p>' . "\n");

fwrite( $file_s03_1 , '<div id="more-lotto6">');
fwrite( $file_s03_1 , '<a onclick="show(\'less-lotto6\'); hide(\'more-lotto6\')" >' . "\n");			
fwrite( $file_s03_1 , '<p class="showline">Mutass többet!</p></a>' . "\n");			
fwrite( $file_s03_1 , '</div>' . "\n");
fwrite( $file_s03_1 , '<div id="less-lotto6" style="display: none; background-color: lightgray">');
fwrite( $file_s03_1 , '<a onclick="show(\'more-lotto6\'); hide(\'less-lotto6\')" >' . "\n");			
fwrite( $file_s03_1 , '<p class="showline">Rejtsd el!</p></a>' . "\n");			

	for ($x = 1; $x < 6 ; $x++) {

	fwrite( $file_s03_1 , '<p class="onecolumn">' . "\n");		

fwrite( $file_s03_1 , '<u>A ' . $tablecell[$x][0] . '.év ');
fwrite( $file_s03_1 , $tablecell[$x][1] . '.hét ( ');
fwrite( $file_s03_1 , $tablecell[$x][2] . ' )</u><br />' . "\n");
fwrite( $file_s03_1 , '<i>- eredményei: ' . "\n");
	for ($y = 13; $y < 18 ; $y++) {
fwrite( $file_s03_1 , $tablecell[$x][$y] . '|' . "\n");
	}
fwrite( $file_s03_1 , $tablecell[$x][18] . '<br />' . "\n");
fwrite( $file_s03_1 , '- nyereményei: ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">6 találat ' . $tablecell[$x][4] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][3] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">5+1 találat ' . $tablecell[$x][6] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][5] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">5 találat ' . $tablecell[$x][8] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][7] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">4 találat ' . $tablecell[$x][10] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][9] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">3 találat ' . $tablecell[$x][12] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][11] . ' db ).</span> ' . "\n");

echo $tablecell[$x][0] . '/' . $tablecell[$x][1] . '/' . $tablecell[$x][2] . '<br />';

fwrite( $file_s03_1 , '</i></p>' . "\n");
	if ( $x == 1 ) 	{

	}
	}
fwrite( $file_s03_1 , '</p></div>' . "\n");
}

//-------------------------------------------------------------------
function lotto7(){
	
global $target_file, $file_s03_1, $first_head, $tablecell, $paragraph;

	echo '<br /><br /> function_exists' . '<br />';

fwrite( $file_s03_1 , '<p class="onecolumn"><b> Skandináv lottó : </b><br />' . "\n");
echo 'Skandináv lottó - <br />';
fwrite( $file_s03_1 , '<i>- gépi húzás: ' . "\n");
	for ($y = 11; $y < 17 ; $y++) {
fwrite( $file_s03_1 , $tablecell[2][$y] . ',' . "\n");
	}
fwrite( $file_s03_1 , $tablecell[2][17] . '<br />' . "\n");
fwrite( $file_s03_1 , '<i>- kézi húzás: ' . "\n");
	for ($y = 18; $y < 24 ; $y++) {
fwrite( $file_s03_1 , $tablecell[2][$y] . ',' . "\n");
	}
fwrite( $file_s03_1 , $tablecell[2][24] . '</p>' . "\n");

fwrite( $file_s03_1 , '<div id="more-lotto7">');
fwrite( $file_s03_1 , '<a onclick="show(\'less-lotto7\'); hide(\'more-lotto7\')" >' . "\n");			
fwrite( $file_s03_1 , '<p class="showline">Mutass többet!</p></a>' . "\n");			
fwrite( $file_s03_1 , '</div>' . "\n");
fwrite( $file_s03_1 , '<div id="less-lotto7" style="display: none; background-color: lightgray">');
fwrite( $file_s03_1 , '<a onclick="show(\'more-lotto7\'); hide(\'less-lotto7\')" >' . "\n");			
fwrite( $file_s03_1 , '<p class="showline">Rejtsd el!</p></a>' . "\n");			

	for ($x = 2; $x < 7 ; $x++) {

fwrite( $file_s03_1 , '<p class="onecolumn">' . "\n");		

fwrite( $file_s03_1 , '<u>A ' . $tablecell[$x][0] . '.év ');
fwrite( $file_s03_1 , $tablecell[$x][1] . '.hét ( ');
fwrite( $file_s03_1 , $tablecell[$x][2] . ' )</u><br />' . "\n");
fwrite( $file_s03_1 , '<i>- gépi húzás: ' . "\n");
	for ($y = 11; $y < 17 ; $y++) {
fwrite( $file_s03_1 , $tablecell[$x][$y] . '|' . "\n");
	}
fwrite( $file_s03_1 , $tablecell[$x][17] . '<br />' . "\n");
fwrite( $file_s03_1 , '<i>- kézi húzás: ' . "\n");
	for ($y = 18; $y < 24 ; $y++) {
fwrite( $file_s03_1 , $tablecell[$x][$y] . '|' . "\n");
	}
fwrite( $file_s03_1 , $tablecell[$x][24] . '<br />' . "\n");

fwrite( $file_s03_1 , '- nyereményei: ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">7 találat ' . $tablecell[$x][4] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][3] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">6 találat ' . $tablecell[$x][6] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][5] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">5 találat ' . $tablecell[$x][8] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][7] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">4 találat ' . $tablecell[$x][10] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][9] . ' db );</span> ' . "\n");

echo $tablecell[$x][0] . '/' . $tablecell[$x][1] . '/' . $tablecell[$x][2] . '<br />';

fwrite( $file_s03_1 , '</i></p>' . "\n");
	if ( $x == 2 ) 	{

	}
	}
fwrite( $file_s03_1 , '</p></div>' . "\n");
}

//-------------------------------------------------------------------
function goltoto(){
	
global $target_file, $file_s03_1, $first_head, $tablecell, $paragraph;

	echo '<br /><br /> function_exists' . '<br />';

fwrite( $file_s03_1 , '<p class="onecolumn"><b> Góltotó : </b><br />' . "\n");
echo 'Góltotó - <br />';
	for ($y = 10; $y < 23 ; $y++) {
fwrite( $file_s03_1 , $tablecell[1][$y] . ',' . "\n");
	}
fwrite( $file_s03_1 , $tablecell[1][23] . '</p>' . "\n");

fwrite( $file_s03_1 , '<div id="more-goltoto">');
fwrite( $file_s03_1 , '<a onclick="show(\'less-goltoto\'); hide(\'more-goltoto\')" >' . "\n");			
fwrite( $file_s03_1 , '<p class="showline">Mutass többet!</p></a>' . "\n");			
fwrite( $file_s03_1 , '</div>' . "\n");
fwrite( $file_s03_1 , '<div id="less-goltoto" style="display: none; background-color: lightgray">');
fwrite( $file_s03_1 , '<a onclick="show(\'more-goltoto\'); hide(\'less-goltoto\')" >' . "\n");			
fwrite( $file_s03_1 , '<p class="showline">Rejtsd el!</p></a>' . "\n");			

	for ($x = 1; $x < 6 ; $x++) {

fwrite( $file_s03_1 , '<p class="onecolumn">' . "\n");		

fwrite( $file_s03_1 , '<u>A ' . $tablecell[$x][0] . '.év ');
fwrite( $file_s03_1 , $tablecell[$x][1] . '.hét ');
fwrite( $file_s03_1 , $tablecell[$x][2] . '.forduló</u><br />' . "\n");
fwrite( $file_s03_1 , '<i>- eredményei: ' . "\n");
	for ($y = 10; $y < 23 ; $y++) {
fwrite( $file_s03_1 , $tablecell[$x][$y] . '|' . "\n");
	}
fwrite( $file_s03_1 , $tablecell[$x][23] . '<br />' . "\n");
fwrite( $file_s03_1 , '- nyereményei: ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">6 találat ' . $tablecell[$x][5] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][4] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">5 találat ' . $tablecell[$x][7] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][6] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">4 találat ' . $tablecell[$x][9] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][8] . ' db ).</span> ' . "\n");

echo $tablecell[$x][0] . '/' . $tablecell[$x][1] . '/' . $tablecell[$x][2] . '<br />';

fwrite( $file_s03_1 , '</i></p>' . "\n");
	if ( $x == 1 ) 	{

	}
	}
fwrite( $file_s03_1 , '</p></div>' . "\n");

}//-------------------------------------------------------------------
function toto(){
	
global $target_file, $file_s03_1, $first_head, $tablecell, $paragraph;

	echo '<br /><br /> function_exists' . '<br />';

fwrite( $file_s03_1 , '<p class="onecolumn"><b> Totó 13+1 : </b><br />' . "\n");
echo 'Totó - <br />';
	for ($y = 14; $y < 28 ; $y++) {
fwrite( $file_s03_1 , $tablecell[1][$y] . ',' . "\n");
	}
fwrite( $file_s03_1 , $tablecell[1][28] . '</p>' . "\n");

fwrite( $file_s03_1 , '<div id="more-toto">');
fwrite( $file_s03_1 , '<a onclick="show(\'less-toto\'); hide(\'more-toto\')" >' . "\n");			
fwrite( $file_s03_1 , '<p class="showline">Mutass többet!</p></a>' . "\n");			
fwrite( $file_s03_1 , '</div>' . "\n");
fwrite( $file_s03_1 , '<div id="less-toto" style="display: none; background-color: lightgray">');
fwrite( $file_s03_1 , '<a onclick="show(\'more-toto\'); hide(\'less-toto\')" >' . "\n");			
fwrite( $file_s03_1 , '<p class="showline">Rejtsd el!</p></a>' . "\n");			

	for ($x = 1; $x < 6 ; $x++) {

fwrite( $file_s03_1 , '<p class="onecolumn">' . "\n");		

fwrite( $file_s03_1 , '<u>A ' . $tablecell[$x][0] . '.év ');
fwrite( $file_s03_1 , $tablecell[$x][1] . '.hét ');
fwrite( $file_s03_1 , $tablecell[$x][2] . '.forduló</u><br />' . "\n");
fwrite( $file_s03_1 , '<i>- eredményei: ' . "\n");
	for ($y = 14; $y < 28 ; $y++) {
fwrite( $file_s03_1 , $tablecell[$x][$y] . '|' . "\n");
	}
fwrite( $file_s03_1 , $tablecell[$x][28] . '<br />' . "\n");
fwrite( $file_s03_1 , '- nyereményei: ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">13+1 találat ' . $tablecell[$x][5] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][4] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">13 találat ' . $tablecell[$x][7] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][6] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">12 találat ' . $tablecell[$x][9] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][8] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">11 találat ' . $tablecell[$x][11] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][10] . ' db );</span> ' . "\n");
fwrite( $file_s03_1 , '<span style=" white-space: nowrap;">10 találat ' . $tablecell[$x][13] . " ( \n");
fwrite( $file_s03_1 , $tablecell[$x][12] . ' db ).</span> ' . "\n");

echo $tablecell[$x][0] . '/' . $tablecell[$x][1] . '/' . $tablecell[$x][2] . '<br />';

fwrite( $file_s03_1 , '</i></p>' . "\n");
	if ( $x == 1 ) 	{

	}
	}
fwrite( $file_s03_1 , '</p></div>' . "\n");
}

//--------------------------------------------------------------------
$file_s03_1 = fopen( $target_file , 'w') or exit("Unable to open $target_file");
fwrite( $file_s03_1 , '<div class="parabellum">' . "\n");

$paragraph = array();
$tablecell = array( array () , array() , array() , array() , array() , array() );
$datafile = "data_lotto5.btxt";
make_s03_1( $datafile );
lotto5();
$first_head = false;

unset($paragraph);
$paragraph = array();
unset($tablecell);
$tablecell = array( array () , array() , array() , array() , array() , array() );
$datafile = "data_lotto6.btxt";
make_s03_1( $datafile );
lotto6();

unset($paragraph);
$paragraph = array();
unset($tablecell);
$tablecell = array( array () , array() , array() , array() , array() , array() , array() );
$datafile = "data_lotto7.btxt";
make_s03_1( $datafile );
lotto7();

unset($paragraph);
$paragraph = array();
unset($tablecell);
$tablecell = array( array () , array() , array() , array() , array() , array() );
$datafile = "data_toto.btxt";
make_s03_1( $datafile );
toto();

unset($paragraph);
$paragraph = array();
unset($tablecell);
$tablecell = array( array () , array() , array() , array() , array() , array() );
$datafile = "data_totogol.btxt";
make_s03_1( $datafile );
goltoto();

//unset($paragraph);
//$paragraph = array();
//unset($tablecell);
//$tablecell = array( array () , array() , array() , array() , array() , array() );
//$datafile = "data_luxor.btxt";
//make_s03_1( $datafile );

//unset($paragraph);
//$paragraph = array();
//unset($tablecell);
//$tablecell = array( array () , array() , array() , array() , array() , array() );
//$datafile = "data_keno.btxt";
//make_s03_1( $datafile );

//unset($paragraph);
//$paragraph = array();
//unset($tablecell);
//$tablecell = array( array () , array() , array() , array() , array() , array() );
//$datafile = "data_joker.btxt";
//make_s03_1( $datafile );

//unset($paragraph);
//$paragraph = array();
//unset($tablecell);
//$tablecell = array( array () , array() , array() , array() , array() , array() );
//$datafile = "data_eurojackpot.btxt";
//make_s03_1( $datafile );

unset($paragraph);
// $paragraph = array();
unset($tablecell);
// $tablecell = array( array () , array() , array() , array() , array() , array() );

$aktualtimestamp = time() ;
$ahetnapjai = array ( "vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat");

$todayDate = date("Y.m.d., ", $aktualtimestamp);
$today = $ahetnapjai [ date( "w", $aktualtimestamp) ];
$todayTime = date("  H:i ", $aktualtimestamp);
$todayDateTime = $todayDate . $today . $todayTime;

fwrite( $file_s03_1 , '<br />' . "\n");
fwrite( $file_s03_1 , '<br /></p><p class="headfoot" align="right">');
fwrite( $file_s03_1 , 'A Szerencsejáték Zrt. tájékoztatása alapján ' . $todayDateTime );
fwrite( $file_s03_1 , '</p></div>' . "\n");
fclose($file_s03_1);

?>
