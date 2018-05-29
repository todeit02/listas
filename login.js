function loadLogin()
{
    loadTemplateIntoContainer(LOGIN_TEMPLATE_PATH, "#mainContainer", prepareLogin);
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