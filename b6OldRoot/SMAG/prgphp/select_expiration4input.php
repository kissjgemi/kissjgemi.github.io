<?php

echo '<br /'; 
echo 'expiration'; 
echo '<br /'; 
echo '<br /'; 
	
fwrite( $targetfile , '<select name="expirationlist" style="margin-left: 10%;">' . "\n" );
		fwrite( $targetfile , '<option value="' . $expiredDate3ora . '">  3 óra </option>' .  "\n" );
		fwrite( $targetfile , '<option value="' . $expiredDate12ora . '"> 12 óra </option>' .  "\n" );
		fwrite( $targetfile , '<option value="' . $expiredDate1nap . '">  1 nap </option>' .  "\n" );
		fwrite( $targetfile , '<option value="' . $expiredDate3nap . '">  3 nap </option>' .  "\n" );
		fwrite( $targetfile , '<option value="' . $expiredDate14nap . '"> 14 nap </option>' .  "\n" );
		fwrite( $targetfile , '<option value="' . $expiredDate30nap . '"> 30 nap </option>' .  "\n" );
		fwrite( $targetfile , '<option value= \'0\' "> soha </option>' .  "\n" );
	
fwrite( $targetfile , '</select>' . "\n" );
fwrite( $targetfile , '   <br />' . "\n" );
fwrite( $targetfile , '   <br />' . "\n" );

?>