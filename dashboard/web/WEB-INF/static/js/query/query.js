var query = {
    globalVariable:{
        editor:null,
        lineNum:1000,
        queryStatus:null,
        intervalId:0
    },
    url:{
        toHiveHome:domain+'query/hiveHome.action',
//        toMysqlHome:domain+'query/mysqlHome.action',
        getQueryStatus:domain+'query/getQueryStatus.action',
        handleSql:domain+"query/handleSql.action",
        getProcess:domain+"query/getProcess.action",
        download:domain+"query/download.action?fileName=",
        getHistory:domain+"query/getHistory.action",
        getDatabases:domain+"query/getDatabases.action"
    },
    fn:{
        getStatus:function(){
            function getStatusSuccessFun(data){
                var status=data.status;
                if(status=="init"){
                    return;
                }
                var words = status.split(",");
                if(words[0]=="running"){
                    query.fn.enterRunning();
                    return;
                }else if(words[0]=="finished"){
                    query.fn.enterFinished();
                    return;
                }
            }
            common.fn.ajaxGet(query.url.getQueryStatus,{},getStatusSuccessFun);
        },
        querySqlSubmit:function(){
            String.prototype.trim = function(){
                return this.replace(/(^\s*)|(\s*$)/g, '');
            };
            var sqlEdit = document.getElementById("sqlEdit");
            var dbName = document.getElementById("dbName");
//                var sqlStr = query.globalVariable.editor.getValue();
            var sqlStr = sqlEdit.value;
            sqlStr=sqlStr.trim();
            if(sqlStr==""){
                alert("Please input SQL");
                return;
            }
            if(sqlStr.search(/^\s*desc/i)!=-1 || sqlStr.search(/^\s*select/i)!=-1  || sqlStr.search(/^\s*show/i)!=-1){

            }
            else{
                alert("You must input SELECT sql");
                return;
            }
            var params = {};
            params.lineNum = query.globalVariable.lineNum;
            params.dbName = dbName.value;
            params.sql = sqlStr.replace(/%/g,"%25").replace(/\+/g,"%2B");
            common.fn.ajax(query.url.handleSql,params,querySqlSubmitSuccessFun);
            function querySqlSubmitSuccessFun(data){
                if(data && data.result == 'NOT_PRIVILEGE'){
                    common.fn.showInfoMessages("权限限制","您没有该sql语句的操作权限!");
                    return;
                }else{
                    query.fn.enterRunning();
                }
            }
        },
        getProcess:function(){
            function getProcessSuccessFun(data){
                var status = data.status;
                if(query.globalVariable.queryStatus == "e" && status == "finished")
                {
                    query.fn.leaveRunning();
                    query.fn.enterFinished();
                    return;
                }
                if(query.globalVariable.queryStatus == "e" && status=="error")
                {
                    query.fn.leaveRunning();
                    setTimeout(query.fn.getProcess,500);
                    return;
                }
                var dataHtml
                if(data.resultMap){
                    dataHtml = new EJS({url:domain+'js/query/viewResult.ejs'}).render({data:data.resultMap.resultList});
                    var htmlData = '<a href="'+query.url.download+data.resultMap.fileName+'">Download Result</a>';
                    $("#divdownload").html(htmlData);
                }else{
                    dataHtml = new EJS({url:domain+'js/query/viewErrorInfo.ejs'}).render({data:data.errorList});
                }
                $("#divdisplay").html(dataHtml);
            }
            var params  = {};
            params.status = query.globalVariable.queryStatus;
            params.lineNum = query.globalVariable.lineNum;
            common.fn.ajaxSync(query.url.getProcess,params,getProcessSuccessFun)
        },
        leaveRunning:function(){
            clearInterval(query.globalVariable.intervalId);
            $("#submitbutton").removeAttr("disabled");
        },
        enterFinished:function(){
            query.globalVariable.queryStatus = "r";
            query.fn.getProcess();
        },
        enterRunning:function(){
            $("#submitbutton").attr("disabled","disabled");
            $("#divdownload").html("");
            query.globalVariable.queryStatus = "e";
            query.globalVariable.intervalId = setInterval(query.fn.getProcess,500);
        },
        download:function(fileName){
            window.location.href=query.url.download+fileName;
        },
        getHistory:function(){
            function getHistorySuccessFun(data){
                common.fn.showDialog(domain+'js/query/viewHistory.ejs',data.result);
            }
            common.fn.ajax(query.url.getHistory,{},getHistorySuccessFun);
        },
        getDatabases:function(){
            function getDatabasesSuccessFun(data){
                $("#sqlEdit").focus();
                if(data.result){
                    $("#dbName").html("");
                    for(var i = 0;i < data.result.length;i++){
                        $("#dbName").append("<option value='"+data.result[i]+"'>"+data.result[i]+"</option>");
                    }
                }
            }
            common.fn.ajax(query.url.getDatabases,{},getDatabasesSuccessFun);
        }
    }
}
$(document).ready(function(){
    query.fn.getStatus();
    query.fn.getDatabases();
})