package servlet;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 * Servlet implementation class UploadServlet
 */
@WebServlet("/UploadServlet")
public class UploadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UploadServlet() {
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

		FileItemFactory fileItemFactory=new DiskFileItemFactory();
		ServletFileUpload fileUpload=new ServletFileUpload(fileItemFactory);
		try {
			List<FileItem> items=fileUpload.parseRequest(request);
			String filename = null;
			for (FileItem fileItem : items) {
				if (fileItem.isFormField()) {
					if ("tranId".equals(fileItem.getFieldName())) {
						System.out.println(fileItem.getString());
					}
				}else {
					String parent=request.getRealPath("/");
					if (fileItem.getName()==null) {
						continue;
					}
					filename=fileItem.getName();
					filename=filename.substring(filename.lastIndexOf("."));
					filename=UUID.randomUUID()+filename;
					fileItem.write(new File(parent, filename));
				}
			}
			System.out.println(request.getParameter("tranId"));	//这里拿不到参数
			response.getWriter().print(filename);
		} catch (FileUploadException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
