$(function(){
	console.log("Starting lists.json request.");
	var listsFileLoader = new XMLHttpRequest();
	listsFileLoader.onload = parseListsJson;
    listsFileLoader.open("GET", "lists.json");
	console.log("lists.json request started.");
	
	$("#listCollectionContainer").load("list.html", loadListContent);
	$("#listCollectionContainer").load("list.html", loadListContent);
});

function parseListsJson()
{
	console.log("Parsing lists.");
	var listContainer = JSON.parse(this.responseText); 
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