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


$(document).ready(function () {
var PrintParam = getParameterByName('Print');
Charterload();

});
function Charterload(){
$('#ProjectCharterMain').hide();
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/ProjectCharterV2/ProjectCharter.xml',
			XsltLocation: '[SRA Root]/Resources/ProjectCharterV2/ProjectCharterDisplay.xslt',
			Print: PrintParam,
			OutputType : 'html'
		},
		success: function(html){
			$('#ProjectCharterMain').html(html);
			//$('#ProContacts').tablesorter();
			//$('#ProMilestones').tablesorter();
			$('#ProjectCharterMain').show();
			/*
			$("#PCContacts h2, #PCMilestones h2").css({"cursor":"pointer"});
			
			$('#PCContacts h2').click(function() {
				window.location = 'teammembers.aspx?GUID=b1e5ee94-77ab-464e-dc95-1c8d8fe82226-183';
			});
			$('#PCMilestones h2').click(function() {
				window.location = 'ManageMilestones.aspx?GUID=49908cfe-bae5-49ca-ad56-835a91bff087-190';
			});			
			
			$('#PCContacts h2').click(function() {
				window.location = 'teammembers.aspx?GUID=b1e5ee94-77ab-464e-dc95-1c8d8fe82226-183';
			});
			*/
			$('#PCDisplayRoot').on('click','img.CharterEditIcon',function(){
				 LaunchProjectEdit($(this).data('url'));
			})
			$('#PCDisplayRoot').on('click','img.Hiddenpage',function(){
				 LaunchStandAlonePages($(this).data('url'));
				 //window.location=$(this).data('url');
			})
			$('#PCDisplayRoot').on('click','img.ApprovalViewIcon',function(){
				 LaunchStandAlonePages($(this).data('url'));
			});				
			var pagerOptions = {
					// target the pager markup - see the HTML block below
					container: $(".pagerPCContacts"),
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
				var pagerOptionsApprovals = {
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
					size: 3,
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
				var pagerOptionsMethodology = {
					// target the pager markup - see the HTML block below
					container: $(".pagerPCMethodology"),
					// output string - default is '{page}/{totalPages}'
					// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
					// also {page:input} & {startRow:input} will add a modifiable input in place of the value
					//output: '{startRow:input} to {endRow} ({totalRows})',
					output: '{startRow} to {endRow} ({totalRows})',
					// starting page of the pager (zero based index)
					page: 0,		
					// Number of visible rows - default is 10
					size: 3,
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

			
			$("#ProContacts")
				// Initialize tablesorter
				.tablesorter({sortList: [[0,0]]} )	
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
			$("#ProDocuments")
				// Initialize tablesorter
				//.tablesorter({sortList: [[2,1]]} )
				.tablesorter()		
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
			$("#ApprovalTable")
				// Initialize tablesorter
				.tablesorter({sortList: [[2,0]]} )		
				// bind to pager events
				.bind('pagerChange pagerComplete pagerInitialized pageMoved', function(e, c){
					var msg = '"</span> event triggered, ' + (e.type === 'pagerChange' ? 'going to' : 'now on') +
						' page <span class="typ">' + (c.page + 1) + '/' + c.totalPages + '</span>';
					$('#display')
						.append('<li><span class="str">"' + e.type + msg + '</li>')
						.find('li:first').remove();
				})	
				// initialize the pager plugin
				.tablesorterPager(pagerOptionsApprovals);
			$("#MethodologyTable")
				// Initialize tablesorter
				.tablesorter({sortList: [[1,1]]} )		
				// bind to pager events
				.bind('pagerChange pagerComplete pagerInitialized pageMoved', function(e, c){
					var msg = '"</span> event triggered, ' + (e.type === 'pagerChange' ? 'going to' : 'now on') +
						' page <span class="typ">' + (c.page + 1) + '/' + c.totalPages + '</span>';
					$('#display')
						.append('<li><span class="str">"' + e.type + msg + '</li>')
						.find('li:first').remove();
				})	
				// initialize the pager plugin
				.tablesorterPager(pagerOptionsMethodology);
					
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
		if(SiteTitleChangedMain){
			window.location = window.location;
			}
		else{
			Charterload();
			}
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
				//.tablesorter({sortList: [[2,1]]} )
				.tablesorter()			
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
