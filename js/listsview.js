let minNavigationWidthForHorizontalSelector;
let isListTypeSelectorHorizontal;

function loadListsView(username)
{
	let mainContainerSelector = "#mainContainer";
	$(mainContainerSelector).empty();
	loadTemplateIntoContainer(LISTSVIEW_TEMPLATE_PATH, mainContainerSelector, (listsViewJQuery) => prepareListsView(listsViewJQuery, username));
}


function prepareListsView(listsViewJQuery, username)
{
	minNavigationWidthForHorizontalSelector = $("#listTypeSelector").outerWidth(true);
	isListTypeSelectorHorizontal = true;
	updateListTypeSelectorLayout();
	$(window).resize(updateListTypeSelectorLayout);

	$("#listTypeSelector > button").click(highlightSelectedListTypeButton);

	let listsLoader = new ListsLoader(username);
	listsLoader.load();

	$("#listCollectionContainer").on("click", ".listTitleText", toggleListDisplayState);
	$("#listCollectionContainer").on("click", ".buttonUp", (event) => List.handleClickItemMove(event.target, false));
	$("#listCollectionContainer").on("click", ".buttonDown", (event) => List.handleClickItemMove(event.target, true));
	$("#listCollectionContainer").on("click", ".listAmendmentButton", loadListAmendmentModal);
    $("#listCollectionContainer").on("click", ".listItemDeleteButton", (event) => List.handleClickItemDelete(event.target));
	$("#listCollectionContainer").on("click", ".listRenameButton", (event) => List.handleStartRename(event.target));
	$("#listCollectionContainer").on("click", ".listDeleteButton", (event) => List.handleClickDelete(event.target));

	$(".addListButton").click(loadListCreationModal);
}

function updateListCreationButtonLayout()
{
	const listNavigation = $("#listNavigation");
	const listNavigationDom = listNavigation[0];

	let listNavigationVisible = $("#listNavigation").is(":visible");
	if($("#listNavigation").is(":visible"))
	{
		$("#listTypeSelector").removeClass("btn-group-vertical");
		$("#listTypeSelector").addClass("btn-group");
		isListTypeSelectorHorizontal = true;
	}
	else if (!horizontalSelectorFits && isListTypeSelectorHorizontal)
	{
		$("#listTypeSelector").removeClass("btn-group");
		$("#listTypeSelector").addClass("btn-group-vertical");
		isListTypeSelectorHorizontal = false;
	}
}


function updateListTypeSelectorLayout()
{
	const listNavigation = $("#listNavigation");
	const listNavigationDom = listNavigation[0];

	let horizontalSelectorFits = (minNavigationWidthForHorizontalSelector <= listNavigationDom.clientWidth);
	if(horizontalSelectorFits && !isListTypeSelectorHorizontal)
	{
		$("#listTypeSelector").removeClass("btn-group-vertical");
		$("#listTypeSelector").addClass("btn-group");
		isListTypeSelectorHorizontal = true;
	}
	else if (!horizontalSelectorFits && isListTypeSelectorHorizontal)
	{
		$("#listTypeSelector").removeClass("btn-group");
		$("#listTypeSelector").addClass("btn-group-vertical");
		isListTypeSelectorHorizontal = false;
	}
}


function highlightSelectedListTypeButton(event)
{
	const clickedButton = $(event.target);
	const allButtons = $("#listTypeSelector > button");

	const selectedButtonClass = "btn-warning";
	const unselectedButtonClass = "btn-secondary";

	allButtons.each(function()
	{
		$(this).toggleClass(selectedButtonClass, $(this).is(clickedButton));
		$(this).toggleClass(unselectedButtonClass, !$(this).is(clickedButton));
	});
}