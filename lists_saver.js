function saveCurrentLists(onSucceeded, onFailed)
{
    // get username    
    const username = dummyUsername; // dummy

    let requestData = {};
    let listsContainer = {};
    listsContainer.lists = List.existentLists.map((list) => list.getDataObject());

    requestData["listsData"] = listsContainer;
    requestData["username"] = username;

    const requestDataJson = JSON.stringify(requestData);
    
    $.ajax(saveListsPhpFilePath, {
        method: "POST",
        data: requestDataJson,
        success: function() { (data, textStatus, jqXHR) => onListsSaveSuccessResponse(data, textStatus, jqXHR, onSucceeded, onFailed); },
        error: onFailed,
		dataType: serverHttpUserInteractionResponseDataType,
		mimeType: serverHttpUserInteractionResponseMimeType
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