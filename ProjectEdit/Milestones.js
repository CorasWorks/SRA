$(document).ready(function () {

	
    $('#mapMenu').on('change', function () {
        updateProjectMethodology($(this).val(), $('#mapMenu option:selected').attr('mapID'),$(this).attr('projectid'),$(this).attr('projectURL'));
    })


	//disables the input, but keeps the text black
	$('input.noDatePicker').attr('disabled','disabled').attr('style','color:black');

	$('input.milestoneDatePicker').datepicker({
		changeMonth:true,
		changeYear:true,
		dateFormat: "mm-dd-yy",
		altField: "#sharePointDate",
		altFormat: "yy-mm-dd",
		onSelect: function(selectedDate){
			/*var validate=validateDate($(this));
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
			}*/
			saveData('%SiteURL%','Milestones',$(this).data('id'),$(this).data('column'),$('#sharePointDate').val(),$(this).data('message'),$(this).data('position'));
			checkState($(this).data('milestone'));

		}
	}).attr('readOnly','true').click(function(){$(this).select();}).keyup(function(e){
		if(e.keyCode == 46 && $(this).attr('readOnly') != 'true'){
			$(this).val('').datepicker('setDate',null);
				saveData('%SiteURL%','Milestones',$(this).data('id'),$(this).data('column'),'',$(this).data('message'),$(this).data('position'));
				checkState($(this).data('milestone'));

			/*var validate=validateDate($(this));
			if(validate == 0){
				saveData('%SiteURL%','Milestones',$(this).data('id'),$(this).data('column'),'',$(this).data('message'));
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
			*/
		}
	});

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
				finalMilestone('Complete','7');
			}
		}		
	});
	$('input.milestoneButton').button().on('click',function(){
		console.log('closing')
		if($(this).val() == 'Yes'){
			finalMilestone('Closed','11');
			$('div#finalMilestoneDialog').dialog('close');		
		}
		else{
			$('div#finalMilestoneDialog').dialog('close');				
		}

	});	
});
function saveData(site, list, id, column, value, message, position)
{
	var batch = '<ows:Batch OnError="Return">';
	batch += '<Method ID="A1"><SetList>%'+list+'%</SetList><SetVar Name="ID">'+id+'</SetVar><SetVar Name="Cmd">Save</SetVar><SetVar Name="urn:schemas-microsoft-com:office:office#'+column+'">'+value+'</SetVar>';	
	batch +='</Method></ows:Batch>';

	$.ajax({
		type: 'POST',
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: list,
		 		SiteUrl: site,
				Batch: batch,
				OutputType: 'json' },
		dataType: 'json',
		cache: false,
		async: true,
		success:function(json){
			if(position == 1){
				if(column == 'TargetDate'){
					saveMilestoneMainData('TeamLaunchTarget', value)
					}
				else if(column == 'ActualDate'){
					saveMilestoneMainData('TeamLaunchActual', value)
					}	
			}else if (position == MilestoneCount ){
				if(column == 'TargetDate'){
					saveMilestoneMainData('FinalMilestoneTarget', value)
					}
				else if(column == 'ActualDate'){
					saveMilestoneMainData('FinalMilestoneActual', value)
					}	
			}
			//refreshGrid();			
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
}
function saveMilestoneMainData(column, value)
{
	var Rootbatch = '<ows:Batch OnError="Return">';
	Rootbatch += '<Method ID="A1"><SetList>%Projects%</SetList><SetVar Name="ID">'+ProjectID +'</SetVar><SetVar Name="Cmd">Save</SetVar>';	
	Rootbatch += '<SetVar Name="urn:schemas-microsoft-com:office:office#'+column+'">'+value+'</SetVar>';	
	Rootbatch +='</Method>';
	Rootbatch +='</ows:Batch>';
	
//alert(Rootbatch);
	$.ajax({
		type: 'POST',
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Projects',
		 		SiteUrl: '[SRA Root]',
				Batch: Rootbatch,
				OutputType: 'json' 
				},
		dataType: 'json',
		cache: false,
		async: true,
		success:function(json){				
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
}

function setOriginalTargets(callback, site, list, id, column, value, message)
{
	$('input.targetDate').each(function(i, v) {
		$('td.originalTargetDate[data-position = "'+(i+1)+'"]').text(v.value);
 	});	
	
	//need to remove hardcoding for ProjectStatus and ProjectStatusID updates.
	$.ajax({
		type: 'POST',
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'BatchRequest',
		 		ConfigFileLocation: '[SRA Root]/Resources/Milestones/writeOriginalTargets.xml',
		 		XsltLocation: '[SRA Root]/Resources/Milestones/writeOriginalTargets.xslt',
				ProjectID:$('#projectStatusWrapper').data('projectid'),
				ProjectStatus:'Active',
				ProjectStatusID:'1',
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
function refreshGrid()
{
	//location.reload();
}
function initDatePickers()
{
	$('input.milestoneDatePicker').datepicker({
		changeMonth:true,
		changeYear:true,
		dateFormat: "mm-dd-yy",
		altField: "#sharePointDate",
		altFormat: "yy-mm-dd",
		onSelect: function(selectedDate){
			var validate=validateDate($(this));
			if(validate == 0){
				saveData('%SiteURL%','Milestones',$(this).data('id'),$(this).data('column'),$('#sharePointDate').val(),$(this).data('message'),$(this).data('position'));
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
	
	//console.log(targetObj.val()+' - '+actualObj.val()+' - '+completeObj.val());
	
	var target = targetObj.val() != '' ? true : false;
	var actual = actualObj.val() != '' ? true : false;
	var complete = completeObj.hasClass('cbchecked');
	var defineCheck = 0;

	//console.log(target+' - '+actual+' - '+complete);

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
	else{
		completeObj.removeClass('cbunchecked cbchecked cbwarning').addClass('cbHidden');		
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
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		dataType:'json',
		data: { RequestType: 'GetListItems',
		 		ListTitle:'Project Benefits',
		 		OutputType:'json'},
		cache: false,
		async: true,
		success:function(json){
			if(json.NewDataSet.GetListItems.listitems['rs:data']['z:row']){
				finalMilestone('Complete','7');
			}
			else{
				$('div#finalMilestoneDialog').dialog('open');
			}
        },
		error: function(response) {alert("Error!");}
	});
}
function finalMilestone(finalStatus,finalStatusID){

	$.ajax({
		type: 'POST',
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'BatchRequest',
		 		ConfigFileLocation: '[SRA Root]/Resources/Milestones/writeFinalMilestoneProjectStatus.xml',
				ProjectID:$('#projectStatusWrapper').data('projectid'),
				ProjectStatus:finalStatus,
				ProjectStatusID:finalStatusID},
		cache: false,
		async: true,
		success:function(response){	
			$('#thisProjectStatus').text(finalStatus);		
        },
		error: function(response) {alert("Error!");}
	});
	
}
function updateProjectMethodology(map, mapID, projectID, projectURL) {
    var batchXML = '<ows:Batch OnError="Return"><Method ID="A1"><SetList>%Projects%</SetList><SetVar Name="ID">' + projectID + '</SetVar><SetVar Name="Cmd">Save</SetVar><SetVar Name="urn:schemas-microsoft-com:office:office#Methodology">' + map + '</SetVar><SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_0"><![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>' + map + '</LookupDbStoreValue><LookupDisplayValue>' + map + '</LookupDisplayValue></Property></Properties>]]></SetVar><SetVar Name="urn:schemas-microsoft-com:office:office#MapID">' + mapID + '</SetVar></Method></ows:Batch>';
    $.ajax({
        url: projectURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'Projects', 'SiteUrl': '[SRA Root]', 'Batch': batchXML, 'OutputType': 'JSON' },
        dataType: 'json',
        async: true,
        cache: false,
        type: 'POST',
        success: function (json) {rewriteLocalMapDefinition(projectURL); },
		error: function(response) {alert("Error!");}
    });
}

//Calling this function will remove any existing local tools and milestones and write down the SRA master definition for the selected methodology 
function rewriteLocalMapDefinition(projectURL){
    $.ajax({
        url: projectURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { 'RequestType': 'BatchRequest', 'ConfigFileLocation': '[SRA Root]/resources/writeLocalMapDefCBD.xml', 'XsltLocation': '[SRA Root]/Resources/writeLocalMapDefXSLT.xslt', 'OutputType': 'Redirect' },
        async: true,
        cache: false,
        type: 'POST',
        success: function (data) {
           window.location.reload();
        }
    });

}
