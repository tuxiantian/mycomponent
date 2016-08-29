Util = {
	/**
	 * 取消事件冒泡
	 * @param {Object}
	 *            e 事件对象
	 */
	stopBubble : function(e) {
		if (e && e.stopPropagation) {
			e.stopPropagation();
		} else {
			// ie
			window.event.cancelBubble = true;
		}
	},
	/**
	 * 入参转码
	 * @param {string}
	 * 		json格式
	 */
	transCoding : function(json){
		var temp=encodeURIComponent(json);
		temp=CryptoJS.enc.Utf8.parse(temp);
		temp=CryptoJS.enc.Base64.stringify(temp);
		return temp;
	},
	/**
	 * 入参转码
	 * @param {string}
	 * 		json格式
	 */
	transDecoding : function(objStr){
		var words = CryptoJS.enc.Base64.parse(objStr);
		words = words.toString(CryptoJS.enc.Utf8);
		words = decodeURIComponent(words)
		return words;
	}
};
/**
 * 日期时间处理工具
 * 
 * @namespace Util
 * @class date
 */
Util.date = {
	/**
	 * 格式化日期时间字符串
	 * 
	 * @method dateTime2str
	 * @param {Date}
	 *            dt 日期对象
	 * @param {String}
	 *            fmt 格式化字符串，如：'yyyy-MM-dd hh:mm:ss'
	 * @return {String} 格式化后的日期时间字符串
	 */
	dateTime2str : function(dt, fmt) {
		var z = {
			M : dt.getMonth() + 1,
			d : dt.getDate(),
			h : dt.getHours(),
			m : dt.getMinutes(),
			s : dt.getSeconds()
		};
		fmt = fmt.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
			return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1)))
					.slice(-2);
		});
		return fmt.replace(/(y+)/g, function(v) {
			return dt.getFullYear().toString().slice(-v.length);
		});
	},
	/**
	 * 根据日期时间格式获取获取当前日期时间
	 * 
	 * @method dateTimeWrapper
	 * @param {String}
	 *            fmt 日期时间格式，如："yyyy-MM-dd hh:mm:ss";
	 * @return {String} 格式化后的日期时间字符串
	 */
	dateTimeWrapper : function(fmt) {
		if (arguments[0])
			fmt = arguments[0];
		return this.dateTime2str(new Date(), fmt);
	},
	/**
	 * 获取当前日期时间
	 * 
	 * @method getDatetime
	 * @param {String}
	 *            fmt [optional,default='yyyy-MM-dd hh:mm:ss'] 日期时间格式。
	 * @return {String} 格式化后的日期时间字符串
	 */
	getDatetime : function(fmt) {
		return this.dateTimeWrapper(fmt || 'yyyy-MM-dd hh:mm:ss');
	},
	/**
	 * 获取当前日期时间+毫秒
	 * 
	 * @method getDatetimes
	 * @param {String}
	 *            fmt [optional,default='yyyy-MM-dd hh:mm:ss'] 日期时间格式。
	 * @return {String} 格式化后的日期时间字符串
	 */
	getDatetimes : function(fmt) {
		var dt = new Date();
		return this.dateTime2str(dt, fmt || 'yyyy-MM-dd hh:mm:ss') + '.'
				+ dt.getMilliseconds();
	},
	/**
	 * 获取当前日期（年-月-日）
	 * 
	 * @method getDate
	 * @param {String}
	 *            fmt [optional,default='yyyy-MM-dd'] 日期格式。
	 * @return {String} 格式化后的日期字符串
	 */
	getDate : function(fmt) {
		return this.dateTimeWrapper(fmt || 'yyyy-MM-dd');
	},
	/**
	 * 获取当前时间（时:分:秒）
	 * 
	 * @method getTime
	 * @param {String}
	 *            fmt [optional,default='hh:mm:ss'] 日期格式。
	 * @return {String} 格式化后的时间字符串
	 */
	getTime : function(fmt) {
		return this.dateTimeWrapper(fmt || 'hh:mm:ss');
	}
};


Util.browser = {
	/**
	 * 获取URL地址栏参数值
	 * name 参数名
	 * url [optional,default=当前URL]URL地址
	 * @return {String} 参数值
	 */
	getParameter : function(name, url) {
		var paramStr = url || window.location.search;
		paramStr = paramStr.split('?')[1];
		if ((!paramStr)||paramStr.length == 0) {return null;}
		var params = paramStr.split('&');
		for ( var i = 0; i < params.length; i++) {
			var parts = params[i].split('=', 2);
			if (parts[0] == name) {
				if (parts.length < 2 || typeof (parts[1]) === "undefined"
						|| parts[1] == "undefined" || parts[1] == "null")
					return '';
				return parts[1];
			}
		}
		return null;
	}
};
/**
 * 常用正则表达式
 */
