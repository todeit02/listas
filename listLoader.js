var listTemplate;
var listElementTemplate;

$(function(){
	loadListTemplate();
});

function loadListTemplate()
{
	$.ajax("list.html", {
		complete: function(jqXHR, textStatus) {
			listTemplate = jqXHR.responseText;
			loadListElementTemplate();
			},
		dataType: "html",
		mimeType: "text/html"
		});
}

function loadListElementTemplate()
{
	$.ajax("list_element.html", {
		complete: function(jqXHR, textStatus) {
			listElementTemplate = jqXHR.responseText;
			loadListContent();
			},
		dataType: "html",
		mimeType: "text/html"
		});
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
	var instantiatedListTemplate = $(listTemplate).appendTo("#listCollectionContainer");
	$(".listTitleText", instantiatedListTemplate).prop("id", listContent.name);
	$(".listTitleText", instantiatedListTemplate).text(listContent.name);
	
	listContent.items.forEach(function(item)
	{
		appendListItem(item, instantiatedListTemplate);
	});
}

function appendListItem(appendingItem, listDomElement)
{
	var instantiatedElementTemplate = $(listElementTemplate).appendTo(".listElementContainer", listDomElement);
	$(".listElementName", instantiatedElementTemplate).text(appendingItem.name);
	$(".listElementQuantity", instantiatedElementTemplate).text(appendingItem.quantity);
}