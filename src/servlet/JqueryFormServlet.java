package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import util.Des;

/**
 * Servlet implementation class JqueryFormServlet
 */
@WebServlet("/JqueryFormServlet")
public class JqueryFormServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public JqueryFormServlet() {
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
		String key="zyzx1qaz",specialTime=request.getParameter("specialTime"),
				password=request.getParameter("password");
		Des des=new Des();
		System.out.println(des.strDec(password, key, specialTime, null));
		response.setCharacterEncoding("utf-8");
		response.getWriter().write(des.strDec(password, key, specialTime, null));
	}

}
