$(document).ready(function () {

	//disables the input, but keeps the text black
	$('input.noDatePicker').attr('disabled','disabled').attr('style','color:black');

	$('td').on('click','input.milestoneDatePicker',function(){
		alert('press delete');
	});
	$('input.milestoneDatePicker').datepicker({
		showOn: "button",
		changeMonth:true,
		changeYear:true,
		dateFormat: "mm-dd-yy",
		altField: "#sharePointDate",
		altFormat: "yy-mm-dd",
		onSelect: function(selectedDate){
			var validate=validateDate($(this));
			if(validate == 0){
				saveData('%SiteURL%','Milestones',$(this).data('id'),$(this).data('column'),$('#sharePointDate').val(),$(this).data('message'));
				checkState($(this).data('milestone'));
			}
			else if (validate == 1)
			{
				alert("Date not saved, this milestone cannot precede the prior milestone");
				$(this).val($(this).attr('value'))
			}
			else if (validate == 2)
			{
				alert("Date not saved, this milestone cannot excede the next milestone");
				$(this).val($(this).attr('value'))
			}
			else
			{
				alert("Date not saved, this milestone cannot precede the prior nor excede the next milestone");
				$(this).val($(this).attr('value'))
			}

		}
	});//.attr('readOnly','true');

	$('table.milestonesTable').on('click','img.milestoneCalIcon',function(){
		try {
		   $(this).next().datepicker('show');
		}
		catch(err) {
		    initDatePickers();
		    $(this).next().datepicker('show');
		}		
		
	}).on('click','div.milestoneComplete',function(){
		completeMilestone($(this));
	 	if($('input.targetDate').length == $(this).data('position') && $(this).hasClass('cbchecked')){
	 		checkForBenefits();
	 	}
	});
	$('div#finalMilestoneDialog').dialog({
		autoOpen:false,
		close:function(event, ui){
			if($('#thisProjectStatus').text() != 'Closed'){
				finalMilestone('Complete')
			}
		}		
	});
	$('input.milestoneButton').button().on('click',function(){
		if($(this).val() == 'Yes'){
			finalMilestone('Closed');
			$('div#finalMilestoneDialog').dialog('close');		
		}
		else{
			$('div#finalMilestoneDialog').dialog('close');				
		}

	});	
});
function saveData(site, list, id, column, value, message)
{
	var batch = '<ows:Batch OnError="Return">';
	batch += '<Method ID="A1"><SetList>%'+list+'%</SetList><SetVar Name="ID">'+id+'</SetVar><SetVar Name="Cmd">Save</SetVar><SetVar Name="urn:schemas-microsoft-com:office:office#'+column+'">'+value+'</SetVar>';	
	batch +='</Method></ows:Batch>';

	$.ajax({
		type: 'POST',
		url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: list,
		 		SiteUrl: site,
				Batch: batch,
				OutputType: 'json' },
		dataType: 'json',
		cache: false,
		async: true,
		success:function(json){
			updateMetadata(json);			
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
}
//Write Team Launch and Final Miletone dates to project metadata at Root for reporting purposes.   
function updateMetadata()
{
	//console.log('write launch and last milestone dates up to Root');

	$.ajax({
		type: 'POST',
		url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'BatchRequest',
				ConfigFileLocation: '[SRA Root]/Resources/Milestones/meta.xml',
				XsltLocation: '[SRA Root]/Resources/Milestones/meta.xslt',
				OutputType: 'Redirect' },
		dataType: 'json',
		cache: false,
		async: true,
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});

}

function setOriginalTargets(callback, site, list, id, column, value, message)
{
	$('input.targetDate').each(function(i, v) {
		$('td.originalTargetDate[data-position = "'+(i+1)+'"]').text(v.value);
 	});	

	$.ajax({
		type: 'POST',
		url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'BatchRequest',
		 		ConfigFileLocation: '[SRA Root]/Resources/Milestones/writeOriginalTargets.xml',
		 		XsltLocation: '[SRA Root]/Resources/Milestones/writeOriginalTargets.xslt',
				ProjectID:$('#projectStatusWrapper').data('projectid'),
				ProjectStatus:'Active',
				OutputType: 'Redirect' },
		cache: false,
		async: true,
		success:function(response){	
			callback(site, list, id, column, value, message);
			$('#thisProjectStatus').text('Active');		
        },
		error: function(response) {alert("Error!");}
	});
}
function initDatePickers()
{
	$('input.milestoneDatePicker').datepicker({
		showOn: 'button',
		changeMonth:true,
		changeYear:true,
		dateFormat: "mm-dd-yy",
		altField: "#sharePointDate",
		altFormat: "yy-mm-dd",
		onSelect: function(selectedDate){
			var validate=validateDate($(this));
			if(validate == 0){
				saveData('%SiteURL%','Milestones',$(this).data('id'),$(this).data('column'),$('#sharePointDate').val(),$(this).data('message'));
				checkState($(this).data('milestone'));
			}
			else if (validate == 1)
			{
				alert("Date not saved, this milestone cannot precede the prior milestone");
				$(this).val('')
			}
			else if (validate == 2)
			{
				alert("Date not saved, this milestone cannot excede the next milestone");
				$(this).val('')
			}
			else
			{
				alert("Date not saved, this milestone cannot precede the prior nor excede the next milestone");
				$(this).val('')
			}
		}
	});
           
}
function checkState(milestone){

	var priorMilestoneCheckBox = 0;
	var targetObj = $('input.targetDate[data-milestone = "'+milestone+'"]');
	var actualObj = $('input.actualDate[data-milestone = "'+milestone+'"]');
	var completeObj = $('div.milestoneComplete[data-milestone = "'+milestone+'"]');
	
	var target = targetObj.val() != '' ? true : false;
	var actual = actualObj.val() != '' ? true : false;
	var complete = completeObj.hasClass('cbchecked');
	var defineCheck = 0;

	position = parseInt(completeObj.data('position'));
		
	if(target == true && actual == true && complete == false){
		if(position > 1){
			priorMilestoneCheckBox = $('div.milestoneComplete[data-position = "'+(position-1)+'"]');
			if(priorMilestoneCheckBox.hasClass('cbchecked')){
				completeObj.removeClass('cbHidden cbchecked cbwarning').addClass('cbunchecked');
			}
			else{
				completeObj.removeClass('cbHidden cbchecked cbunchecked').addClass('cbwarning');			
			}
		}
		else{
			completeObj.removeClass('cbHidden cbchecked cbwarning').addClass('cbunchecked');		
		}
	}
	defineStageValidate($('.milestoneComplete[data-milestone = "DEFINE"]'))	
}
function validateDate(obj){
	var priorMilestoneObj, thisMilestoneDate, priorMilestoneDate, position, nextMilestoneObj, nextMilestoneDate;
	thisMilestoneDate = $.datepicker.parseDate('mm-dd-yy',obj.val());
	var result = 0;
	position = parseInt(obj.data('position'));
	if(position > 1)
	{
		
		priorMilestoneObj = obj.hasClass('targetDate') ? $('.targetDate[data-position = "'+(position-1)+'"]') : $('.actualDate[data-position = "'+(position-1)+'"]');
		if(priorMilestoneObj.datepicker('getDate') !== null)
		{
			priorMilestoneDate = $.datepicker.parseDate('mm-dd-yy',priorMilestoneObj.val());
			result = thisMilestoneDate >= priorMilestoneDate ? result : result+1;
		}
	}
	if (position != $('input.targetDate').length)
	{
		nextMilestoneObj = obj.hasClass('targetDate') ? $('.targetDate[data-position = "'+(position+1)+'"]') : $('.actualDate[data-position = "'+(position+1)+'"]');
		if(nextMilestoneObj.datepicker('getDate') !== null)
		{
			nextMilestoneDate = $.datepicker.parseDate('mm-dd-yy',nextMilestoneObj.val());
			result = thisMilestoneDate <= nextMilestoneDate ? result : result+2;
		}
	}
	return result;
}
function completeMilestone(obj)
{
	var position = parseInt(obj.data('position'));
	var nextCompleteMilestone = $('.milestoneComplete[data-position = "'+(position+1)+'"]');
	
	if(obj.parent('td').prevAll('td').children('input.milestoneDate:first').val() != '')
	{		
		if(obj.hasClass('cbunchecked'))
		{
			obj.removeClass('cbunchecked').addClass('cbchecked');
			if(obj.data('milestone') === 'DEFINE' && $('.originalTargetDate[data-position = "'+obj.data('position')+'"]').text() == "")
			{
				setOriginalTargets(saveData,'%SiteURL%','Milestones',obj.data('id'),obj.data('column'),'1','DEFINE Stage Completed');			
			}
			else
			{
				saveData('%SiteURL%','Milestones',obj.data('id'),obj.data('column'),'1','Milestone Completed.');
			}
			//check next milestone and set background image
			if(nextCompleteMilestone.hasClass('cbwarning'))
			{
				if(nextCompleteMilestone.data('milestone') == 'DEFINE'){
					defineStageValidate(nextCompleteMilestone);
				}
				else{
				nextCompleteMilestone.removeClass('cbwarning').addClass('cbunchecked').attr('title','Click to Complete');
				}
			}
			
			$('input.milestoneDatePicker[data-milestone="'+obj.data('milestone')+'"]').removeClass('milestoneDatePicker').addClass('noDatePicker').prop('disabled',true).attr('style','color:black').prev('img').removeClass('milestoneCalIcon').addClass('noCalIcon').prop('disabled',false);							
		}
		else if(obj.hasClass('cbchecked'))
		{
			obj.removeClass('cbchecked').addClass('cbunchecked');
			saveData('%SiteURL%','Milestones',obj.data('id'),obj.data('column'),'0','Milestone uncompleted.');
			$('input.noDatePicker[data-milestone="'+obj.data('milestone')+'"]').removeClass('noDatePicker').addClass('milestoneDatePicker').prop('disabled',false).prev('img').removeClass('noCalIcon').addClass('milestoneCalIcon');
			//check next milestone and set background image
			if(nextCompleteMilestone.hasClass('cbunchecked'))
			{
				if(nextCompleteMilestone.data('milestone') == 'DEFINE'){
					defineStageValidate(nextCompleteMilestone);
				}
				else{
					nextCompleteMilestone.removeClass('cbunchecked').addClass('cbwarning').attr('title','Complete prior Milestone');
				}
			}
						
		}
		else{}			
	}
	else{
		alert('Please enter an Actual Date for this Milestone');
		alert(obj.parent('td').prevAll('td').children('input.milestoneDate')[1].val());
	}

}
function defineStageValidate(obj)
{
	if($('input.actualDate[data-position = "'+obj.data('position')+'"]').val() != ''){
		var defineCheck = 0;
		$('input.targetDate').each(function( index ) {
			if($(this).val() != ''){
				defineCheck++;
			}			
		});	
		
	 	if(defineCheck == $('input.targetDate').length && $('div.milestoneComplete[data-position="1"]').hasClass('cbchecked'))
	 	{
	 		if(!(obj.hasClass('cbchecked'))){
				obj.removeClass('cbHidden cbchecked cbwarning').addClass('cbunchecked');
			} 	 	
	 	}
	 	else
	 	{
			obj.removeClass('cbHidden cbchecked cbunchecked').addClass('cbwarning').attr('title','Complete prior Milestone and enter all Target Dates');
	 	}
	}
}
function checkForBenefits(){
	$.ajax({
		type: 'GET',
		url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		dataType:'json',
		data: { RequestType: 'GetListItems',
		 		ListTitle:'Project Benefits',
		 		OutputType:'json'},
		cache: false,
		async: true,
		success:function(json){
			if(json.NewDataSet.GetListItems.listitems['rs:data']['z:row']){
				finalMilestone('Complete');
			}
			else{
				$('div#finalMilestoneDialog').dialog('open');
			}
        },
		error: function(response) {alert("Error!");}
	});
}
function finalMilestone(finalStatus){

	$.ajax({
		type: 'POST',
		url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'BatchRequest',
		 		ConfigFileLocation: '[SRA Root]/Resources/Milestones/writeFinalMilestoneProjectStatus.xml',
				ProjectID:$('#projectStatusWrapper').data('projectid'),
				ProjectStatus:finalStatus},
		cache: false,
		async: true,
		success:function(response){	
			$('#thisProjectStatus').text(finalStatus);		
        },
		error: function(response) {alert("Error!");}
	});
	
}