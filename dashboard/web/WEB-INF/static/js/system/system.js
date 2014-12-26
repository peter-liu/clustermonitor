var system = {
    globalVariable:{
        ajaxSuccess:"success"
    },
    url:{
        toUserHome:domain+"system/toUserHome.action",
        toMysqlHome:domain+"system/toMysqlConfigHome.action",
        addUserType:domain+"system/saveUserType.action",
        addMysqlConfig:domain+"system/saveMysqlConfig.action",
        deleteMysqlConfig:domain+"system/deleteMysqlConfig.action",
        getMysqlConfig:domain+"system/getMysqlConfig.action",
        getMysqlConfigListNotPage:domain+"system/getMysqlConfigListNotPage.action",
        logout:domain+"login/logout.action",
        toGroupHome:domain+"system/toGroupHome.action",
        getGroupList:domain+"system/getGroupList.action",
        addGroup:domain+"system/addGroup.action",
        getGroupListNotPage:domain+"system/getGroupListNotPage.action",
        getGroupListByUserId:domain+"system/getGroupListByUserId.action",
        relatedGroup:domain+"system/relatedGroup.action",
        deleteGroup:domain+"system/deleteGroup.action"
    },
    fn:{
        batchAddUserTypeDialog:function(){
            var checkedLength = $("input[name='userTypes_Children']:checked").length;
            if(checkedLength <1){
                common.fn.showInfoMessages("批量修改角色","请勾选你需要修改角色的用户") ;
                return;
            }
            var data = "";
            $("input[name='userTypes_Children']:checked").each(function(){
                data +=$(this).val()+",";
            });
            var params  = {};
            params.id = data.substr(0,data.length-1);
            common.fn.showDialog(domain+"js/system/batchAddUserType.ejs",params,null,null);
        },
        showAddUserDialog:function(id,name,type){
            var params = {};
            params.id = id;
            params.name = name;
            params.type = type;
//            dataHtml = new EJS({url:domain+'js/query/viewResult.ejs'}).render({data:data.resultMap.resultList});
            function select(){
                $("#userType").val(type);
            }
            common.fn.showDialog(domain+"js/system/addUserType.ejs",params,null,select);
        },
        addUserType:function(dialogId){
            function addUserSuccessFun(data){
                if(data.result == system.globalVariable.ajaxSuccess){
                    $('#'+dialogId).modal('hide');
                    location.href=system.url.toUserHome;
                }
            }
            var validate = $("#addUserTypeForm").validate({
            });
            if(validate.form()){
                var data = common.fn.getFromJsonData("addUserTypeForm");
                common.fn.ajax(system.url.addUserType,data,addUserSuccessFun);
            }
        },
        checkAllUserTypes:function(element){
            var check = element.checked;
            $("input[name='userTypes_Children']").each(function(){
                $(this).attr("checked",check);
            })
        },
        clearCheckAll:function(){
            var allLength  = $("input[name='userTypes_Children']").length;
            var checkedLength = $("input[name='userTypes_Children']:checked").length;
            if(checkedLength >= allLength){
                $("#userTypes").attr("checked",true);
            }else{
                $("#userTypes").attr("checked",false);
            }
        },
        showAddMysqlConfigDialog:function(){
//            dataHtml = new EJS({url:domain+'js/query/viewResult.ejs'}).render({data:data.resultMap.resultList});
            common.fn.showDialog(domain+"js/system/addMysqlConfig.ejs",{},null,null);
        },
        addMysqlConfig:function(dialogId){
            function addMysqlConfig(data){
                if(data.result == system.globalVariable.ajaxSuccess){
                    $("#"+dialogId).modal("hide");
                    location.href=system.url.toMysqlHome;
                }else{
                    $("#showInfo").text("host和dbName已经存在");
                }
            }
            var validate = $("#addMysqlForm").validate({
            });
            if(validate.form()){
                var data = common.fn.getFromJsonData("addMysqlForm");
                common.fn.ajax(system.url.addMysqlConfig,data,addMysqlConfig);
            }
        },
        deleteMysqlConfig:function(id){
            function addMysqlConfigSuccessFun(data){
                if(data.result = system.globalVariable.ajaxSuccess){
                    location.href=system.url.toMysqlHome;
                }
            }
            function submitDeleteMysql(){
                var params = {};
                params.id=id;
                common.fn.ajax(system.url.deleteMysqlConfig,params,addMysqlConfigSuccessFun);
            }
            common.fn.showConfirmMessage("删除配置","确定删除该条配置信息?",submitDeleteMysql,null,true);
        },
        getMysqlConfig:function(id){
            function getMysqlConfigSuccessFun(data){
                if(data.result){
                    common.fn.showDialog(domain+"js/system/addMysqlConfig.ejs",data.result,null,null);
                }
            }
            var params = {};
            params.id=id;
            common.fn.ajax(system.url.getMysqlConfig,params,getMysqlConfigSuccessFun);
        },
        createMysqlDbSelectElement:function(selectId){
            function createSuccessFun(data){
                if(data.result){
                    $("#"+selectId).html("");
                    for(var i = 0;i < data.result.length;i++){
                        $("#"+selectId).append("<option value='"+data.result[i].dbName+"'>"+data.result[i].dbName+"</option>");
                    }
                }
            }
            common.fn.ajaxSync(system.url.getMysqlConfigListNotPage,{},createSuccessFun);
        },
        getGroupList:function(currentPage,callback){
            function callBack(data,currentPage){
                var dataHtml = '';
                if(data.result){
                    dataHtml = new EJS({url:domain+'js/system/viewGroupList.ejs'}).render({data:data.result.resultList});
                }
                $("#groupListBody").html(dataHtml);
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
            common.fn.ajax(system.url.getGroupList,params,callBack);
        },
        showAddGroupDialog:function(id,name){
            var params = {};
            if(id){
                params.id=id;
                params.name = name;
            }
            common.fn.showDialog(domain+"js/system/addGroup.ejs",params,null,null);
        },
        addGroup:function(dialogId){
            function callback(data){
                if(data.result == system.globalVariable.ajaxSuccess){
                    $("#"+dialogId).modal("hide");
                    location.href=system.url.toGroupHome;
                }else{
                    $("#showInfo").text("Name已经存在");
                }
            }
            var validate = $("#addGroupForm").validate({
            });
            if(validate.form()){
                var data = common.fn.getFromJsonData("addGroupForm");
                common.fn.ajax(system.url.addGroup,data,callback);
            }
        },
        showRelatedGroupDialog:function(userId){
            function callback(data){
                if(data && data.result){
                    data.result.userId = userId;
                    common.fn.showDialog(domain+"js/system/relatedGroup.ejs",data.result,null,null);
                    var params = {};
                    params.userId = userId;
                    common.fn.ajax(system.url.getGroupListByUserId,params,byUserIdCallback);
                    function byUserIdCallback(secondData){
                        if(secondData && secondData.result){
                            var data = secondData.result;
                            $("input[name='groups']").each(function(){
                                 for(var i = 0 ;i <  data.length;i++){
                                     if($(this).attr("id") == data[i].id){
                                         $(this).attr("checked",true);
                                     }
                                 }
                            })
                        }
                    }
                }
            }
            common.fn.ajax(system.url.getGroupListNotPage,{},callback)
        },
        relatedGroup:function(dialogId){
            function callback(data){
                $("#"+dialogId).modal("hide");
                if(data && data.result){
                    common.fn.showInfoMessages("授权组","授权成功");
                }
            }
            var groupId = "";
            var params = {};
            $("input[name='groups']:checked").each(function(){
                groupId +=$(this).val()+",";
            })
            if(groupId){
                params.userId = $("#userId").val();
                params.groupIds = groupId.substr(0,groupId.length-1);
                common.fn.ajax(system.url.relatedGroup,params,callback);
            }
        },
        deleteGroup:function(id){
            var params = {};
            params.id=id;
            common.fn.showConfirmMessage("删除Group","确定删除该Group吗?",submit,null,true);
            function submit(){
                common.fn.ajax(system.url.deleteGroup,params,callback);
                function callback(data){
                    if(data){
                        if(data.result == system.globalVariable.ajaxSuccess){
                            common.fn.showInfoMessages("删除Group","删除成功");
                            common.fn.pagination(1,'system.fn.getGroupList','groupPagination');
                        }else if(data.result == 'exist'){
                            common.fn.showInfoMessages("删除Group","该Group下还有用户关联,不能删除");
                        }
                    }
                }
            }
        },
        batchRelatedGroupDialog:function(){
            var checkedLength = $("input[name='userTypes_Children']:checked").length;
            if(checkedLength <1){
                common.fn.showInfoMessages("批量授权组","请勾选你需要授权组的用户") ;
                return;
            }
            var userId = "";
            $("input[name='userTypes_Children']:checked").each(function(){
                userId +=$(this).val()+",";
            });
            userId = userId.substr(0,userId.length-1);
            common.fn.ajax(system.url.getGroupListNotPage,{},callback);
            function callback(data){
                if(data && data.result){
                    data.result.userId = userId;
                    common.fn.showDialog(domain+"js/system/relatedGroup.ejs",data.result,null,null);
                }
            }
        }
    }
}