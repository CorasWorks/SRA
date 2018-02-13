var SiteTitleChangedMain = false;
function TopLinkBarload(){
/*
	var CWNavButtons = '<button id="SRAHome" title="SRA Home">SRA Home</button>\
						<button id="MyProjects" title="SRA Home">My Projects</button>\
						';
						*/
	var CWNavButtons = '&nbsp;<a href="#" id="SRAHome" class="SRATopRibbonNav" title="SRA Home">SRA Home</a>\
						| \
						&nbsp;<a href="#" id="MyProjects" class="SRATopRibbonNav" title="My Projects">My Projects</a>\
						| \
						&nbsp;<a href="#" id="SRAFeedback" class="SRATopRibbonNav" title="SRA Feedback">Feedback</a>\
						';
						
	/*					
	CWNavButtons = '&nbsp;<a href="#" title="PPM Home" onclick="PPMTopNavClick(\'/AppPages/Home.aspx\');return false;">PPM Home</a>\
						| \
						&nbsp;<a href="#" title="PMOs" onclick="PPMTopNavClick(\'/AppPages/PMOs.aspx\');return false;">PMOs</a>\
						| \
						&nbsp;<a href="#" title="Portfolios" onclick="PPMTopNavClick(\'/AppPages/Portfolios.aspx\');return false;">Portfolios</a>\
						| \
						&nbsp;<a href="#" title="Projects" onclick="PPMTopNavClick(\'/AppPages/Projects.aspx\');return false;">Projects</a>\
						| \
						&nbsp;<a href="#"  title="My Tasks" onclick="PPMTopNavClick(\'/AppPages/MyTasks.aspx\');return false;">My Tasks</a>\
						<img src="/CWPPM32/Images/about.png" title="About" onclick="tellMeAboutPPM();return false;">\
						';
	*/					
	$('#suiteBarLeft').append(CWNavButtons);
	$( "#SRAHome" ).click(function(event ) {
		event.preventDefault();
		window.location = SRABase;
	});
	$( "#MyProjects" ).click(function(event ) {
		event.preventDefault();
		//window.location = SRABase + '/AppPages/MyProjects.aspx?GUID=d34f7d00-4fac-4a38-e535-9930b3eb4880-205';
		window.location = SRABase + '/AppPages/myProjects.aspx?GUID=fff62001-602e-42aa-a3a0-d8788370d546-199';
	});
	$( "#SRAFeedback" ).click(function(event ) {
		event.preventDefault();
		//window.location = SRABase + '/AppPages/MyProjects.aspx?GUID=d34f7d00-4fac-4a38-e535-9930b3eb4880-205';
		window.location = SRABase + '/AppPages/myfeedback.aspx?GUID=709f81ce-15f0-4e09-c55d-3232c6fcdabe-185';
	});


	
}
function CorningImageReplace(outerSRABase){
var ImageLoc = '<img  src="'+outerSRABase+ '/sra assets/logo.jpg" />';
//var ImageLoc = outerSRABase + '/images/logo.gif';
	//$("#ConrningIMG").attr('scr',ImageLoc);	
   $("#CWSiteLogo").prepend(ImageLoc);
}

