$(function(){
	$.get("lists.json", parseListsJson(data));
	
	$("#listCollectionContainer").load("list.html", loadListContent);
	$("#listCollectionContainer").load("list.html", loadListContent);
});

function parseListsJson(string)
{
	console.log(string);
	var listContainer = JSON.parse(string); 
	listContainer.lists.forEach(function(list)
	{
		console.log(list.name);
	});
}

function loadListContent()
{
	$(".listElementContainer").load("list_element.html", loadListElementContent);
	
	// test content
	var testListName = "Lista 1"
	$(".listTitleText").prop("id", testListName);
	$(".listTitleText").text(testListName);
}

function loadListElementContent()
{
	// test content
	$(".listElementName").text("Elemento 1");
	$(".listElementQuantity").text("3 ud.");
}