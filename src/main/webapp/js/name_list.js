// Main Javascript File

function htmlSafe(data) {
    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;")
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
            $("#datatable tbody").append("<tr><td>" + json_result[i].id + "</td>" +
                "<td>" + htmlSafe(json_result[i].first) + "</td>" +
                "<td>" + htmlSafe(json_result[i].last) + "</td>" +
                "<td>" + htmlSafe(json_result[i].email) + "</td>" +
                "<td>" + htmlSafe(json_result[i].birthday) + "</td>" +
                "<td>" + htmlSafe(json_result[i].phone) + "</td></tr>");
        }
        
        });
}

// Call your code.
updateTable();