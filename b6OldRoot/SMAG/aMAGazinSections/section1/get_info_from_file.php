<?php

$datafile = "weather.btxt";

$magazinfile = "s01_1.btxt";


$weather_datum = array ("1111.11.11.",
						"1111.11.11.",
						"1111.11.11.",
						"1111.11.11.",
						"1111.11.11.",
						"1111.11.11.",
						"1111.11.11.");
						
$weather_text  = array ("napos, felhős",
						"napos, felhős",
						"napos, felhős",
						"napos, felhős",
						"napos, felhős",
						"napos, felhős",
						"napos, felhős");
						
$weather_icon  = array ("01.png", "01.png", "01.png", "01.png", "01.png", "01.png", "01.png" );

$weather_days  = array ("hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat", "vasárnap" );


function clean_file ( $saved_path ){
	
	global $weather_datum , $weather_days , $weather_icon , $weather_text ;
	
	$file_saved = fopen( $saved_path , "r") or exit("Unable to open source file!");
	echo $saved_path . "<br>";

$stepp = 0;
$keystring  = "div class='nap";
echo $keystring . "<br>";	
	
while(!feof($file_saved)){
	
switch ( $stepp ) {
    case 0:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				// echo $newString;
				if ( $newString == $keystring[$x] ){
					$stepp = 1;
				} else {
					$stepp = 0;
					break;
				}
			}
		 // echo "<br>";	
		break;
    case 1:
		while ($newString !== "2" ){
			$newString = fgetc ($file_saved);
		}
		$datum = $newString;
		for ($x = 0; $x < 10 ; $x++) {
		$datum .= fgetc ($file_saved);
		}
		echo $datum . "<br>";
		$weather_datum[0] = $datum;
		
		$stepp = 2;
		$keystring = "div class=\\'bubox\\'";
		echo $keystring. "<br>";	
        break;
    case 2:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				
				if ( $newString == $keystring[$x] ){
					$stepp = 3;
				} else {
					$stepp = 2;
					break;
				} 
			}
        $newString = fgetc ($file_saved);
		// echo "<br>";	
        break;
   case 3:
		$text = "";
		while ($newString !== ";" ){
			$newString = fgetc ($file_saved);
		}
		$newString = fgetc ($file_saved);
		while ($newString !== "<" ){
			$text .= $newString;
			$newString = fgetc ($file_saved);
		}
		echo $text . "<br>";
		$weather_days[0] = $text;
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved); // div>
		$text = "";
		while ($newString !== "<" ){
			$text .= $newString;
			$newString = fgetc ($file_saved);
		}
		echo $text . "<br>";
		$weather_text[0] = $text;
		$stepp = 4;
		$keystring = "img src='/images/15idokep35/";
		echo $keystring. "<br>";	
        break;  
   case 4:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				// echo $newString;
				if ( $newString == $keystring[$x] ){
					$stepp = 5;
				} else {
					$stepp = 4;
					break;
				} 
			}
		// echo "<br>";	
        break;  
   case 5:
		$icon = "";
		for ($x = 0; $x < 6 ; $x++) {
		$icon .= fgetc ($file_saved);
		}
		echo $icon . "<br>";
		$weather_icon[0] = $icon;

		$stepp = 6;
		$keystring = "div class='nap" ;
		echo $keystring. "<br>";	
// --------------------------------------------------------
    case 6:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				// echo $newString;
				if ( $newString == $keystring[$x] ){
					$stepp = 7;
				} else {
					$stepp = 6;
					break;
				} 
			}
		// echo "<br>";	
		break;
    case 7:
		while ($newString !== "2" ){
			$newString = fgetc ($file_saved);
		}
		$datum = $newString;
		for ($x = 0; $x < 10 ; $x++) {
		$datum .= fgetc ($file_saved);
		}
		echo $datum . "<br>";
		$weather_datum[1] = $datum;
		
		$stepp = 8;
		$keystring = "div class=\\'bubox\\'";
		echo $keystring. "<br>";	
        break;
    case 8:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				
				if ( $newString == $keystring[$x] ){
					$stepp = 9;
				} else {
					$stepp = 8;
					break;
				} 
			}
        $newString = fgetc ($file_saved);
		// echo "<br>";	
        break;
   case 9:
		$text = "";
		while ($newString !== ";" ){
			$newString = fgetc ($file_saved);
		}
		$newString = fgetc ($file_saved);
		while ($newString !== "<" ){
			$text .= $newString;
			$newString = fgetc ($file_saved);
		}
		echo $text . "<br>";
		$weather_days[1] = $text;
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved); // div>
		$text = "";
		while ($newString !== "<" ){
			$text .= $newString;
			$newString = fgetc ($file_saved);
		}
		echo $text . "<br>";
		$weather_text[1] = $text;
		$stepp = 10;
		$keystring = "img src='/images/15idokep35/";
		echo $keystring. "<br>";	
        break;  
   case 10:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				// echo $newString;
				if ( $newString == $keystring[$x] ){
					$stepp = 11;
				} else {
					$stepp = 10;
					break;
				} 
			}
		// echo "<br>";	
        break;
   case 11:
		$icon = "";
		for ($x = 0; $x < 6 ; $x++) {
		$icon .= fgetc ($file_saved);
		}
		echo $icon . "<br>";
		$weather_icon[1] = $icon;

		$stepp = 12;
		$keystring = "div class='nap" ;
		echo $keystring. "<br>";	
