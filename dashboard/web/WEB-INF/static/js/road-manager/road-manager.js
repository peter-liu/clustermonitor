var roadManager = {
    globalVariable:{
        ajaxSuccess:"success",
        tableColumn:{}
    },
    url:{
        toHome:domain+"home/toHome.action",
        toBinlogConfigHome:domain+"binlog/toBinlogConfigHome.action",
        getTableColumnByDbName:domain+"binlog/getTableColumnByDbName.action",
        saveBinlogInitColumn:domain+"binlog/saveBinlogInitColumn.action",
        getBinlogSyncApplyList:domain+"binlog/getBinlogSyncApplyList.action",
        getBinlogSyncTableByApplyId:domain+"binlog/getBinlogSyncTableByApplyId.action",
        saveBinlogClient:domain+"binlog/saveBinlogClient.action",
        clearDBTableCache:domain+"binlog/clearDBTableCache.action",
        stopBinlogClient:domain+"binlog/stopBinlogClient.action",
        searchTable:domain+"binlog/searchTable.action",
        searchTables:domain+"binlog/searchTables.action",
        searchColumns:domain+"binlog/searchColumns.action"
    },
    fn:{
        appendColumnByTable:function(element,tableName){
            var columns = roadManager.globalVariable.tableColumn[tableName];
            var dataHtml = "";
            var nextElement = $(element).parent().parent().next();
            var dataParam = {};
            dataParam.column = columns;
            dataParam.tableId = $(element).attr("id");
            dataHtml = new EJS({url:'/js/road-manager/viewColumns.ejs'}).render({data:dataParam});
            $(nextElement).html(dataHtml);
            var name = $(element).attr("name");
            var column = name.split("$")[1];
            var check = element.checked;
            $("input[name='column$"+column+"']").each(function(){
                $(this).attr("checked",check);
            })
        },
        tableCheckAllOrNotAll:function(element){
            var table = $(element).val();
            function callback(data){
                if(data.result){
                    roadManager.globalVariable.tableColumn[table]=data.result;
                    roadManager.fn.appendColumnByTable(element,table);
                }
            }
            var columns = roadManager.globalVariable.tableColumn[table];
            if(!columns){
                var db = $("#dbName").val();
                var params = {};
                params.table = table;
                params.dbName = db;
                common.fn.ajax(roadManager.url.searchColumns,params,callback);
            }else{
                roadManager.fn.appendColumnByTable(element,table);
            }
        },
        columnCheck:function(element){
            var name = $(element).attr("name");
            var columns = $("input[name='"+name+"']:checked");
            var column = name.split("$")[1];
            if(columns && columns.length >0){
                $("input[name='table$"+column+"']").each(function(){
                    $(this).attr("checked",true);
                })
            }else{
                $("input[name='table$"+column+"']").each(function(){
                    $(this).attr("checked",false);
                })
            }
        }
        ,
        saveBinlogTableColumnData:function(){
            function saveBinlogTableColumnDataSuccess(data){
                if(data.result == roadManager.globalVariable.ajaxSuccess){
                    $('#myTab a[href="#apply"]').tab('show');
//                    location.href = roadManager.url.toBinlogConfigHome;
                }
            }
            var data = [];
            var tables = "";
            $("input[name^='table$']:checked").each(function(){
                var obj = {};
                if($(this).attr("disabled")){
                    return true;
                }
                var name = $(this).attr("name");
                tables+=$(this).val()+","
                var column = name.split("$")[1];
                var columns = "";
                $("input[name='column$"+column+"']:checked").each(function(){
                    columns+=$(this).val()+",";
                })
                if(columns){
                    obj.table = $(this).val();
                    obj.column = columns.substr(0,columns.length-1);
                    data.push(obj);
                }
            })

            var validate = $("#applyForm").validate({});
            if(validate.form()){
                if(data.length <1){
                    common.fn.showInfoMessages("错误信息","必须选择至少一个表");
                    return;
                }
                var params = {};
                params.columns = JSON.stringify(data);
                params.tables = tables.substr(0,tables.length-1);
                params.dbName = $("#dbName").val();
                params.applyName = $("#applyName").val();
                common.fn.ajax(roadManager.url.saveBinlogInitColumn,params,saveBinlogTableColumnDataSuccess);
            }
        },
        getBinlogSyncApplyList:function(currentPage,callback){
            function getBinlogSyncApplyListSuccessFun(data,currentPage){
                var dataHtml = '';
                if(data.result){
                    dataHtml = new EJS({url:'/js/road-manager/viewBinlogSyncApplyList.ejs'}).render({data:data.result.resultList});
                }
                $("#applyBody").html(dataHtml);
                if(data.result.recordTotalCount){
                    callback(data.result.recordTotalCount);
                }else{
                    callback(0);
                }
                privilege.fn.hiddenApprovalBtn();
            }
            var params = {};
            params.currentPage = currentPage;
            params.pageSize = common.globalVariable.pageSize;
            common.fn.ajax(roadManager.url.getBinlogSyncApplyList,params,getBinlogSyncApplyListSuccessFun);
        },
        getBinlogSyncTable:function(applyId){
            function getBinlogSyncTableSuccessFun(data){
                if(data.result){
                    common.fn.showDialog(domain+'js/road-manager/viewSyncTableByApplyId.ejs',data.result);
                }
            }
            var params = {};
            params.applyId = applyId;
            common.fn.ajax(roadManager.url.getBinlogSyncTableByApplyId,params,getBinlogSyncTableSuccessFun);
        },
        showBinlogClientDialog:function(applyId){
            var params = {};
            params.applyId = applyId;
            common.fn.showDialog(domain+'js/road-manager/addBinlogClient.ejs',params);
        },
        saveBinlogClient:function(dialogId){
            function callBack(data){
                if(data.result == roadManager.globalVariable.ajaxSuccess){
                    $("#"+dialogId).modal("hide");
                    common.fn.pagination(1,'roadManager.fn.getBinlogSyncApplyList','applyPagination');
                }
            }
            var validate = $("#addBinlogClientForm").validate({});
            if(validate.form()){
                var params = common.fn.getFromJsonData("addBinlogClientForm");
                common.fn.ajax(roadManager.url.saveBinlogClient,params,callBack);
            }
        },
        clearDBTableCache:function(){
            function callBack(data){
                if(data.result == roadManager.globalVariable.ajaxSuccess){
                    location.href = roadManager.url.toBinlogConfigHome;
                }
            }
            common.fn.ajax(roadManager.url.clearDBTableCache,{},callBack);
        },
        stopBinlogClient:function(applyId){
            function callback(data){
                if(data.result == roadManager.globalVariable.ajaxSuccess){
                    common.fn.pagination(1,'roadManager.fn.getBinlogSyncApplyList','applyPagination');
                }
            }
            function stop(){
                var params = {};
                params.applyId = applyId;
                common.fn.ajax(roadManager.url.stopBinlogClient,params,callback);
            }
            common.fn.showConfirmMessage("停止Binlog Client","确定停止binlog client 的运行?",stop,null,true);
        },
        searchTable:function(){
            function callback(data){
                if(data == null || data.result == roadManager.globalVariable.ajaxSuccess){
                    common.fn.showInfoMessages("搜索","没有搜索到结果,请检查你的表名是否输入正确.或者请点击页面'刷新缓存'按钮尝试刷新数据后重试搜索");
                    $("#viewTableDiv").html("");
                }else{
                    var dataHtml = new EJS({url:domain+'js/road-manager/viewTables.ejs'}).render({data:data.result});
                    $("#viewTableDiv").html(dataHtml);
                    $("input[name^='table$']:disabled").each(function(){
                        var name = $(this).attr("name");
                        $(this).parent().parent().parent().attr("title","该表已经初始化,不能再选");
//                        var column = name.split("$")[1];
//                        $("input[name='column$"+column+"']").each(function(){
//                            $(this).attr("disabled","disabled");
//                        })
                    })
                }
            }
            var params = {};
            params.dbName = $("#dbName").val();
            params.search = $("#search").val();
            common.fn.ajax(roadManager.url.searchTables,params,callback);
        }
    }
}
$(document).ready(function(){
    system.fn.createMysqlDbSelectElement("dbName");
    roadManager.fn.searchTable();
})