Util.validate = {
	/**
	 * 格式校验方法
	 * 
	 * @method Check
	 * @param {String}
	 *            type 验证类型
	 * @param {String}
	 *            value 验证值
	 */
	Check : function(type, value) {
		var _reg = this.regexp[type];
		if (_reg == undefined) {
			alert("Type " + type + " is not in the data");
			return false;
		}
		var reg;
		if (typeof _reg == "string") {
			reg = new RegExp(_reg);
		} else if ((typeof _reg) == "function") {
			return _reg(value);
		} else {
			reg = _reg[type];
		}
		return reg.test(value);
	}
};
Util.sms = {};
Util.sms.formatStr = function(value) {
    if (value) {	
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                value = value.replace(new RegExp("\\{" + (i - 1) + "\\}", 'g'), arguments[i]);
            }
        }
    }
    return value;
};


Util.lStorage = {
    /*
    localStorage只支持字符串，如果要放json，请先使用JSON.stringify()转换
    读取使用JSON.parse()读取
    */
    setParam: function(name, value) {
        localStorage.setItem(name, value);
    },
    getParam: function(name) {
        return localStorage.getItem(name);
    },
    removeParam:function(name){
    	localStorage.removeItem(name);
    },
    clearParam:function(){
    	//清除所有的存储，谨慎使用
    	localStorage.clear();
    },
    paramSize:function(){
    	return localStorage.length;
    },
    /*
        离线缓存管理器
    */
    cacheManager:new CacheManager(window.cacheCfg)
}

Util.sStorage = {
    /*
    sessionStorage只支持字符串，如果要放json，请先使用JSON.stringify()转换
    读取使用JSON.parse()读取
    */
    setParam: function(name, value) {
        sessionStorage.setItem(name, value);
    },
    getParam: function(name) {
        return sessionStorage.getItem(name);
    },
    removeParam:function(name){
    	sessionStorage.removeItem(name);
    },
    clearParam:function(){
    	//清除所有的存储，谨慎使用
    	sessionStorage.clear();
    },
    paramSize:function(){
    	return sessionStorage.length;
    }
}

/*
    离线缓存管理器
*/
function CacheManager(config){
    this.config=config;
}
/*
    从离线缓存中获取数据,当前方法有两个功能：
    1、从后台获取数据，第二个参数是一个回调函数，
    当离线缓存中没有要获取的数据时 或 当请求后台的入参值改变时，
    调用update方法从后台获取新数据，并覆盖旧数据
    2、获取本地插入的数据，第二个参数是一个字符串，
    当离线缓存中没有数据时直接返回空
*/
CacheManager.prototype.get=function(name,callback,param){
    var target=this.config[name];
    var cacheKey=target.key;
    var json=Util.lStorage.getParam(cacheKey);
    //当callback是方法时，表示从后台获取数据，需要使用回调处理数据
    if(typeof callback == 'function'&&target['url']){
        //realTime是在config对象中配置，
        //如果realTime配置true,表示每次都从后台取数据
        if(json&&!target.realTime){
            json=JSON.parse(json);
            if(json.param==param){
                callback('success',json);
                return;
            }
        }
        this.update(name,callback,param);
        return;
    }else{
        //callback不是方法的时候，即时返回数据
        return json;
    }
}
CacheManager.prototype.update=function(name,callback,param){
    var target=this.config[name];
    var cacheKey=target.key;
    //当callback是方法时，表示从后台刷新数据
    if(typeof callback == 'function'&&target.url){
        var _self = this;
        $.PostJson(target.url,param,function(state,json){
            if(state=='success'&&json.returnCode=='0'){
                json.param=param;
                Util.lStorage.setParam(cacheKey,JSON.stringify(json));
            }else{
                _self.del(name);
            }
            callback(state,json);
        },true);
    }else{
        //此时callback是字符串
        Util.lStorage.setParam(cacheKey,callback);
    }
}
CacheManager.prototype.del=function(name){
    var target=this.config[name];
    var cacheKey=target.key;
    Util.lStorage.removeParam(cacheKey);
}
CacheManager.prototype.clearAll=function(){
    for(var attr in this.config){
        var target=this.config[attr];
        var cacheKey=target.key;
        Util.lStorage.removeParam(cacheKey);
    }
};

//判断访问终端
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}