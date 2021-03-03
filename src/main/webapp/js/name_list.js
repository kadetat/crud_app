// Main Javascript File

function htmlSafe(data) {
    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;")
}

function formatPhoneNumber(phoneNumberString) {
    // Strip all non-digits
    // Use a regular expression. Match all non-digits \D
    // and replace with an empty string.
    let cleaned = phoneNumberString.replace(/\D/g, '');

    // Are we left with 10 digits? This will return them in
    // three groups. This: (\d{3}) grabs the first three digits \d
    // The 'match' variable is an array. First is the entire match
    // the next locations are each group, which are surrounded by
    // () in the parenthesis.
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
}

function getJSDateFromSQLDate(sqlDate) {
    // Strip non-digits
    let cleaned = sqlDate.replace(/\D/g, '');
    // Match and group
    let match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
    // Create a new Date object
    let resultDate = new Date(match[1], match[2], match[3]);
    return resultDate;
}

function updateTable() {
    // Here's where your code is going to go.
    console.log("updateTable called");

    // Define a URL
    let url = "api/name_list_get";

    // Start a web call. Specify:
    // URL
    // Data to pass (nothing in this case)
    // Function to call when we are done
    $.getJSON(url, null, function(json_result) {
        $("#datatable tbody tr:first-child").remove()
        for (let i = 0; i < json_result.length; i++) {

            birthdayDate = getJSDateFromSQLDate(json_result[i].birthday);
            birthdayString = birthdayDate.toLocaleDateString();

            $("#datatable tbody").append("<tr><td>" + json_result[i].id + "</td>" +
                "<td>" + htmlSafe(json_result[i].first) + "</td>" +
                "<td>" + htmlSafe(json_result[i].last) + "</td>" +
                "<td>" + htmlSafe(json_result[i].email) + "</td>" +
                "<td>" + htmlSafe(birthdayString) + "</td>" +
                "<td>" + formatPhoneNumber(htmlSafe(json_result[i].phone)) + "</td></tr>");
        }
        
        });
}

// Call your code.
updateTable();


// Called when "Add Item" button is clicked
function showDialogAdd() {

    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').val("");
    $('#firstName').val("");
    $('#firstName').removeClass("is-invalid");
    $('#firstName').removeClass("is-valid");

    $('#lastName').val("");
    $('#lastName').removeClass("is-invalid");
    $('#lastName').removeClass("is-valid");

    $('#email').val("");
    $('#email').removeClass("is-invalid");
    $('#email').removeClass("is-valid");

    $('#phoneNumber').val("");
    $('#phoneNumber').removeClass("is-invalid");
    $('#phoneNumber').removeClass("is-valid");

    $('#birthdate').val("");
    $('#birthdate').removeClass("is-invalid");
    $('#birthdate').removeClass("is-valid");

    // Show the hidden dialog
    $('#myModal').modal('show');
}

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

function saveChanges() {
    console.log("SAVE CHANGES");
    let firstName = $('#firstName').val();
    //FirstName
    let reg = /^[A-Za-z]{1,10}$/;
    if (reg.test(firstName)) {
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");
    } else {
        $('#firstName').removeClass("is-valid");
        $('#firstName').addClass("is-invalid");
    }
    //LastName
    let lastName = $('#lastName').val();
    let regLast = /^[A-Za-z]{1,15}$/;
    if (regLast.test(lastName)) {
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");
    } else {
        $('#lastName').removeClass("is-valid");
        $('#lastName').addClass("is-invalid");
    }

    //Email
    let email = $('#email').val();
    let regEmail = /^\w+\@\w+\.\w+$/;
    if (regEmail.test(email)) {
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");
    } else {
        $('#email').removeClass("is-valid");
        $('#email').addClass("is-invalid");
    }

    //Phone
    let phone = $('#phoneNumber').val();
    let regPhone = /^[0-9]{10}$/;
    if (regPhone.test(phone)) {
        $('#phoneNumber').removeClass("is-invalid");
        $('#phoneNumber').addClass("is-valid");
    } else {
        $('#phoneNumber').removeClass("is-valid");
        $('#phoneNumber').addClass("is-invalid");
    }

    //Birth Date
    let birthDate = $('#birthdate').val();
    let regDate = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    console.log(birthDate);
    if (regDate.test(birthDate)) {
        $('#birthdate').removeClass("is-invalid");
        $('#birthdate').addClass("is-valid");
    } else {
        $('#birthdate').removeClass("is-valid");
        $('#birthdate').addClass("is-invalid");
    }

}

let saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);

