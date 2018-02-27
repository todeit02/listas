$(function(){
	$("#listCollectionContainer").load("list.html", loadListContent);
});

function loadListContent()
{
	$(".listElementContainer").load("list_element.html", loadListElementContent);
}

function loadListElementContent()
{
	$(".listElement > .listElementName").text("Elemento 1");
	$(".listElement > .listElementQuantity").text("3 ud.");
}