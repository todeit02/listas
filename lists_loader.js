function ListsLoader(username)
{
	this.load = function()
	{
		loadListTemplate();
	}

	function loadListTemplate()
	{
		loadTemplateForConstructor(listTemplatePath, List, loadListItemTemplate);
	}
	
	
	function loadListItemTemplate()
	{
		loadTemplateForConstructor(listItemTemplatePath, ListItem, loadListNavigationItemTemplate);
	}
	
	
	function loadListNavigationItemTemplate()
	{
		loadTemplateForConstructor(listNavigationItemTemplatePath, ListNavigationItem, loadListContentForUser);
	}
	
	
	function loadListContentForUser()
	{	
		const requestData = { "username" : username };
	
		/*
		$.ajax(listsContentsPath, {
			complete: function(jqXHR, textStatus)
				{ 
					let listsContent = JSON.parse(jqXHR.responseText); 
					createLists(listsContent);
				},
			dataType: listsHttpDataType,
			mimeType: listsHttpMimeType
		});
		*/

		$.ajax(loadListsPhpFilePath, {
			method: "GET",
			data: requestData,
			success: (data, textStatus, jqXHR) => createLists(data),
			error: notifyServerConnectionError,
			dataType: listsHttpDataType,
			mimeType: listsHttpMimeType
			});
	}	
	
	function createLists(listsJsonData)
	{
		if(listsJsonData.lists == null) return;

		for(let listData of listsJsonData.lists) List.create(listData);
	}
}
