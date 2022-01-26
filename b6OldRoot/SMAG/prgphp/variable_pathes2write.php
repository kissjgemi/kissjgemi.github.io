<?php

$datafile2write = $filenames ['builder_variables'] ;
		echo 'Output path :';
		echo $datafile2write;
		echo '<br /><br />';

$output_data = fopen( $datafile2write , "w") or exit("Unable to open source file!");

fwrite( $output_data , '<?php' . "\n");
fwrite( $output_data , "\n");

fwrite( $output_data , '$cover_image_path = "' . $bg_path . '";' . "\n" );
fwrite( $output_data , "\n" );
		echo 'Background path :';
		echo $bg_path ;
		echo '<br /><br />';

//------------------

fwrite( $output_data , '$menu_titles = array (	"number_of_section" => "' );
fwrite( $output_data , $section_titles[0] . '",' . "\n" );
		for ($row = 1; $row < $section_titles[0] ; $row++) {
fwrite( $output_data , '						"section' . $row . '" => "' );
fwrite( $output_data , $section_titles[$row] . '",' . "\n" );
		}
fwrite( $output_data , '						"section99" => "Impresszum");' . "\n" );
fwrite( $output_data , "\n" );

//------------------

fwrite( $output_data , '$articles = array (	"number_of_section" => "' );
fwrite( $output_data , $topic_titles[0] . '",' . "\n" );

		for ($row = 1; $row <= $topic_titles[0] ; $row++) {
fwrite( $output_data , '						"section' . $row . '" => ' );
fwrite( $output_data , 'array ("' . $topic_titles[$row][0] . '"' );
	if ( $topic_titles[$row][0] == 0) {
		fwrite( $output_data , ')' );
	}
fwrite( $output_data , ',             /' );
fwrite( $output_data , '/ ' . $row . '. ' . $section_titles[$row] . "\n" );
		echo $section_titles[$row] . ' number_of_topics :' . $topic_titles[$row][0] . ' db <br />';
		
			if ( $topic_titles[$row][0] > 0) {
			for ($topictitle = 1; $topictitle < $topic_titles[$row][0] ; $topictitle++) {
				fwrite( $output_data , '							"' );
				fwrite( $output_data , $topic_titles[$row][$topictitle] );
				fwrite( $output_data , '" ,' . "\n");
			}
				fwrite( $output_data , '							"' );
				fwrite( $output_data , $topic_titles[$row][$topic_titles[$row][0]] );
				fwrite( $output_data , '" ),' . "\n");
			}
		}
fwrite( $output_data , '						"section99" => array ("1" ,' );
fwrite( $output_data , '             // 99. Impresszum ' . "\n" );
fwrite( $output_data , '							"99_1" )' . "\n" );
fwrite( $output_data , '					);' . "\n" );

fwrite( $output_data , "\n" );
fwrite( $output_data , '?>' . "\n" );
fclose( $output_data );

		echo '<br />';

?>
