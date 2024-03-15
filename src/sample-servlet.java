package mypack;  
import java.io.IOException;  
import java.io.PrintWriter;  
import javax.servlet.ServletException;  
import javax.servlet.annotation.WebServlet;  
import javax.servlet.http.HttpServlet;  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
@WebServlet("/Helloworld")  
public class Helloworld extends HttpServlet {  
 private static final long serialVersionUID = 1 L;  
 public Helloworld() {  
  super();  
 }  
 protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
  response.setContentType("text/html");  
  PrintWriter out = response.getWriter();  
  out.print("<html><body>");  
  out.print("<h3>Welcome To Servlet</h3>");  
  out.print("</body></html>");  
 }  
} 