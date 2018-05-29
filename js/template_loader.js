function loadTemplateIntoContainer(templatePath, containerSelector, callback)
{
    $.ajax(templatePath, {
        complete: function(jqXHR, textStatus){
            if(textStatus != "success") callback(null);
    
            let loginTemplate = jqXHR.responseText;

            var instantiatedTemplate = $(loginTemplate);
	        $(containerSelector).append(instantiatedTemplate);

            callback(instantiatedTemplate);
            },
        dataType: "html",	
        mimeType: "text/html"
        });
}


function loadTemplateForConstructor(templatePath, constructor, callback)
{
	$.ajax(templatePath, {
		complete: function(jqXHR, textStatus) {
			if(textStatus !== "success") return;

			constructor.prototype.template = $(jqXHR.responseText);
			callback();
			},
		dataType: "html",
		mimeType: "text/html"
		});
}
