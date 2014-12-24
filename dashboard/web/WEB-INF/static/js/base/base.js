$(function(){
    $.unionTab = {pageNum: 0,
        addTab: function(a) {
            $.unionTab.pageNum++,
                pageNum = $.unionTab.pageNum,
                $("#pageTab",parent.document).append($('<li id="tab' + pageNum + '"><a pageNum="' + pageNum + '" href="#page' + pageNum + '">' + a.title + '<button class="close" type="button" title="Remove this page">×</button>' + "</a></li>")),
                $("#pageTabContent").append($("<iframe id='page" + pageNum + '\' content width="100%" style="border:0px;width:99%"></iframe>')),
                $("#tab" + pageNum + " a").click(function() {
                    return  $.unionTab.showTab($(this).attr("pageNum")), !1
                }),
                window.top.$("#tab" + pageNum + " button").click(function() {
                    return $.unionTab.removeTab($(this).parents("li").children("a").attr("pageNum")), !1
                }),
                $("#page" + pageNum).tab("show"), $("#page" + pageNum).attr("src", a.url),
                $.unionTab.showTab(pageNum), navigator.userAgent.match(/firefox/i) ? void 0 : pageNum
        },
        showTab: function(a) {
            $("#pageTabContent iframe").css("display", "none"),
                $("#pageTabContent #page" + a).css("display", "block"),

                $("#pageTab li").removeClass("active"), $("#pageTab #tab" + a).addClass("active")
        },
        removeTab: function(a) {
            a || (a = window.top.$("#pageTabContent iframe:visible").attr("id"), a = a.replace("page", "")),
              $("#pageTab #tab" + a).hasClass("active") && $("#pageTab #tab" + a).prev().children("a").click(),
               $("#pageTab #tab" + a).remove(),$("#pageTabContent #page" + a).remove()
        },
        addRootTab: function(a) {
            return $.unionTab.addTab(a)
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
    $(".left-nav ul li:first a").click();
    $(".search_start_time").datetimepicker({
        showSecond: true,
        timeFormat: 'hh:mm:ss',
        hour: 10,
        minute: 00,
        second:00,
        dateFormat: 'yy-mm-dd',
        onSelect:function(dateText,inst){
            $(this).parent().find('.search_end_time').datetimepicker("option","minDate",dateText);
        }
    });
    $(".search_end_time").datetimepicker({
        showSecond: true,
        timeFormat: 'hh:mm:ss',
        hour: 09,
        minute: 59,
        second:59,
        dateFormat: 'yy-mm-dd',
        onSelect:function(dateText,inst){
            $(this).parent('td').find('.search_start_time').datetimepicker("option","maxDate",dateText);
        }
    });
    $(".time").datepicker({
        showSecond: true,
        dateFormat: 'yy-mm-dd'
    });


});
function resetWindow(){
   $("#pageTabContent iframe").css("height", $(window).height()-104);
}
function CheckAll(id, obj) {
    var itemlist = $("#"+id+" :checkbox");
    if (obj.checked) {
        for(var i=0; i<itemlist.length;i++) {
            itemlist[i].checked = true;
        }
    } else {
        for(var i=0; i<itemlist.length;i++) {
            itemlist[i].checked = false;
        }
    }
}
function search_today(obj){
    var date=new Date();
    var table_frm=$(obj).closest('form');
    var tom=new Date(Math.round(new Date().getTime())+parseInt(86400*1000));
    var start_time=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' 10:00:00';
    var end_time=tom.getFullYear()+'-'+(tom.getMonth()+1)+'-'+tom.getDate()+' 09:59:59';
    table_frm.find('.search_start_time').val(start_time);
    table_frm.find(".search_end_time").val(end_time);
    table_frm.find(".day").val("today");
    table_frm.submit();
}

function search_tomorrow(obj){
    var table_frm=$(obj).closest('form');
    var date=new Date(Math.round(new Date().getTime())+parseInt(86400*1000));
    var tom = new Date(Math.round(new Date().getTime())+parseInt(86400*1000*2));
    var start_time=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate())+' 10:00:00';
    var end_time=tom.getFullYear()+'-'+(tom.getMonth()+1)+'-'+(tom.getDate())+' 09:59:59';
    table_frm.find(".search_start_time").val(start_time);
    table_frm.find(".search_end_time").val(end_time);
    table_frm.find(".day").val("tomorrow");
    table_frm.submit();
}
function search_the_day_after_tomorrow(obj){
    var table_frm=$(obj).closest('form');
    console.log( table_frm.find(".search_start_time").length);
    var date=new Date(Math.round(new Date().getTime())+parseInt(86400*1000*2));
    var date2=new Date(Math.round(new Date().getTime())+parseInt(86400*1000*3));
    var start_time=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate())+' 10:00:00';
    var end_time=date2.getFullYear()+'-'+(date2.getMonth()+1)+'-'+(date2.getDate())+' 09:59:59';
    table_frm.find(".search_start_time").val(start_time);
    table_frm.find(".search_end_time").val(end_time);
    table_frm.find(".day").val("the_day_after_tomorrow");
    table_frm.submit();
}
function search_week(obj){
    var table_frm=$(obj).closest('form');
    var date=new Date(Math.round(new Date().getTime())+parseInt(86400*1000));
    var start_time=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate())+' 10:00:00';
    var date_week=new Date(Math.round(new Date().getTime())+parseInt(86400*1000*8));
    var end_time=date_week.getFullYear()+'-'+(date_week.getMonth()+1)+'-'+(date_week.getDate())+' 09:59:59';
    table_frm.find(".search_start_time").val(start_time);
    table_frm.find(".search_end_time").val(end_time);
    table_frm.find(".day").val("week");
    table_frm.submit();
}
function search_all(obj){
    var table_frm=$(obj).closest('form');
    table_frm.find(".search_start_time").val("");
    table_frm.find(".search_end_time").val("");
    table_frm.find(".day").val("");
    table_frm.submit();
}