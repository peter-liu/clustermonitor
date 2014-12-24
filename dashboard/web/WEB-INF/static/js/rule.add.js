var ctx = $("#ctx").val();

/***promotionType limit */
var voucherNumLimit  =3;

$.validator.addMethod("percent51warn", function(value, element) { 
	var conditionAmount = $(element).closest('tbody').find('input[name^=conditionAmount]').val();     
	var amount = parseFloat(conditionAmount);
	var result = true;
	if(parseFloat(value)/amount>0.51)
	{
		result = false;
	}
    return this.optional(element) || result;       
}, "满减百分比超过50%"); 


$.validator.addMethod("onePointNum", function(value, element) { 
	var result = true;
	var splitValue = value.split(/\./);
	if(splitValue.length == 2)
		{
		result = parseInt(splitValue[1])>=0 && parseInt(splitValue[1])<10;
		}
    return this.optional(element) || result;       
}, "保留小数一位"); 

$.validator.addMethod("freeQuantityOverCondition", function(value, element) { 
	var result = true;
	var conditionQuantity = $(element).closest('tbody').find('input[name^=conditionQuantity]').val();   
	result  = parseInt(conditionQuantity) > parseInt(value);
    return this.optional(element) || result;       
}, "商品件数大于免件数"); 

$(function() {
	$("#optstatus").val(1);
		$("#startTime").datepicker(
				{
					closeText : 'X',
					dateFormat : 'yy/mm/dd',
					onSelect : function(dateText, inst) {
						$('#endTime').datepicker('option', 'minDate',
								new Date(dateText.replace('/', ',')));
					}
				});
		$("#endTime").datepicker(
				{
					closeText : 'X',
					dateFormat : 'yy/mm/dd',
					onSelect : function(dateText, inst) {
						$('#startTime').datepicker('option', 'maxDate',
								new Date(dateText.replace('/', ',')));
					}
				});

		initCheckbox();
		initValidate();
		addNewProperty();
		$("#startTime").attr('readonly',true);
		$("#endTime").attr('readonly',true);
		$(".timepicker").attr('readonly',true);
	});

	var saveRule = function(condition) {
		
		$("#condition").val(condition);
		setPromotionTypeValue();
		
		var productIds  = $('#search_from').find("*[name=productIds_n]").val().replace(/\n/gi,',');
		$('#search_from').find("*[name=productIds]").val(productIds);
		
		var brandIds = $('#search_from').find("*[name=brandIds_n]").val().replace(/\n/gi,',');
		$('#search_from').find("*[name=brandIds]").val(brandIds);
		
		var categoryIds = $('#search_from').find("*[name=categoryIds_n]").val().replace(/\n/gi,',');
		$('#search_from').find("*[name=categoryIds]").val(categoryIds);
		if((productIds ==null || productIds=='')&&(brandIds ==null||brandIds=='')&&(categoryIds ==null || categoryIds=='')){
			showError('产品ID,产品分类ID,促销品牌ID必须有一个项为必填');
			return;
		}
		
		var pass = false;
		if(condition==2||condition==3){
			 pass = confirm('确定要发布到线上么？');
		}
		else 
			pass = true;
		if(pass){
			alert(1);
			$('#search_from').ajaxSubmit({
				url : ctx+"/rule/save",
				type : "post",
				beforeSubmit : function(formData, jqForm, options) {
					return $('#search_from').valid();
				},
				success : function(resp) {
					$.showMessage(resp);
					$("#promotionTypeStr").val("");
				},
				error : function(resp) {
					$.showMessage(resp);
				}
			});
			}
	}

	function initCheckbox() {
		$("input:checkbox").click(function() {
			var checked = $(this).attr("checked");
			if (checked || checked == "checked") {
				$(this).attr("checked", false);
			} else
				$(this).attr("checked", true);
		});

		$("input:checkbox[name='platform']").click();
		$("input:checkbox[name='booth'][value=deal]").click();
		$("input:checkbox[name='booth'][value=mall]").click();
		$("input:checkbox[name='memberLevel']").click();
		$("input:radio[name='crossOrder'][value=0]").click();

	}

	function initValidate() {
		$("#search_from").validate({
			rules : {
				ruleName : {
					required : true,
					maxlength : 25
				},
				ruleKeywords : {
					required : true,
					maxlength : 100
				},
				ruleDescription : {
					required : true,
					maxlength : 1000
				},
				saliance : {
					required : true
				},
				brandIds_n : {
					maxlength : 1000
				},
				productIds_n : {
					maxlength : 1000
				},
				categoryIds_n : {
					maxlength : 1000
				}  
			},
			errorPlacement : function(error, element) {
				element.after(error);
				error.css({
					'position' : 'absolute',
					'color' : 'red'
				});
				var pos = element.position();

				var css_end = {
					top : pos.top,
					left : pos.left + $(element).width() + 18
				}
				var css_start = {
					left : pos.left + +$(element).width() + 300,
					zIndex : 9888
				};
				error.css(css_start);
				error.animate(css_end);
			}
		});
		$("#search_from").validate();
		
		///输入框验证

        // 限制只能输入>=0的正整数
        $("body").delegate(".input-integer","keyup paste blur",function(){
            $(this).val($(this).val().replace(/[^\d]/g,''));
        });

        // 限制只能输入>=1的正整数
        $("body").delegate(".input-int","keyup paste blur",function(){
            $(this).val($(this).val().replace(/[^1-9]/g,''));
        });

        // 限制只能输入>0的数
        $("body").delegate(".input-digit","keyup paste blur",function(){
            $(this).val($(this).val().replace(/[^1-9.]/g,''));
        });
        $("body").delegate(".validateL","paste blur",function(){
            if($.trim( $(this).val()).length >100 || $.trim( $(this).val()).length <10){
                $(this).siblings('p').show();
            }else{
                $(this).siblings('p').hide();
            }
        });
        $("body").delegate(".sale_detail_show_name","paste blur",function(){
            if($.trim( $(this).val()).length <10){
                $(this).siblings('p').show();
            }else{
                $(this).siblings('p').hide();
            }
        });

        //满赠时输入sku_no展示商品名称，价格
        $("body").delegate(".gift-sku","keyup paste blur",function(){
        	
        	
            var sku= $.trim($(this).val()),_this=$(this);
        	//validate the same sku
            var skus = _this.closest('td').find(".gift-sku");
            for(i=0;i<skus.size();i++)
            	{
            	if(skus[i]!=this && $(skus[i]).val()==sku){
            	_this.val('');
            	break;
            	}
            }
            
            $.post('', {'sku-no':sku },function(data){
                data=eval('('+ data +')');
                _this.siblings('p').text(data.message);
            });
            
        });
        
        
        $("body").delegate(".showcard","click",function(){
            var contenthtml="",flag=true;
            $(this).closest('td').find('.card-div').each(function(){
                $(this).find('input').each(function(){
                    if($.trim($(this).val()) == ""){
                        flag = false;
                    }
                });
            });
            if(flag){
                $(this).closest('td').find('.card-div').each(function(){
                    // ajax作用范围查询
                	over_amount = $(this).find('.card-amount').val();
                	discount = $(this).find('.card-reduce').val();
     			     if(parseInt(over_amount)<parseInt(discount))
     			    	 {
     			    	contenthtml = '存在减金额大于满金额，请重新输入';
     			    	 }
                	else
                    //  满100返1张100减10元现金券，激活时间 2014-12-30，过期时间 2015-01-15，作用范围ID：0 作用范围名称
                    contenthtml+='满'+ $(this).find('.card-amount').val() +'返'+ $(this).find('.card-num').val() +'张'+$(this).find('.card-amount').val()  +'减'+ $(this).find('.card-reduce').val() +'现金券,激活时间'+$(this).find('.card-uptime').val() +'，过期时间'+$(this).find('.card-expires').val()+'，作用范围ID'+$(this).find('.card-rangeid').val() +'作用范围名称:' ;
                });
            	
//               $(this).siblings('.popover').find('.popover-content').html(contenthtml);
//                $(this).siblings('.popover').toggle();
            }else{
            	contenthtml = '元素输入不齐！';
//                $(this).siblings('.popover').find('.popover-content').html("元素输入不齐！");
//                $(this).siblings('.popover').toggle();
            }
            
           
        	$(this).siblings('.popover').find('.popover-content').html("元素输入不齐！");
        	$(this).siblings('.popover').toggle();
            return true;
            
        });
	}


	var setPromotionTypeValue = function() {
		$("#promotionTypeStr").val("");
		var itemArray = [];
		var itemZone = $(".singleProperty");
		
		$.each(itemZone,function(i,element){
			
			cule = $(element);
			var item = new Object();
			item.promotionType  = cule.find("*[name^=promotionType]").val();
			item.conditionQuantity = cule.find("*[name^=conditionQuantity]").val();
			item.conditionAmount = cule.find("*[name^=conditionAmount]").val();
			var saleOn = cule.find("*[name^=saleOn]").val();
			if(saleOn !=null && saleOn!='')
				{
				 item.saleOff = 10-parseFloat(saleOn);
				}
			item.freeQuantity = cule.find("*[name^=freeQuantity]").val();
			item.displayContent = cule.find("*[name^=displayContent]").val();
			item.url = cule.find("*[name^=url]").val().replace(/\s+/gi,'');
			item.content = cule.find("*[name^=content]").val();
			item.discountAmount = cule.find("*[name^=discountAmount]").val();
			// sets itemValue
			var itemValue = [];
			switch (item.promotionType) {
			case 'voucher':
			case 'voucher_uncapped':
				var  forms = cule.find('.card-div');
				forms.each(function(i,f){
					itemObj = {};
					
					itemObj.batch_no = $(f).find("input[name^=batch_no]").val();
					itemObj.quantity = $(f).find("input[name^=quantity]").val();
					itemObj.over_amount = $(f).find("input[name^=over_amount]").val();
					itemObj.discount = $(f).find("input[name^=discount]").val();
					itemObj.active_time = $(f).find("input[name^=active_time]").val();
					itemObj.expire_time = $(f).find("input[name^=expire_time]").val();
					itemObj.capped = $(f).find("input[name^=capped]").val();
					itemValue.push(itemObj);
				});
				break;
			case 'gift':
				  vals = cule.find('*[name^=sku_no]');
				  vals.each(function(i,f){
					  itemValue.push($(f).val());
				  });
				break;
			
			case 'red_envelop':
				vals = cule.find('*[name^=hash_id]').val();
				itemValue = vals.split("\n");
				break;
			case 'gift_random':
				 vals = cule.find('*[name^=sku_no]').val();
				 itemValue = vals.split("\n");
				break;
			default:
				break;
			}
			
			item.itemValue = itemValue;
			itemArray.push(item);
		});
		var promotionTypeJson=JSON.stringify(itemArray);
		$("#promotionTypeStr").val(promotionTypeJson);
	}

	///----

	var customhtml = "<tr><td class='vertical-align-top'>显示名称：</td><td><input style='width:440px;'   class='text sale_detail_show_name form-control' name='displayContent'  placeholder='至少10个汉字5个字符' /></td></tr>"
			+ " <tr><td  class='vertical-align-top'>链接：</td><td><input style='width:440px;' class='text sale_detail_url form-control' name='url' /></td></tr>"
			+ " <tr><td class='vertical-align-top' >规则详细说明：</td><td><textarea style='width:440px;'rows='2'  class='text sale_detail_explain validateL form-control' name='content' placeholder='至少10个汉字5个字符，最多100个字符或者50个汉字以内'></textarea></tr>";
	var voucherin = "<div class='card-div'>"
			+ "<p>批号<input class='input-small form-control' type='text' name='batch_no' />数量<input placeholder='>0的正整数'  class='input-small input-integer card-num form-control ' type='text' name='quantity' />满金额<input type='text' placeholder='>0的正整数' class='input-small form-control input-integer card-amount ' name='over_amount' />减金额<input placeholder='>0的正整数' class='input-small form-control input-integer card-reduce' type='text' name='discount' /></p>"
			+ "<p>过期时间<input  class='input-small form-control timepicker card-expires' type='text' name='expire_time' />启用时间<input type='text' class='input-small form-control timepicker card-uptime' name='active_time'/>作用范围ID<input placeholder='0和正整数' type='text' class='input-small form-control input-integer card-rangeid' name='capped'/>"
			+ "<a href='javascript:void(0)' onclick='removeVoucher(this)'>&nbsp;x&nbsp;删除</a> </p></div>";
	var voucherhtml = "<tr><td width=90  class='vertical-align-top'>满金额：</td><td><input class='form-control input-digit' placeholder='满金额：例100'  type='text' name='conditionAmount' /></td></tr>"
			+ "<tr><td  class='vertical-align-top'>现金券配置:</td><td>"
			+ voucherin
			+ "<a href='javascript:void(0)' class='addvoucher' onclick='addvoucher(this)'>+&nbsp;添加现金券配置</a>"
			+ "<div class='btn-card-sure'><a href='javascript:void(0)' class='btn btn-success showcard marginT10' >确认</a> "
			+ '<div class="popover"><div class="arrow"></div><div class="popover-content"></div></div>'
			+ "</div><br />"
			+ "<div class='marginT10 help-inline'>特别提示：启用时间为空，则COD妥投后立刻生效，在线支付第二天生效。</div>"
			+ "</td></tr>";

	var gifthtmlin = "<div class='marginB10'><input type='text' class='gift-sku form-control' name='sku_no' /><p></p></div>";
	var gifthtml = "<tr><td class='vertical-align-top'>满金额：</td><td><input  class='form-control input-digit' placeholder='满金额：例100'   type='text' name='conditionAmount' /></td></tr>"
			+ "<tr><td class='vertical-align-top'>赠品sku_no</td><td>"
			+ gifthtmlin
			+ "<a href='javascript:void(0)' class='addgift' onclick='addgift(this)'>+&nbsp;添加sku_no</a>"
			+ "</td></tr>";

	var over_reducehtml = "<tr><td class='vertical-align-top'>满金额：</td><td><input class='form-control input-digit'  placeholder='满金额：例100'  type='text' name='conditionAmount' /></td></tr><tr><td class='vertical-align-top'>减金额 : </td><td><input type='text' class='input-integer form-control disamount-amount' placeholder='>0的正整数' name='discountAmount' /> </td></tr>";
	var over_qty_discounthtml = "<tr><td class='vertical-align-top'>商品件数：</td><td><input  class='form-control input-integer'  type='text' name='conditionQuantity' /></td></tr><tr><td  class='vertical-align-top'>折扣数：</td><td><input type='text' class='form-control input-digit' placeholder='保留小数一位' name='saleOn' /> </td></tr>";
	var over_saleoffhtml = "<tr><td class='vertical-align-top'>满金额：</td><td><input class='form-control input-digit'   type='text' name='conditionAmount' /></td></tr><tr><td class='vertical-align-top'>折扣数：</td><td><input type='text' class='form-control input-digit' placeholder='保留小数一位'  name='saleOn'/> </td></tr>";

	var discount_2nd_itemhtml = "<tr><td class='vertical-align-top'>满金额：</td><td><input   class='form-control input-digit' type='text' name='conditionAmount' /></td></tr><tr><td class='vertical-align-top'>折扣数：</td><td><input type='text' class='form-control input-digit' name='saleOn' placeholder='保留小数一位' /> </td></tr>";
	var gift_randomhtml = "<tr><td class='vertical-align-top'>满金额：</td><td><input   type='text'  class='input-digit form-control' name='conditionAmount' placeholder='大于正数，0表示买就送'/></td></tr><tr><td class='vertical-align-top'>随机赠品：</td><td><textarea name='sku_no' style='height: 100px;' placeholder='填写一个或多个sku_no,随机赠送其中一个'></textarea></td></tr>";
	var over_amt_freehtml = "<tr><td class='vertical-align-top'>商品件数：</td><td><input class='input-int form-control'   type='text' name='conditionQuantity' placeholder='大于1的正整数' /></td></tr><tr><td class='vertical-align-top'>免件数：</td><td><input  type='text' class='input-int form-control' name='freeQuantity' placeholder='大于1的正整数 小于商品件数' /> </td></tr>";
	var red_envelophtml = "<tr><td class='vertical-align-top'>满金额：</td><td><input   type='text' class='input-digit form-control' name='conditionAmount' placeholder='大于0的数字' /></td></tr><tr><td class='vertical-align-top'>虚拟红包：</td><td><textarea placeholder='hash-id,数量（一行一个）' name='hash_id'></textarea> </td></tr>";

	var over_reduce_uncappedhtml = over_reducehtml;
	var voucher_uncappedhtml = voucherhtml;
	
	function changeProperty(base) {
		var val = base.value;
		
		var tb = $(base).closest("table").find("tbody");
		tb.html(eval(val + 'html') + customhtml); 
		
		var time = new Date().getTime();
		var input=$(tb[0]).find("input");
		input.each(function(i,e){
			$(e).attr('name',$(e).attr('name')+time);
		});
		
		var textarea=$(tb[0]).find("textarea");
		textarea.each(function(i,e){
			$(e).attr('name',$(e).attr('name')+time);
		});
		
		addCumtomValidate(tb,time);
		switch (val) {
			case 'voucher':
			case 'voucher_uncapped':
				conditionAmountValidate(tb,time);
				vouncherValidate(tb,time);
				break;
			case 'gift':
				conditionAmountValidate(tb,time);
				skuNoValidate(tb,time);
				break;
			case 'over_reduce':
			case 'over_reduce_uncapped':
				conditionAmountValidate(tb,time);
				discountAmountValidate(tb,time);
				break;
			case 'over_amt_free':
				conditionQuantityValidate(tb,time);
				freeQuantityValidate(tb,time);
				break;
			case 'over_qty_discount':
				conditionQuantityValidate(tb,time);
				saleOnValidate(tb,time);
				break;
			case 'discount_2nd_item':
				conditionAmountValidate(tb,time);
				saleOnValidate(tb,time);
				break;
			case 'red_envelop':
				conditionAmountValidate(tb,time);
				hashIdValidate(tb,time);
				break;
			case 'gift_random':
				conditionAmountValidate(tb,time);
				skuNoValidate(tb,time);
				break;
			case 'over_saleoff':
				conditionAmountValidate(tb,time);
				saleOnValidate(tb,time);
				break;
			default:
				break;
			}
			
		addTimePicker();
		
		if (val == 'gift_randomgift_random') {
			$(':button[name="publish_and_relation"]').hide();
		} else {
			$(':button[name="publish_and_relation"]').show();
		} 
	}

	//初始化时间空间 time
	function addTimePicker(){
		$(".timepicker").datepicker({
			closeText : 'X',
			showSecond : true,
			dateFormat : 'yy-mm-dd'
		}); 
	}
	
	
	var addvoucher = function(obj) {
		$(obj).before(voucherin);
		
		time = new Date().getTime();
		var inner = $(obj).prev($(voucherin));
		var input=inner.find("input");
		input.each(function(i,e){
			$(e).attr('name',$(e).attr('name')+time);
		});
		
		var textarea=inner.find("textarea");
		textarea.each(function(i,e){
			$(e).attr('name',$(e).attr('name')+time);
		});
		
		vouncherValidate(inner,time);
		addTimePicker();
// 		reloadValidStyle();
	}

	function addgift(obj) {
		$(obj).before(gifthtmlin);
		
		time = new Date().getTime();
		var inner = $(obj).prev($(gifthtmlin));
		var input=inner.find("input");
		input.each(function(i,e){
			$(e).attr('name',$(e).attr('name')+time);
		});
		
		skuNoValidate(inner,time);
	}
	var removeVoucher = function(obj) {
		if ($(obj).closest('td').find('.card-div').length <= 1) {
			alert("不能再删除！");
		} else {
			$(obj).closest('div').remove();
		}
	}

	var vouncherValidate = function(e,time){
		
		$(e).find("*[name=batch_no"+time+"]").rules("add",{ 
			 required: true
		     }); 
		$(e).find("*[name=quantity"+time+"]").rules("add",{ 
   			 required: true,
    		digits:true
    	 }); 
	
		$(e).find("*[name=over_amount"+time+"]").rules("add",{ 
  		  required: true,
   		 digits:true
    	 }); 
	
		$(e).find("*[name=discount"+time+"]").rules("add",{ 
    	required: true,
    	digits:true
     	}); 
		
		$(e).find("*[name=capped"+time+"]").rules("add",{ 
   	 	required: true
    	 }); 
		
		$(e).find("*[name=expire_time"+time+"]").rules("add",{ 
	    	required: true
	    	 }); 
	}
	var addCumtomValidate = function(e,time){
		 $(e).find("*[name=displayContent"+time+"]").rules("add",
	 		 { 
		      required: true,
		      minlength:10,
		      maxlength:1000,
		      messages: {
		    	  minlength: "至少十个字符5个汉字"
	 		      }
			  });
		 
		$(e).find("*[name=url"+time+"]").rules("add",
		 		 { 
			      required: true,
			      url:true,
			      maxlength:1000
				  });
		$(e).find("*[name=content"+time+"]").rules("add",
				{ 
		      required: true,
		      minlength:10,
		      maxlength:1000,
		      messages: {
		    	  minlength: "至少十个字符5个汉字",
		    	  maxlength:"最多100个字符或50个汉子"
	 		      }
			  }); 
	}
	
	
	var conditionQuantityValidate = function(e,time){
		$(e).find("*[name=conditionQuantity"+time+"]").rules("add",
		 		 { 
		      required: true,
		      number:true,
		      isFloat:10
			  });
	} 
	var conditionAmountValidate = function(e,time){
		$(e).find("*[name=conditionAmount"+time+"]").rules("add",
		 		 { 
		      required: true,
		      number:true,
		      isFloat:10
			  });
	} 
	
	var skuNoValidate = function(e,time){
		$(e).find("*[name=sku_no"+time+"]").rules("add",
		 		 { 
		      required: true
			  });
	}
	
	var hashIdValidate = function(e,time){
		$(e).find("*[name=hash_id"+time+"]").rules("add",
		 		 { 
		      required: true
			  });
	}
	
	
	var discountAmountValidate = function(e,time){
		$(e).find("*[name=discountAmount"+time+"]").rules("add",
		 		 { 
			 required: true,
		      digits:true,
		      percent51warn:true
			 });
	} 
	
	var saleOnValidate = function(e,time){
		$(e).find("*[name=saleOn"+time+"]").rules("add",
		 		 { 
		      required: true,
		      number:true,
		      isFloat:true,
		      onePointNum:true
			  });
	} 
	
	var freeQuantityValidate = function(e,time){
		$(e).find("*[name=freeQuantity"+time+"]").rules("add",
		 		 { 
		      required: true,
		      digits:true,
		      freeQuantityOverCondition:true
			  });
	} 
	
	var  baseContent= '<div class="singleProperty" ><table cellspacing="0" cellpadding="4"><thead><tr>'
          +'<td  class="vertical-align-top">类型：</td><td>'+$('#promotionTypeBase').html()
       	  +'</td></tr></thead><tbody></tbody></table><a href="javascript:;"  onclick="removeProperty(this)">×&nbsp;删除该促销形式</a></div>'
	function addNewProperty() {
// 		var html = $($(".singleProperty")[0]).clone();
		var html = baseContent;
		$('#sale_detail_properties').append(html);
		changeProperty($('#sale_detail_properties').find('.sale_detail_type').last().get(0));
// 		reloadValidStyle();
// 		html.effect("highlight", {
// 			'color' : 'yellow'
// 		}, 1000);
// 		$(".singleProperty:hidden").remove();
	}

	function removeProperty(o) {
			$(o).parent().remove();
	}
	
	function reloadValidStyle(){
// 		$("#search_from").valid();
	}
	
	var checkVoucher = function(element){
		var card_div = $(element).closest('td').find('.card-div');
		valid = true;
		var content = '';
		for(var i = 0;i<card_div.size();i++)
			{
			var td = $(card_div[i]);
			
			var batch_no = td.find("input[name^=batch_no]").val();
			var quantity = td.find("input[name^=quantity]").val();
			var over_amount = td.find("input[name^=over_amount]").val();
			var discount = td.find("input[name^=discount]").val();
			var active_time = td.find("input[name^=active_time]").val();
			var expire_time = td.find("input[name^=expire_time]").val();
			var capped = td.find("input[name^=capped]").val();
			valid = valid && isNotNull(batch_no)&&isNotNull(quantity)&&isNotNull(over_amount)&&isNotNull(discount)&&isNotNull(active_time)&&isNotNull(expire_time)&&isNotNull(capped);
			
			time = new Date().getTime();
			var input=td.find("input");
					input.each(function(i,e){
						$(e).attr('name',$(e).attr('name')+time);
					});
					 
		   if(!valid) break;
		   if(!isNaN(over_amount) && !isNaN(discount) )
			   { 
			     if(parseInt(over_amount)<parseInt(discount))
			    	 {
			    	 content = '第'+i+'个减金额大于满金额，请重新输入';
			    	 }
			   }
		   else 
		   content += '满['+over_amount+']元返['+quantity+']张减['+discount+']现金券,激活时间[:'+active_time+']，过期时间['+expire_time+']，作用范围ID['+capped+']批号['+batch_no+'];';
		}
		if(valid)
			{
			
			if ($(element).data('popover') != null) {
				 $(element).popover('hide');
				 $(element).removeData('popover');
		     }
			 
			$(element).popover({
				trigger : "manual",
				placement : "right",
				content : content,
				template : "<div class=\"popover\"><div class=\"arrow\"></div><div class=\"popover-inner\"><div class=\"popover-content\" style=\"min-width:60px\"><p></p></div></div></div>"
			}).popover('toggle');
			
			}
		else{
			$(element).popover({
				trigger : "manual",
				placement : "right",
				content : '元素输入不齐！',
				template : "<div class=\"popover\"><div class=\"arrow\"></div><div class=\"popover-inner\"><div class=\"popover-content\" style=\"min-width:60px\"><p></p></div></div></div>"
			}).popover('toggle');
		}
		
	}