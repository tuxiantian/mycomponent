package filter;

import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.StringWriter;
import java.io.Writer;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import util.PropertiesUtil;
import util.StringUtil;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class FreemarkerEngine {
	private final Logger logger = Logger.getLogger(FreemarkerEngine.class);
	private Template template;
	private Configuration tempConfiguration;

	private static  FreemarkerEngine instance = null;

	private FreemarkerEngine(ServletContext serletContext) {
		init(serletContext);
	}

	public static FreemarkerEngine getInstance(ServletContext serletContext) {
		synchronized (FreemarkerEngine.class) {
			if(instance==null) instance = new FreemarkerEngine(serletContext);
		}
		return instance;
	}
	private void init(ServletContext serletContext) {
		String method ="init";
		logger.debug(method+ "start init...");
		try {
			tempConfiguration = new Configuration();
			tempConfiguration.setClassicCompatible(true);
			//tempConfiguration.setClassForTemplateLoading();
			//tempConfiguration.setDirectoryForTemplateLoading(new File(this.getClass().getResource("/").getPath()+TEMPLATESPATH));
			//tempConfiguration.setClassForTemplateLoading(this.getClass().getClassLoader().getClass(), TEMPLATESPATH);
			tempConfiguration.setDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
			tempConfiguration.setServletContextForTemplateLoading(serletContext, null);
			tempConfiguration.setNumberFormat("");
			tempConfiguration.setDefaultEncoding("utf-8");
			createConfiguration(tempConfiguration);
		} catch (Exception e) {
			logger.error(method+ "error",e);
		}
		logger.debug(method+ "end init...");
	}
	
	/**
	 * 增加root共享数据
	 */
	private void createConfiguration(Configuration configuration) throws TemplateException{
		String webSiteDomain = PropertiesUtil.getString("webSiteDomain");
		webSiteDomain = StringUtil.isEmpty(webSiteDomain)?"http://localhost:80":StringUtil.trim2Empty(webSiteDomain);
		configuration.setSharedVariable("webSiteDomain", webSiteDomain);
	}

	public String themplate2String(Object root,String templateFile) {
		String method = "toString";
		logger.debug(method+ "start generate String");
		StringWriter sw = new StringWriter();
		try {
			template = tempConfiguration.getTemplate(templateFile);
			template.process(root, sw);
		
		} catch (Exception ex) {
			logger.error(method+ ex.getMessage());
		}
		return sw.toString();
	}
	
	public String themplate2File(String path,String fileName,Object root,String templateFile){
		String method = "toFile";
		creatDirs(path);
		Writer out = null;
		File afile = new File(path+File.separator+fileName);
		try {
			template = tempConfiguration.getTemplate(templateFile);
			 out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(afile),"UTF-8"));
			template.process(root, out);
			out.flush();
		} catch (FileNotFoundException e) {
			logger.error(method+ e.getMessage());
		} catch (TemplateException e) {
			logger.error(method+ e.getMessage());
		} catch (IOException e) {
			logger.error(method+ e.getMessage());
		} finally {
			try {
				if (out != null)out.close();
			} catch (IOException e) {}
		}
		return afile.getPath();
	}
	
	public static boolean creatDirs(String path) {
		File aFile = new File(path);
		
		if (!aFile.exists()) {
			return aFile.mkdirs();
		} else {
			return true;
		}
	}
	
	public void process(Object root,String templateFile,HttpServletResponse response) throws IOException  {
		Writer out = response.getWriter();
		Template template = tempConfiguration.getTemplate(templateFile);
		try {
			template.process(root, out);
			out.flush();
		} catch (TemplateException e) {
			logger.error("process"+ e.getMessage());
			throw new IOException(e);
		} finally {
			try {
				if (out != null)out.close();
			} catch (IOException e) {
				logger.error("process"+ e.getMessage());
			}
		}
	}
	
	 public static void save(final OutputStream os, final String content)
	    throws IOException {
	        BufferedOutputStream bos = new BufferedOutputStream(os);
	        bos.write(content.getBytes());
	        bos.flush();
	    }
}
