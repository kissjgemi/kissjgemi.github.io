		if ( $newString == "<" ){       						
			$newString = fgetc ($file_saved);						
			if ( $newString == "/" ){							
			$newString = fgetc ($file_saved);						
				if ( strtolower($newString) == "h" ){			
					$newString = fgetc ($file_saved);						
					if ( strtolower($newString) == "e" ){			
						$newString = fgetc ($file_saved);						
						if ( strtolower($newString) == "a" ){			
							$newString = fgetc ($file_saved);						
							if ( strtolower($newString) == "d" ){			
								$newString = fgetc ($file_saved);						
								if ( strtolower($newString) == ">" ){			
									$start_my_data = true;
									} 				
								} 				
							} 								
						} 				
					} 
				} 
		}
