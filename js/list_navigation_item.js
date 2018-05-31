function ListNavigationItem(initialName)
{
	// properties
	let name;
	let jQueryElement;

	this.setName = function(settingName)
	{
		name = settingName;
		$("a", jQueryElement).text(settingName);
		$("a", jQueryElement).prop("href", "#" + settingName);
	}

	this.remove = function()
	{		
		jQueryElement.hide(500, () => jQueryElement.remove());
	}

    this.represents = (jQueryObject) => jQueryElement.is(jQueryObject);

	// constructor implementation
	jQueryElement = this.template.clone().appendTo("#listNavigationContainer");
	this.setName(initialName);
}