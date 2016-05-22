Util={};
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
     * 将离线缓存中的键值对放置json对象中。
     * 返回一个json对象
     */
    getJsonObject:function(){
    	var json={};
    	for(var k in localStorage) {
    		//json[k]=localStorage.getItem(k);
    		json[k]=localStorage[k];
    	}
    	return json;
    },
    /*
     * 将json里面的键值对放置离线缓存中
     * 暂不支持jsonObject的key的value为Object
     */
    setJsonObject:function(jsonObject){
		 if (!jsonObject){
			    return false;
		 }
		  $.each(jsonObject, function(i, e){
		    if (!i || (i == 'null') || (i == 'undefined') ){
		      return false;
		    };
		    if (!e || (e == 'null') || (e == 'undefined') ){
		      e = "";
		    };
		    localStorage.setItem(i, e);
		  });
    },
    /*
     * 将离线缓存的键值对放置json对象中，然后将json对象转为json字符串返回。
     */
    getJsonString:function(){
    	return JSON.stringify(this.getJsonObject());
    }
};

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
};
