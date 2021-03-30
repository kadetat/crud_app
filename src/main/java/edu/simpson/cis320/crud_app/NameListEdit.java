package edu.simpson.cis320.crud_app;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "NameListEdit", value = "/api/name_list_edit")
public class NameListEdit extends HttpServlet {
    private final static Logger log = Logger.getLogger(NameListEdit.class.getName());
    private Pattern firstValidationPattern;
    private Pattern lastValidationPattern;
    private Pattern phoneValidationPattern;
    private Pattern emailValidationPattern;
    private Pattern birthdayValidationPattern;

    /**
     * Our constructor
     */
    public NameListEdit() {
        // --- Compile and set up all the regular expression patterns here ---
        firstValidationPattern = Pattern.compile("^[A-Za-z]{1,10}$");
        lastValidationPattern = Pattern.compile("^[A-Za-z]{1,18}$");
        phoneValidationPattern = Pattern.compile("^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$");
        emailValidationPattern = Pattern.compile("^[\\w.]+@[\\w.]+$");
        birthdayValidationPattern = Pattern.compile("^[0-9]{4}-[0-9]{2}-[0-9]{2}$");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        log.log(Level.INFO, "doPost for NameListEdit Servlet");

        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Open the request for reading. Read in each line, put it into a string.
        // Yes, I think there should be an easier way.
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        // Log the string we got as a request, just as a check
        log.log(Level.INFO, requestString);

        // Great! Now we want to parse the object, and pop it into our business object. Field
        // names have to match. That's the magic.
        Jsonb jsonb = JsonbBuilder.create();
        Person formTestObject = jsonb.fromJson(requestString, Person.class);

        Matcher mFirst = firstValidationPattern.matcher(formTestObject.getFirst());

        if (!mFirst.find()) {
            out.println("{\"error\" : \"Error validating first name.\"}");
            return;
        }

        Matcher mLast = lastValidationPattern.matcher(formTestObject.getLast());

        if (!mLast.find()) {
            out.println("{\"error\" : \"Error validating last name.\"}");
            return;
        }

        Matcher mPhone = phoneValidationPattern.matcher(formTestObject.getPhone());

        if (!mPhone.find()) {
            out.println("{\"error\" : \"Error validating phone number.\"}");
            return;
        }

        Matcher mEmail = emailValidationPattern.matcher(formTestObject.getEmail());

        if (!mEmail.find()) {
            out.println("{\"error\" : \"Error validating email.\"}");
            return;
        }

        Matcher mBirthday = birthdayValidationPattern.matcher(formTestObject.getBirthday());

        if (!mBirthday.find()) {
            out.println("{\"error\" : \"Error validating Birthday.\"}");
            return;
        }

        // If we made it this far we have success.
        out.println("{\"success\": \"Successful insert.\"}");

        // Send something back to the client. Really, we should send a JSON, but
        // we'll keep things simple.
        // out.println("Received Object");

        // Use our DAO to get a list of people
        PersonDAO.addPerson(formTestObject);

    }
}