package util;

import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.commons.configuration.reloading.FileChangedReloadingStrategy;

/**
 * 功能：PropertiesUtil 读取propery属性 规则：propery 随时都有可能变更的方在这个里面
 * 
 * @author G3-YX-SHIL 2015-02-05
 */
public class PropertiesUtil {
	private static final String encoding = "UTF-8";
	private static PropertiesConfiguration systemconfig = null;
	static {
		systemConfigInit();
	}

	public static void systemConfigInit() {
		try {
			systemconfig = new PropertiesConfiguration("./config/system.properties");
			systemconfig.setReloadingStrategy(new FileChangedReloadingStrategy());
			systemconfig.setEncoding(encoding);
		} catch (ConfigurationException e) {
		}
	}

	public static String getString(String key) {
		String str = "";
		try {
			str = systemconfig.getString(key);
		} catch (Exception ex) {
			ex.fillInStackTrace();
			str = "";
		}
		return str;
	}
}