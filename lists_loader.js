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

function loadListContent()
{	
	$.ajax("lists.json", {
		complete: function(jqXHR, textStatus)
			{ 
				let listsContent = JSON.parse(jqXHR.responseText); 
				createLists(listsContent);
			},
		dataType: "json",
		mimeType: "application/json"
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