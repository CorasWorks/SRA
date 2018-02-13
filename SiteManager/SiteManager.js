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
	//Sitesload();	
	$("#DeleteCheck").dialog({ 
      autoOpen: false,
      modal: true,   	 
	  buttons : {
        "Yes" : function() {
	        DeleteSiteRecord( DeleteSiteType, DeleteSiteID,  DeleteSiteURL, DeleteSiteGroup);
	        $(this).dialog("close");
        },
        "No" : function() {
	        $(this).dialog("close");
          
        }
      } 
    });            
	$( ".NewDivision" ).button().click(function(event ) {
		event.preventDefault();
		LaunchActionWithChange($(this).data('url'), 'Create New Division', false, true);
	});
	$( ".NewRegion" ).button().click(function(event ) {
		event.preventDefault();
		LaunchActionWithChange($(this).data('url'), 'Create New Region', false, true);
	});
	$( ".NewRegionDivision" ).button().click(function(event ) {
		event.preventDefault();
		LaunchActionWithChange($(this).data('url'), 'Create New Region-Division', false, true);
	});
	$( ".NewLocation" ).button().click(function(event ) {
		event.preventDefault();
		LaunchActionWithChange($(this).data('url'), 'Create New Location', true, true);
	});


    $('#SiteManagerMain').tabs({
    		active: 0,
			beforeActivate: function( event, ui) {
				if(ui.newTab[0].innerText=='Manage Divisions'){
						$('#ManageSites').html(LoaderHTML);
					}
				else if(ui.newTab[0].innerText=='Manage Regions'){
						$('#ManageRegions').html(LoaderHTML);
					}	
				else if(ui.newTab[0].innerText=='Manage Region-Divisions'){
						$('#ManageDivReg').html(LoaderHTML);
					}	
				else if(ui.newTab[0].innerText=='Manage Locations'){
						$('#ManageLocations').html(LoaderHTML);
					}	
				else if(ui.newTab[0].innerText=='Manage Projects'){
						$('#ManageProjects').html(LoaderHTML);
					}	
				else if(ui.newTab[0].innerText=='Projects to Delete'){
						$('#ProjectsDelete').html(LoaderHTML);
					}	
			},
			activate: function( event, ui) {
				if(ui.newTab[0].innerText == 'Manage Divisions'){
						Sitesload();
					}
				else if(ui.newTab[0].innerText =='Manage Regions'){
						Regionsload();
					}
				else if(ui.newTab[0].innerText =='Manage Region-Divisions'){
						DivRegload();
					}
				else if(ui.newTab[0].innerText =='Manage Locations'){
						Locationload();
					}
				else if(ui.newTab[0].innerText =='Manage Projects'){
						Projectload();
					}
				else if(ui.newTab[0].innerText =='Projects to Delete'){
						ProjectDeleteload();
					}
			},
			create: function( event, ui ) {
				if(ui.tab[0].innerText == 'Manage Divisions'){
						$('#ManageSites').html(LoaderHTML);
						Sitesload();
					}
				else if(ui.tab[0].innerText =='Manage Regions'){
						$('#ManageRegions').html(LoaderHTML);
						Regionsload();
					}
				else if(ui.tab[0].innerText =='Manage Region-Divisions'){
						$('#ManageDivReg').html(LoaderHTML);
						DivRegload();
					}
				else if(ui.tab[0].innerText =='Manage Locations'){
						$('#ManageLocations').html(LoaderHTML);
						Locationload();
					}
				else if(ui.tab[0].innerText =='Manage Projects'){
						$('#ManageProjects').html(LoaderHTML);
						Projectload();
					}
				else if(ui.tab[0].innerText =='Projects to Delete'){
						$('#ProjectsDelete').html(LoaderHTML);
						ProjectDeleteload();
					}
			},

	});
});
function Sitesload(){
//$('#SiteManagerShell').hide();
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/SiteManager/SiteManager.xml',
			XsltLocation: '[SRA Root]/Resources/SiteManager/SiteManager.xslt',
			OutputType : 'html'
		},
		success: function(html){
			$('#ManageSites').html(html);
			
			
			var pagerOptions = {
					// target the pager markup - see the HTML block below
					container: $(".pagerSiteManager"),
					// output string - default is '{page}/{totalPages}'
					// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
					// also {page:input} & {startRow:input} will add a modifiable input in place of the value
					//output: '{startRow:input} to {endRow} ({totalRows})',
					output: '{startRow} to {endRow} ({totalRows})',									
					// starting page of the pager (zero based index)
					page: 0,		
					// Number of visible rows - default is 10
					size: 25,
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
			$("#SiteManager")
				// Initialize tablesorter
				.tablesorter({
					//sortList: [[3,0]],
					widgets: ["filter"],
					widthFixed: true,
					
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
				//Divisions
				$( ".DivisionActivate" ).unbind();
				$( ".DivisionActivate" ).button().click(function(event ) {
					event.preventDefault();
					createGroup($(this).data('id'), 'Divisions', $(this).data('url'), $(this).data('parentid'));	
				});
				
				$( ".DivisionEdit" ).unbind();
				$( ".DivisionEdit" ).button().click(function(event ) {
					event.preventDefault();
					var EditURL = SRARootCheck + '/Resources/EditSites/ProjectEdit.aspx?ProjectSite='+$(this).data('url')+'&LoadedTab=0&SiteType=Divisions';
					LaunchActionWithChange(EditURL , 'Edit Division - ' + $(this).data('title'), true, false);
				});
				$( ".DivisionDelete" ).unbind();
				$( ".DivisionDelete" ).button().click(function(event ) {
					event.preventDefault();
					$('#DeleteName').html($(this).data('title'));
					DeleteCheckOpen('Divisions',$(this).data('id'), $(this).data('url'),$(this).data('usergroup'), false);
				});
/*
				//Regions
				$( ".RegionActivate" ).unbind();
				$( ".RegionActivate" ).button().click(function(event ) {
					event.preventDefault();
					createGroup($(this).data('id'), 'Divisions-Regions', $(this).data('url'), $(this).data('parentid'));	
				});
				$( ".RegionDelete" ).unbind();
				$( ".RegionDelete" ).button().click(function(event ) {
					event.preventDefault();
					$('#DeleteName').html($(this).data('title'));
					DeleteCheckOpen('Divisions-Regions',$(this).data('id'), $(this).data('url'),$(this).data('usergroup'), false);
				});
				$( ".RegionEdit" ).unbind();
				$( ".RegionEdit" ).button().click(function(event ) {
					event.preventDefault();
					var EditURL = SRARootCheck + '/Resources/EditSites/ProjectEdit.aspx?ProjectSite='+$(this).data('url')+'&LoadedTab=1&SiteType=Divisions-Regions&PermissionsOnly=true';
					LaunchActionWithChange(EditURL , 'Edit Region - ' + $(this).data('title'), true, false);
				});
				
				//Locations
				$( ".LocationActivate" ).unbind();
				$( ".LocationActivate" ).button().click(function(event ) {
					event.preventDefault();
					createGroup($(this).data('id'), 'Locations', $(this).data('url'), $(this).data('parentid'));	
				});
				
				$( ".LocationEdit" ).unbind();
				$( ".LocationEdit" ).button().click(function(event ) {
					event.preventDefault();
					var EditURL = SRARootCheck + '/Resources/EditSites/ProjectEdit.aspx?ProjectSite='+$(this).data('url')+'&LoadedTab=0&SiteType=Locations';
					LaunchActionWithChange(EditURL , 'Edit Locations - ' + $(this).data('title'), true, false);
				});
				$( ".LocationDelete" ).unbind();
				$( ".LocationDelete" ).button().click(function(event ) {
					event.preventDefault();
					$('#DeleteName').html($(this).data('title'));
					DeleteCheckOpen('Locations',$(this).data('id'), $(this).data('url'),$(this).data('usergroup'), false);
				});
				
				//Projects
				$( ".ProjectEdit" ).unbind();
				$( ".ProjectEdit" ).button().click(function(event ) {
					event.preventDefault();
					var EditURL = SRARootCheck + '/Resources/ProjectEdit/ProjectEdit.aspx?ProjectSite='+$(this).data('url')+'&LoadedTab=0';
					LaunchActionWithChange(EditURL , 'Edit Project - ' + $(this).data('title'), true, false);
				});
				$( ".ProjectDelete" ).unbind();
				$( ".ProjectDelete" ).button().click(function(event ) {
					event.preventDefault();
					$('#DeleteName').html($(this).data('title'));
					DeleteCheckOpen('Projects',$(this).data('id'), $(this).data('url'),'', false);
				});
					
			//$('#SiteManagerLoader').hide();
			//$('#SiteManagerShell').show();
*/			
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}
function LaunchActionWithChange(URL,Name,Max,Close) {
    var CWDialogOptions = {
        url: URL,
        title: Name,
        allowMaximize: true,
        showMaximized:Max,
        showClose: Close,
        autoSize:true,
        dialogReturnValueCallback: CWDialogCloseActionWithChange
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}
function CWDialogCloseActionWithChange(IsCancel)
{
		if(IsCancel){
		var active = $( "#SiteManagerMain" ).tabs( "option", "active" );
		if(active===0){
				$('#SiteManagerShell').hide();
				$('#SiteManagerLoader').show();
				Sitesload();
			}
		else if (active===1){
			$('#RegionManagerShell').hide();
			$('#RegionManagerLoader').show();
			Regionsload();
			}
		else if (active===2){
			$('#DivRegManagerShell').hide();
			$('#DivRegManagerLoader').show();
			DivRegload();
			}
		else if (active===3){
			$('#LocationManagerShell').hide();
			$('#LocationManagerLoader').show();
			Locationload();
			}
		else if (active===4){
			$('#ProjectManagerShell').hide();
			$('#ProjectManagerLoader').show();
			Projectload();
			}	
		else if (active===5){
			$('#ProjectDeleteManagerShell').hide();
			$('#ProjectDeleteManagerLoader').show();
			ProjectDeleteload();
			}	
		}	
}
function CWActionFormCancelCommand()
{
	SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel, "Cancelled"); // Close dialowith 'Cancel'

}
function CWActionFormCloseCommand()
{
	SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, "Not cancelled");
}

function DeleteCheckOpen(Type,ID, URL, UserGroup, RegionRecordsOnly)
{
	DeleteSiteID = ID;
	DeleteSiteURL = URL;
	DeleteSiteType = Type;
	RegionRecords = RegionRecordsOnly;
	DeleteSiteGroup = UserGroup;
	$("#DeleteCheck").dialog("open");
}	
function DeleteSiteRecord(Type,ID, URL, UserGroup){
	if(RegionRecords){SP.UI.ModalDialog.showWaitScreenWithNoClose('Removing Region Record', '');}
	else{SP.UI.ModalDialog.showWaitScreenWithNoClose('Removing Site', '');}
	var ToWrite = '<ows:Batch OnError="Return">';
		ToWrite += '<Method ID="A1"><SetList>%'+Type+'%</SetList><SetVar Name="ID">'+ID+'</SetVar><SetVar Name="Cmd">Delete</SetVar>';
		ToWrite +='</Method>';
		ToWrite +='</ows:Batch>';
//debugger;
	$.ajax({
		type: 'POST',
		url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data: { RequestType: 'ProcessBatchData',
		 		ListTitle: Type,
				Batch: ToWrite,
				OutputType: 'json' },
		dataType: 'json',
		cache: false,
		async : true,
		success:function(json){
			if(RegionRecords){
				$('#RegionManagerShell').hide();
				$('#RegionManagerLoader').show();
				Regionsload();
				SP.UI.ModalDialog.commonModalDialogClose();	
				}
			else{
				//DeleteSite(URL);
				LaunchDeleteWindow(URL);
				if(UserGroup!= '' && UserGroup!= null && UserGroup!== 'undefined'){DeleteSPSiteGroup(UserGroup);}
				}						
        },				
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});

}
function LaunchDeleteWindow(URL) {
    var CWDialogOptions = {
        url: URL + '/_layouts/15/deleteweb.aspx',
        title: 'Delete Site',
        allowMaximize: true,
        //showMaximized:Max,
        showClose: true,
        autoSize:true,
        dialogReturnValueCallback: CWDialogCloseDeleteWindow
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}
function CWDialogCloseDeleteWindow()
{
		var active = $( "#SiteManagerMain" ).tabs( "option", "active" );
		if(active===0){
				$('#SiteManagerShell').hide();
				$('#SiteManagerLoader').show();
				Sitesload();
				SP.UI.ModalDialog.commonModalDialogClose();
			}
		else if (active===1){
			$('#RegionManagerShell').hide();
			$('#RegionManagerLoader').show();
			Regionsload();
			SP.UI.ModalDialog.commonModalDialogClose();
			}
		else if (active===2){
			$('#DivRegManagerShell').hide();
			$('#DivRegManagerLoader').show();
			DivRegload();
			SP.UI.ModalDialog.commonModalDialogClose();
			}
		else if (active===3){
			$('#LocationManagerShell').hide();
			$('#LocationManagerLoader').show();
			Locationload();
			SP.UI.ModalDialog.commonModalDialogClose();
			}
		else if (active===4){
			$('#ProjectManagerShell').hide();
			$('#ProjectManagerLoader').show();
			Projectload();
			SP.UI.ModalDialog.commonModalDialogClose();
			}										
		else if (active===5){
			$('#ProjectDeleteManagerShell').hide();
			$('#ProjectDeleteManagerLoader').show();
			ProjectDeleteload();
			SP.UI.ModalDialog.commonModalDialogClose();
			}	

}

function DeleteSite(URL) {
	$('#DeleteName').html('');
	if (SRARootCheck != URL){
	
		$.ajax({
			type: 'POST',
			url:  URL + '/_api/web',
			headers: { 
	        //"accept": "application/json; odata=verbose", 
	        //"content-type":"application/json;odata=verbose",
	        "X-HTTP-Method": "DELETE",
	        "X-RequestDigest": $("#__REQUESTDIGEST").val() 
	    	},
			dataType: 'json',
			cache: false,
			async : true,
			success:function(json){
				$('#SiteManagerShell').hide();
				$('#SiteManagerLoader').show();
				Sitesload();
				SP.UI.ModalDialog.commonModalDialogClose();
	        },
			error: function(xhr, status, error) {
				$('#SiteManagerShell').hide();
				$('#SiteManagerLoader').show();
				Sitesload();
				SP.UI.ModalDialog.commonModalDialogClose();
	        }
		});
	}
	
}
function DeleteSPSiteGroup(ID) {
	$.ajax({
		type: 'POST',
		url: '../_api/web/sitegroups/removebyid('+ID+')',
		headers: { 
        "accept": "application/json; odata=verbose", 
        "content-type":"application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val() 
    	},
    	//data: JSON.stringify({ '__metadata': { 'type': 'SP.Group' }, 'Title': GroupName}),
		cache: false,
		success:function(json){
        },
		error: function(xhr, status, error) {alert("Error:\n" + xhr.responseText);}

	});
}

function Regionsload(){
//$('#SiteManagerShell').hide();
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/SiteManager/RegionManager.xml',
			XsltLocation: '[SRA Root]/Resources/SiteManager/RegionManager.xslt',
			OutputType : 'html'
		},
		success: function(html){
			$('#ManageRegions').html(html);
			
			
			var pagerOptions = {
					// target the pager markup - see the HTML block below
					container: $(".pagerRegionManager"),
					// output string - default is '{page}/{totalPages}'
					// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
					// also {page:input} & {startRow:input} will add a modifiable input in place of the value
					//output: '{startRow:input} to {endRow} ({totalRows})',
					output: '{startRow} to {endRow} ({totalRows})',									
					// starting page of the pager (zero based index)
					page: 0,		
					// Number of visible rows - default is 10
					size: 25,
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
			$("#RegionManager")
				// Initialize tablesorter
				.tablesorter({
					//sortList: [[3,0]],
					widgets: ["filter"],
					widthFixed: true,
					
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
				$( ".RegionOnlyEdit" ).unbind();
				$( ".RegionOnlyEdit" ).button().click(function(event ) {
					event.preventDefault();
					var EditURL = SRARootCheck + '/Resources/EditSites/ProjectEdit.aspx?ProjectSite='+$(this).data('url')+'&ProjectID='+$(this).data('id')+'&LoadedTab=0&SiteType=Regions&SiteEditOnly=true';
					LaunchActionWithChange(EditURL , 'Edit Region - ' + $(this).data('title'), true, false);
				});
				$( ".RegionOnlyDelete" ).unbind();
				$( ".RegionOnlyDelete" ).button().click(function(event ) {
					event.preventDefault();
					$('#DeleteName').html($(this).data('title'));
					DeleteCheckOpen('Regions',$(this).data('id'), $(this).data('url'),'', true);
				});
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}
function DivRegload(){
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/SiteManager/DivRegManager.xml',
			XsltLocation: '[SRA Root]/Resources/SiteManager/DivRegManager.xslt',
			OutputType : 'html'
		},
		success: function(html){
			$('#ManageDivReg').html(html);
			
			
			var pagerOptions = {
					// target the pager markup - see the HTML block below
					container: $(".pagerDivRegManager"),
					// output string - default is '{page}/{totalPages}'
					// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
					// also {page:input} & {startRow:input} will add a modifiable input in place of the value
					//output: '{startRow:input} to {endRow} ({totalRows})',
					output: '{startRow} to {endRow} ({totalRows})',									
					// starting page of the pager (zero based index)
					page: 0,		
					// Number of visible rows - default is 10
					size: 25,
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
			$("#DivRegManager")
				// Initialize tablesorter
				.tablesorter({
					//sortList: [[3,0]],
					widgets: ["filter"],
					widthFixed: true,
					
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
				//Regions
				$( ".RegionActivate" ).unbind();
				$( ".RegionActivate" ).button().click(function(event ) {
					event.preventDefault();
					createGroup($(this).data('id'), 'Divisions-Regions', $(this).data('url'), $(this).data('parentid'));	
				});
				$( ".RegionDelete" ).unbind();
				$( ".RegionDelete" ).button().click(function(event ) {
					event.preventDefault();
					$('#DeleteName').html($(this).data('title'));
					DeleteCheckOpen('Divisions-Regions',$(this).data('id'), $(this).data('url'),$(this).data('usergroup'), false);
				});
				$( ".RegionEdit" ).unbind();
				$( ".RegionEdit" ).button().click(function(event ) {
					event.preventDefault();
					var EditURL = SRARootCheck + '/Resources/EditSites/ProjectEdit.aspx?ProjectSite='+$(this).data('url')+'&LoadedTab=1&SiteType=Divisions-Regions&PermissionsOnly=true';
					LaunchActionWithChange(EditURL , 'Edit Region - ' + $(this).data('title'), true, false);
				});
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}
function Locationload(){
//$('#SiteManagerShell').hide();
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/SiteManager/LocationManager.xml',
			XsltLocation: '[SRA Root]/Resources/SiteManager/LocationManager.xslt',
			OutputType : 'html'
		},
		success: function(html){
			$('#ManageLocations').html(html);
			
			
			var pagerOptions = {
					// target the pager markup - see the HTML block below
					container: $(".pagerLocationManager"),
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
			$("#LocationManager")
				// Initialize tablesorter
				.tablesorter({
					//sortList: [[3,0]],
					widgets: ["filter"],
					widthFixed: true,
					
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
				//Locations
				$( ".LocationActivate" ).unbind();
				$( ".LocationActivate" ).button().click(function(event ) {
					event.preventDefault();
					createGroup($(this).data('id'), 'Locations', $(this).data('url'), $(this).data('parentid'));	
				});
				
				$( ".LocationEdit" ).unbind();
				$( ".LocationEdit" ).button().click(function(event ) {
					event.preventDefault();
					var EditURL = SRARootCheck + '/Resources/EditSites/ProjectEdit.aspx?ProjectSite='+$(this).data('url')+'&LoadedTab=0&SiteType=Locations';
					LaunchActionWithChange(EditURL , 'Edit Locations - ' + $(this).data('title'), true, false);
				});
				$( ".LocationDelete" ).unbind();
				$( ".LocationDelete" ).button().click(function(event ) {
					event.preventDefault();
					$('#DeleteName').html($(this).data('title'));
					DeleteCheckOpen('Locations',$(this).data('id'), $(this).data('url'),$(this).data('usergroup'), false);
				});
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}
function Projectload(){
//$('#SiteManagerShell').hide();
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/SiteManager/ProjectManager.xml',
			XsltLocation: '[SRA Root]/Resources/SiteManager/ProjectManager.xslt',
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
					widthFixed: true,
					
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
					LaunchActionWithChange(EditURL , 'Edit Project - ' + $(this).data('title'), true, false);
				});
				$( ".ProjectDelete" ).unbind();
				$( ".ProjectDelete" ).button().click(function(event ) {
					event.preventDefault();
					$('#DeleteName').html($(this).data('title'));
					DeleteCheckOpen('Projects',$(this).data('id'), $(this).data('url'),'', false);
				});
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}
function ProjectDeleteload(){
//$('#SiteManagerShell').hide();
	$.ajax({
		 type:'POST',
         dataType:'html',
         url:'../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
		data : {
			RequestType : 'BatchRequest',
			ConfigFileLocation: '[SRA Root]/Resources/SiteManager/ProjectDeletes.xml',
			XsltLocation: '[SRA Root]/Resources/SiteManager/ProjectDeletes.xslt',
			OutputType : 'html'
		},
		success: function(html){
			$('#ProjectsDelete').html(html);
			
			
			var pagerOptions = {
					// target the pager markup - see the HTML block below
					container: $(".pagerProjectDeleteManager"),
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
			$("#ProjectDeleteManager")
				// Initialize tablesorter
				.tablesorter({
					//sortList: [[3,0]],
					widgets: ["filter"],
					widthFixed: true,
					
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
					LaunchActionWithChange(EditURL , 'Edit Project - ' + $(this).data('title'), true, false);
				});
				$( ".ProjectDelete" ).unbind();
				$( ".ProjectDelete" ).button().click(function(event ) {
					event.preventDefault();
					$('#DeleteName').html($(this).data('title'));
					DeleteCheckOpen('Projects',$(this).data('id'), $(this).data('url'),'', false);
				});
		},
		error : function (xhr, status, error) {
			alert("Error:\n" + xhr.responseText);
		}

	});	
	
}



