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

function stripPhoneNumber(phoneNumberString) {
    let cleaned = phoneNumberString.replace(/\D/g, '');
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return match[1] + match[2] + match[3];
    }
    return phoneNumberString;
}

function getJSDateFromSQLDate(sqlDate) {
    // Strip non-digits
    let cleaned = sqlDate.replace(/\D/g, '');
    // Match and group
    let match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
    // Create a new Date object
    let resultDate = new Date(match[1], match[2] - 1, match[3]);
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
        let birthdayDate;
        let birthdayString;
        for (let i = 0; i < json_result.length; i++) {

            birthdayDate = getJSDateFromSQLDate(json_result[i].birthday);
            birthdayString = birthdayDate.toLocaleDateString();

            $("#datatable tbody").append("<tr><td>" + json_result[i].id + "</td>" +
                "<td>" + htmlSafe(json_result[i].first) + "</td>" +
                "<td>" + htmlSafe(json_result[i].last) + "</td>" +
                "<td>" + htmlSafe(json_result[i].email) + "</td>" +
                "<td>" + htmlSafe(birthdayString) + "</td>" +
                "<td>" + formatPhoneNumber(htmlSafe(json_result[i].phone)) + "</td>" +
                "<td>" +
                "<button type='button' name='delete' class='deleteButton btn btn-danger' value=" + json_result[i].id + "> Delete </button>" +
                "</td></tr>");

        }
        let buttons = $(".deleteButton");
        buttons.on("click", deleteItem);
        
        });

}

// Call your code.
updateTable();


// Called when "Add Item" button is clicked
function showDialogAdd() {

    let firstName = $('#firstName')
    let lastName = $('#lastName')
    let email = $('#email')
    let phoneNumber = $('#phoneNumber')
    let birthdate = $('#birthdate')


    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').val("");
    firstName.val("");
    firstName.removeClass("is-invalid");
    firstName.removeClass("is-valid");

    lastName.val("");
    lastName.removeClass("is-invalid");
    lastName.removeClass("is-valid");

    email.val("");
    email.removeClass("is-invalid");
    email.removeClass("is-valid");

    phoneNumber.val("");
    phoneNumber.removeClass("is-invalid");
    phoneNumber.removeClass("is-valid");

    birthdate.val("");
    birthdate.removeClass("is-invalid");
    birthdate.removeClass("is-valid");

    // Show the hidden dialog
    $('#myModal').modal('show');

}

$('#myModal').on('shown.bs.modal', function () {
    $('#firstName').focus();
})
// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

function saveChanges() {
    let firstField = $('#firstName')
    let lastField = $('#lastName')
    let emailField = $('#email')
    let phoneNumberField = $('#phoneNumber')
    let birthdateField = $('#birthdate')
    let validatedFirst;
    let validatedLast;
    let validatedPhone;
    let validatedBirthdate;
    let validatedEmail;
    console.log("SAVE CHANGES");
    let firstName = firstField.val();
    //FirstName
    let reg = /^[A-Za-z]{1,10}$/;
    if (reg.test(firstName)) {
        firstField.removeClass("is-invalid");
        firstField.addClass("is-valid");
        validatedFirst = true;
    } else {
        firstField.removeClass("is-valid");
        firstField.addClass("is-invalid");
        validatedFirst = false;
    }
    //LastName
    let lastName = lastField.val();
    let regLast = /^[A-Za-z]{1,15}$/;
    if (regLast.test(lastName)) {
        lastField.removeClass("is-invalid");
        lastField.addClass("is-valid");
        validatedLast = true;
    } else {
        lastField.removeClass("is-valid");
        lastField.addClass("is-invalid");
        validatedLast = false;
    }

    //Email
    let email = emailField.val();
    let regEmail = /^[\w.]+@[\w.]+$/;
    if (regEmail.test(email)) {
        emailField.removeClass("is-invalid");
        emailField.addClass("is-valid");
        validatedEmail = true;
    } else {
        emailField.removeClass("is-valid");
        emailField.addClass("is-invalid");
        validatedEmail = false;
    }

    //Phone
    let phone = phoneNumberField.val();
    let regPhone = /^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/;
    if (regPhone.test(phone)) {
        phoneNumberField.removeClass("is-invalid");
        phoneNumberField.addClass("is-valid");
        validatedPhone = true;

    } else {
        phoneNumberField.removeClass("is-valid");
        phoneNumberField.addClass("is-invalid");
        validatedPhone = false;

    }

    //Birth Date
    let birthDate = birthdateField.val();
    let regDate = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    console.log(birthDate);
    if (regDate.test(birthDate)) {
        birthdateField.removeClass("is-invalid");
        birthdateField.addClass("is-valid");
        validatedBirthdate = true;

    } else {
        birthdateField.removeClass("is-valid");
        birthdateField.addClass("is-invalid");
        validatedBirthdate = false;

    }

    if (validatedFirst && validatedLast && validatedEmail && validatedBirthdate && validatedPhone) {
        let stripPhone = stripPhoneNumber(phone);
        let dataToServer = {first  : firstName,
                            last   : lastName,
                            phone  : stripPhone,
                            birthday : birthDate,
                            email  : email};
        console.log(dataToServer);
        let url = "api/name_list_edit";
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(dataToServer),
            success: function(dataFromServer) {
                console.log(dataFromServer);
                let result = JSON.parse(dataFromServer);
                if ('error' in result) {
                    // JavaScript alert the error.
                    alert(result.error);
                } else {
                    location.reload(true);
                    $('#id').val("");
                    $('#firstName').val("");
                    $('#lastName').val("");
                    $('#email').val("");
                    $('#phoneNumber').val("");
                    $('#birthdate').val("");
                    // Set the message body
                    $("#toast-body").html("Success! Record inserted.");
                    // Set the delay in ms. Defaults to 500.
                    let myToast = $('#myToast')
                    myToast.toast({delay: 5000});
                    // Show it
                    myToast.toast('show');
                }
            },
            contentType: "application/json",
            dataType: 'text', // Could be JSON or whatever too
        });
    }
}

let saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);


function deleteItem(e) {
    console.log("Delete");
    console.log(e.target.value);
    let deletedID = e.target.value
    let dataToServer = {id  : deletedID};
    console.log(dataToServer);
    let url = "api/name_list_delete";
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(dataToServer),
        success: function (dataFromServer) {
            location.reload(true);
            console.log(dataFromServer)
            $("#toast-body").html("Success! Record Deleted.");
            // Set the delay in ms. Defaults to 500.
            let myToast = $('#myToast')
            myToast.toast({delay: 5000});
            // Show it
            myToast.toast('show');
        },
        contentType: "application/json",
        dataType: 'text', // Could be JSON or whatever too
    });
}

// Fire an event with keydown
$(document).keydown(function(e){
    // Log the key
    console.log(e.keyCode);
    if(e.keyCode == 65 && !$('#myModal').is(':visible')){
        showDialogAdd();
    }
    if(e.keyCode == 13 && $('#myModal').is(':visible')) {
        saveChanges();
    }
});



