<?php
	/**
	 * Load list contents for given username.
	 */

	$username = $_GET["username"];
	
	$listsFolder = "../lists/";
	$listsFileSuffix = "_lists.json";
	$listsFilePath = ($listsFolder . $username . $listsFileSuffix);
	
	$listsFile = false;
	if(file_exists($listsFilePath))
	{
		$listsFile = fopen($listsFilePath, "r");
	}
	
	if($listsFile) print fread($listsFile, filesize($listsFilePath));
	else print "{}";
?>
