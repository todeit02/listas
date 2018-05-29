function ListNavigationItem(initialName)
{
	// properties
	let name = initialName;
	let jQueryElement;

	this.setName = function(settingName)
	{
		name = settingName;
		$(".navigationButton", jQueryElement).text(settingName);
	}

	this.remove = function()
	{		
		jQueryElement.hide(500, () => jQueryElement.remove());
	}

    this.represents = (jQueryObject) => jQueryElement.is(jQueryObject);

	// constructor implementation
	jQueryElement = this.template.clone().appendTo("#listNavigationContainer");
	$(".navigationButton", jQueryElement).text(name);
}