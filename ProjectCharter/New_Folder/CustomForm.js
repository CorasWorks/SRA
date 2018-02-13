$(function () {
    $('#TabbedForm').tabs({ show: { effect: "slide",direction:"right", duration: 700 } });
    $('.Cancel').button({ icons: { primary: "ui-icon-circle-close" } });
    $('.Save').button({icons: {secondary: "ui-icon-circle-check"}});
    $('.HiddenToggle').button({
    	icons: { primary: "ui-icon-circle-triangle-e" }
    }).click(function(event){
    	event.preventDefault();
    	$(".ui-button-icon-primary", this).toggleClass("ui-icon-circle-triangle-s ui-icon-circle-triangle-e");
    	$('#HiddenParameters').slideToggle();
    });
    
    var definition;
    var ListSchema = {};
    var selectedItems;
    var InputsHTML = '';
    
    selectedItems = CWSGetSelectedListItems(webPartId);

    $.ajax({
        type: "GET",
        url: actionEndPoint,
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            definition = data.Definition;
            $.each(data.Fields,function(index,item){
	            var obj = $.parseJSON(this);
	            ListSchema[index] = obj.Field;
	        });
            RenderForm();
        },
        error: function (data) { alert(data.responseText); }
    });

    $('.Cancel').click(function (event) {
    	event.preventDefault();
    	CWSCloseActionForm(webDialogId);
    });
    
    $('.Save').click(function (event) {
        event.preventDefault();
        $.each(definition._actionParams,function(){
        	if($('#ActionForm input[name="' + this._name + '"]').length==1)
                this._value = $('#ActionForm input[name="' + this._name + '"]').val();
        });
        
        $.ajax({
            type: "POST",
            url: definition._actionExecuteEndpoint,
            data: JSON.stringify({ actionDefintion: definition, listItems: selectedItems }),
            contentType: "application/json; charset=utf-8",
            success: function () {
				CWSRefreshGrid(gridId, false, 0, webPartId, webDialogId, null, null);
				CWSCloseActionForm(webDialogId);
            },
            error: function (data) {
            }
        });
    });
    
    function RenderForm() {
    	var FormHTML = '';
    	var HiddenParamsHTML = '';
    	$('#CWActionTitle').text(definition._actionName);
    	$('#CWActionCategory').text(definition._category);
    	$('#CWActionDescription').text(definition._decription);
    	$.each(definition._actionParams,function(){
    		if(this._valueFromUser==true) {
	    		var InputID = this._name.replace(/\s+/g,'');
	    		var InputName = (this._alternateTitle=='') ? this._name : this._alternateTitle;
	    		FormHTML += '<label for="' + InputName + '">' + InputName;
	    		if(this._required==true)
	    			FormHTML += '<sup class="CWRequired">*</sup>';
	    		FormHTML += '</label>';
				FormHTML += '<input type="text" class="CWInput" id="' + InputID + '" name="' + InputName + '" data-ActionParam="' + this._name + '"';
				if(this._value!='')
					FormHTML += ' value="' + this._value + '"';
				if(this._readOnly==true)
					FormHTML += ' disabled="disabled"';
				FormHTML += '><br/>';
	    		if(this._description!='')
	    			FormHTML += '<span class="CWFormDescription">' + this._description + '</span><br/>';
	    	}
    	});
    	HiddenParamsHTML = '<ul><li>Action is updating the List/Library "' + definition._listTitle + '"</li>';
    	$.each(definition._actionParams,function(){
    		if(this._valueFromUser==false) {
    			HiddenParamsHTML += '<li>Field "' + this._name + '" will be set to "' + this._value + '"</li>';
    		}
    	});
    	HiddenParamsHTML += '<li>On success, the message "' + definition._onSuccessMessage + '" could be displayed</li>';
    	HiddenParamsHTML += '<li>On error, the message "' + definition._onErrorMessage + '" could be displayed</li></ul>';
    	$('#DynamicForm').html(FormHTML);
    	$('#HiddenParameters').html(HiddenParamsHTML);
    }
});