function loadLogin()
{
    loadTemplateIntoContainer(loginTemplatePath, "#mainContainer", prepareLogin);
}


function prepareLogin(loginJQuery)
{	
    $("#loginButton", loginJQuery).click(tryLogin);
}


function tryLogin()
{
    let username = $("#username").val();
    loadListsView(username);
}