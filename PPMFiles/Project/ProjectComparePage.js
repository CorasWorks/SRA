var snapshot1Chart;
var snapshot2Chart;
var snapshot1ChartVAR = '';
var snapshot2ChartVAR = '';

$(document).ready(function () {

snapshot1ChartVAR = getParameterByName('snapshot1');
snapshot2ChartVAR  = getParameterByName('snapshot2');
ChartLoad();
});
function getParameterByName(ParamName)
{
    ParamName = ParamName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+ParamName+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
        {return "";}
    else
        {return decodeURIComponent(results[1].replace(/\+/g, " "));}
}

function ChartLoad()
{
	snapshot1Chart = new AnyGantt(SRARoot + '/Resources/PPMFiles/Project/AnyGantt.swf');
	snapshot1Chart.setLoading('Refreshing chart...');
    snapshot1Chart.width = 1050;
    snapshot1Chart.height = 500;
    snapshot1Chart.wMode = 'transparent';



	snapshot2Chart = new AnyGantt(SRARoot + '/Resources/PPMFiles/Project/AnyGantt.swf');
	snapshot2Chart.setLoading('Refreshing chart...');
    snapshot2Chart.width = 1050;
    snapshot2Chart.height = 500;
    snapshot2Chart.wMode = 'Transparent'; 

	if (snapshot1ChartVAR == '')
	{
    	snapshot1Chart.setXMLFile(siteLocation + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetListItems&ListTitle=Tasks&TableName=Tasks&XsltLocation=[SRA Root]/Resources/PPMFiles/Project/ScheduleTrackingChart.xslt'); 
    	snapshot1Chart.write('snap1');
    }
    else
	{
    	snapshot1Chart.setXMLFile(siteLocation + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetFileContents&FileUrl=' + siteLocation + '/ScheduleSnapshots/' + snapshot1ChartVAR + '&XsltLocation=[SRA Root]/Resources/PPMFiles/Project/SnapshotCompareChart.xslt'); 
    	snapshot1Chart.write('snap1');
    }
	if (snapshot2ChartVAR  == '')
	{
    	snapshot2Chart.setXMLFile(siteLocation + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetListItems&ListTitle=Tasks&TableName=Tasks&XsltLocation=[SRA Root]/Resources/PPMFiles/Project/ScheduleTrackingChart.xslt'); 
	    snapshot2Chart.write('snap2');
    }
    else
	{
    	snapshot2Chart.setXMLFile(siteLocation + '/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetFileContents&FileUrl=' + siteLocation + '/ScheduleSnapshots/' + snapshot2ChartVAR + '&XsltLocation=[SRA Root]/Resources/PPMFiles/Project/SnapshotCompareChart.xslt'); 
	    snapshot2Chart.write('snap2');	
    }

    
}


/*
function ForceDocDL(Origin,ItemURL)
{
	
	STSNavigate(Origin+'/_layouts/download.aspx?SourceURL=' + ItemURL);

}
function getParameterByName(ParamName)
{
    ParamName = ParamName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+ParamName+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
        {return "";}
    else
        {return decodeURIComponent(results[1].replace(/\+/g, " "));}
}
function LaunchProjectEdit(URL) {
    var CWDialogOptions = {
        url: URL,
        title: 'Edit',
        allowMaximize: true,
        showMaximized:true,
        showClose: false,
        autoSize:true,
        dialogReturnValueCallback: CWDialogCloseProjectEditRefresh
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}
function CWDialogCloseProjectEditRefresh()
{
		$('#ProjectCharterMain').hide();
		$('#busyLoader').show();
		Charterload();
}
function LaunchUploadDocument(URL) {
    var CWDialogOptions = {
        url: URL,
        title: 'Upload Document',
        allowMaximize: true,
        showClose: true,
        autoSize:true,
        dialogReturnValueCallback: CWDialogCloseUploadDocumentRefresh
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}
function CWDialogCloseUploadDocumentRefresh()
{
		$('#PCDocumentsShell').hide();
		$('#DocLoader').show();
		DocumentReload();
}
function DocumentReload(){
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/ProjectCharterV2/ProjectDocumentReload.xml',
			XsltLocation: '[SRA Root]/Resources/ProjectCharterV2/ProjectDocumentReload.xslt',
			Print: PrintParam,
			OutputType : 'html'
		},
		success: function(html){
			$('#PCDocumentsShell').html(html);
			var pagerOptions2 = {
					// target the pager markup - see the HTML block below
					container: $(".pagerPCDocuments"),
					// output string - default is '{page}/{totalPages}'
					// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
					// also {page:input} & {startRow:input} will add a modifiable input in place of the value
					//output: '{startRow:input} to {endRow} ({totalRows})',
					output: '{startRow} to {endRow} ({totalRows})',
					// starting page of the pager (zero based index)
					page: 0,		
					// Number of visible rows - default is 10
					size: 6,
					// Save pager page & size if the storage script is loaded (requires $.tablesorter.storage in jquery.tablesorter.widgets.js)
					savePages : true,
					//defines custom storage key
					storageKey:'tablesorter-pager',
					// if true, the table will remain the same height no matter how many records are displayed. The space is made up by an empty
					// table row set to a height to compensate; default is false
					fixedHeight: true,
					// remove rows from the table to speed up the sort of large tables.
					// setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
					removeRows: false,
					// css class names of pager arrows
					cssNext: '.next', // next page arrow
					cssPrev: '.prev', // previous page arrow
					cssFirst: '.first', // go to first page arrow
					cssLast: '.last', // go to last page arrow
					cssGoto: '.gotoPage', // select dropdown to allow choosing a page
					cssPageDisplay: '.pagedisplay', // location of where the "output" is displayed
					cssPageSize: '.pagesize', // page size selector - select dropdown that sets the "size" option
					// class added to arrows when at the extremes (i.e. prev/first arrows are "disabled" when on the first page)
					cssDisabled: 'disabled', // Note there is no period "." in front of this class name
					cssErrorRow: 'tablesorter-errorRow' // ajax error information row
				};
			$("#ProDocuments")
				// Initialize tablesorter
				.tablesorter({sortList: [[2,1]]} )		
				// bind to pager events
				.bind('pagerChange pagerComplete pagerInitialized pageMoved', function(e, c){
					var msg = '"</span> event triggered, ' + (e.type === 'pagerChange' ? 'going to' : 'now on') +
						' page <span class="typ">' + (c.page + 1) + '/' + c.totalPages + '</span>';
					$('#display')
						.append('<li><span class="str">"' + e.type + msg + '</li>')
						.find('li:first').remove();
				})	
				// initialize the pager plugin
				.tablesorterPager(pagerOptions2);
					
			$('#DocLoader').hide();
			$('#PCDocumentsShell').show();
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}
function LaunchStandAlonePages(URL) {
    var CWDialogOptions = {
        url: URL,
        title: 'Edit',
        allowMaximize: true,
        showMaximized:true,
        showClose: true,
        autoSize:true,
        dialogReturnValueCallback: CWDialogCloseStandAlonePagesRefresh
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}
function CWDialogCloseStandAlonePagesRefresh()
{
		$('#ProjectCharterMain').hide();
		$('#busyLoader').show();
		Charterload();
}
*/