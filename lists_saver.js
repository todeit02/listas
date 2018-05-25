function saveCurrentLists(onSucceeded, onFailed)
{
    // get username    
    const username = dummyUsername; // dummy

    var requestData;
    requestData["listsData"] = List.currentListsJson;
    requestData["username"] = username;

    const requestDataJson = JSON.stringify(requestData);
    
    $.post(saveListsPhpFilePath, requestDataJson, onServerResponse, serverHttpUserInteractionResponseDataType);
    $.ajax(saveListsPhpFilePath, {
        success: onListsSaveSuccessResponse,
        error: onListsSaveErrorResponse,
		dataType: serverHttpUserInteractionResponseDataType,
		mimeType: serverHttpUserInteractionResponseMimeType
		});
}

function onListsSaveSuccessResponse()
{
    
}

function onListsSaveErrorResponse(jqXHR, textStatus, errorThrown)
{
    
}