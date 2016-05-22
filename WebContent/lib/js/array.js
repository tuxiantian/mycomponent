var NiceTools = {
	/*
	 * 功能:删除数组元素.
	 * 参数:dx删除元素的下标.
	 * 返回:在原数组上删除后的数组
	 */
	removeByIndex : function(arrays , dx){
		if(isNaN(dx)||dx>arrays.length){return false;}
		for(var i=0,n=0;i<arrays.length;i++)
		{
			if(arrays[i]!=arrays[dx])
			{
				arrays[n++]=arrays[i]
			}
		}
		arrays.length-=1
		return arrays;
	},
	//删除指定的item,根据数组中的值
	removeByValue : function(arrays, item ){
		for( var i = 0 ; i < arrays.length ; i++ ){
			if( item == arrays[i] )
			{
				break;
			}
		}
		if( i == arrays.length ){
			return;
		}
		for( var j = i ; j < arrays.length - 1 ; j++ ){
			arrays[ j ] = arrays[ j + 1 ];
		}
		arrays.length--;
		return arrays;
	}
}