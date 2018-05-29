function ListNavigationItem(nameString)
{
	// properties
	let name = nameString;
	let jQueryElement;


	this.remove = function()
	{		
		jQueryElement.hide(500, () => jQueryElement.remove());
	}

    this.represents = (jQueryObject) => jQueryElement.is(jQueryObject);

	// constructor implementation
	jQueryElement = this.template.clone().appendTo("#listNavigationContainer");
	$(".navigationButton", jQueryElement).text(name);
}