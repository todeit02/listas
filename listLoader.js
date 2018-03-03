$(function(){
	$.ajax("lists.json", {
		complete: function(jqXHR, textStatus) { loadListContent(jqXHR.responseText); },
		dataType: "json",
		mimeType: "application/json"
		});
});

function loadListContent(string)
{
	var listContainer = JSON.parse(string); 
	listContainer.lists.forEach(function(list)
	{	
		var loadDepot = $("<div></div>");
		loadDepot.load("list.html", insertList(list, loadDepot));
	});
}

function insertList(listContent, loadDepot)
{
	console.log(listContent);
	console.log(loadDepot);
	console.log(loadDepot.html());
	$("#listCollectionContainer").append(loadDepot.html());
	$(".listElementContainer").load("list_element.html", loadListElementContent);
	
	// dummy content
	$(".listTitleText").prop("id", listContent.name);
	$(".listTitleText").text(listContent.name);
}

function loadListElementContent()
{
	// dummy content
	$(".listElementName").text("Elemento 1");
	$(".listElementQuantity").text("3 ud.");
}