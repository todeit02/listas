$(function(){
	loadLogin();
});


function toggleListDisplayState()
{
	let listTitleDiv = $(this);
	let isActive = !listTitleDiv.hasClass("inactive");
	
	let settingItemsDisplayState = isActive ? "none" : "";	
	listTitleDiv.parent().siblings(".listItemContainer, .listAmendmentButton").css("display", settingItemsDisplayState);

	let activityClassAction = isActive ? listTitleDiv.addClass : listTitleDiv.removeClass;
	activityClassAction.call(listTitleDiv, "inactive");
}


function loadListAmendmentModal()
{
	loadTemplateIntoContainer(LIST_AMENDMENT_MODAL_PATH, "body", (modalJQuery) => prepareListAmendmentModal(modalJQuery, $(this)));
}


function prepareListAmendmentModal(modalJQuery, triggeringButtonJQuery)
{
	let extendingListJQuery = triggeringButtonJQuery.parent(".list");
	let extendingList = List.getRepresentative(extendingListJQuery);
	let extendingListName = extendingList.getName();

	$("#extendingListName").text(extendingListName);
	$("#cancelAmendmentButton", modalJQuery).click(() => $("#modal").remove());
	$("#confirmAmendmentButton", modalJQuery).click(
		(event) => addListAmendmentModalProduct(event.target, extendingList)
	);
}


function addListAmendmentModalProduct(triggeringButton, extendingList)
{
	let listItemData = {};
	listItemData.name = $(triggeringButton).parents("#modal").find("#amendingProduct").val();
	listItemData.quantity = $(triggeringButton).parents("#modal").find("#amendingQuantity").val();
	listItemData.unit = $(triggeringButton).parents("#modal").find("#amendingUnit").val();
	
	if(extendingList.includesItemName(listItemData.name))
	{
		$("#amendingErrorMessage").text(STRINGS.ITEM_EXISTS_ERROR);
		$("#amendingErrorMessage").css("display", "inline");
		return;
	}
	else
	{
		$("#amendingErrorMessage").text("");
		let appendingItem = new ListItem(listItemData);
		extendingList.appendItem(appendingItem);
		$("#modal").remove();

        saveCurrentLists(null, notifyAutosaveError);
	}	
}

function loadListCreationModal()
{
	loadTemplateIntoContainer(LIST_CREATION_MODAL_PATH, "body", (modalJQuery) => prepareListCreationModal(modalJQuery));
}


function prepareListCreationModal(modalJQuery)
{
	$("#cancelCreationButton", modalJQuery).click(() => $("#modal").remove());
	$("#confirmCreationButton", modalJQuery).click(
		() => tryCreateList($("#creatingListName").val())
	);
}


function tryCreateList(creatingListName)
{
	let creationSucceeded = List.createFromName(creatingListName);
	if(creationSucceeded)
	{
		$("#modal").remove();
	}
	else
	{
		$("#creationErrorMessage").text(STRINGS.LIST_EXISTS_ERROR);
	}
}

function notifyAutosaveError() { alert(STRINGS.SAVE_ERROR); }

function notifyServerConnectionError() { alert(STRINGS.CONNECTION_ERROR); }