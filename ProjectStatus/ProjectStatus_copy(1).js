

$(document).ready(function () {
	$('div.closeAddKPIs').on('click',function(){
		$('.projectStatusAvailableKPIsWrapper').hide();
	})
	getData();
	$('#projectStatusSelect').on('change',function(){
		my.projectVM.ProjectStatusID($(this).val());
		my.projectVM.ProjectKPI.status($("#projectStatusSelect option:selected").text());

		console.log(my.projectVM.ProjectStatusID()+' - '+my.projectVM.ProjectKPI.status());
	});

});

function getData()
{
	$.ajax({
		type: 'POST',
		url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { 'RequestType': 'BatchRequest',
		 		'ConfigFileLocation': '[SRA Root]/Resources/ProjectStatus/ProjectStatus.xml',
				'XsltLocation': '[SRA Root]/Resources/ProjectStatus/ProjectStatus.xslt',
				'OutputType': 'JSON'},
		cache: false,
		async: true,
		dataType:'json',
		success:function(json){
			var project = json.NewDataSet.Project;
			my.projectVM.canEdit(json.NewDataSet.ProjectEditor);
			my.historyUpdates = (json.NewDataSet.History.Update == null)?0:(json.NewDataSet.History.Update instanceof Array)? json.NewDataSet.History.Update: [json.NewDataSet.History.Update];
			my.KPILevels = json.NewDataSet.KPILevelLookups;
			my.projectVM.maxChars(project.MaxChars);			

			my.projectVM.ProjectID = project.ProjectID;
			my.projectVM.ProjectStatusID(project.ProjectStatusID);		
			project.KeyAccomplishments != null ? my.projectVM.KeyAccomplishments(project.KeyAccomplishments) : my.projectVM.KeyAccomplishments(my.narrativeTip);	
			project.KeyUpcomingEvents != null ? my.projectVM.KeyUpcomingEvents(project.KeyUpcomingEvents) : my.projectVM.KeyUpcomingEvents(my.narrativeTip);		
			project.KeyRisksIssues != null ? my.projectVM.KeyRisksIssues(project.KeyRisksIssues) : my.projectVM.KeyRisksIssues(my.narrativeTip);
			
			
			my.projectVM.ProjectKPI.status(project.ProjectStatus);
			my.projectVM.ProjectKPI.level(project.KPI.level);
			my.projectVM.ProjectKPI.levelID(project.KPI.levelID);
			my.projectVM.ProjectKPI.icon(project.KPI.icon);
			my.projectVM.ProjectKPI.title(project.KPI.leveltitle);

			$.each(json.NewDataSet.StatusLookups.Status, function(i,v){
				var thisOption =  $('<option>', {
                    value: v.statusID,
 	                text: v.value                   
                });
                my.projectVM.ProjectStatusID() == v.statusID ? (thisOption.attr('selected','selected')): null;
                $('#projectStatusSelect').append(thisOption);

			});

			$.each(json.NewDataSet.KPIs.KPI, function(i,v){
				my.projectVM.kpis.push(
					{name: v.value, 
					kpiID: ko.observable(v.kpiID), 
					Cmd: 'Save',
					categoryID: v.categoryID,
					tip: v.tip,
					levelID: ko.observable(v.levelID), 
					level: ko.observable(v.level), 
					icon: ko.observable(v.icon),
					lock: v.lock});
					
			});
			if(json.NewDataSet.KPICategoryLookups){
				$.each(json.NewDataSet.KPICategoryLookups.KPICategory, function(i,v){
					my.projectVM.availableKpis.push(
						{name: v.value,
						categoryID: v.categoryID, 
						tip: v.tip,
						kpiID: ko.observable('New'),
						Cmd: 'Save', 
						levelID: ko.observable(my.KPILevels.KPILevel[0].levelID), 
						level: ko.observable(my.KPILevels.KPILevel[0].level), 
						icon: ko.observable(my.KPILevels.KPILevel[0].icon),
						lock: '0'});
				});
			}
			if(my.historyUpdates != 0 ){
				$.each(my.historyUpdates,function(item,update){
					var v = $.parseJSON(update);
					my.projectVM.history.push(
					{WhoWhen:v.WhoWhen,
					KeyAccomplishments:v.KeyAccomplishments,
					KeyUpcomingEvents:v.KeyUpcomingEvents,
					KeyRisksIssues:v.KeyRisksIssues,
					ProjectKPI:{
						status:'Overall Project: '+v.ProjectStatus,
						level:v.KPI.level,
						icon:v.KPI.icon,
						title:v.KPI.leveltitle
					},
					
					kpis:ko.observableArray(v.KPIs.KPI)
					});
				});
			}
			my.projectVM.allowUpdate(true);
		},
		error: function(response) {alert("Error getting data! - "+JSON.stringify(response));}
	});
}

function saveData(KeyStatusText,KPIUpdate )
{

	$.ajax({
		type: 'POST',
		url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { 'RequestType': 'BatchRequest',
		 		'ConfigFileLocation': '[SRA Root]/Resources/ProjectStatus/saveProjectStatus.xml',
		 		'KeyStatusText':KeyStatusText,
		 		'KPIUpdate': KPIUpdate,
				'OutputType': 'JSON'},
		cache: false,
		async: true,
		dataType:'json',
		success:function(json){
			writeHistory();
		},
		error: function(response) {alert("Error!");}
	});
}
function writeHistory()
{
	$.ajax({
		type: 'POST',
		url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { 'RequestType': 'BatchRequest',
		 		'ConfigFileLocation': '[SRA Root]/Resources/ProjectStatus/ProjectStatus.xml',
				'XsltLocation': '[SRA Root]/Resources/ProjectStatus/ProjectStatusHistory.xslt',
				'OutputType': 'JSON'},
		cache: false,
		async: true,
		dataType:'json',
		success:function(json){
			saveHistory(JSON.stringify(json.Update));
			var v = json.Update;
			my.projectVM.history.unshift(
				{WhoWhen:v.WhoWhen,
				KeyAccomplishments:v.KeyAccomplishments,
				KeyUpcomingEvents:v.KeyUpcomingEvents,
				KeyRisksIssues:v.KeyRisksIssues,
				ProjectKPI:{
					status:'Overall Project: '+v.ProjectStatus,
					level:v.KPI.level,
					icon:v.KPI.icon,
					title:v.KPI.leveltitle
				},
				kpis:ko.observableArray(v.KPIs.KPI)
			});
			getNewKPIIDs();
		}
	});
}
function saveHistory(history)
{
	$.ajax({
		type: 'POST',
		url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { 'RequestType': 'BatchRequest',
		 		'ConfigFileLocation': '[SRA Root]/Resources/ProjectStatus/projectStatusHistory.xml',
		 		'StatusUpdate': history},
		cache: false,
		async: true
	});
}
function getNewKPIIDs()
{
	$.ajax({
		type: 'POST',
		url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { 'RequestType': 'GetListItems',
		 		'ListTitle': 'ProjectKPIs',
		 		'OutputType': 'JSON'},
		dataType:'json',
		cache: false,
		async: true,
		success:function(json){
			$.each(json.NewDataSet.GetListItems.listitems['rs:data']['z:row'], function(i,v){
				var myNewKPI = ko.utils.arrayFilter(my.projectVM.kpis(), function(kpi) {
		            return kpi.kpiID() == 'New' && kpi.categoryID == v.ows_ProjectKPICategory;
		        });
		        myNewKPI[0] ? myNewKPI[0].kpiID(v.ows_ID) : false;
			});
			my.projectVM.allowUpdate(true);
		}

	});
}


