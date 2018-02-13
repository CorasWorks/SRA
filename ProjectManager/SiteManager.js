var LoaderHTML = '<div id="busyLoader" style="text-align: center;">'
			    + '<h2 style="text-align:center">'
			    + '<span id="busySpinner"></span>'
			    + '<img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px">'
			    + '<br>'
			    + 'Loading...'
			    + '</h2>'
				+ '</div>';

var DeleteSiteID = '';
var DeleteSiteURL = '';
var DeleteSiteType = '';
var DeleteSiteGroup = '';
var RegionRecords = false;
$(document).ready(function () {
    $('#SiteManagerMain').tabs({
    		active: 0,
			beforeActivate: function( event, ui) {
				if(ui.newTab[0].innerText=='Manage Projects'){
						$('#ManageProjects').html(LoaderHTML);
					}		
			},
			activate: function( event, ui) {
				if(ui.newTab[0].innerText =='Manage Projects'){
						Projectload();
					}
			},
			create: function( event, ui ) {
				if(ui.tab[0].innerText =='Manage Projects'){
						$('#ManageProjects').html(LoaderHTML);
						Projectload();
					}
			}
	});
});
function Projectload(){
//$('#SiteManagerShell').hide();
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:'../../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/ProjectManager/ProjectManager.xml',
			XsltLocation: '[SRA Root]/Resources/ProjectManager/ProjectManager.xslt',
			OutputType : 'html'
		},
		success: function(html){
			$('#ManageProjects').html(html);
			
			
			var pagerOptions = {
					// target the pager markup - see the HTML block below
					container: $(".pagerProjectManager"),
					// output string - default is '{page}/{totalPages}'
					// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
					// also {page:input} & {startRow:input} will add a modifiable input in place of the value
					//output: '{startRow:input} to {endRow} ({totalRows})',
					output: '{startRow} to {endRow} ({totalRows})',									
					// starting page of the pager (zero based index)
					page: 0,		
					// Number of visible rows - default is 10
					size: 50,
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
			$("#ProjectManager")
				// Initialize tablesorter
				.tablesorter({
					//sortList: [[3,0]],
					widgets: ["filter"],
					widthFixed: true
					
				})
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
				//Projects
				$( ".ProjectEdit" ).unbind();
				$( ".ProjectEdit" ).button().click(function(event ) {
					event.preventDefault();
					var EditURL = SRARootCheck + '/Resources/ProjectEdit/ProjectEdit.aspx?ProjectSite='+$(this).data('url')+'&LoadedTab=0';
					parent.LaunchActionWithChange(EditURL , 'Edit Project - ' + $(this).data('title'), true, false);
				});
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}

