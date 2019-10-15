srvMap.add('getProductDetail', '../../../data/detail.json','http://211.138.17.55:20000/rnms/front/wx/wxprnca!getProductDetail');

function getQueryStringArgs(){
  var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
    
  args = {},

  items = qs.length ? qs.split("&") : [],
  item = null,
  name = null,
  value = null,

  i = 0,
  len = items.length;

	for(i=0; i < len; i++){
	  	item = items[i].split('=');
	  	name = decodeURIComponent(item[0]);
	  	value = decodeURIComponent(item[1]);
	
	  	if (name.length){
	    		args[name] = value;
	  	}
	}
	return args;
};

//JSON生成后台传参字符串
function getStrFromJson(json){
  if (!json || (typeof json != 'object') ) {
    return "";
  }
  var rtnStr = "";
  $.each(json, function(i, e){
    if (typeof e == 'object'){
      return;
    };
    rtnStr += "&" + i + "=" + e;
  });
  if (rtnStr){
    rtnStr = rtnStr.substr(1);
  }
  return rtnStr;
}
var is_edit=true;//控制服务包是否可编辑
//var params='PRODUCTCODE=Code0&PROV_CODE=371';
//为服务包下面的子项绑定点击事件
function srvpkgOption(){
	if(is_edit){
		$('#J_detail_srvpkgOption').children().find('li').click(function(){
			var servicePackgeNum=$('#servicePackgeNum').text();
			if($(this).hasClass('current')){
				$(this).removeClass('current');
				servicePackgeNum--;
			}else if($(this).hasClass('on')){}else{
				$(this).addClass('current');
				servicePackgeNum++;
			}
			$('#servicePackgeNum').text(servicePackgeNum)
		});
	}
}
//页面初始化函数
function init(){
	$('.title').click(function(){
        if($(this).next('.title_con').is(":hidden")){
            $(this).next('.title_con').slideDown();
            $(this).find('i').attr('class','up');
        }else{
            $(this).next('.title_con').slideUp();
            $(this).find('i').attr('class','down');
        }
   });
	
	var params = getQueryStringArgs();
	var paramsStr = getStrFromJson(params);
	Util.ajax.postJson(srvMap.get('getProductDetail'), paramsStr, function(json, status) {
        if (json.returnCode == '0000') {
        	// 根据返回值进行判断是否已经订购该套餐
	    	if(!json.bean.isBuy){
	    		$('#buy').show();
	    		$('#bought').hide();
	    	}else{
	    		$('#buy').hide();
	    		$('#bought').show();
	    	}
	    	$('#right').show();
	    	
	    	// 绑定点击购买事件
	    	buyClickFun();
	    	boughtClickFun();
	    	// 校验数据是否存在
	    	validationParamter(json);

        	//温馨提示
        	var reminder=json.bean.reminder;
        	$('#J_detail_reminder').html(reminder.replace(/(\d、)/g, '<br/>$1'));
        	//服务包 0默认选择 current 1必选 on	2可选
        	var doc=document.createDocumentFragment();
        	var i=0,row,servicePackgeNum=0;
        	var srvpkgInfo=json.ext1.srvpkgInfo;
        	var length=srvpkgInfo.length;
        	while(i<length){
        		if(i%2==0||i==(length-1)){
        			row=$('<tr><td align="left" valign="middle"><ul></ul></td></tr>');
        		}
        		var li=document.createElement('li');
        		if(srvpkgInfo[i].srvpkgOption=="0"){
        			$(li).addClass('current');
        			servicePackgeNum++;
        		}else if(srvpkgInfo[i].srvpkgOption=="1"){
        			$(li).addClass('on');
        			servicePackgeNum++;
        		}else{}
        		var p=document.createElement('p');
        		$(p).text(srvpkgInfo[i].srvpkgName);
        		$(li).append(p);
        		$(li).attr("data-id",srvpkgInfo[i].srvpkgId);
        		row.children().find('ul').append(li);
        		i++;
        		if(i%2==0||i==(length)){
        			$(doc).append(row);
        		}
        	}
        	$('#servicePackgeNum').text(servicePackgeNum);
        	$('#J_detail_srvpkgOption').html('');
        	$('#J_detail_srvpkgOption').append(doc);
        	
        	$.magnificPopup.close();
        	
        	//为服务包下面的子项绑定点击事件
        	srvpkgOption();
        	
        }
    });
}

function buyClickFun(){
	$("#buy").unbind("click").bind("click", function(){
		$('#buy').hide();
        $('#bought').show();
        //confirm.sendOrder(params);
	})
}

function boughtClickFun(){
	$("#bought").unbind("click").bind("click", function(){
		$('#buy').show();
        $('#bought').hide();				
	})
}

function validationParamter(json){

	// 套餐名称
	if(!json.bean.productPayInfo){
		$('#J_detail_product').hide();
	}else{
		$('#J_detail_product').text(json.bean.productPayInfo+json.bean.productDesc);
	}
	// 套餐描述
	if(!json.bean.productDesc){
		$('#J_detail_product').hide();
	}else{
		$('#J_detail_product').text(json.bean.productPayInfo+json.bean.productDesc);
	}

	// 套餐内包含
	// 国内主叫
	if(!json.bean.callWithin){
		$('#J_detail_callWithin').hide();
	}else{
		$('#J_detail_callWithin').text(json.bean.callWithin+"分钟");
	}
	// 国内流量
	if(!json.bean.gprsWithin){
		$('#J_detail_gprsWithin').hide();
	}else{
		$('#J_detail_gprsWithin').text(json.bean.gprsWithin+"M");
	}
	// 国内短信
	if(!json.bean.smsWithin){
		$('#J_detail_smsWithin').hide();
	}else{
		$('#J_detail_smsWithin').text(json.bean.smsWithin+"条");
	}

	// 套餐外资费
	// 超出部分国内主叫
	if(!json.bean.callOut){
		$('#J_detail_callOut').hide();
	}else{
		$('#J_detail_callOut').text(json.bean.callOut+"元/分钟");
	}
	// 超出部分国内短信
	if(!json.bean.smsOut){
		$('#J_detail_smsOut').hide();
	}else{
		$('#J_detail_smsOut').text(json.bean.smsOut+"元/条");
	}
	// 超出部分流量费用小于60元
	if(!json.bean.gprsOut){
		$('#J_detail_gprsOut').hide();
	}else{
		$('#J_detail_gprsOut').text(json.bean.gprsOut+"元/MB");
	}

	// 短信指令
	// 超出部分流量费用达到60元，超出部分流量小于1GB
	if(!json.bean.smsInstructions){
		$('#J_detail_smsInstructions').hide();
	}else{
		$('#J_detail_smsInstructions').text(json.bean.smsInstructions);
	}
}

//弹出框插件初始化方法
function diagInitFun(){
  
  //初始化popup
  $('.popup-with-zoom-anim').magnificPopup({
      type: 'inline',
      fixedContentPos: false,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: false,
      preloader: false,
      midClick: true,
      modal: true,
      removalDelay: 300,
      mainClass: 'my-mfp-zoom-in'
  });
}
	
$(function() {
	diagInitFun();
	$('#J_onload').trigger('click');
	
	//页面初始化
	init();
});