// --------------------------------------------------------
	case 12:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				// echo $newString;
				if ( $newString == $keystring[$x] ){
					$stepp = 13;
				} else {
					$stepp = 12;
					break;
				} 
			}
		// echo "<br>";	
		break;
    case 13:
		while ($newString !== "2" ){
			$newString = fgetc ($file_saved);
		}
		$datum = $newString;
		for ($x = 0; $x < 10 ; $x++) {
		$datum .= fgetc ($file_saved);
		}
		echo $datum . "<br>";
		$weather_datum[2] = $datum;
		
		$stepp = 14;
		$keystring = "div class=\\'bubox\\'";
		echo $keystring. "<br>";	
        break;
    case 14:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				
				if ( $newString == $keystring[$x] ){
					$stepp = 15;
				} else {
					$stepp = 14;
					break;
				} 
			}
        $newString = fgetc ($file_saved);
		// echo "<br>";	
        break;
   case 15:
		$text = "";
		while ($newString !== ";" ){
			$newString = fgetc ($file_saved);
		}
		$newString = fgetc ($file_saved);
		while ($newString !== "<" ){
			$text .= $newString;
			$newString = fgetc ($file_saved);
		}
		echo $text . "<br>";
		$weather_days[2] = $text;
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved); // div>
		$text = "";
		while ($newString !== "<" ){
			$text .= $newString;
			$newString = fgetc ($file_saved);
		}
		echo $text . "<br>";
		$weather_text[2] = $text;
		$stepp = 16;
		$keystring = "img src='/images/15idokep35/";
		echo $keystring. "<br>";	
        break;
   case 16:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				// echo $newString;
				if ( $newString == $keystring[$x] ){
					$stepp = 17;
				} else {
					$stepp = 16;
					break;
				} 
			}
		// echo "<br>";	
        break;
   case 17:
		$icon = "";
		for ($x = 0; $x < 6 ; $x++) {
		$icon .= fgetc ($file_saved);
		}
		echo $icon . "<br>";
		$weather_icon[2] = $icon;

		$stepp = 18;
		$keystring = "div class='nap" ;
		echo $keystring. "<br>";	
// --------------------------------------------------------
    case 18:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				// echo $newString;
				if ( $newString == $keystring[$x] ){
					$stepp = 19;
				} else {
					$stepp = 18;
					break;
				}
			}
		 // echo "<br>";	
		break;
    case 19:
		while ($newString !== "2" ){
			$newString = fgetc ($file_saved);
		}
		$datum = $newString;
		for ($x = 0; $x < 10 ; $x++) {
		$datum .= fgetc ($file_saved);
		}
		echo $datum . "<br>";
		$weather_datum[3] = $datum;
		
		$stepp = 20;
		$keystring = "div class=\\'bubox\\'";
		echo $keystring. "<br>";	
        break;
    case 20:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				
				if ( $newString == $keystring[$x] ){
					$stepp = 21;
				} else {
					$stepp = 20;
					break;
				} 
			}
        $newString = fgetc ($file_saved);
		// echo "<br>";	
        break;
   case 21:
		$text = "";
		while ($newString !== ";" ){
			$newString = fgetc ($file_saved);
		}
		$newString = fgetc ($file_saved);
		while ($newString !== "<" ){
			$text .= $newString;
			$newString = fgetc ($file_saved);
		}
		echo $text . "<br>";
		$weather_days[3] = $text;
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved); // div>
		$text = "";
		while ($newString !== "<" ){
			$text .= $newString;
			$newString = fgetc ($file_saved);
		}
		echo $text . "<br>";
		$weather_text[3] = $text;
		$stepp = 22;
		$keystring = "img src='/images/15idokep35/";
		echo $keystring. "<br>";	
        break;  
   case 22:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				// echo $newString;
				if ( $newString == $keystring[$x] ){
					$stepp = 23;
				} else {
					$stepp = 22;
					break;
				} 
			}
		// echo "<br>";	
        break;  
   case 23:
		$icon = "";
		for ($x = 0; $x < 6 ; $x++) {
		$icon .= fgetc ($file_saved);
		}
		echo $icon . "<br>";
		$weather_icon[3] = $icon;

		$stepp = 24;
		$keystring = "div class='nap" ;
		echo $keystring. "<br>";	
