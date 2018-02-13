var SiteTitleChanged = false;
var ProjectIDCurrent = '';
$(document).ready(function () {
	$("#ProjectError").dialog({
      autoOpen: false,
      modal: true,
      width: 500     
    });
	$("#ProjectErrorIllegal").dialog({
      autoOpen: false,
      modal: true,
      width: 500     
    });    
    
	$("#ProjectCategoryError").dialog({
      autoOpen: false,
      modal: true,
      width: 500     
    });      
	$('#ProjectSave').button({icons: {secondary: "ui-icon-circle-check"}}).click(function (event) {
        event.preventDefault();
        ProjectIDCurrent = $(this).data('id');
        if(SiteTitleChanged){
        	if ($('input.Title').val() != ''){
        		if ($("input.Title").val().match("'")||$("input.Title").val().match('"')||$("input.Title").val().match('&')){
        			$("#ProjectErrorIllegal").dialog("open");
	        		}
	        	else{
	        		parent.SiteTitleChangedMainSet(true);
	        		updateWebSite();
			        $('#ProjectReload').show();
			        $('#ProjectBody').hide();
					}	
        		}
        	else{
        		$("#ProjectError").dialog("open");
				}	
        	}
        else{
			//alert($("#Category option:selected").val());
        	if ($("#Category option:selected").val() != ''){
		        	saveProject(ProjectIDCurrent);
			        $('#ProjectReload').show();
			        $('#ProjectBody').hide();
        		}
        	else{
        		$("#ProjectCategoryError").dialog("open");
				}        
        	}	
    });
	$('#ProjectBody input.Title').keyup(function() {
		$('#ProjectSave').button( "option", "disabled", false );
		SiteTitleChanged = true;
		NotSavedCheck = true;    	
	});	
	$('#ProjectBody').on('change','select',function(){
		$('#ProjectSave').button( "option", "disabled", false );
		NotSavedCheck = true;    	
	});
	
	$('#ProjectBody').on('click','.NewExternal',function(event){
		$('#NewExternal').show();
	});
	$('#ProjectBody').on('keyup paste','input.ExternalLink',function(event){
		$('#ProjectSave').button( "option", "disabled", false );
		NotSavedCheck = true; 
	});
});
function updateWebSite() {
    var clientContext = new SP.ClientContext(ProjectSiteURL);
    this.oWebsite = clientContext.get_web();
    this.oWebsite.set_title($('input.Title').val());
    this.oWebsite.update();
    clientContext.load(this.oWebsite, 'Title');
    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded), 
        Function.createDelegate(this, this.onQueryFailed)
    );
}
function onQuerySucceeded(sender, args) {
	saveProject(ProjectIDCurrent);       
}    
function onQueryFailed(sender, args) {
	SiteTitleChanged = false;
	saveProject(ProjectIDCurrent);        
}
function saveProject(id)
{
	//alert(id);
	var batch = '<ows:Batch OnError="Return">';
	batch += '<Method ID="A1"><SetList>%Projects%</SetList><SetVar Name="ID">'+id+'</SetVar><SetVar Name="Cmd">Save</SetVar>'
	if(SiteTitleChanged){
	batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+$('input.Title').val()+'</SetVar>';
	}
	if($('input.ExternalLink').val()!= '' || $('input.ExternalLink').val()!= null){
	batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#ExternalLink">'+$('input.ExternalLink').val()+'</SetVar>';
	}	
	batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#ProjectSecurity">'+ $("#ProjectSecurity option:selected").val()+'</SetVar>';
	batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_"><![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>'+ $("#ProjectSecurity option:selected").val()+'</LookupDbStoreValue><LookupDisplayValue>'+ $("#ProjectSecurity option:selected").val()+'</LookupDisplayValue></Property></Properties>]]></SetVar>';
	batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Category">'+ $("#Category option:selected").val()+'</SetVar>';
	batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_1"><![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>'+ $("#Category option:selected").val()+'</LookupDbStoreValue><LookupDisplayValue>'+ $("#Category option:selected").val()+'</LookupDisplayValue></Property></Properties>]]></SetVar>';				
	batch +='</Method></ows:Batch>';

/*
alert(batch);
*/
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
			ProjectRender();
			if(NotSavedCloseCheck){CloseEditMain();}
			//$('#CharterSave').button( "option", "disabled", true );				
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
	
}
