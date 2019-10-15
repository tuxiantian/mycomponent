package util;


/**
 * 字符串工具类
 * 
 * @author 
 * @since 2015-03-17 21:07:21
 */
public final class StringUtil {
	/** Private Constructor **/
	private StringUtil() {
	}
	
	/**
	 * 判断字符串是否非null && 非空字符 
	 * 
	 * @param param
	 * @return
	 */
	public static boolean isNotEmpty(String param) {
		return param != null && !"".equals(param.trim());
	}

	/**
	 * 判断字符串是否为null || 空字符串
	 * 
	 * @param param
	 * @return
	 */
	public static boolean isEmpty(String param) {
		return param == null || "".equals(param.trim());
	}
	
	public static String trim2Empty(String str) {
		return isEmpty(str) ? "" : str.trim();
	}
}
