$(function(){
	$("#listCollectionContainer").on("click", ".listTitleText", toggleListDisplayState);
	$("#listCollectionContainer").on("click", ".buttonUp", (event) => List.handleClickItemMove(event.target, false));
	$("#listCollectionContainer").on("click", ".buttonDown", (event) => List.handleClickItemMove(event.target, true));
	$("#listCollectionContainer").on("click", ".listAmendmentButton", loadListAmendmentModal);
	$("#listCollectionContainer").on("click", ".listItemDeleteButton", (event) => List.handleClickItemDelete(event.target));
});

function toggleListDisplayState()
{
	var currentState = $(this).parent().siblings(".listItemContainer").css("display");	
	var settingState = (currentState === "none") ? "" : "none";
	
	$(this).parent().siblings(".listItemContainer").css("display", settingState);
}

function loadListAmendmentModal()
{
	let extendingListJQuery = $(this).parent(".list");
	let extendingList = List.getRepresentative(extendingListJQuery);

	$.ajax("list_amendment_modal.html", {
		complete: function(jqXHR, textStatus){
			if(textStatus !== "success") return;

			var listAmendmentModalTemplate = jqXHR.responseText;
			var modalJQuery = showListAmendmentModal(listAmendmentModalTemplate, extendingList.getName());
			$("#cancelAmendmentButton", modalJQuery).click(removeListAmendmentModal);
			$("#confirmAmendmentButton", modalJQuery).click((event) => addListAmendmentModalProduct(event.target, extendingList));
			},
		dataType: "html",	
		mimeType: "text/html"
		});
}

function showListAmendmentModal(modalTemplate, extendingListName)
{
	var instantiatedModalTemplate = $(modalTemplate);
	$("body").append(instantiatedModalTemplate);
	$("#extendingListName").text(extendingListName);

	return instantiatedModalTemplate;
}

function removeListAmendmentModal()
{
	$("#listAmendmentModal").remove();
}

function addListAmendmentModalProduct(triggeringButton, extendingList)
{
	let listItemData = {};
	listItemData.name = $(triggeringButton).parents("#listAmendmentModal").find("#amendingProduct").val();
	listItemData.quantity = $(triggeringButton).parents("#listAmendmentModal").find("#amendingQuantity").val();
	listItemData.unit = $(triggeringButton).parents("#listAmendmentModal").find("#amendingUnit").val();
	
	if(extendingList.includesItemName(listItemData.name))
	{
		$("#amendingErrorMessage").text("Ya existe una entrada con este nombre.");
		$("#amendingErrorMessage").css("display", "inline");
		return;
	}
	else
	{
		$("#amendingErrorMessage").text("");
		let appendingItem = new ListItem(listItemData);
		extendingList.appendItem(appendingItem);
		removeListAmendmentModal();
	}	
}