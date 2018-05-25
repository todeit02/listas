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
		jQueryElement.remove();
        navigationItem.remove();

        var existentListsIndex = this.existentLists.indexOf(this);
        List.prototype.existentLists.splice(existentListsIndex, 1);
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

        items.forEach((item) => console.log(item.getName()));
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

List.handleClickItemMove = function(initiatorDomObject, isDownwards)
{
    let movingItemJQuery = $(initiatorDomObject).parents(".listItem");
    let movingItem = this.getRepresentative(movingItemJQuery);
    let containingListJQuery = movingItemJQuery.parents(".list");
    let containingList = this.getRepresentative(containingListJQuery);

    containingList.moveItem(movingItem, isDownwards);
}

List.handleClickItemDelete = function(initiatorDomObject)
{
    let deletingItemJQuery = $(initiatorDomObject).parents(".listItem");
    let deletingItem = this.getRepresentative(deletingItemJQuery);
    let containingListJQuery = deletingItemJQuery.parents(".list");
    let containingList = this.getRepresentative(containingListJQuery);

    containingList.deleteItem(deletingItem);
}

List.create = function(listData)
{
    this.existentLists.push(new List(listData));	
}

List.existentLists = [];