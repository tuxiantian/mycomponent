/**
 * 我的前端组件库用到的菜单初始化函数。
 * @author tuxiantian@163.com
 */
function initmenu(){
		/* 菜单操作开始 */
	    //加载时隐藏子菜单
	    $('li ul').hide();
	    //不包含子菜单时鼠标指针和项目图标
	    $('li:not(:has(ul))')
	   .css({ 'cursor': 'default', 'list-style-image': 'none' });
	    //包含子菜单时鼠标指针和项目图标
	    $('li:has(ul)')
	    .css({ 'cursor': 'pointer', 'list-style-image': 'url(/mycomponent/theme/img/plus.gif)' });
	    //单击含子菜单的项
	    $('li:has(ul)').unbind("click").bind("click",function (event) {
	        if (this == event.target) {
	        	/*单击展开*/
	            if ($(this).children().is(':hidden')) {
	                $(this)
	            .css('list-style-image', 'url(/mycomponent/theme/img/minus.gif)')
	            .children().show();
	            }
	            /*再次单击，折叠*/
	            else {
	                $(this)
	         .css('list-style-image', 'url(/mycomponent/theme/img/plus.gif)')
	         .children().hide();
	            }
	            /*显示当前元素和当前元素的子节点；若当前元素的兄弟节点没有子节点，显示；否则，不显示。*/
	            $(this).siblings().each(function(index,element){
	            	if($(element).find('ul').length>0&&!$(element).is(':hidden')){
	            		$(element).css('list-style-image', 'url(/mycomponent/theme/img/plus.gif)')
	   	   	         .children().hide();
	            	}else{
	            		$(element).css('list-style-image', 'url(/mycomponent/theme/img/minus.gif)')
	    	            .show();
	            	}
	            });
	           
	        }
	   	 });
	}