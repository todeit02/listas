$(function(){
	loadListTemplate();
});

function loadListTemplate()
{
	ajaxLoadHtmlTemplate("list.html", List, loadListItemTemplate);
}


function loadListItemTemplate()
{
	ajaxLoadHtmlTemplate("list_item.html", ListItem, loadListNavigationItemTemplate);
}


function loadListNavigationItemTemplate()
{
	ajaxLoadHtmlTemplate("list_navigation_item.html", ListNavigationItem, loadListContent);
}


function loadListContentForUser()
{
	// get the username
	let username = dummyUsername;
	loadListContent(username);
}


function loadListContent(username)
{	
	const listsContentsPath = (username + listsFileSuffix);

	$.ajax(listsContentsPath, {
		complete: function(jqXHR, textStatus)
			{ 
				let listsContent = JSON.parse(jqXHR.responseText); 
				createLists(listsContent);
			},
		dataType: listsHttpDataType,
		mimeType: listsHttpMimeType
	});
}


function createLists(listsJsonData)
{
	for(let listData of listsJsonData.lists) List.create(listData);
}


function ajaxLoadHtmlTemplate(templatePath, constructor, callback)
{
	$.ajax(templatePath, {
		complete: function(jqXHR, textStatus) {
			if(textStatus !== "success") return;

			constructor.prototype.template = $(jqXHR.responseText);
			callback();
			},
		dataType: "html",
		mimeType: "text/html"
		});
}
