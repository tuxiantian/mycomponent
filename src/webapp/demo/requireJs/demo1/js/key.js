define(['jquery'], function ($) {

	/*

营销活动状态代码：   
新建：0
发布：1
暂停：2
废止：3
再次分配暂停：6
结束：7
 
问题类型代码：
填空题：10
单选题：20
多选题：30
判断题：40
问答题：50
日期题：60
开场白：0B
结束语：0E
 
问题状态代码：
新建：10D
发布：10A
失效：10X

	*/
	var questionType = {
		GapFilling:10, SingleSelection:20, MultipleSelection:30, Judge:40, QuestionAnswer:50, DateQuestion:60,MatrixQuestion:70, Start:'0B', End:'0E'
	}
	return { QuestionType:questionType };
});