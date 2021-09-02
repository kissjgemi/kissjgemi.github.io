<?php
	include_once ("../g2work_php/g2_insert_template.php");
	  
	$my_target_file="g2home_sum.html";

	if(file_exists("../../$my_target_file")) { 
		unlink("../../$my_target_file");
	}
	echo " $my_target_file - ERASED! <br /> <br />" ;

$file2 = fopen( $my_target_file , "w") or exit("Unable to open the target file: $target_file !");
fclose($file2);

$file2 = fopen( $my_target_file , "a") or exit("Unable to open the target file: $target_file !");

move_template ( "g2rankings_01myhead.btxt" , $file2 );
	echo " Change $my_target_file - myHEAD HAS BEEN WRITTEN! <br />" ;

move_template ( "g2rankings_02mylogo.btxt" , $file2 );
	echo " Change $my_target_file - myLOGO HAS BEEN WRITTEN! <br />" ;

move_template ( "g2rankings_03mynavi.btxt" , $file2 );
	echo " Change $my_target_file - myNAVIGATION HAS BEEN WRITTEN! <br />" ;

move_template ( "g2rankings_04myarticel.btxt" , $file2 );
	echo " Change $my_target_file - myARTICEL HAS BEEN WRITTEN! <br />" ;

move_template ( "g2rankings_05myfoot.btxt" , $file2 );
	echo " Change $my_target_file - myFOOTER HAS BEEN WRITTEN! <br />" ;


fclose($file2);
	  
	$ok = rename( $my_target_file , "../../$my_target_file" );
	
	$LastModifiedTime = date(" Y m d (D) H-i-s", time() );
	$file2 = fopen( "log/".$my_target_file.$LastModifiedTime , "w") or exit("Unable to open the target file: $target_file !");
	fclose($file2);

	echo " <br /><strong> Now $my_target_file$LastModifiedTime - is UP 2 DATE! </strong><br />" ;
?>
