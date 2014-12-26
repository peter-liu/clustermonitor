jQuery(function() {

	$("#add-client")
			.click(
					function() {
						var clientName = $("#client-name").val();
						var dbName = $("#db-name").val();
						var tableNames = $("#table-names").val();
						var binlog = $("#binlog").val();
						var binlogPos = $("#binlogPos").val();
						if (!clientName) {
							$('#modal-error').remove();
							$(
									'<div style="border-radius: 5px; top: 40px; font-size:14px; left: 50%; margin-left: -70px; position: absolute;width: 140px; background-color: #f00; text-align: center; padding: 5px; color: #ffffff;" id="modal-error">Enter client name!</div>')
									.appendTo('#modal-add-event .modal-body');
							$('#modal-error').delay('1500').fadeOut(700,
									function() {
										$(this).remove();
									});
						} else if (!dbName) {
							$('#modal-error').remove();
							$(
									'<div style="border-radius: 5px; top: 90px; font-size:14px; left: 50%; margin-left: -70px; position: absolute;width: 140px; background-color: #f00; text-align: center; padding: 5px; color: #ffffff;" id="modal-error">Enter db name!</div>')
									.appendTo('#modal-add-event .modal-body');
							$('#modal-error').delay('1500').fadeOut(700,
									function() {
										$(this).remove();
									});
						} else if (!tableNames) {
							$('#modal-error').remove();
							$(
									'<div style="border-radius: 5px; top: 150px; font-size:14px; left: 50%; margin-left: -70px; position: absolute;width: 140px; background-color: #f00; text-align: center; padding: 5px; color: #ffffff;" id="modal-error">Enter table names!</div>')
									.appendTo('#modal-add-event .modal-body');
							$('#modal-error').delay('1500').fadeOut(700,
									function() {
										$(this).remove();
									});
						} else if (!binlog) {
							$('#modal-error').remove();
							$(
									'<div style="border-radius: 5px; top: 180px; font-size:14px; left: 50%; margin-left: -70px; position: absolute;width: 140px; background-color: #f00; text-align: center; padding: 5px; color: #ffffff;" id="modal-error">Enter binlog!</div>')
									.appendTo('#modal-add-event .modal-body');
							$('#modal-error').delay('1500').fadeOut(700,
									function() {
										$(this).remove();
									});
						} else if (!binlogPos) {
							$('#modal-error').remove();
							$(
									'<div style="border-radius: 5px; top: 210px; font-size:14px; left: 50%; margin-left: -70px; position: absolute;width: 140px; background-color: #f00; text-align: center; padding: 5px; color: #ffffff;" id="modal-error">Enter binlogPos!</div>')
									.appendTo('#modal-add-event .modal-body');
							$('#modal-error').delay('1500').fadeOut(700,
									function() {
										$(this).remove();
									});
						} else {
							// $('#client-name').val('');
							// $('#db-name').val('');
							// $('#table-names').val('');
							$('#modal-add-event').modal('hide');
							var time = new Date().getTime();
							jQuery.ajax({
								type : "post",
								dataType : "json",
								url : domain + "binlog/addClient.action",
								data : {
									'clientName' : clientName,
									'dbName' : dbName,
									'tableNames' : tableNames,
									'binlog' : binlog,
									'binlogPos' : binlogPos,
									't' : time
								},
								error : function() {
									alert("网络繁忙，稍后再试");
								},
								success : function(data) {
									$("#channel").load(domain + "binlog/listClient.action",{"t":time});
								}
							});
						}

					});

	$('#table-names').keypress(function(e) {
		if (e.which == 13) {
			// unicorn.add_event();
		}
	});
})

function clientOnOff(id, opt) {
	var time = new Date().getTime();
	jQuery.ajax({
		type : "post",
		dataType : "json",
		url : domain + "binlog/operate.action",
		data : {
			'id' : id,
			'opt' : opt,
			't' : time
		},
		error : function() {
			alert("网络繁忙，稍后再试");
		},
		success : function(data) {
			$("#channel").load(domain + "binlog/listClient.action",{"t":time});
		}
	});

}