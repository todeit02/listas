function ListNavigationItem(nameString)
{
	let name = nameString;
	let jQueryElement;


    this.remove = function() { jQueryElement.remove(); }    
    this.represents = (jQueryObject) => jQueryElement.is(jQueryObject);


	jQueryElement = this.template.clone().appendTo("#listNavigationContainer");
	$(".navigationButton", jQueryElement).text(name);
}