$(document).ready(function () {
	getData();

});

function getData()
{
	$.ajax({
		type: 'POST',
		url: CurrentSiteRoot+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { 'RequestType': 'BatchRequest',
		 		'ConfigFileLocation': '[SRA Root]/Resources/tollgate/tollgatereport.xml',
		 		'XsltLocation': '[SRA Root]/Resources/tollgate/tollgatereport.xslt',
		 		'OutputType': 'JSON'},
		cache: false,
		async: true,
		dataType:'json',
		success:function(json){
			var project = json.NewDataSet.Project;
			
			var projectKPIsHTML = '<div class="projectKPI"><img title="'+project.KPI.leveltitle+'" class="tollgateKPILevel" height="24" width="24" src="'+project.KPI.icon+'"/><span title="Overall project status and health">Overall Project: '+project.ProjectStatus+'</span></div>';
			$.each(json.NewDataSet.KPIs.KPI, function(i,v){
				projectKPIsHTML += '<div class="projectKPI"><img title="'+v.leveltitle+'" class="tollgateKPILevel" height="24" width="24" src="'+v.icon+'"/><span title="'+v.tip+'">'+v.value+'</span></div>'				
			});
			$('#projectKPIs').append(projectKPIsHTML);
			$('#busyLoader').hide();
			$('div.tollgateReportDisplayWrapper').show();						
		},
		error: function(response) {alert("Error! - "+JSON.stringify(response));}
	});
}

/*

		data: { 'RequestType': 'BatchRequest',
		 		'ConfigFileLocation': '[SRA Root]/Resources/tollgate/tollgate.xml',
				'XsltLocation': '[SRA Root]/Resources/tollgate/tollgatereport.xslt'},
*/