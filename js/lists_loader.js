function ListsLoader(username)
{
	this.load = function()
	{
		loadListTemplate();
	}

	function loadListTemplate()
	{
		loadTemplateForConstructor(LIST_TEMPLATE_PATH, List, loadListItemTemplate);
	}
	
	
	function loadListItemTemplate()
	{
		loadTemplateForConstructor(LIST_ITEM_TEMPLATE_PATH, ListItem, loadListNavigationItemTemplate);
	}
	
	
	function loadListNavigationItemTemplate()
	{
		loadTemplateForConstructor(LIST_NAVIGATION_ITEM_TEMPLATE_PATH, ListNavigationItem, loadListContentForUser);
	}
	
	
	function loadListContentForUser()
	{	
		const requestData = { username: username };
	
		$.ajax(LOAD_LISTS_PHP_FILE_PATH, {
			method: "GET",
			data: requestData,
			success: (data, textStatus, jqXHR) => createLists(data),
			error: notifyServerConnectionError,
			dataType: LISTS_HTTP_DATA_TYPE,
			mimeType: LISTS_HTTP_MIME_TYPE
			});
	}	
	
	function createLists(listsJsonData)
	{
		if(listsJsonData.lists == null) return;

		for(let listData of listsJsonData.lists) List.create(listData);
	}
}
