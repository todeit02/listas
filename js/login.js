function loadLogin()
{
    let mainContainerSelector = "#mainContainer";
	$(mainContainerSelector).empty();
    loadTemplateIntoContainer(LOGIN_TEMPLATE_PATH, mainContainerSelector, prepareLogin);
}


function prepareLogin(loginJQuery)
{	
    $("#loginButton", loginJQuery).click(tryLogin);
}


function tryLogin()
{
    let username = $("#username").val();
    currentUsername = username;
    loadListsView(username);
}

let currentUsername;