/**
 * 弹出一个新的窗口
 * @param  {json}   D_param  弹出窗口的设置参数
 * @param  {Function} callback 弹出窗口的回调函数
 * @return {void}            无返回值
 */
function openWindowDiv(D_param, callback){
	var newParam = $.extend({},{
		id: "",
		title: "",
		content: ""
	},D_param);
	var d = dialog(newParam);
	var block = '<div style="opacity: 0.2;filter:alpha(opacity=20); background: none repeat scroll 0% 0% rgb(0, 0, 0); position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; -moz-user-select: none; z-index: 1024;" tabindex="0" class="ui-popup-backdrop zui-dialog-pop"></div>';
	$("body").prepend($(block));

	d.addEventListener('show', function () {
	    if(typeof callback == 'function'){
	    	callback(this);
	    }
	});
	d.addEventListener('close', function(){
		$('body .zui-dialog-pop').eq(0).remove();
	})
	d.show();
}
/**
 * 弹出提示语，间隔一段时间后自动关闭
 * @param  {String}   content  提示语
 * @param  {Number}   time     多久会关闭，单位s
 * @param  {Function} callback 关闭弹框的回调函数
 * @return {void}            无返回值
 */		
function result_tips(content, time, callback){
	var d = dialog({
	    content: content||"数据正在提交..."
	});
	if(!time)
		time = 2000;
	else
		time = parseInt(time*1000, 10);
	d.addEventListener('close', function () {
	    if(typeof callback == 'function'){
	    	callback(this);
	    }
	});
	d.show();
	setTimeout(function () {
	    d.close().remove();
	}, time);
}
/**
 * 弹出消息提示框
 * @param  {String}   title    消息提示框的标题
 * @param  {String}   content  消息提示框的内容
 * @param  {Function} callback 回调函数
 * @return {void}            无返回值
 */
function result_prompt(title,content, callback){
	dialog({
	    title: title||'消息',
	    content: '<p style="font-size:14px;width:240px;word-wrap:break-word;word-break: break-all;">'+content+'</p>',
	    button: [
            {
                value: '确定',
                callback: function () {
    	    		this.close().remove();
                },
                autofocus: true
            }
        ],
        onclose: function(){
            if(typeof callback == 'function'){
	    		callback(this);
	    	}
        }
	}).show();
}

/**
 * 弹出确定框
 * call demo:result_comfirm('测试',function(){alert(1);},function(){alert(2)});
 * @param  {String} content  提示信息
 * @param  {Function} cbSure   确定之后调用的函数,可以不传
 * @param  {Function} cbRefuse 取消按钮调用的函数,可以不传
 * @param  {String} id       窗口的id属性
 * @return {void}          无返回值
 */
function result_comfirm(content, cbSure, cbRefuse, id){
	var d = dialog({
		id: id || "D_comfirm",
	    title: '提示',
	    content: '<p style="font-size:14px;width:240px;word-wrap:break-word;word-break: break-all;">'+content+'</p>',
	    button: [
            {
                value: '取消',
                callback: function () {
            		if(typeof cbRefuse == 'function')
            			cbRefuse();
    	    		this.close().remove();
                },
                autofocus: false
            },
            {
                value: '确定',
                callback: function () {
            		if(typeof cbSure == 'function')
            			cbSure();
    	    		this.close().remove();
                },
                autofocus: true
            }
        ],
	    cancel: false
	});
	d.addEventListener('close', function () {
	    $('body .zui-dialog-pop-comfirm').eq(0).remove();
	});
	d.show();

	var zIndex = $("div[aria-describedby='content:D_comfirm']").css("zIndex");
	if(!$(".zui-dialog-pop-comfirm").length){
		var block = '<div style="opacity: 0.2;filter:alpha(opacity=20); background: none repeat scroll 0% 0% rgb(0, 0, 0); position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; -moz-user-select: none; z-index: '+(zIndex-1)+';" tabindex="0" class="ui-popup-backdrop zui-dialog-pop zui-dialog-pop-comfirm"></div>';
		$("body").append($(block));
		d.focus();
	}
}
/**
 * 弹出确定框
 * call demo:result_comfirm('测试',function(){alert(1);},function(){alert(2)},function(){alert(3)});
 * @param  {String} content  提示信息
 * @param  {Function} cbSure   确定操作的回调函数,可以不传
 * @param  {Function} cbRefuse 取消操作的回调函数,可以不传
 * @param {Function} cbQuick 确定并退出操作的回调函数,可以不传
 * @param  {String} id       窗口的id属性
 * @return {void}          无返回值
 */
function result_comfirm_S(content, cbSure, cbRefuse, cbQuick,id){
	var d = dialog({
		id: id || "D_confirm_s",
	    title: '提示',
	    content: '<p style="font-size:14px;width:240px;word-wrap:break-word;word-break: break-all;">'+content+'</p>',
	    button: [
	    	{
	    		value: '确定并退出',
	    		callback: function(){
	    			if(typeof cbQuick == 'function')
	    				cbQuick();
	    			this.close().remove();
	    		},
	    	    autofocus: false,
	    	    id: 'J_sure_close'
	    	},
            {
                value: '取消',
                callback: function () {
            		if(typeof cbRefuse == 'function')
            			cbRefuse();
    	    		this.close().remove();
                },
                autofocus: false
            },
            {
                value: '确定',
                callback: function () {
            		if(typeof cbSure == 'function')
            			cbSure();
    	    		this.close().remove();
                },
                autofocus: true
            }
        ],
	    cancel: false
	});
	$(".ui-dialog-button").find("button[i-id=J_sure_close]").addClass("J_sure_close");
	d.addEventListener('close', function () {
	    $(".zui-dialog-pop-comfirm-s").remove();
	});
	d.show();
	var zIndex = $("div[aria-describedby='content:D_confirm_s']").css("zIndex");
	if(!$(".zui-dialog-pop-comfirm-s").length){
		var block = '<div style="opacity: 0.2;filter:alpha(opacity=20); background: none repeat scroll 0% 0% rgb(0, 0, 0); position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; -moz-user-select: none; z-index: '+(zIndex-1)+';" tabindex="0" class="ui-popup-backdrop zui-dialog-pop zui-dialog-pop-comfirm-s"></div>';
		$("body").append($(block));
		d.focus();
	}
}

function result_normalDiv(title, content, width, callback){
	var width = (width || '240')+"px";
	var d = dialog({
	    title: title,
	    content: '<p style="font-size:14px;width:'+width+';word-wrap:break-word;word-break: break-all;">'+content+'</p>',
	    quickClose: true// 点击空白处快速关闭
	});
	var block = '<div style="opacity: 0.2;filter:alpha(opacity=20); background: none repeat scroll 0% 0% rgb(0, 0, 0); position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; -moz-user-select: none; z-index: 1024;" tabindex="0" class="ui-popup-backdrop zui-dialog-pop"></div>';
	$("body").prepend($(block));

	d.addEventListener('show', function () {
	    if(typeof callback == 'function'){
	    	callback(this);
	    }
	});
	d.addEventListener('close', function(){
		$('body .zui-dialog-pop').eq(0).remove();
	})
	d.show();
}