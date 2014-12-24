$(document)
		.ready(
				function() {
					dbChange();
					dwChange();

					$("#add-dw")
							.click(
									function() {
										var dwName = $("#dw-name").val();
										var groupIds = getCheckedGroups();
										if (!dwName) {
											$('#modal-error').remove();
											$(
													'<div style="border-radius: 5px; top: 40px; font-size:14px; left: 50%; margin-left: -70px; position: absolute;width: 140px; background-color: #f00; text-align: center; padding: 5px; color: #ffffff;" id="modal-error">Enter dw name!</div>')
													.appendTo(
															'#modal-add-event .modal-body');
											$('#modal-error').delay('1500')
													.fadeOut(700, function() {
														$(this).remove();
													});
										} else if (groupIds.length == 0) {
											$('#modal-error').remove();
											$(
													'<div style="border-radius: 5px; top: 210px; font-size:14px; left: 50%; margin-left: 120px; position: absolute;width: 140px; background-color: #f00; text-align: center; padding: 5px; color: #ffffff;" id="modal-error">Choose group!</div>')
													.appendTo(
															'#modal-add-event .modal-body');
											$('#modal-error').delay('1500')
													.fadeOut(700, function() {
														$(this).remove();
													});
										} else {
											jQuery
													.ajax({
														type : "post",
														dataType : "json",
														cache : false,
														url : domain
																+ "dataModel/addDw.action",
														data : {
															'dwName' : dwName,
															'groupIds' : groupIds,
														},
														error : function() {
															alert("网络繁忙，稍后再试");
														},
														success : function(data) {
															$(
																	'#modal-add-event')
																	.modal(
																			'hide');
															
															rendDwDiv(data);
														}
													});
										}
									});

				})
				

function rendDwDiv(data) {
	if (data.error) {
		alert(data.error);
		return;
	}
	var dataHtml = new EJS({
		url : domain + 'js/datamodel/viewDw.ejs'
	}).render({
		data : data.result
	});
	$("#dwId").html(dataHtml);
}				

/**
 * 获取选中的组
 */
function getCheckedGroups() {

	var ids = [];
	var tables = $("input[name='groups']:checked").each(function() {
		ids.push($(this).val());
	})
	return ids;
}

/**
 * 从服务端获取所有的分组
 */
function getGroups() {
	var params = {};
	var url = domain + "dataModel/getGroups.action";
	common.fn.ajax(url, params, rendGroupDiv);
}

function rendGroupDiv(data) {
	if (data.error) {
		alert(data.error);
		return;
	}
	var dataHtml = new EJS({
		url : domain + 'js/datamodel/viewGroup.ejs'
	}).render({
		data : data.result
	});
	$("#viewGroupDiv").html(dataHtml);
}

/**
 * 渲染 hive table 数据
 * 
 * @param data
 */
function rendHiveTable(data) {
	if (data.error) {
		alert(data.error);
		return;
	}
	var dataHtml = new EJS({
		url : domain + 'js/datamodel/viewHiveTables.ejs'
	}).render({
		data : data.result
	});
	$("#viewTable").html(dataHtml);
}

function dbChange() {
	var params = {};
	params.dbName = $("#dbName").val();
	if (!params.dbName) {
		return;
	}
	var url = domain + "dataModel/getHiveTables.action";
	common.fn.ajax(url, params, rendHiveTable);
}

function dwChange() {
	var params = {};
	params.dwId = $("#dwId").val();
	if (!params.dbName) {
		return;
	}
	var url = domain + "dataModel/getDwTables.action";
	common.fn.ajax(url, params, rendDwTable);
}

/**
 * 渲染dw table数据
 * 
 * @param data
 */
function rendDwTable(data) {
	if (data.error) {
		alert(data.error);
		return;
	}
	var dataHtml = new EJS({
		url : domain + 'js/datamodel/viewDwTables.ejs'
	}).render({
		data : data.result
	});
	$("#viewDws").html(dataHtml);
}

/**
 * 将表添加到数据仓库
 */
function addTablesToDw() {
	var params = {};
	params.dwId = $("#dwId").val();
	params.dbName = $("#dbName").val();
	params.hiveTables = getCheckedHiveTable();
	var url = domain + "dataModel/addTablesToDw.action";
	common.fn.ajax(url, params, rendDwTable);

}
/**
 * 将表从数据仓库中移除
 */
function removeTableFromDw() {
	var params = {};
	params.dwId = $("#dwId").val();
	params.data = getCheckedDwTable();
	var url = domain + "dataModel/removeTableFromDw.action";
	common.fn.ajax(url, params, rendDwTable);
}

function getCheckedHiveTable() {
	var values = [];
	var tables = $("input[name='hiveTable']:checked").each(function() {
		values.push($(this).val());
	})
	return values;
}

function getCheckedDwTable() {
	var data = {};
	var values = [];
	var ids = [];
	var tables = $("input[name='dwTable']:checked").each(function() {
		values.push($(this).val());
		ids.push($(this).attr("id"));
	})
	data.values = values;
	data.ids = ids;
	return data;
}

function hiveTableAll(data) {
	var isChecked = $(data).attr("checked")
	var tables = $("input[name='hiveTable']").each(function() {
		$(this).attr("checked", isChecked ? true : false);
	})
}

function dwTableAll(data) {
	var isChecked = $(data).attr("checked")
	var tables = $("input[name='dwTable']").each(function() {
		$(this).attr("checked", isChecked ? true : false);
	})
}

function searchGroup() {
	var params = {};
	params.groupNames = $("#search").val();
	alert(params.groupNames);
	var url = domain + "dataModel/getGroupByNames.action";
	common.fn.ajax(url, params, rendGroupDiv);
}
