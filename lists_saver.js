function saveCurrentLists(onSucceeded, onFailed)
{
    // get username    
    const username = currentUsername;

    let requestData = {};
    let listsContainer = {};
    listsContainer.lists = List.existentLists.map((list) => list.getDataObject());

    requestData["listsData"] = listsContainer;
    requestData["username"] = username;

    const requestDataJson = JSON.stringify(requestData);
    
    $.ajax(SAVE_LISTS_PHP_FILE_PATH, {
        method: "POST",
        data: requestDataJson,
        success: function() { (data, textStatus, jqXHR) => onListsSaveSuccessResponse(data, textStatus, jqXHR, onSucceeded, onFailed); },
        error: onFailed,
		dataType: SERVER_HTTP_USER_INTERACTION_RESPONSE_DATA_TYPE,
		mimeType: SERVER_HTTP_USER_INTERACTION_RESPONSE_MIME_TYPE
		});
}

function onListsSaveSuccessResponse(data, textStatus, jqXHR, onSucceeded, onFailed)
{
    const responseObject = JSON.parse(data);

    if(responseObject["hasSucceeded"] == true) 
    {
        if(onSucceded != null) onSucceeded();
    }
    else 
    {
        if(onFailed != null) onFailed();
    }
}