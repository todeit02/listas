$(function(){
	loadLogin();
});

function toggleListDisplayState()
{
	var currentState = $(this).parent().siblings(".listItemContainer").css("display");	
	var settingState = (currentState === "none") ? "" : "none";
	
	$(this).parent().siblings(".listItemContainer").css("display", settingState);
}

function loadListAmendmentModal()
{
	loadTemplateIntoContainer(listAmendmentModalPath, "body", (modalJQuery) => prepareListAmendmentModal(modalJQuery, $(this)));
}

function prepareListAmendmentModal(modalJQuery, triggerinButtonJQuery)
{
	let extendingListJQuery = $(this).parent(".list");
	let extendingList = List.getRepresentative(extendingListJQuery);
	let extendingListName = extendingList.getName();

	$("#extendingListName").text(extendingListName);
	$("#cancelAmendmentButton", modalJQuery).click(removeListAmendmentModal);
	$("#confirmAmendmentButton", modalJQuery).click((event) => addListAmendmentModalProduct(event.target, extendingList));
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

        saveCurrentLists(null, notifyAutosaveError);
	}	
}

function notifyAutosaveError()
{
	alert("Se perdió la conexión al servidor. Se tratará de subir después del próximo cambio.");
}

function notifyServerConnectionError()
{
	alert("No hay conexión al servidor. Inténtelo más luego por favor.");
}