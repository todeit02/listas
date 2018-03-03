var listTemplate = {};

$(function(){
	loadListTemplate();
});

function loadListTemplate()
{
	ajaxLoadHtmlTemplate("list.html", "list", loadListItemTemplate);
}

function loadListItemTemplate()
{
	ajaxLoadHtmlTemplate("list_item.html", "item", loadListNavigationItemTemplate);
}

function loadListNavigationItemTemplate()
{
	ajaxLoadHtmlTemplate("list_navigation_item.html", "navigationItem", loadListContent);
}

function loadListContent()
{	
	$.ajax("lists.json", {
		complete: function(jqXHR, textStatus)
			{ 
				var listsContent = JSON.parse(jqXHR.responseText); 
				insertListContents(listsContent);
			},
		dataType: "json",
		mimeType: "application/json"
	});
}

function insertListContents(listsAllContent)
{
	listsAllContent.lists.forEach(function(listContent) {insertList(listContent);});
}

function insertList(listContent)
{	
	var instantiatedListTemplate = $(listTemplate.list).appendTo("#listCollectionContainer");
	instantiatedListTemplate.prop("id", listContent.name);
	$(".listTitleText", instantiatedListTemplate).text(listContent.name);
	
	var instantiatedListNavigationTemplate = $(listTemplate.navigationItem).appendTo("#listNavigationContainer");
	$(".navigationButton", instantiatedListNavigationTemplate).text(listContent.name);
	
	listContent.items.forEach(function(item)
	{
		appendListItem(item, instantiatedListTemplate);
	});
}

function appendListItem(appendingItem, listDomElement)
{
	var instantiatedElementTemplate = $(listTemplate.item).appendTo(".listElementContainer", listDomElement);
	$(".listElementName", instantiatedElementTemplate).text(appendingItem.name);
	$(".listElementQuantity", instantiatedElementTemplate).text(appendingItem.quantity);
}

function ajaxLoadHtmlTemplate(templatePath, listTemplateStorageName, callback)
{
	$.ajax(templatePath, {
		complete: function(jqXHR, textStatus) {
			listTemplate[listTemplateStorageName] = jqXHR.responseText;
			callback();
			},
		dataType: "html",
		mimeType: "text/html"
		});
}