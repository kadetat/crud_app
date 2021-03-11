package edu.simpson.cis320.crud_app;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "memeServlet", value = "/meme")
public class MemeServlet extends HttpServlet {
    private final static Logger log = Logger.getLogger(MemeServlet.class.getName());

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        log.log(Level.INFO, "Meme Servlet");

        ServletContext context = getServletContext();
        InputStream imageStream = context.getResourceAsStream("WEB-INF/classes/simpson.jpg");
        BufferedImage image = ImageIO.read(imageStream);

        // Modify Image
        Graphics g = image.getGraphics();

        // Set Font
        String fontName = "Century Schoolbook";
        int fontSize = 65;
        int fontStyle = Font.PLAIN;
        Font font = new Font(fontName, fontStyle, fontSize);
        g.setFont(font);

        // Font color
        Color myColor = new Color(0x6B0623);
        g.setColor(myColor);

        // String Message
        String message = request.getParameter("message");
        if (message == null) {
            message = "Simpson Storm!";
        }
        g.drawString(message, 100, 100);

        // Font color
        Color myColor2 = new Color(0xEEB41E);
        g.setColor(myColor2);

        // Message 2nd color
        g.drawString(message, 102, 102);
        g.dispose();

        // Write out image
        response.setContentType("image/jpg");
        OutputStream out = response.getOutputStream();
        ImageIO.write(image, "JPG", out);
    }

}