function LoadCWSiteNav(){
    var CWDialogOptions = {
        //url: 'http://ppm.corning.com/spsites/sra/Resources/SiteNavigation.aspx',
        url: 'http://corning.corasworks.net/sites/sra/Resources/CapsSiteNav/SiteNavigation.htm',
        title: 'Site Navigation',
        allowMaximize: true,
        showClose: true,
        height: 600,
        autoSize:true,
        //dialogReturnValueCallback: CWDialogCloseReviewActionRefresh
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);

}
function runCWaction(widget)
{
	actionName = widget.title;
	/*Changed so widget action could run Action override form*/
	//actionURL = navigationVM.currentsiteurl + '/' + widget.link;
	actionURL = widget.link;
	var value = SP.UI.ModalDialog.showWaitScreenSize("Action", "Action", null, 300, 300);
    var options = {
    	url: '../_layouts/CorasWorks.Central.Administration/ActionForm.aspx?actionUrl=' + actionURL + '&listItem=' + navigationVM.currentsiteurl + '/', 
        title: 'Action',
        width: 800,
        height: 600
      };
    SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, "Not cancelled");
    SP.UI.ModalDialog.showModalDialog(options);
}
function LaunchAdminProjectEdit(URL) {
    var CWDialogOptions = {
        url: URL,
        title: 'Admin Project Edit',
        allowMaximize: true,
        //showClose: true,
        showMaximized:true,
        autoSize:true,
        dialogReturnValueCallback: CWDialogLaunchAdminProjectEditRefresh
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}
function CWDialogLaunchAdminProjectEditRefresh()
{
	SP.UI.ModalDialog.commonModalDialogClose();
	var masterTable = $find(GetMyIDCorasWorksGrid()).get_masterTableView();       
	masterTable.rebind();    
}
function SiteTitleChangedMainSet(value) {
	SiteTitleChangedMain = value;
} 

/*Project Site Email actions*/
function LaunchEmailAction(URL, Title,ProURL) {
    var CWDialogOptions = {
        url: URL,
        title: Title,
        allowMaximize: true,
        showClose: true,
        showMaximized:true,
        autoSize:true
        //dialogReturnValueCallback: CWDialogCloseLaunchEmailRefresh
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}

function CWDialogCloseLaunchEmailRefresh()
{
	SP.UI.ModalDialog.commonModalDialogClose();
	//alert('Email Sent');
	
}
/*Project Site Email actions END*/
/* PPM Click functions START*/
function clickChartItemView(itemName, siteURL, listId, UniqueId, actionURL) 
{
	if (actionURL == null)
	{
	actionURL = 'ViewForm';
	}

	var viewActionURL = "../_layouts/CorasWorks.Central.Administration/ActionForm.aspx";	
	viewActionURL += "?actionUrl=";//ViewForm";
	viewActionURL += actionURL;	
	viewActionURL += "&ListItem=";	
	viewActionURL += siteURL ; 	
	viewActionURL += "/" ;	
	viewActionURL += listId;	
	viewActionURL += "/" ;	
	viewActionURL += UniqueId;	
    
    var options = {
    				title: itemName,
				    width: null,
				    height: null,
				    url: viewActionURL,
					};

	SP.UI.ModalDialog.showModalDialog(options);

    
}	

function clickOnTasksByPriority(priority, SiteURL, SRARoot)
{
	var queryString = '<Query><Where><And><And><Eq><FieldRef Name="ContentType"/><Value Type="Text">Task</Value></Eq>';
	if (priority == '')
	{
		queryString += "<IsNull><FieldRef Name='Priority' /></IsNull>";
	}
	else
	{
		queryString += "<Eq><FieldRef Name='Priority' /><Value Type='Choice'>";
		queryString += priority;
		queryString += "</Value></Eq>";
	}
	queryString += "</And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where></Query>";
	var options = {
    				title: "Tasks in " + priority + " Priority" ,
			        allowMaximize: true,
			        //showMaximized:true,
			        showClose: true,
			        autoSize:true,
				    url: SRARoot + '/Resources/PPMFiles/Project/Dash-AllTasksbyPriority.aspx?ProjectURL=' + SiteURL +'&CAPSCAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}
function clickOnTasksByStatus (status, SiteURL, SRARoot)
{
	var queryString = '<Query><Where><And><And><Eq><FieldRef Name="ContentType"/><Value Type="Text">Task</Value></Eq>';
	if (status == '')
	{
		queryString += "<IsNull><FieldRef Name='Status' /></IsNull>";
	}
	else
	{
		queryString += "<Eq><FieldRef Name='Status' /><Value Type='Choice'>";
		queryString += status;
		queryString += "</Value></Eq>";
	}
	queryString += "</And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where></Query>";
	var options = {
    				title: status + " Tasks",
			        allowMaximize: true,
			        //showMaximized:true,
			        showClose: true,
			        autoSize:true,
				    url: SRARoot + '/Resources/PPMFiles/Project/Dash-AllTasksbyStatus.aspx?ProjectURL=' + SiteURL +'&CAPSCAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}
function clickOnWork (name, SiteURL, SRARoot)
{
	var queryString = '';
	var windowTitle ='';
	if (name== 'Actual Work')
	{
		queryString += "<Query><Where><And><Gt><FieldRef Name='ActualWork' /><Value Type='Number'>0</Value></Gt><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where></Query>";
		windowTitle = name;
	}
	else
	{
		queryString += "<Query><Where><And><Gt><FieldRef Name='Work' /><Value Type='Number'>0</Value></Gt><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where></Query>";
		windowTitle = " Work";
	}

	var options = {
    				title: windowTitle,
			        allowMaximize: true,
			        //showMaximized:true,
			        showClose: true,
			        autoSize:true,
				    url: SRARoot + '/Resources/PPMFiles/Project/Dash-AllWork.aspx?ProjectURL=' + SiteURL +'&CAPSCAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);
}
function clickOnOverdueTask(query,tasktype,classification, SiteURL, SRARoot)
{
	var queryString = query;
	var options = {
    				title: tasktype + ' ' + classification + ' Overdue Tasks',
			        allowMaximize: true,
			        //showMaximized:true,
			        showClose: true,
			        autoSize:true,
				    url: SRARoot + '/Resources/PPMFiles/Project/Dash-AllOverduetasks.aspx?ProjectURL=' + SiteURL +'&CAPSCAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);
}

function clickOnAssignedTo (assignedTo, SiteURL, SRARoot)
{
	var queryString = '<Query><Where><And><And><Eq><FieldRef Name="ContentType"/><Value Type="Text">Task</Value></Eq>';
	if (assignedTo == 'unassigned')
	{
		queryString += "<IsNull><FieldRef Name='AssignedTo' /></IsNull>";
	}
	else
	{
		queryString += "<Contains><FieldRef Name='AssignedTo' /><Value Type='User'>";
		queryString += assignedTo;
		queryString += "</Value></Contains>";
	}
	queryString += "</And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where></Query>";
	var options = {
    				title: 'Tasks Assigned To - ' + assignedTo ,
			        allowMaximize: true,
			        //showMaximized:true,
			        showClose: true,
			        autoSize:true,
				    url: SRARoot + '/Resources/PPMFiles/Project/Dash-AllTasksByAssigned.aspx?ProjectURL=' + SiteURL +'&CAPSCAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}
function clickOnMyTasksByPriority (priority, SiteURL, SRARoot, CurrentUser)
{
	var queryString = '<Query><Where>';
	if (priority == '')
	{
		queryString += "<IsNull><FieldRef Name='Priority' /></IsNull>";
	}
	else
	{
		queryString += "<And><And><Eq><FieldRef Name='Priority' /><Value Type='Choice'>";
		queryString += priority;
		queryString += "</Value></Eq><Eq><FieldRef Name='AssignedTo'/><Value Type='User'>"+CurrentUser+"</Value></Eq></And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And>";
	}
	queryString += "</Where></Query>";

	var options = {
    				title: "Tasks in " + priority + " Priority" ,
			        allowMaximize: true,
			        //showMaximized:true,
			        showClose: true,
			        autoSize:true,
				    url: SRARoot + '/Resources/PPMFiles/Project/Dash-MyTasksbyPriority.aspx?ProjectURL=' + SiteURL +'&CAPSCAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);
	
}
function clickOnMyTasksByStatus (status, SiteURL, SRARoot, CurrentUser)
{
	var queryString = '<Query><Where>';
	if (status == '')
	{
		queryString += "<IsNull><FieldRef Name='Status' /></IsNull>";
	}
	else
	{
		queryString += "<And><And><Eq><FieldRef Name='Status' /><Value Type='Choice'>";
		queryString += status;
		queryString += "</Value></Eq><Contains><FieldRef Name='AssignedTo'/><Value Type='User'>"+CurrentUser+"</Value></Contains></And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And>";
	}
	queryString += "</Where></Query>";
	var options = {
				    title: status + " Tasks",
			        allowMaximize: true,
			        //showMaximized:true,
			        showClose: true,
			        autoSize:true,
				    url: SRARoot + '/Resources/PPMFiles/Project/Dash-MyTasksbyStatus.aspx?ProjectURL=' + SiteURL +'&CAPSCAML=' + queryString,
					};


	SP.UI.ModalDialog.showModalDialog(options);

}
function clickOnMyWork (name, SiteURL, SRARoot, CurrentUser)
{
	var queryString = '';
	var windowTitle ='';
	if (name== 'Actual Work')
	{
		queryString += "<Query><Where><And><And><Gt><FieldRef Name='ActualWork' /><Value Type='Number'>0</Value></Gt><Contains><FieldRef Name='AssignedTo'/><Value Type='User'>"+CurrentUser+"</Value></Contains></And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where></Query>";
		windowTitle = name;
	}
	else
	{
		queryString += "<Query><Where><And><And><Gt><FieldRef Name='Work' /><Value Type='Number'>0</Value></Gt><Contains><FieldRef Name='AssignedTo'/><Value Type='User'>"+CurrentUser+"</Value></Contains></And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where></Query>";
		windowTitle = " Work";
	}

	var options = {
    				title: windowTitle,
			        allowMaximize: true,
			        //showMaximized:true,
			        showClose: true,
			        autoSize:true,
				    url: SRARoot + '/Resources/PPMFiles/Project/Dash-MyWork.aspx?ProjectURL=' + SiteURL +'&CAPSCAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);
	
}
function clickOnMyRisks (name, SiteURL, SRARoot, CurrentUser)
{
	var queryString = "<Query><Where><And><Eq><FieldRef Name='Status'/><Value Type='Text'>Risk</Value></Eq><Contains><FieldRef Name='AssignedTo'/><Value Type='User'>"+CurrentUser+"</Value></Contains></And></Where></Query>";

			var options = {
    				title: 'My Risks',
			        allowMaximize: true,
			        //showMaximized:true,
			        showClose: true,
			        autoSize:true,
				    url: SRARoot + '/Resources/PPMFiles/Project/Dash-MyProjectRisks.aspx?ProjectURL=' + SiteURL +'&CAPSCAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}
function clickOnMyOverdueTask(query,tasktype,classification, SiteURL, SRARoot, CurrentUser)
{
	var queryString = query.replace("<Value Type='User'>Me</Value>","<Value Type='User'>"+CurrentUser+"</Value>");
	var options = {
    				title: tasktype + ' ' + classification + ' Overdue Tasks',
			        allowMaximize: true,
			        //showMaximized:true,
			        showClose: true,
			        autoSize:true,
				    url: SRARoot + '/Resources/PPMFiles/Project/Dash-MyOverduetasks.aspx?ProjectURL=' + SiteURL +'&CAPSCAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);
	
}

/* Portfolio Level Clicks*/
function clickOnWorkPort (name, SiteURL, SRARoot)
{
	var queryString = '';
	var windowTitle ='';
	if (name== 'Actual Work')
	{
		queryString += "<Query><Where><And><Gt><FieldRef Name='ActualWork' /><Value Type='Number'>0</Value></Gt><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where></Query>";
		windowTitle = name;
	}
	else
	{
		queryString += "<Query><Where><And><Gt><FieldRef Name='Work' /><Value Type='Number'>0</Value></Gt><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where></Query>";
		windowTitle = " Work";
	}

	var options = {
    				title: windowTitle,
			        allowMaximize: true,
			        //showMaximized:true,
			        showClose: true,
			        autoSize:true,
				    url: SRARoot + '/Resources/PPMFiles/Location/Dash-AllWork.aspx?ProjectURL=' + SiteURL +'&CAPSCAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);
}
function clickOnTasksByPriorityPort (priority, SiteURL, SRARoot)
{
	var queryString = '<Query><Where><And><And><Eq><FieldRef Name="ContentType"/><Value Type="Text">Task</Value></Eq>';
	if (priority == '')
	{
		queryString += "<IsNull><FieldRef Name='Priority' /></IsNull>";
	}
	else
	{
		queryString += "<Eq><FieldRef Name='Priority' /><Value Type='Choice'>";
		queryString += priority;
		queryString += "</Value></Eq>";
	}
	queryString += "</And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where></Query>";
	var options = {
    				title: "Tasks in " + priority + " Priority" ,
			        allowMaximize: true,
			        //showMaximized:true,
			        showClose: true,
			        autoSize:true,
				    url: SRARoot + '/Resources/PPMFiles/Location/Dash-AllTasksbyPriority.aspx?ProjectURL=' + SiteURL +'&CAPSCAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}
function clickOnTasksByStatusPort (status, SiteURL, SRARoot)
{
	var queryString = '<Query><Where><And><And><Eq><FieldRef Name="ContentType"/><Value Type="Text">Task</Value></Eq>';
	if (status == '')
	{
		queryString += "<IsNull><FieldRef Name='Status' /></IsNull>";
	}
	else
	{
		queryString += "<Eq><FieldRef Name='Status' /><Value Type='Choice'>";
		queryString += status;
		queryString += "</Value></Eq>";
	}
	queryString += "</And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where></Query>";
	var options = {
    				title: status + " Tasks",
			        allowMaximize: true,
			        //showMaximized:true,
			        showClose: true,
			        autoSize:true,
				    url: SRARoot + '/Resources/PPMFiles/Location/Dash-AllTasksbyStatus.aspx?ProjectURL=' + SiteURL +'&CAPSCAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}

function clickOnAssignedToPort (assignedTo, SiteURL, SRARoot)
{
	var queryString = '<Query><Where><And><And><Eq><FieldRef Name="ContentType"/><Value Type="Text">Task</Value></Eq>';
	if (assignedTo == 'unassigned')
	{
		queryString += "<IsNull><FieldRef Name='AssignedTo' /></IsNull>";
	}
	else
	{
		queryString += "<Contains><FieldRef Name='AssignedTo' /><Value Type='User'>";
		queryString += assignedTo;
		queryString += "</Value></Contains>";
	}
	queryString += "</And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where></Query>";
	var options = {
    				title: 'Tasks Assigned To - ' + assignedTo ,
			        allowMaximize: true,
			        //showMaximized:true,
			        showClose: true,
			        autoSize:true,
				    url: SRARoot + '/Resources/PPMFiles/Location/Dash-AllTasksByAssigned.aspx?ProjectURL=' + SiteURL +'&CAPSCAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}

/* PPM Click functions END*/
function refreshGridFromMaster()
{
	var masterTable = $find(GetMyIDCorasWorksGrid()).get_masterTableView();       
	masterTable.rebind();    
}
/**/
function LaunchTimeLinePage(URL) {

	var ActionURL = '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetFileContents&FileUrl=[SRA Root]/Resources/TimeLineSelect/TimelineSelect.htm&OutputType=html&ProjectSite='+ URL;
	    var CWDialogOptions = {
        url: ActionURL,
        title: 'Project Open',
        allowMaximize: true,
        //showMaximized:true,
        showClose: true,
        autoSize:true
        //dialogReturnValueCallback: CWDialogCloseStandAlonePagesRefresh
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}
function LaunchTLReport(URL) {
	SP.UI.ModalDialog.commonModalDialogClose();
    var CWDialogOptions = {
        url: URL,
        title: 'Report',
        allowMaximize: true,
        showClose: true,
        showMaximized:true,
        autoSize:true
        //dialogReturnValueCallback: CWDialogCloseProjectApprovalRefresh
    };
    SP.UI.ModalDialog.showModalDialog(CWDialogOptions);
}