// --------------------------------------------------------
    case 24:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				// echo $newString;
				if ( $newString == $keystring[$x] ){
					$stepp = 25;
				} else {
					$stepp = 24;
					break;
				}
			}
		 // echo "<br>";	
		break;
    case 25:
		while ($newString !== "2" ){
			$newString = fgetc ($file_saved);
		}
		$datum = $newString;
		for ($x = 0; $x < 10 ; $x++) {
		$datum .= fgetc ($file_saved);
		}
		echo $datum . "<br>";
		$weather_datum[4] = $datum;
		
		$stepp = 26;
		$keystring = "div class=\\'bubox\\'";
		echo $keystring. "<br>";	
        break;
    case 26:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				
				if ( $newString == $keystring[$x] ){
					$stepp = 27;
				} else {
					$stepp = 26;
					break;
				} 
			}
        $newString = fgetc ($file_saved);
		// echo "<br>";	
        break;
   case 27:
		$text = "";
		while ($newString !== ";" ){
			$newString = fgetc ($file_saved);
		}
		$newString = fgetc ($file_saved);
		while ($newString !== "<" ){
			$text .= $newString;
			$newString = fgetc ($file_saved);
		}
		echo $text . "<br>";
		$weather_days[4] = $text;
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved); // div>
		$text = "";
		while ($newString !== "<" ){
			$text .= $newString;
			$newString = fgetc ($file_saved);
		}
		echo $text . "<br>";
		$weather_text[4] = $text;
		$stepp = 28;
		$keystring = "img src='/images/15idokep35/";
		echo $keystring. "<br>";	
        break;  
   case 28:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				// echo $newString;
				if ( $newString == $keystring[$x] ){
					$stepp = 29;
				} else {
					$stepp = 28;
					break;
				} 
			}
		// echo "<br>";	
        break;  
   case 29:
		$icon = "";
		for ($x = 0; $x < 6 ; $x++) {
		$icon .= fgetc ($file_saved);
		}
		echo $icon . "<br>";
		$weather_icon[4] = $icon;

		$stepp = 30;
		$keystring = "div class='nap" ;
		echo $keystring. "<br>";	
// --------------------------------------------------------
    case 30:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				// echo $newString;
				if ( $newString == $keystring[$x] ){
					$stepp = 31;
				} else {
					$stepp = 30;
					break;
				}
			}
		 // echo "<br>";	
		break;
    case 31:
		while ($newString !== "2" ){
			$newString = fgetc ($file_saved);
		}
		$datum = $newString;
		for ($x = 0; $x < 10 ; $x++) {
		$datum .= fgetc ($file_saved);
		}
		echo $datum . "<br>";
		$weather_datum[5] = $datum;
		
		$stepp = 32;
		$keystring = "div class=\\'bubox\\'";
		echo $keystring. "<br>";	
        break;
    case 32:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				
				if ( $newString == $keystring[$x] ){
					$stepp = 33;
				} else {
					$stepp = 32;
					break;
				} 
			}
        $newString = fgetc ($file_saved);
		// echo "<br>";	
        break;
   case 33:
		$text = "";
		while ($newString !== ";" ){
			$newString = fgetc ($file_saved);
		}
		$newString = fgetc ($file_saved);
		while ($newString !== "<" ){
			$text .= $newString;
			$newString = fgetc ($file_saved);
		}
		echo $text . "<br>";
		$weather_days[5] = $text;
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved); // div>
		$text = "";
		while ($newString !== "<" ){
			$text .= $newString;
			$newString = fgetc ($file_saved);
		}
		echo $text . "<br>";
		$weather_text[5] = $text;
		$stepp = 34;
		$keystring = "img src='/images/15idokep35/";
		echo $keystring. "<br>";	
        break;  
   case 34:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				// echo $newString;
				if ( $newString == $keystring[$x] ){
					$stepp = 35;
				} else {
					$stepp = 34;
					break;
				} 
			}
		// echo "<br>";	
        break;  
   case 35:
		$icon = "";
		for ($x = 0; $x < 6 ; $x++) {
		$icon .= fgetc ($file_saved);
		}
		echo $icon . "<br>";
		$weather_icon[5] = $icon;

		$stepp = 36;
		$keystring = "div class='nap" ;
		echo $keystring. "<br>";	
