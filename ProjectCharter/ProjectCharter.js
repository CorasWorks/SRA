$(document).ready(function () {
Charterload();

});
function Charterload(){
$('#ProjectCharterMain').hide();
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:CurrentSiteRoot + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/ProjectCharter/ProjectCharter.xml',
			XsltLocation: '[SRA Root]/Resources/ProjectCharter/ProjectCharterDisplay.xslt',
			OutputType : 'html'
		},
		success: function(html){
			$('#ProjectCharterMain').html(html);
			//$('#ProContacts').tablesorter();
			//$('#ProMilestones').tablesorter();
			$('#ProjectCharterMain').show();
			$('#busyLoader').hide();
			/*
			$('#CreatePowerPoint').on('click','img.CreatePPT',function(){
				//$(this).addClass('ui-state-disabled');
				//$('#ButtonText').text('Building...');
				$("#ReportBuilding").dialog("open");	
				PPTBuild($(this).data('url'));
			
			});
			*/
			$('#CreatePowerPoint').click(function(){
				//$(this).addClass('ui-state-disabled');
				//$('#ButtonText').text('Building...');
				$("#ReportBuilding").dialog("open");	
				PPTBuild($(this).data('url'));
			
			});
			$('#PrintReport').click(function(){
				PrintReport();
			
			});
			
			$("#ReportDone").dialog({
		      autoOpen: false,
		      modal: true,
				buttons : {
				        "Ok" : function() {
					        $(this).dialog("close");
				        }
				      }           
		    }); 
			$("#ReportBuilding").dialog({
		      autoOpen: false,
		      modal: true     
		    });
		    $('div[aria-describedby="ReportBuilding"] button[title="close"]').hide();			

		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}
function PrintReport(){
window.print();
}
function PPTBuild(url){
		$.ajax({
			type:'POST',
			dataType: 'xml',
			cache: false,
			async: true,
			url: url,
			complete:function(xml) {
				if (xml.responseText.indexOf('Presentation Created') != -1){
					//$('#ButtonText').text('worked');
					GetNewFile();
				}
				else{
				//Error space
				}		
				$('#CreatePowerPoint img.CreatePPT').removeClass('ui-state-disabled');
			}
		});

}
function GetNewFile(){
var Caml = '<Query><Where><Contains><FieldRef Name="FileLeafRef"/><Value Type="File">';
	Caml += CurrentFileBuildname;
	Caml += '</Value></Contains></Where></Query><QueryOptions><DateInUtc>False</DateInUtc></QueryOptions><RowLimit>1</RowLimit>';



	$.ajax({
		 type:'POST',
         dataType:'json',
         url: SARRoot + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'GetListItems',
			TableName: 'Documents',
			ListTitle: 'Documents',
			CAML: Caml,
			//SiteUrl: URL,
			OutputType : 'json'
		},
		cache: false,
		async : true,	
		success: function(json){
				if (json.NewDataSet.Documents.listitems['rs:data'].ItemCount == 1) {
							WriteFileBackLocal(json.NewDataSet.Documents.listitems['rs:data']['z:row'].ows_EncodedAbsUrl);
							//AppDesignOBJ = $.parseJSON(json.NewDataSet.ApplicationConfig.listitems['rs:data']['z:row'].ows_ApplicationJSON);
							//AppDesignID = json.NewDataSet.ApplicationConfig.listitems['rs:data']['z:row'].ows_ID;
					}
				else{
					$("#ReportBuilding").dialog("close");
					$("#ReportDone").html('Unable to find new report. Please contact IT.');
					$("#ReportDone").dialog("open");		
				}	
		
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});

}
function WriteFileBackLocal(FileURL){

	$.ajax({
		 type:'POST',
         dataType:'json',
         url: CurrentSiteRoot + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'CopyFile',
			NewFileName: CurrentFileBuildnameNew,
			//NewFileName: 'zzz.ppt',
			ListTitle: 'Documents',
			DeleteSource: 'true',
			Overwrite: 'true',
			SourceFileUrl: FileURL,
			//SiteUrl: URL,
			OutputType : 'json'
		},
		cache: false,
		async : true,
		complete: function(){
			$("#ReportBuilding").dialog("close");
			$("#ReportDone").html("Your report has been built and added to this project's document Library.");
			$("#ReportDone").dialog("open");	
		}		
		/*	
		success: function(json){
		},
		error : function (xhr, status, error) {
			//alert("Error:\n" + xhr.responseText);
		}
		$("#ReportBuilding").dialog("open");
		*/
	});

}
