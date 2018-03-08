function ListItem(itemData)
{
	let name;
	let quantity;
	let unit;
	let jQueryElement;


	this.getName = () => name;
	this.setName = function(nameString)
	{
		name = nameString;
		$(".listItemName", jQueryElement).text(name);
	}

	this.getQuantity = () => quantity;
	this.setQuantity = function(quantityNumber)
	{
		quantity = quantityNumber;
		$(".listItemQuantity", jQueryElement).text(quantity);
	}

	this.getUnit = () => unit;
	this.setUnit = function(unitString)
	{
		unit = unitString;
		$(".listItemUnit", jQueryElement).text(unit);
    }
    
    this.getJQueryElement = function() { return jQueryElement; };

    this.remove = function() { jQueryElement.remove(); }
	this.hasSameContentAs = function(comparingJQueryObject)
	{
		if(comparingJQueryObject.hasClass("listItem") == false) return false;

		let represents = (jQueryElement.find(".listItemName").text() === comparingJQueryObject.find(".listItemName").text());
		represents = represents && (jQueryElement.find(".listItemQuantity").text() === comparingJQueryObject.find(".listItemQuantity").text());
		represents = represents && (jQueryElement.find(".listItemUnit").text() === comparingJQueryObject.find(".listItemUnit").text());
		console.log(jQueryElement.find(".listItemName").text() + " === " + comparingJQueryObject.find(".listItemName").text() + "? " + represents.toString());
		return represents;
	}


	jQueryElement = this.template.clone();

	this.setName(itemData.name);
	this.setQuantity(itemData.quantity);
	this.setUnit(itemData.unit);
}