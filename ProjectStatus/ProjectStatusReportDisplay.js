$(document).ready(function () {
	getData();

});

function getData()
{
	$.ajax({
		type: 'POST',
		url: CurrentSiteRoot+'/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { 'RequestType': 'BatchRequest',
		 		'ConfigFileLocation': '[SRA Root]/Resources/ProjectStatus/ProjectStatusReport.xml',
		 		'XsltLocation': '[SRA Root]/Resources/ProjectStatus/ProjectStatusReport.xslt',
		 		'OutputType': 'JSON'},
		cache: false,
		async: true,
		dataType:'json',
		success:function(json){
			var project = json.NewDataSet.Project;
			$('#ProjectTitle').html(project.ProjectTitle);
			$('#CharterGoalStatement').append((project.CharterGoalStatement != null ?project.CharterGoalStatement.replace(/\r\n|\r|\n/g,"<br />") : project.CharterGoalStatement));

			$('#KeyAccomplishments').append((project.KeyAccomplishments != null ? project.KeyAccomplishments.replace(/\r\n|\r|\n/g,"<br />") : project.KeyAccomplishments));
			$('#KeyUpcomingEvents').append((project.KeyUpcomingEvents != null ?project.KeyUpcomingEvents.replace(/\r\n|\r|\n/g,"<br />") : project.KeyUpcomingEvents));
			$('#KeyRisksIssues').append((project.KeyRisksIssues != null ?project.KeyRisksIssues.replace(/\r\n|\r|\n/g,"<br />"):project.KeyRisksIssues));
			
			var projectKPIsHTML = '<div class="projectKPI"><img title="'+project.KPI.leveltitle+'" class="projectStatusKPILevel" height="24" width="24" src="'+project.KPI.icon+'"/><span title="Overall projet status and health">Overall Project: '+project.ProjectStatus+'</span></div>';
			$.each(json.NewDataSet.KPIs.KPI, function(i,v){
				projectKPIsHTML += '<div class="projectKPI"><img title="'+v.leveltitle+'" class="projectStatusKPILevel" height="24" width="24" src="'+v.icon+'"/><span title="'+v.tip+'">'+v.value+'</span></div>'				
			});
			$('#projectKPIs').append(projectKPIsHTML);
			$('#busyLoader').hide();
			$('div.projectStatusReportDisplayWrapper').show();						
		},
		error: function(response) {alert("Error! - "+JSON.stringify(response));}
	});
}

/*

		data: { 'RequestType': 'BatchRequest',
		 		'ConfigFileLocation': '[SRA Root]/Resources/ProjectStatus/ProjectStatus.xml',
				'XsltLocation': '[SRA Root]/Resources/ProjectStatus/ProjectStatusReport.xslt'},
*/