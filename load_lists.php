<?php
	/**
	 * Load list contents for given username.
	 */

	$username = $_GET["username"];
	
	$listsFileSuffix = "_lists.json";
	$listsFilePath = ($username . $listsFileSuffix);
	
	$listsFile = false;
	if(file_exists($listsFilePath))
	{
		$listsFile = fopen($listsFilePath, "r");
	}
	
	if($listsFile) print fread($listsFile, filesize($listsFilePath));
	else print "{}";
?>
