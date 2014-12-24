/** common variable */
var JQGRID_MAX_CHAR = 15;


$(function(){
    $.unionTab = {pageNum: 0,
        addTab: function(a) {
            $.unionTab.pageNum++,
                pageNum = $.unionTab.pageNum,
                $("#pageTab").append($('<li id="tab' + pageNum + '"><a pageNum="' + pageNum + '" href="#page' + pageNum + '">' + a.title + '<button class="close" type="button" title="Remove this page">×</button>' + "</a></li>")),
                $("#pageTabContent").append($("<iframe id='page" + pageNum + '\' content width="100%" style="border:0px;width:99%;"></iframe>')),
                $("#tab" + pageNum + " a").click(function() {
                    return $.unionTab.showTab($(this).attr("pageNum")), !1
                }),
                $("#tab" + pageNum + " button").click(function() {
                    return $.unionTab.removeTab($(this).parents("li").children("a").attr("pageNum")), !1
                }),
                $("#page" + pageNum).tab("show"), $("#page" + pageNum).attr("src", a.url),
                $.unionTab.showTab(pageNum), navigator.userAgent.match(/firefox/i) ? void 0 : pageNum;
                $("#page" + pageNum).css("height", $(window).height()-104);
        },
        showTab: function(a) {
            $("#pageTabContent iframe").css("display", "none"),
                $("#pageTabContent #page" + a).css("display", "block"),
                $("#pageTab .active").removeClass("active"), $("#pageTab #tab" + a).addClass("active")
        },
        removeTab: function(a) {
            a || (a = window.top.$("#pageTabContent iframe:visible").attr("id"), a = a.replace("page", "")),
                window.top.$("#pageTab #tab" + a).hasClass("active") && window.top.$("#pageTab #tab" + a).prev().children("a").click(), window.top.$("#pageTab #tab" + a).remove(), window.top.$("#pageTabContent #page" + a).remove()
        },
        addRootTab: function(a) {
            return window.top.$.unionTab.addTab(a)
        }
    }

})

$(document).ready(function(){
    resetWindow();
   $(window).resize(resetWindow);
   $(".head h1 a").click(function(){
        $('.wrap').toggleClass('hide-slider');
    });
    $(".left-nav ul li a").click(function(){
        $.unionTab.addTab({
            title: $(this).text(),
            url: $(this).attr("path")
        });
        resetWindow();
    });

});

function resetWindow(){
    $("#pageTabContent iframe").css("height", $(window).height()-104);
}


/** jqrid fomatter ---start* */
function fomatterMoreChar(cellval, opts, rowObject, action){
	if(cellval.length>JQGRID_MAX_CHAR)
	{
		return '<a title="'+cellval+'">'+cellval.substr(0,JQGRID_MAX_CHAR)+"..."+'</a>';
	}
	return cellval;
}

function getCheckBoxValue(name)   
{   
    var str="";
    var chk=document.getElementsByName(name);
    for(var i=0;i<chk.length;i++)
    {
         if(chk[i].checked)
         {
              str+=chk[i].value+",";
         }
     } 
    return str.substring(0,str.length-1);
} 

function getDateStr(AddDayCount,split) {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount);// 获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1;// 获取当前月份的日期
	var d = dd.getDate();
	if (m < 10)
		m = '0' + m;
	if(split==null)
	  return y + "-" + m + "-" + d;
	else
		return y + split + m + split + d;
}

/**
 * error alert
 */
var showError = function(message){
	BootstrapDialog.show({
	    type: BootstrapDialog.TYPE_DANGER,
	    title: 'ERROR',
	    message: message
	});
}

/**
 * info  alert
 */
var showInfo = function(msg)
{
	BootstrapDialog.show({
        title: 'Info',
        message: msg
	});
}