function loadListsView(username)
{
	let mainContainerSelector = "#mainContainer";
	$(mainContainerSelector).empty();
	loadTemplateIntoContainer(listsviewTemplatePath, mainContainerSelector, (listsViewJQuery) => prepareListsView(listsViewJQuery, username));
}


function prepareListsView(listsViewJQuery, username)
{
	let listsLoader = new ListsLoader(username);
	listsLoader.load();

	$("#listCollectionContainer").on("click", ".listTitleText", toggleListDisplayState);
	$("#listCollectionContainer").on("click", ".buttonUp", (event) => List.handleClickItemMove(event.target, false));
	$("#listCollectionContainer").on("click", ".buttonDown", (event) => List.handleClickItemMove(event.target, true));
	$("#listCollectionContainer").on("click", ".listAmendmentButton", loadListAmendmentModal);
    $("#listCollectionContainer").on("click", ".listItemDeleteButton", (event) => List.handleClickItemDelete(event.target));
	$("#listCollectionContainer").on("click", ".listRenameButton", (event) => List.handleStartRename(event.target));
	$("#listCollectionContainer").on("click", ".listDeleteButton", (event) => List.handleClickDelete(event.target));
}