// --------------------------------------------------------
    case 36:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				// echo $newString;
				if ( $newString == $keystring[$x] ){
					$stepp = 37;
				} else {
					$stepp = 36;
					break;
				}
			}
		 // echo "<br>";	
		break;
    case 37:
		while ($newString !== "2" ){
			$newString = fgetc ($file_saved);
		}
		$datum = $newString;
		for ($x = 0; $x < 10 ; $x++) {
		$datum .= fgetc ($file_saved);
		}
		echo $datum . "<br>";
		$weather_datum[6] = $datum;
		
		$stepp = 38;
		$keystring = "div class=\\'bubox\\'";
		echo $keystring. "<br>";	
        break;
    case 38:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				
				if ( $newString == $keystring[$x] ){
					$stepp = 39;
				} else {
					$stepp = 38;
					break;
				} 
			}
        $newString = fgetc ($file_saved);
		// echo "<br>";	
        break;
   case 39:
		$text = "";
		while ($newString !== ";" ){
			$newString = fgetc ($file_saved);
		}
		$newString = fgetc ($file_saved);
		while ($newString !== "<" ){
			$text .= $newString;
			$newString = fgetc ($file_saved);
		}
		echo $text . "<br>";
		$weather_days[6] = $text;
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved);
		$newString = fgetc ($file_saved); // div>
		$text = "";
		while ($newString !== "<" ){
			$text .= $newString;
			$newString = fgetc ($file_saved);
		}
		echo $text . "<br>";
		$weather_text[6] = $text;
		$stepp = 40;
		$keystring = "img src='/images/15idokep35/";
		echo $keystring. "<br>";	
        break;  
   case 40:
		for ($x = 0; $x < strlen($keystring) ; $x++) {
				// echo $keystring[$x];
				$newString = fgetc ($file_saved);
				// echo $newString;
				if ( $newString == $keystring[$x] ){
					$stepp = 41;
				} else {
					$stepp = 40;
					break;
				} 
			}
		// echo "<br>";	
        break;  
   case 41:
		$icon = "";
		for ($x = 0; $x < 6 ; $x++) {
		$icon .= fgetc ($file_saved);
		}
		echo $icon . "<br>";
		$weather_icon[6] = $icon;

		$stepp = 45;
		$keystring = "div class='nap" ;
		echo $keystring. "<br>";	
// --------------------------------------------------------

   case 99:
        $newString = fgetc ($file_saved);
		echo $newString;
        break;
   
	default:
        $newString = fgetc ($file_saved);
		echo $newString;
}

}
	fclose($file_saved);
}

//-------------------------------------------------------

function mb_str_split($string) { 
    return preg_split('/(?<!^)(?!$)/u', $string ); 
} 

//---
//
// $file_saved = fopen( $datafile , "r") or exit("Unable to open source file!");
// echo $saved_path . "<br>";
// while(!feof($file_saved)){
// $chars = mb_str_split(fgets($file_saved));
//	foreach ($chars as $c) {
//		echo $c ;
//	}
//}
//fclose($file_saved);
//
//-------------------------------------------------------
	
clean_file( $datafile );

print_r($weather_datum);
echo "<br>";	
print_r($weather_days);
echo "<br>";	
print_r($weather_icon);
echo "<br>";	
print_r($weather_text);
echo "<br>";	
echo "<br>";	
echo "<br>";	
echo "<br>";	

$targetfile = fopen( $magazinfile , "w") or exit("Unable to open file!");
echo 'Meteorológia encoding to s01_1.btxt...<br /><br />';

