function List(listData)
{    
    let name = listData.name;
	let items = [];
	let navigationItem;
	let jQueryElement;


	this.appendItem = function(appendingListItem)
	{
        items.push(appendingListItem);
        jQueryElement.find(".listItemContainer").append(appendingListItem.getJQueryElement());
    }
    

    this.deleteItem = function(deletingListItem)
	{		
		let deletingItemIndex = items.indexOf(deletingListItem);
		items.splice(deletingItemIndex, 1);
        deletingListItem.delete();
	}


	this.remove = function()
	{
		jQueryElement.hide(500, () => jQueryElement.remove());
		navigationItem.remove();

        var existentListsIndex = List.existentLists.indexOf(this);
        List.existentLists.splice(existentListsIndex, 1);
    }


    this.moveItem = function(movingItem, isDownwards)
    {
        let itemIndex = items.indexOf(movingItem);
        let isMovingOutOfBounds = ((itemIndex === 0) && !isDownwards);
        isMovingOutOfBounds = isMovingOutOfBounds || ((itemIndex === (items.length - 1)) && isDownwards);
        if(isMovingOutOfBounds) return;

        let displacement = isDownwards ? 1 : (-1);
        items.splice(itemIndex + displacement, 0, items.splice(itemIndex, 1)[0]); // move in array

        relayoutItems();
    }


    this.getItems = function()
    {
        let copiedItems = [];
        items.forEach((item) => copiedItems.push(item));

        return copiedItems;
    }


    this.getRepresentingListItem = function(jQueryObject)
    {
        for(possiblyRepresentingItem of items)
        {
            if(possiblyRepresentingItem.hasSameContentAs(jQueryObject)) return possiblyRepresentingItem;
        }
        return null;
    }


    this.getName = () => name;


    this.setName = function(nameString)
    {
        name = nameString;
        jQueryElement.find(".listTitleText > span").text(nameString);
    }


    this.getDataObject = function()
    {
        var dataObject = {};
        dataObject.name = name;
        dataObject.items = items.map((item) => item.getDataObject());

        return dataObject;
    }


    this.represents = (jQueryListObject) => jQueryElement.is(jQueryListObject);
    
    this.navigationItemRepresents = (jQueryListObject) => navigationItem.represents(jQueryListObject);

    this.includesItemName = function(name)
    {
        for(possibleNameBearerItem of items)
        {
            if(possibleNameBearerItem.getName() === name) return true;
        }
        return false;
    }


    let relayoutItems = function()
    {
        let displayedItems = $(".listItem", jQueryElement);

        for(let i = 0; i < items.length; i++)
        {
            if(items[i].hasSameContentAs(displayedItems.eq(i))) continue;

            // old item has to be cloned because the replacement makes it unavailable for later insert
            let replacementItem = $(items[i].getJQueryElement().clone());
            items[i].setJQueryElement(replacementItem);
            displayedItems.eq(i).replaceWith(replacementItem);
        }
    }
    

    navigationItem = new ListNavigationItem(name);
	
	jQueryElement = this.template.clone().appendTo("#listCollectionContainer");
	jQueryElement.prop("id", name);
	$(".listTitleText > span", jQueryElement).text(name);

	for(let listItemData of listData.items)
	{
		this.appendItem(new ListItem(listItemData));
	}
}


List.getRepresentative = function(jQueryObject)
{
    for(let possiblyRepresentingList of this.existentLists)
    {
        if(possiblyRepresentingList.represents(jQueryObject)) return possiblyRepresentingList;
        if(possiblyRepresentingList.navigationItemRepresents(jQueryObject)) return possiblyRepresentingList.getNavigationItem();
        
        if(jQueryObject.parents(".list").attr("id") !== possiblyRepresentingList.getName()) continue;
        let representingListItem = possiblyRepresentingList.getRepresentingListItem(jQueryObject);
        if(representingListItem != null) return representingListItem;
    }
    return null;
}


List.nameExists = function(name)
{
    let existingListWithName = this.existentLists.find((list) => list.name === name)
    
    return (existingListWithName != undefined);
}


List.handleClickItemMove = function(initiatorDomObject, isDownwards)
{
    let movingItemJQuery = $(initiatorDomObject).parents(".listItem");
    let movingItem = this.getRepresentative(movingItemJQuery);
    let containingListJQuery = movingItemJQuery.parents(".list");
    let containingList = this.getRepresentative(containingListJQuery);

    containingList.moveItem(movingItem, isDownwards);

    saveCurrentLists(null, notifyAutosaveError);
}


List.handleClickItemDelete = function(initiatorDomObject)
{
    let deletingItemJQuery = $(initiatorDomObject).parents(".listItem");
    let deletingItem = this.getRepresentative(deletingItemJQuery);
    let containingListJQuery = deletingItemJQuery.parents(".list");
    let containingList = this.getRepresentative(containingListJQuery);

    containingList.deleteItem(deletingItem);

    saveCurrentLists(null, notifyAutosaveError);
}


List.handleStartRename = function(initiatorDomObject)
{
    let initialTrigger = true;

    let listJQuery = $(initiatorDomObject).parents(".list");
    let renamingList = List.getRepresentative(listJQuery);

    let listTitleContainer = $("button.listTitleText", listJQuery);
    let keepingClasses = listTitleContainer.prop("class");
    let replacingTextInput = $("<input type=\"text\">").replaceAll(listTitleContainer);
    let newClasses = (keepingClasses + " editing");
    replacingTextInput.prop("class", newClasses);

    replacingTextInput.val(renamingList.getName());
    replacingTextInput.focus();

    $(document).click(
        function(event)
        {   
            if(($(event.target) != listTitleContainer) && !initialTrigger)
            {
                $(document).off("click");            
                List.handleEndRename(renamingList, replacingTextInput);
            }
            initialTrigger = false;
        });

    $(document).keypress(
        function(event)
        {            
            if((event.which == "\r".charCodeAt(0)) && !initialTrigger)
            {
                $(document).off("keypress");
                List.handleEndRename(renamingList, replacingTextInput);
            }
            initialTrigger = false;
        }
    )
}


List.handleEndRename = function(renamedList, textInputJQuery)
{
    let newListName = textInputJQuery.val();

    let keepingClasses = textInputJQuery.prop("class");
    let replacingButton = $("<button><span></span></button>").replaceAll(textInputJQuery);
    replacingButton.prop("class", keepingClasses);
    replacingButton.removeClass("editing");

    renamedList.setName(newListName);

    saveCurrentLists(null, notifyAutosaveError);
}


List.handleClickDelete = function(initiatorDomObject)
{
    let listJQuery = $(initiatorDomObject).parents(".list");
    let deletingList = List.getRepresentative(listJQuery);

    deletingList.remove();

    saveCurrentLists(null, notifyAutosaveError);
}

List.create = function(listData)
{
    this.existentLists.push(new List(listData));
}

List.createFromName = function(name)
{
    if(List.nameExists(name)) return false;

    let listData = { name: name, items: [] };
    List.create(listData);

    return true;
}


List.existentLists = [];