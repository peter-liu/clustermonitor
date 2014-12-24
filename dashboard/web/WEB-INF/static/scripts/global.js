/*
 * @Date		2012-04-17 10:12 AM
 * @purpose     global js, including tree and so on.
*/

$(document).ready(function(){
	
	/* tree */
	$("#browser").treeview();
	
	/* change current tr background color */
	$(".listForm tr").mouseover(function(){
  		$(this).addClass("greyBg").siblings().removeClass("greyBg");
	});

});