fwrite( $targetfile , '<div class="parabellum"><p class="onecolumn">' . "\n");
fwrite( $targetfile , '<b><i>' . $weather_datum[0] . '</i> (' . $weather_days[0] . ') </b><br />' . "\n");
echo '<b><i>' . $weather_datum[0] . '</i> (' . $weather_days[0] . ') </b><br />' . "\n";
fwrite( $targetfile , $weather_text[0] . "\n");
echo $weather_text[0] . '<br />';
fwrite( $targetfile , '</p>' . "\n");

fwrite( $targetfile , '<div id="more-weather">');
fwrite( $targetfile , '<a onclick="show(\'less-weather\'); hide(\'more-weather\')" >' . "\n");			
fwrite( $targetfile , '<p class="showline">Mutass többet!</p></a>' . "\n");			
fwrite( $targetfile , '</div>' . "\n");
fwrite( $targetfile , '<div id="less-weather" style="display: none; background-color: lightgray">');
fwrite( $targetfile , '<a onclick="show(\'more-weather\'); hide(\'less-weather\')" >' . "\n");			
fwrite( $targetfile , '<p class="showline">Rejtsd el!</p></a>' . "\n");			

fwrite( $targetfile , '<p class="onecolumn">' . "\n");
fwrite( $targetfile , '<b><i>' . $weather_datum[1] . '</i> (' . $weather_days[1] . ') </b><br />' . "\n");
echo '<b><i>' . $weather_datum[1] . '</i> (' . $weather_days[1] . ') </b><br />' . "\n";
fwrite( $targetfile , $weather_text[1] . "\n");
echo $weather_text[1] . '<br />';
fwrite( $targetfile , '</p>' . "\n");


fwrite( $targetfile , '<p class="onecolumn">' . "\n");
fwrite( $targetfile , '<b><i>' . $weather_datum[2] . '</i> (' . $weather_days[2] . ') </b><br />' . "\n");
echo '<b><i>' . $weather_datum[2] . '</i> (' . $weather_days[2] . ') </b><br />' . "\n";
fwrite( $targetfile , $weather_text[2] . "\n");
echo $weather_text[1] . '<br />';
fwrite( $targetfile , '</p>' . "\n");


fwrite( $targetfile , '<p class="onecolumn">' . "\n");
fwrite( $targetfile , '<b><i>' . $weather_datum[3] . '</i> (' . $weather_days[3] . ') </b><br />' . "\n");
echo '<b><i>' . $weather_datum[3] . '</i> (' . $weather_days[3] . ') </b><br />' . "\n";
fwrite( $targetfile , $weather_text[3] . "\n");
echo $weather_text[1] . '<br />';
fwrite( $targetfile , '</p>' . "\n");


fwrite( $targetfile , '<p class="onecolumn">' . "\n");
fwrite( $targetfile , '<b><i>' . $weather_datum[4] . '</i> (' . $weather_days[4] . ') </b><br />' . "\n");
echo '<b><i>' . $weather_datum[4] . '</i> (' . $weather_days[4] . ') </b><br />' . "\n";
fwrite( $targetfile , $weather_text[4] . "\n");
echo $weather_text[1] . '<br />';
fwrite( $targetfile , '</p>' . "\n");


fwrite( $targetfile , '<p class="onecolumn">' . "\n");
fwrite( $targetfile , '<b><i>' . $weather_datum[5] . '</i> (' . $weather_days[5] . ') </b><br />' . "\n");
echo '<b><i>' . $weather_datum[5] . '</i> (' . $weather_days[5] . ') </b><br />' . "\n";
fwrite( $targetfile , $weather_text[5] . "\n");
echo $weather_text[1] . '<br />';
fwrite( $targetfile , '</p>' . "\n");


fwrite( $targetfile , '<p class="onecolumn">' . "\n");
fwrite( $targetfile , '<b><i>' . $weather_datum[6] . '</i> (' . $weather_days[6] . ') </b><br />' . "\n");
echo '<b><i>' . $weather_datum[6] . '</i> (' . $weather_days[6] . ') </b><br />' . "\n";
fwrite( $targetfile , $weather_text[6] . "\n");
echo $weather_text[1] . '<br />';
fwrite( $targetfile , '</p>' . "\n");

fwrite( $targetfile , '</div>' . "\n");

fwrite( $targetfile , '<p class="onecolumn">' . "\n");
fwrite( $targetfile , '<br /></p><p class="headfoot" align="right">');
fwrite( $targetfile , 'Országos Meteorológiai Szolgálat ' . $weather_datum[0] );
fwrite( $targetfile , '</p></div>' . "\n");

fclose($targetfile);	
echo "ready!<br />";

?>
