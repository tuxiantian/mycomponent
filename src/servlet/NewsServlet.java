package servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class NewsServlet
 */
@WebServlet("/NewsServlet")
public class NewsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public NewsServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
int start=Integer.parseInt(request.getParameter("start"));
int limit=Integer.parseInt(request.getParameter("limit"));
response.setContentType("text/html;charset=UTF-8");
StringBuffer buffer=new StringBuffer();
buffer.append("{\"beans\":[");
for (int i = start; i < start+limit; i++) {
	buffer.append("{");
	String title="title"+i;
	buffer.append("\"title\":"+"\""+title+"\",");
	String detail="detail"+i;
	buffer.append("\"detail\":"+"\""+detail+"\",");
	buffer.append("\"category\":"+1);
	buffer.append("},");
}
buffer.deleteCharAt(buffer.length()-1);
buffer.append("],");
buffer.append("\"returnCode\":"+ "0,");
buffer.append("\"bean\":{");
buffer.append("\"total\":"+80);
buffer.append("}");

buffer.append("}");

response.getWriter().print(buffer);
	}

}
