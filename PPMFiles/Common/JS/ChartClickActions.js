<script>
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
function clickOnExpensesByCategory(expCat)
{
	var queryString = "";
	queryString += "<Where><Eq><FieldRef Name='Expense_x0020_Category' /><Value Type='Text'>";
	queryString += expCat;
	queryString += "</Value></Eq></Where>";
	
		var options = {
    				title: 'Expenses - ' + expCat,
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-ExpensesbyCat.aspx?CAML=' + queryString,
					};
	SP.UI.ModalDialog.showModalDialog(options);

}

function clickOnEffortByResource(assignedTo)
{
	var queryString = "";
	if (assignedTo == 'unassigned')
	{
		queryString += "<Where><IsNull><FieldRef Name='AssignedTo' /></IsNull></Where>";
	}
	else
	{
		queryString += "<Where><And><Contains><FieldRef Name='AssignedTo' /><Value Type='User'>";
		queryString += assignedTo;
		queryString += "</Value></Contains><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>";
	}
		var options = {
    				title: assignedTo + ' Tasks Effort',
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-ExpensesbyRes.aspx?CAML=' + queryString,
					};
	SP.UI.ModalDialog.showModalDialog(options);
}
function clickOnEffortByStatus (status)
{
	var queryString = "";
	if (status == '')
	{
		queryString += "<Where><IsNull><FieldRef Name='Status' /></IsNull></Where>";
	}
	else
	{
		queryString += "<Where><And><Eq><FieldRef Name='Status' /><Value Type='Choice'>";
		queryString += status;
		queryString += "</Value></Eq><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>";
	}
	
	var options = {
    				title: status + ' Tasks Effort',
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-ExpensesbyStatus.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

	
}
function clickOnOverdueTask(query,tasktype,classification)
{
	var queryString = query;
	var options = {
    				title: tasktype + ' ' + classification + ' Overdue Tasks',
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-AllOverduetasks.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);
}
function clickOnExpense (name)
{
	var queryString = "";
	var options;
	if (name== 'Actual')
	{
				options = {
    				title: 'Actual Expenses',
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-AllExpenses.aspx',
					};
	
	}
	if (name== 'Budgeted')
	{
				options = {
    				title: 'Budgeted Expenses',
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-AllBudgetedExpenses.aspx',
					};
	}


	SP.UI.ModalDialog.showModalDialog(options);
	
	
}
function clickOnWork (name)
{
	var queryString = '';
	var windowTitle ='';
	if (name== 'Actual Work')
	{
		queryString += "<Where><And><Gt><FieldRef Name='ActualWork' /><Value Type='Number'>0</Value></Gt><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>";
		windowTitle = name;
	}
	else
	{
		queryString += "<Where><And><Gt><FieldRef Name='Work' /><Value Type='Number'>0</Value></Gt><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>";
		windowTitle = " Work";
	}

	var options = {
    				title: windowTitle,
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-AllWork.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);
}
function clickOnTasksByPriority (priority)
{
	var queryString = '<Where><And><And><Eq><FieldRef Name="ContentType"/><Value Type="Text">Task</Value></Eq>';
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
	queryString += "</And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>";
	var options = {
    				title: "Tasks in " + priority + " Priority" ,
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-AllTasksbyPriority.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}
function clickOnTasksByStatus (status)
{
	var queryString = '<Where><And><And><Eq><FieldRef Name="ContentType"/><Value Type="Text">Task</Value></Eq>';
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
	queryString += "</And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>";
	var options = {
    				title: status + " Tasks",
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-AllTasksbyStatus.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}
function clickOnAssignedTo (assignedTo)
{
	var queryString = '<Where><And><And><Eq><FieldRef Name="ContentType"/><Value Type="Text">Task</Value></Eq>';
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
	queryString += "</And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>";
	var options = {
    				title: 'Tasks Assigned To - ' + assignedTo ,
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-AllTasksByAssigned.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}

function clickOnMyOverdueTask(query,tasktype,classification)
{
	var queryString = query.replace("<Value Type='User'>Me</Value>","<Value Type='User'>[Me]</Value>");
	var options = {
    				title: tasktype + ' ' + classification + ' Overdue Tasks',
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-MyOverduetasks.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);
	
}
function clickOnMyExpense (name)
{
	var queryString = "<Where><Contains><FieldRef Name='AssignedTo'/><Value Type='User'>[Me]</Value></Contains></Where>";
				var options = {
    				title: 'My Expenses',
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-MyExpenses.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}
function clickOnMyRisks (name)
{
	var queryString = "<Where><And><Eq><FieldRef Name='Status'/><Value Type='Text'>Risk</Value></Eq><Contains><FieldRef Name='AssignedTo'/><Value Type='User'>[Me]</Value></Contains></And></Where>";

			var options = {
    				title: 'My Risks',
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-MyProjectRisks.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}
function clickOnMyDeliverables (name)
{
	var queryString = "<Where><Contains><FieldRef Name='AssignedTo'/><Value Type='User'>[Me]</Value></Contains></Where>";

		var options = {
    				title: 'My Deliverables',
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-MyDeliverables.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}
function clickOnMyWork (name)
{
	var queryString = '';
	var windowTitle ='';
	if (name== 'Actual Work')
	{
		queryString += "<Where><And><And><Gt><FieldRef Name='ActualWork' /><Value Type='Number'>0</Value></Gt><Contains><FieldRef Name='AssignedTo'/><Value Type='User'>[Me]</Value></Contains></And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>";
		windowTitle = name;
	}
	else
	{
		queryString += "<Where><And><And><Gt><FieldRef Name='Work' /><Value Type='Number'>0</Value></Gt><Contains><FieldRef Name='AssignedTo'/><Value Type='User'>[Me]</Value></Contains></And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>";
		windowTitle = " Work";
	}

	var options = {
    				title: windowTitle,
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-MyWork.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);
	
}
function clickOnMyTasksByPriority (priority)
{
	var queryString = '<Where>';
	if (priority == '')
	{
		queryString += "<IsNull><FieldRef Name='Priority' /></IsNull>";
	}
	else
	{
		queryString += "<And><And><Eq><FieldRef Name='Priority' /><Value Type='Choice'>";
		queryString += priority;
		queryString += "</Value></Eq><Contains><FieldRef Name='AssignedTo'/><Value Type='User'>[Me]</Value></Contains></And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And>";
	}
	queryString += "</Where>";

	var options = {
    				title: "Tasks in " + priority + " Priority" ,
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-MyTasksbyPriority.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);
	
}
function clickOnMyTasksByStatus (status)
{
	var queryString = '<Where>';
	if (status == '')
	{
		queryString += "<IsNull><FieldRef Name='Status' /></IsNull>";
	}
	else
	{
		queryString += "<And><And><Eq><FieldRef Name='Status' /><Value Type='Choice'>";
		queryString += status;
		queryString += "</Value></Eq><Contains><FieldRef Name='AssignedTo'/><Value Type='User'>[Me]</Value></Contains></And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And>";
	}
	queryString += "</Where>";
	var options = {
				    title: status + " Tasks",
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-MyTasksbyStatus.aspx?CAML=' + queryString,
					};


	SP.UI.ModalDialog.showModalDialog(options);

}
/*Not currently used

function clickOnMyAssignedTo (assignedTo)
{
	var queryString = '?Query=<Where><And><Eq><FieldRef Name="IsSummaryTask"/><Value Type="Boolean">0</Value></Eq><And><Eq><FieldRef Name="ContentType"/><Value Type="Text">Task</Value></Eq>';
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
	queryString += "</And></And></Where>";
	window.showModalDialog('MyTasksGrid.aspx' + queryString);
}
*/
/*Portfolio scripts*/

function clickOnOverdueTaskPort(query,tasktype,classification)
{
	var queryString = query;
	var options = {
    				title: tasktype + ' ' + classification + ' Overdue Tasks',
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-AllOverduetasks.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);
}
function clickOnExpensePort (name)
{
	var queryString = "";
	var options;
	if (name== 'Actual')
	{
				options = {
    				title: 'Actual Expenses',
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-AllExpenses.aspx',
					};
	
	}
	if (name== 'Budgeted')
	{
				options = {
    				title: 'Budgeted Expenses',
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-AllBudgetedExpenses.aspx',
					};
	}


	SP.UI.ModalDialog.showModalDialog(options);
	
	
}
function clickOnWorkPort (name)
{
	var queryString = '';
	var windowTitle ='';
	if (name== 'Actual Work')
	{
		queryString += "<Where><And><Gt><FieldRef Name='ActualWork' /><Value Type='Number'>0</Value></Gt><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>";
		windowTitle = name;
	}
	else
	{
		queryString += "<Where><And><Gt><FieldRef Name='Work' /><Value Type='Number'>0</Value></Gt><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>";
		windowTitle = " Work";
	}

	var options = {
    				title: windowTitle,
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-AllWork.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);
}
function clickOnTasksByPriorityPort (priority)
{
	var queryString = '<Where><And><And><Eq><FieldRef Name="ContentType"/><Value Type="Text">Task</Value></Eq>';
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
	queryString += "</And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>";
	var options = {
    				title: "Tasks in " + priority + " Priority" ,
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-AllTasksbyPriority.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}
function clickOnTasksByStatusPort (status)
{
	var queryString = '<Where><And><And><Eq><FieldRef Name="ContentType"/><Value Type="Text">Task</Value></Eq>';
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
	queryString += "</And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>";
	var options = {
    				title: status + " Tasks",
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-AllTasksbyStatus.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}
function clickOnAssignedToPort (assignedTo)
{
	var queryString = '<Where><And><And><Eq><FieldRef Name="ContentType"/><Value Type="Text">Task</Value></Eq>';
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
	queryString += "</And><Eq><FieldRef Name='IsSummaryTask'/><Value Type='Boolean'>0</Value></Eq></And></Where>";
	var options = {
    				title: 'Tasks Assigned To - ' + assignedTo ,
				    width: null,
				    height: null,
				    url: '../AppPages/Dash-AllTasksByAssigned.aspx?CAML=' + queryString,
					};

	SP.UI.ModalDialog.showModalDialog(options);

}


</script>
