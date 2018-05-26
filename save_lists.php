<?php
	/**
	 * Save given lists contents for username into file.
	 */

	$hasSucceeded = false;
	
    $requestData = json_decode(file_get_contents("php://input"), true);
	$username = $requestData["username"];
	$lists = $requestData["listsData"];
	$listsJson = json_encode($lists, JSON_PRETTY_PRINT);
	
	$listContentsPath = ($username . "_lists.json");
	
	$listsFile = fopen($listContentsPath, "w");
	if($listsFile)
	{
		$writtenBytesCount = fwrite($listsFile, $listsJson);
		fclose($listsFile);
		$hasSucceeded = ($writtenBytesCount == strlen($listsJson));
	}
	
	print json_encode(
		array("hasSucceeded" => $hasSucceeded)
	);
?>
