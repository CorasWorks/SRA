var fromTaskSiteName = "";
var fromTaskSiteURL = "";
var fromTaskMilestoneName = "";
var fromTaskMilestoneID = "";
var fromTaskID = "";
var toTaskSiteName = "";
var toTaskSiteURL = "";
var toTaskMilestoneName = "";
var toTaskMilestoneID = "";
var toTaskID = "";
var snapshot1Chart;
var snapshot2Chart;


$(document).ready(function () {

SnapShotLoad();
});
function SnapShotLoad(){
$('#ProjectCompareMain').hide();
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/PPMFiles/Project/SnapshotSelectorCDB.xml',
			XsltLocation: '[SRA Root]/Resources/PPMFiles/Project/SnapshotSelector.xslt',
			OutputType : 'html'
		},
		success: function(html){
			$('#ProjectComparePicker').html(html);
			$('#ProjectCompareMain').show();
			//renderChart();			
			$('#busyLoader').hide();
			
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}


function renderChart()
{
	snapshot1Chart = new AnyGantt(SRARoot + '/Resources/PPMFiles/Project/AnyGantt.swf');
	snapshot1Chart.setLoading('Refreshing chart...');
    snapshot1Chart.width = 1050;
    snapshot1Chart.height = 250;
    snapshot1Chart.wMode = 'transparent';
   	snapshot1Chart.setXMLFile(siteLocation  + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetListItems&ListTitle=Tasks&TableName=Tasks&XsltLocation=[SRA Root]/Resources/PPMFiles/Project/ScheduleTrackingChart.xslt'); 
    snapshot1Chart.wMode = 'Transparent'; 
    snapshot1Chart.write('snap1');

	snapshot2Chart = new AnyGantt(SRARoot + '/Resources/PPMFiles/Project/AnyGantt.swf');
	snapshot2Chart.setLoading('Refreshing chart...');
    snapshot2Chart.width = 1050;
    snapshot2Chart.height = 250;
   	snapshot2Chart.setXMLFile(siteLocation + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetListItems&ListTitle=Tasks&TableName=Tasks&XsltLocation=[SRA Root]/Resources/PPMFiles/Project/ScheduleTrackingChart.xslt'); 
    snapshot2Chart.wMode = 'Transparent'; 
    snapshot2Chart.write('snap2');
}
function refreshChart()
{
var snapshot1 = '';
var snapshot2 = '';

	if (jQuery('#snapshot1').val() != '*')
	{
		snapshot1 = jQuery('#snapshot1').val();
    }
	if (jQuery('#snapshot2').val() != '*')
	{
		snapshot2 = jQuery('#snapshot2').val();
    }


LaunchProjectCompareNew(siteLocation + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetFileContents&FileUrl=[SRA Root]/Resources/PPMFiles/Project/ProjectComparePage.htm&OutputType=html&snapshot1='+snapshot1 +'&snapshot2='+snapshot2);
/*
	snapshot1Chart.setLoading('Refreshing chart...');
	snapshot2Chart.setLoading('Refreshing chart...');
	if (jQuery('#snapshot1').val() == '*')
	{
    	snapshot1Chart.setXMLFile(siteLocation + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetListItems&ListTitle=Tasks&TableName=Tasks&XsltLocation=[SRA Root]/Resources/PPMFiles/Project/ScheduleTrackingChart.xslt'); 
    }
    else
	{
    	snapshot1Chart.setXMLFile(siteLocation + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetFileContents&FileUrl=' + siteLocation + '/ScheduleSnapshots/' + jQuery('#snapshot1').val()+ '&XsltLocation=[SRA Root]/Resources/PPMFiles/Project/SnapshotCompareChart.xslt'); 
	
    	//snapshot1Chart.setXMLFile(siteLocation + '/AppPagesExtras/SnapshotCompare/Snapshot.aspx?SnapshotFile=' + siteLocation + '/ScheduleSnapshots/' + jQuery('#snapshot1').val()); 
    }
	if (jQuery('#snapshot2').val() == '*')
	{
    	snapshot2Chart.setXMLFile(siteLocation + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetListItems&ListTitle=Tasks&TableName=Tasks&XsltLocation=[SRA Root]/Resources/PPMFiles/Project/ScheduleTrackingChart.xslt'); 
    }
    else
	{
    	snapshot2Chart.setXMLFile(siteLocation + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetFileContents&FileUrl=' + siteLocation + '/ScheduleSnapshots/' + jQuery('#snapshot2').val()+ '&XsltLocation=[SRA Root]/Resources/PPMFiles/Project/SnapshotCompareChart.xslt'); 
	
    	//snapshot2Chart.setXMLFile(siteLocation + '/AppPagesExtras/SnapshotCompare/Snapshot.aspx?SnapshotFile=' + siteLocation + '/ScheduleSnapshots/' + jQuery('#snapshot2').val()); 
    }
*/    
}
function LaunchProjectCompareNew(URL) {
    var CWDialogOptions = {
        url: URL,
        title: 'Edit',
        allowMaximize: true,
        showMaximized:true,
        showClose: true,
        autoSize:true
        //dialogReturnValueCallback: CWDialogCloseStandAlonePagesRefresh
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}


