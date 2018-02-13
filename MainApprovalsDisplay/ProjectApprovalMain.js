var PrintParam = '';
var LoaderHTML = '<div id="busyLoader" style="text-align: center;">'
			    + '<h2 style="text-align:center">'
			    + '<span id="busySpinner"></span>'
			    + '<img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px">'
			    + '<br>'
			    + 'Loading...'
			    + '</h2>'
			    //+ "Don't refresh the page, just wait patiently please"
				+ '</div>';
var pagerOptions = {
		// target the pager markup - see the HTML block below
		container: $(".pagerPCApprovals"),
		// output string - default is '{page}/{totalPages}'
		// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
		// also {page:input} & {startRow:input} will add a modifiable input in place of the value
		//output: '{startRow:input} to {endRow} ({totalRows})',
		output: '{startRow} to {endRow} ({totalRows})',									
		// starting page of the pager (zero based index)
		page: 0,		
		// Number of visible rows - default is 10
		size: 1,
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


$(document).ready(function () {
Approvalload();

});
function Approvalload(){
$('#ProjectApprovalsMain').hide();
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/MainApprovalsDisplay/ProjectApprovalSites.xml',
			XsltLocation: '[SRA Root]/Resources/MainApprovalsDisplay/ProjectApprovalsReturnGrid.xslt',
			OutputType : 'html'
		},
		success: function(html){
			$('#ProjectApprovalsMain').html(html);
			$("#ApprovalTable").tablesorter({
				sortList: [[2,0]],
				widgets: ["filter"],
				widthFixed: true,
				
			});
			/*
			$("#ApprovalTable")
				// Initialize tablesorter
				.tablesorter({
				sortList: [[3,0]]
				widgets: ["filter"],
				widthFixed: true,

				});
					
					
				// bind to pager events
				.bind('pagerChange pagerComplete pagerInitialized pageMoved', function(e, c){
					var msg = '"</span> event triggered, ' + (e.type === 'pagerChange' ? 'going to' : 'now on') +
						' page <span class="typ">' + (c.page + 1) + '/' + c.totalPages + '</span>';
					$('#display')
						.append('<li><span class="str">"' + e.type + msg + '</li>')
						.find('li:first').remove();
				})	
				// initialize the pager plugin
				.tablesorterPager(pagerOptions);
			*/

			$('#ProjectApprovalsMain').on('click','img.ApprovalEditIcon',function(){
				 LaunchProjectApproval($(this).data('url'));
			});
			$('#ProjectApprovalsMain').on('click','img.ApprovalViewIcon',function(){
				 LaunchProjectApprovalView($(this).data('url'));
			});			
			$('#ProjectApprovalsMain').show();				
			$('#busyLoader').hide();
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}

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
function LaunchProjectApproval(URL) {
    var CWDialogOptions = {
        url: URL,
        title: 'Edit',
        allowMaximize: true,
        showClose: true,
        autoSize:true,
        dialogReturnValueCallback: CWDialogCloseProjectApprovalRefresh
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}
function LaunchProjectApprovalView(URL) {
    var CWDialogOptions = {
        url: URL,
        title: 'View',
        allowMaximize: true,
        showClose: true,
        showMaximized:true,
        autoSize:true
        //dialogReturnValueCallback: CWDialogCloseProjectApprovalRefresh
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}

function CWDialogCloseProjectApprovalRefresh()
{
	SP.UI.ModalDialog.commonModalDialogClose();
	Approvalload();
	$('#busyLoader').show();
	
}
function refreshGrid()
{
	var masterTable = $find(GetMyIDCorasWorksGrid()).get_masterTableView();       
	masterTable.rebind();    
}
