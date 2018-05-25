<?php
	/**
	 * Save given lists contents for username into file.
	 */

	$hasSucceeded = false;
	
    $requestData = json_decode(file_get_contents("php://input"), true);
	$listsData = $requestData["listsData"];
	$username = $requestData["username"];
	
	$listContentsPath = $offerId . "_lists.json";
	
	$listsFile = fopen($listContentsPath, "w");
	if($listsFile)
	{
		$writtenBytesCount = fwrite($listsFile, $listsData);
		fclose($listsFile);
		$hasSucceeded = ($writtenBytesCount == strlen($listsData));
	}
	
	print json_encode(
		array("hasSucceeded" => $hasSucceeded)
	);
?>
