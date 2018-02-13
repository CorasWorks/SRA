$(document).ready(function () {
	var CharterLoad= 0;
	if(getParameterByName('CharterLoad') !='' && getParameterByName('CharterLoad') > -1){
			CharterLoad= getParameterByName('CharterLoad');
		}
	$('#TabbedCharterForm').tabs({
    		active: CharterLoad,
	});
	$('#CharterSave').button({icons: {secondary: "ui-icon-circle-check"}}).click(function (event) {
        event.preventDefault();
        $('#CharterReload').show();
        $('#CharterBody').hide();
        saveCharter($(this).data('id'));
    });
	$('#CharterBody textarea').keyup(function() {
		$('#CharterSave').button( "option", "disabled", false );
		NotSavedCheck = true;

		if ($(this).val().length > MaxLength) {
            // Maximum exceeded
            $(this).val($(this).val().substring(0, MaxLength));
        }else{	
    	}	
    	$(this).parent().find('.charCountDisplay').html($(this).val().length);
    	
	});


});
function saveCharter(id)
{
	//alert(id);
	var batch = '<ows:Batch OnError="Return">';
	batch += '<Method ID="A1"><SetList>%Projects%</SetList><SetVar Name="ID">'+id+'</SetVar><SetVar Name="Cmd">Save</SetVar>'
	batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#CharterProblemStatement">'+$('#ProblemStatement').val()+'</SetVar>';
	batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#CharterGoalStatement">'+$('#GoalStatement').val()+'</SetVar>';	
	batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#CharterBusinessCase">'+$('#CharterBusinessCase').val()+'</SetVar>';	
	batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#CharterScopeIncludes">'+$('#CharterScopeIncludes').val()+'</SetVar>';	
	batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#CharterScopeExcludes">'+$('#CharterScopeExcludes').val()+'</SetVar>';	
	batch +='</Method></ows:Batch>';

	$.ajax({
		type: 'POST',
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: 'Projects',
		 		SiteUrl: '[SRA Root]',
				Batch: batch,
				OutputType: 'json' },
		dataType: 'json',
		cache: false,
		async: true,
		success:function(json){
			//alert('Updates Saved');
			NotSavedCheck = false;
			if(NotSavedCloseCheck){CloseEditMain();}
			CharterRender();
			//$('#CharterSave').button( "option", "disabled", true );				
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
}
