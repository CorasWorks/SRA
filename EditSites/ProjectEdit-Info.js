var SiteTitleChanged = false;
var ProjectIDCurrent = '';
var LocationTotal = 1;
var locationCurrentTotal = 0;
var RegionDivTotal = 1;
var RegionDivCurrentTotal = 0;


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
	$('#ProjectSave').button({icons: {secondary: "ui-icon-circle-check"}}).click(function (event) {
        event.preventDefault();
        ProjectIDCurrent = $(this).data('id');
        if(SiteTitleChanged){
        	if ($('input.Title').val() != ''){
        		if ($("input.Title").val().match("'")||$("input.Title").val().match('"')||$("input.Title").val().match('&')){
        			$("#ProjectErrorIllegal").dialog("open");
	        		}
	        	else{
	        		if(SiteEditOnly){
	        			saveProject(ProjectIDCurrent);
	        			}
	        		else{
	        			updateWebSite(ProjectSiteURL);
	        			saveProject(ProjectIDCurrent);
	        			}
			        $('#ProjectReload').show();
			        $('#ProjectBody').hide();
					}	
        		}
        	else{
        		$("#ProjectError").dialog("open");
				}	
        	}
        else{
	        	saveProject(ProjectIDCurrent);
		        $('#ProjectReload').show();
		        $('#ProjectBody').hide();        
        	}	
    });
	$('#ProjectBody input.Title').keyup(function() {
		$('#ProjectSave').button( "option", "disabled", false );
		SiteTitleChanged = true;
		NotSavedCheck = true;    	
	});	
	$('#ProjectBody').on('change','.Active',function(){
		$('#ProjectSave').button( "option", "disabled", false );
		NotSavedCheck = true;    	
	});
});
function updateWebSite(SiteURL) {
	//console.log(SiteURL);
    var clientContext = new SP.ClientContext(SiteURL);
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
	//saveProject(ProjectIDCurrent);       
}    
function onQueryFailed(sender, args) {
	//SiteTitleChanged = false;
	//saveProject(ProjectIDCurrent);        
}
function saveProject(id)
{
	var Active = (($('input.Active').is(":checked")) ? 1 : 0);
	var batch = '<ows:Batch OnError="Return">';
	batch += '<Method ID="A1"><SetList>%'+SiteType +'%</SetList><SetVar Name="ID">'+id+'</SetVar><SetVar Name="Cmd">Save</SetVar>'
	if(SiteTitleChanged){
	batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">'+$('input.Title').val()+'</SetVar>';
	}
	batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Active">'+ Active +'</SetVar>';
	batch +='</Method></ows:Batch>';

/*
alert(batch);
*/
	$.ajax({
		type: 'POST',
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: SiteType,
		 		SiteUrl: '[SRA Root]',
				Batch: batch,
				OutputType: 'json' },
		dataType: 'json',
		cache: false,
		async: true,
		success:function(json){
			//NotSavedCheck = false;
			//SiteRender();
			if(SiteType == 'Locations'){
					ProjectNameChange(id, $('input.Title').val())
				}
			else if(SiteType == 'Divisions-Regions'){
					LocationNameChange(id, $('input.Title').val())
				}	
			else if(SiteType == 'Divisions'){
					RegionNameChange(id, $('input.Title').val())
				}
			else if(SiteType == 'Regions'){
					RegionBaseNameChange(id, $('input.Title').val())
				} 	        
		},
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
	
}
function RegionBaseNameChange(id, RegBaseName)
{

		$.ajax({
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data : {
				RequestType : 'BatchRequest',
				ConfigFileLocation: '[SRA Root]/Resources/EditSites/RegionsBase.xml',
				PIDValue: id, 
				OutputType : 'json'
			},
			success: function(json){
					var batch = '';
					//console.log(json);
					//debugger;
					if (json.NewDataSet.Regions.listitems["rs:data"].ItemCount == 0){
							NotSavedCheck = false;
							SiteRender();
					}else if (json.NewDataSet.Regions.listitems["rs:data"].ItemCount == 1){
						batch = '<ows:Batch OnError="Return">';
						batch += '<Method ID="A1"><SetList>%Divisions-Regions%</SetList><SetVar Name="ID">'+json.NewDataSet.Regions.listitems["rs:data"]["z:row"].ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
						batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Region">'+ RegBaseName+'</SetVar>';
						batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_0"><![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>'+ RegBaseName+'</LookupDbStoreValue><LookupDisplayValue>'+ RegBaseName+'</LookupDisplayValue></Property></Properties>]]></SetVar>';
						batch +='</Method></ows:Batch>';
						BatchWrite('Divisions-Regions', batch, true);
						updateWebSite(json.NewDataSet.Regions.listitems["rs:data"]["z:row"].ows_URL);
						LocationNameChange(json.NewDataSet.Regions.listitems["rs:data"]["z:row"].ows_ID, RegBaseName);
					}					
					else{
						batch = '<ows:Batch OnError="Return">';
						$.each(json.NewDataSet.Regions.listitems["rs:data"]["z:row"],function(index,item){				
							batch += '<Method ID="A'+index+'"><SetList>%Divisions-Regions%</SetList><SetVar Name="ID">'+item.ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
							batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Region">'+ RegBaseName+'</SetVar>';
							batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_0"><![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>'+ RegBaseName+'</LookupDbStoreValue><LookupDisplayValue>'+ RegBaseName+'</LookupDisplayValue></Property></Properties>]]></SetVar>';
							LocationNameChange(item.ows_ID, RegBaseName);
							updateWebSite(item.ows_URL);
			        		batch += '</Method>';
			        	});
						batch +='</ows:Batch>';
						BatchWrite('Divisions-Regions', batch, true);			        	
					}

			},
			error : function (xhr, status, error) {
				alert("Error:\n" + xhr.responseText);
			}
	
		});	


}

function RegionNameChange(id, DivName)
{

		$.ajax({
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data : {
				RequestType : 'BatchRequest',
				ConfigFileLocation: '[SRA Root]/Resources/EditSites/Regions.xml',
				PIDValue: id, 
				OutputType : 'json'
			},
			success: function(json){
					var batch = '';
					RegionDivTotal += json.NewDataSet.Regions.listitems["rs:data"].ItemCount;
					if (json.NewDataSet.Regions.listitems["rs:data"].ItemCount == 0){
							NotSavedCheck = false;
							SiteRender();
					}else if (json.NewDataSet.Regions.listitems["rs:data"].ItemCount == 1){
						batch = '<ows:Batch OnError="Return">';
						batch += '<Method ID="A1"><SetList>%Divisions-Regions%</SetList><SetVar Name="ID">'+json.NewDataSet.Regions.listitems["rs:data"]["z:row"].ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
						batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Division">'+ DivName+'</SetVar>';
						batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_1"><![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>'+ DivName+'</LookupDbStoreValue><LookupDisplayValue>'+ DivName+'</LookupDisplayValue></Property></Properties>]]></SetVar>';
						batch +='</Method></ows:Batch>';
						BatchWrite('Divisions-Regions', batch, true);
						LocationNameChange(json.NewDataSet.Regions.listitems["rs:data"]["z:row"].ows_ID, json.NewDataSet.Regions.listitems["rs:data"]["z:row"].ows_Region, DivName);
					}					
					else{
						batch = '<ows:Batch OnError="Return">';
						$.each(json.NewDataSet.Regions.listitems["rs:data"]["z:row"],function(index,item){				
							batch += '<Method ID="A'+index+'"><SetList>%Divisions-Regions%</SetList><SetVar Name="ID">'+item.ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
							batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Division">'+ DivName+'</SetVar>';
							batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_1"><![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>'+ DivName+'</LookupDbStoreValue><LookupDisplayValue>'+ DivName+'</LookupDisplayValue></Property></Properties>]]></SetVar>';
							LocationNameChange(item.ows_ID, item.ows_Region, DivName);
			        		batch += '</Method>';
			        	});
						batch +='</ows:Batch>';
						BatchWrite('Divisions-Regions', batch, true);			        	
					}

			},
			error : function (xhr, status, error) {
				alert("Error:\n" + xhr.responseText);
			}
	
		});	


}
function LocationNameChange(id, RegName, DivName)
{

		$.ajax({
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data : {
				RequestType : 'BatchRequest',
				ConfigFileLocation: '[SRA Root]/Resources/EditSites/Locations.xml',
				PIDValue: id, 
				OutputType : 'json'
			},
			success: function(json){
			//console.log(json);
					var batch = '';
					LocationTotal += json.NewDataSet.Locations.listitems["rs:data"].ItemCount;
					RegionDivCurrentTotal++;
					if (json.NewDataSet.Locations.listitems["rs:data"].ItemCount == 0){
						if(RegionDivCurrentTotal==RegionDivTotal){
							NotSavedCheck = false;
							SiteRender();
						}
					}else if (json.NewDataSet.Locations.listitems["rs:data"].ItemCount == 1){
						batch = '<ows:Batch OnError="Return">';
						batch += '<Method ID="A1"><SetList>%Locations%</SetList><SetVar Name="ID">'+json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
						batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#DivisionRegion">'+ RegName+'</SetVar>';
						if(DivName != '' && DivName != null && DivName !== 'undefined'){batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Division">'+ DivName+'</SetVar>';}
						batch +='</Method></ows:Batch>';
						BatchWrite('Locations', batch, true);
						ProjectNameChange(json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_ID, json.NewDataSet.Locations.listitems["rs:data"]["z:row"].ows_Title, RegName, DivName);
					}					
					else{
						batch = '<ows:Batch OnError="Return">';
						$.each(json.NewDataSet.Locations.listitems["rs:data"]["z:row"],function(index,item){				
							batch += '<Method ID="A'+index+'"><SetList>%Locations%</SetList><SetVar Name="ID">'+item.ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
							batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#DivisionRegion">'+ RegName+'</SetVar>';
							if(DivName != '' && DivName != null && DivName !== 'undefined'){batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Division">'+ DivName+'</SetVar>';}							
							ProjectNameChange(item.ows_ID, item.ows_Title, RegName, DivName);
			        		batch += '</Method>';
			        	});
						batch +='</ows:Batch>';
						BatchWrite('Locations', batch, true);			        	
					}

			},
			error : function (xhr, status, error) {
				alert("Error:\n" + xhr.responseText);
			}
	
		});	


}

function ProjectNameChange(id, LocName, RegName, DivName)
{

		$.ajax({
	        dataType: 'json',
	        async: true,
	        cache: false,
	        type: 'POST',
	        url:ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data : {
				RequestType : 'BatchRequest',
				ConfigFileLocation: '[SRA Root]/Resources/EditSites/Projects.xml',
				PIDValue: id, 
				OutputType : 'json'
			},
			success: function(json){
					//debugger;
					var batch = '';
					locationCurrentTotal++;
					if (json.NewDataSet.Projects.listitems["rs:data"].ItemCount == 0){
						if(locationCurrentTotal==LocationTotal){
							NotSavedCheck = false;
							SiteRender();
						}
					}
					else if (json.NewDataSet.Projects.listitems["rs:data"].ItemCount == 1){
						batch = '<ows:Batch OnError="Return">';
						batch += '<Method ID="A1"><SetList>%Projects%</SetList><SetVar Name="ID">'+json.NewDataSet.Projects.listitems["rs:data"]["z:row"].ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
						batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Location">'+ LocName +'</SetVar>';
						if(DivName != '' && DivName != null && DivName !== 'undefined'){batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Division">'+ DivName+'</SetVar>';}
						if(RegName != '' && RegName != null && RegName !== 'undefined'){batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Region">'+ RegName+'</SetVar>';}						
						batch +='</Method></ows:Batch>';
						var Finalwrite = ((locationCurrentTotal==LocationTotal) ? true : false);
						BatchWrite('Projects', batch, Finalwrite);
					}					
					else{
						batch = '<ows:Batch OnError="Return">';
						$.each(json.NewDataSet.Projects.listitems["rs:data"]["z:row"],function(index,item){				
							batch += '<Method ID="A'+index+'"><SetList>%Projects%</SetList><SetVar Name="ID">'+item.ows_ID+'</SetVar><SetVar Name="Cmd">Save</SetVar>';
							batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Location">'+ LocName +'</SetVar>';
							if(DivName != '' && DivName != null && DivName !== 'undefined'){batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Division">'+ DivName+'</SetVar>';}
							if(RegName != '' && RegName != null && RegName !== 'undefined'){batch += '<SetVar Name="urn:schemas-microsoft-com:office:office#Region">'+ RegName+'</SetVar>';}						
			        		batch += '</Method>';
			        	});
						batch +='</ows:Batch>';
						var Finalwrite = ((locationCurrentTotal==LocationTotal) ? true : false);
						BatchWrite('Projects', batch, Finalwrite);			        	
					}

			},
			error : function (xhr, status, error) {
				alert("Error:\n" + xhr.responseText);
			}
	
		});	


}
function BatchWrite(list, batch, lastset)
{
	$.ajax({
		type: 'POST',
		url: ProjectSiteURL+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: list,
		 		SiteUrl: '[SRA Root]',
				Batch: batch,
				OutputType: 'json' },
		dataType: 'json',
		cache: false,
		async: true,
		success:function(json){
			if(lastset){
				NotSavedCheck = false;
				SiteRender();
			}
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}
	});
	
}

