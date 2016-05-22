(function($){
	/**
	 * js操作cookie。setCookie方法添加cookie。
	 * getCookie方法获取cookie
	 * delCookie方法删除cookie
	 */
	$.tmCookie={
			//设置Cookie
			setCookie:function(name,value,time,option){
				var str=name+'='+escape(value);
				var date=new Date();
				date.setTime(date.getTime()+this.getCookieTime(time));
				console.log(date.toGMTString())
				str+=";expires="+date.toGMTString();
				if(option){
					if(option.path)str+=';path='+option.path;
					if(option.domain)str+=';domain='+option.domain;	
					if(option.secure)str+=';true';	
				
				}
				document.cookie=str;
			},
			//获取Cookie
			getCookie:function(name){
				var arr=document.cookie.split('; ');			
				if(arr.length==0)return '';
				for(var i=0;i<arr.length;i++){
					tmp=arr[i].split('=');
					if(tmp[0]==name)
						return unescape(tmp[1]);
				}
				return '';
			},
			delCookie:function(name){
				/*$.tmCookie.setCookie(name,'',-1);*/
				var date=new Date();
				date.setTime(date.getTime()-10000);
				document.cookie=name+"=;expires="+date.toGMTString();	
			},
			//Cookie日期的格式	s2:2秒；m2:2分钟；h2:2小时；d2:2天
			getCookieTime:function(time){
				if(time<=0)	return 	time;
				var str1=time.substring(1,time.length)*1;
				var str2=time.substring(0,1);
				if(str2=="s"){
					return str1*1000;
				}else if(str2=="m"){
					return str1*60*1000;
				}else if(str2=="h"){
					return str1*60*60*1000;
				}else if(str2=="d"){
					return str1*24*60*60*1000;
				}
			}
	}
})(jQuery);
