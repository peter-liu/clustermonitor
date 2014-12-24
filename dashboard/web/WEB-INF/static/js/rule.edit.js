
$(function() {
	// loading rule item data
	if (ruleId != null && ruleId != '') {
		$.post(ctx + '/rule/queryItemRule', {
			ruleId : ruleId
		}, function(resp) {
			if(resp.success){
				ruleEdit.drawRuleItem(resp.data);
			}else{
				showError(resp.message);
			}
		}, 'json');
	}

});

var ruleEdit  = {
		drawRuleItem:function(itemArray){
			for(var i=0;i<itemArray.length;i++){
				//1.new a ruleItem zone
				if(i!=0){
					addNewProperty();
				}
				 var currentPrmotionTypeSelect = $('#sale_detail_properties').find('.sale_detail_type').last().get(0);
				 $(currentPrmotionTypeSelect).find('option[value='+itemArray[i].promotionType+']').attr('selected',true);
				 changeProperty(currentPrmotionTypeSelect);		
				 fillItemValToProperty(currentPrmotionTypeSelect,itemArray[i]);
				 // disable select
				 $(currentPrmotionTypeSelect).attr('readonly',true);
			}
		}
};

var fillItemValToProperty = function(promotionTypeDiv,item){
	var cule = $(promotionTypeDiv).closest("table").find("tbody");
	 cule.find("*[name^=conditionQuantity]").val(item.conditionQuantity);
	 cule.find("*[name^=conditionAmount]").val(item.conditionAmount);
	 var saleOn = 10-parseFloat( item.saleOff); 
	 cule.find("*[name^=saleOn]").val(saleOn);
	 cule.find("*[name^=freeQuantity]").val(item.freeQuantity );
	 cule.find("*[name^=displayContent]").val(item.displayContent);
	 cule.find("*[name^=url]").val(item.url);
	 cule.find("*[name^=content]").val(item.content);
	 cule.find("*[name^=discountAmount]").val(item.discountAmount);
	 switch (item.promotionType) {
		case 'voucher':
		case 'voucher_uncapped':
			itemValue = JSON.parse(item.itemValue);
			for(var i=0;i<itemValue.length;i++){
				itemObj = itemValue[i];
				if(i!=0)
				addvoucher(cule.find('.addvoucher').get(0));
				var f =  cule.find('.card-div').last();
				f.find("input[name^=batch_no]").val(itemObj.batch_no);
				f.find("input[name^=quantity]").val(itemObj.quantity);
				f.find("input[name^=over_amount]").val(itemObj.over_amount);
				f.find("input[name^=discount]").val(itemObj.discount );
				f.find("input[name^=active_time]").val(itemObj.active_time);
				f.find("input[name^=expire_time]").val(itemObj.expire_time );
				f.find("input[name^=capped]").val(itemObj.capped);
			}
			break;
		case 'gift':
			itemValue = eval(item.itemValue);
			for(var i=0;i<itemValue.length;i++){
				itemObj = itemValue[i];
				if(i!=0)
				addgift(cule.find('.addgift').get(0));
				cule.find('*[name^=sku_no]').val(itemObj);;
			}
			break;
		
		case 'red_envelop':
			itemValue = eval(item.itemValue);
			var result='';
			for(var i=0;i<itemValue.length;i++){
				itemObj = itemValue[i];
				result = result + itemObj+'\n';
			}
			cule.find('*[name^=hash_id]').val(result);;
			break;
			
		case 'gift_random':
			itemValue =  eval(item.itemValue);
			var result='';
			for(var i=0;i<itemValue.length;i++){
				itemObj = itemValue[i];
				result = result + itemObj+'\n';
			}
			cule.find('*[name^=sku_no]').val(result);;
			break;
		default:
			break;
		}
}