$(function(){
	$("#listCollectionContainer").on("click", ".listTitleText", toggleListDisplayState);
	$("#listCollectionContainer").on("click", ".buttonUp", moveListItemUp);
	$("#listCollectionContainer").on("click", ".buttonDown", moveListItemDown);
	$("#listCollectionContainer").on("click", ".listAmendmentButton", loadListAmendmentModal)
	$("body").on("click", "#cancelAmendmentButton", removeListAmendmentModal);
	$("body").on("click", "#confirmAmendmentButton", addListAmendmentModalProduct);
});

function toggleListDisplayState()
{
	var currentState = $(this).parent().siblings(".listElementContainer").css("display");	
	var settingState = (currentState === "none") ? "" : "none";
	
	$(this).parent().siblings(".listElementContainer").css("display", settingState);
}

function moveListItemUp()
{
	var movingListItem = $(this).parents(".listElement");
	if(movingListItem.prev().length === 0) return;
	
	movingListItem.insertBefore(movingListItem.prev());
}

function moveListItemDown()
{
	var movingListItem = $(this).parents(".listElement");
	if(movingListItem.next().length === 0) return;
	
	movingListItem.insertAfter(movingListItem.next());
}

function loadListAmendmentModal()
{
	$.ajax("list_amendment_modal.html", {
		complete: function(jqXHR, textStatus) {
			var listAmendmentModalTemplate = jqXHR.responseText;
			showListAmendmentModal(listAmendmentModalTemplate);
			},
		dataType: "html",
		mimeType: "text/html"
		});
}

function showListAmendmentModal(modalTemplate)
{
	var instantiatedModalTemplate = $(modalTemplate);
	$("body").append(instantiatedModalTemplate);
}

function removeListAmendmentModal()
{
	$("#listAmendmentModal").remove();
}

function addListAmendmentModalProduct()
{
	var amendingItem = {};
	amendingItem.name = $(this).parents("#listAmendmentModal").select("#amendingProduct").val();
	var amendingQuantity = $(this).parents("#listAmendmentModal").select("#amendingQuantity").val();
	var amendingUnit = $(this).parents("#listAmendmentModal").select("#amendingUnit").val();
	amendingItem.quantity = String(amendingQuantity) + String(amendingUnit);
	
	// Append to list ... appendListItem(amendingItem, $())
	
	removeListAmendmentModal();
}