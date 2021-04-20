// This calls our back-end Java program that sets our session info
function login() {

    let url = "api/login_servlet";

    // Grab data from the HTML form
    let sessionValue = $("#loginID").val();

    // Create a JSON request based on that data
    let dataToServer = {sessionValue : sessionValue};

    // Post
    $.post(url, dataToServer, function (dataFromServer) {
        // We are done. Write a message to our console
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Clear the form
        $("#loginID").val("");
        getLogin();
    });
}

// This gets session info from our back-end servlet.
function getLogin() {

    let url = "api/get_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        let string = dataFromServer.substring(0,22)
        // Update the HTML with our result
        $('#getSessionResult').html(dataFromServer);
        if (string === "You are not logged in.") {
            $('#logOut').hide();
        }else {
            $('#logOut').show();
        }
    });
}

// This method calls the servlet that invalidates our session
function invalidateSessionButton() {

    let url = "api/invalidate_session_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        getLogin();
    });
}

// Hook the functions above to our buttons
button = $('#getSessionJava');
button.on("click", getLogin);

button = $('#setSessionJava');
button.on("click", login);

button = $('#invalidateSession');
button.on("click", invalidateSessionButton);

getLogin();
