$(function(){
	$("#listCollectionContainer").on("click", ".listTitleText", toggleListDisplayState);
	$("#listCollectionContainer").on("click", ".buttonUp", (event) => {List.handleClickItemMove(event.target, false);});
	$("#listCollectionContainer").on("click", ".buttonDown", (event) => {List.handleClickItemMove(event.target, true);});
	$("#listCollectionContainer").on("click", ".listAmendmentButton", loadListAmendmentModal)
	$("body").on("click", "#cancelAmendmentButton", removeListAmendmentModal);
	$("body").on("click", "#confirmAmendmentButton", addListAmendmentModalProduct);
});

function toggleListDisplayState()
{
	var currentState = $(this).parent().siblings(".listItemContainer").css("display");	
	var settingState = (currentState === "none") ? "" : "none";
	
	$(this).parent().siblings(".listItemContainer").css("display", settingState);
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