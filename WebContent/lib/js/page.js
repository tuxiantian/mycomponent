function Page(total,pageSize,pageTotal,begin,end,currentPage){
	this.total=total;
	this.pageSize=pageSize;
	this.pageTotal=pageTotal;
	this.begin=begin;
	this.end=end;
	this.currentPage=currentPage;
}
Page.prototype={
		constructor:Page,
		initPage:function (){
			total=$("#result .record").length;
			pageSize=4; 
			
			pageTotal=Math.floor((total+pageSize-1)/pageSize);
			
			begin=0;                              
			end=pageSize;                         
			currentPage=1; 
			Page.prototype.gopage(currentPage);
		},
		
		gopage:function (pageIndex){
			
			if(pageIndex<1)pageIndex=1;
			if(pageIndex>pageTotal)pageIndex=pageTotal;
			currentPage=pageIndex;
			begin=(pageIndex-1)*pageSize;
			end=pageIndex*pageSize-1;
			console.log(pageIndex)
			//根据分页参数begin，end进行分页
			$(".record").each(function(index,element){
				//debugger;
				if(index>=begin&&index<=end){
					$(element).show();
				}else{
					$(element).hide();
				}
				
			});
			//重绘分页
			Page.prototype.getPage(pageTotal);
			//设置当前页的样式
			//debugger;
			Page.prototype.showCurrent(pageIndex);
		},
		
		/* 显示当前页 */
		showCurrent:function (pageIndex){
			$("#page").find("a").each(function(index,element){
			
				if((index+1)==pageIndex){
					$(element).addClass("current");
				}else{
					$(element).removeClass("current");
				}
			});
		},
		/* 生成分页代码片段 */
		getPage:function (pages){
			$("#page").html('');
			var html="";
			if(currentPage>1){
			html+="<span onclick='Page.prototype.gopage("+(currentPage-1)+")'>前一页</span>"
			}else{
				html+="<span class=''>前一页</span>";
			}
			for(var i=1;i<=pages;i++){
				html+="<a href='javascript:Page.prototype.gopage("+i+")'>"+i+"</a>"
			}
			if(currentPage<pageTotal){
			html+="<span onclick='Page.prototype.gopage("+(currentPage+1)+")'>后一页</span>";
			}else{
				html+="<span>后一页</span>"
			}
			$("#page").html(html);
		}
}
