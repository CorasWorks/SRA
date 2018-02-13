	//declare & set global script variables	 
	var rightNow = new Date();
	var urlCAPS = '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx';
	
	//declare arrays
	tasksData = new Array();
	projectDetails = new Array();
	siteUsers = new Array();
	taskStatusColumns = new Array;
	taskStatusMappings = new Array;
	taskPriorities = new Array;
	taskTitles = new Array;
	cwVariables = new Array;

	$(document).ready(function()
	{		

    /*$( "#spinner" ).spinner({
      min: 5,
      max: 2500,
      step: 25,
      start: 1000,
      numberFormat: "C"
    });*/
    
		//get current user
		$.ajax({
		    url: urlCAPS,
		    data: { RequestType: 'CheckVariables', XsltLocation: '%WebRoot%/CWPPM32/Project/TaskBoardCWVariables.xslt', OutputType: 'json' },
		    dataType: 'json',
		    async: false,
		    cache: false,
		    /*error: function (xhr, status, msg) {
		    	alert(xhr+" - "+status+" - "+msg);
		    },*/
		    complete: function (xhr, status) {
		    },
		    success: function (json) {
					cwVariables = json.NewDataSet;    		
		    }
		});
		
		$.ajax({
		    url: urlCAPS,
		    data: { RequestType: 'CheckVariables', CWVariable: '%CWUID%', OutputType: 'json' },
		    dataType: 'json',
		    async: false,
		    cache: false,
		   /* error: function (xhr, status, msg) {
		    	alert(xhr+" - "+status+" - "+msg);
		    },*/
		    complete: function (xhr, status) {
		    },
		    success: function (json) {
					cwVariables.CWUID = json.NewDataSet.CheckVariables.CWVariable.value;	        
		    }
		});

		//get the task list status choices to dynamically populate the taskboard columns
		$.ajax({
		    url: urlCAPS,
		    data: { RequestType: 'GetListInfo', ListTitle: 'Tasks', XsltLocation: '%WebRoot%/CWPPM32/Project/TaskBoardColumns.xslt', OutputType: 'json' },
		    dataType: 'json',
		    async: false,
		    cache: false,
		    complete: function (xhr, status) {
		    },
		    success: function (json) {
				taskStatusColumns = json.NewDataSet.Status.Field.CHOICES.CHOICE;
				taskStatusMapping = json.NewDataSet.Status.Field.MAPPINGS.MAPPING;
				taskPriorities = json.NewDataSet.Priority.Field.CHOICES.CHOICE;	        
		    }
		});
		//Build the task board status columns
		for (var i = 0; i < taskStatusColumns.length; i++) {
		    addTaskStatusColumn(taskStatusColumns[i], taskStatusMapping[i]);
		}
		for (var i = 0; i < taskPriorities.length; i++){
			addPriorities(taskPriorities[i]);
		}
		

		/* Load Data from Server */
		$.ajax({
		    url: urlCAPS,
		    data: { RequestType: 'BatchRequest', ConfigFileLocation: '%WebRoot%/CWPPM32/Project/TaskBoardCDB.xml', XsltLocation: '%WebRoot%/CWPPM32/Project/TaskBoard.xslt', OutputType: 'json' },
		    dataType: 'json',
		    async: false,
		    cache: false,
		    complete: function (xhr, status) {
		    },
		    success: function (json) {
		        if (json.NewDataSet.Tasks !== null) {
		            if (typeof json.NewDataSet.Tasks["z:row"].length == 'undefined') {
		                tasksData[0] = json.NewDataSet.Tasks["z:row"];
		            }
		            else {
		                tasksData = json.NewDataSet.Tasks["z:row"];
		            }
		        }
		        if (json.NewDataSet.ProjectDetails !== null) {
		            projectDetails = json.NewDataSet.ProjectDetails["z:row"];
		        }
		    }
		});
		for (var i = 0; i < tasksData.length; i++) {
		    tasksData[i].ows_Title = tasksData[i].ows_Title.replace('%26','&');
		    addListItem(tasksData[i], i);
			taskTitles.push(tasksData[i].ows_Title);
		}
		
		//Get site users for drop downs
		$.ajax({
		    url: urlCAPS,
		    data: { RequestType: 'GetSiteUsers', OutputType: 'json' },
		    dataType: 'json',
		    async: false,
		    cache: false,
		    complete: function (xhr, status) {
		    },
		    success: function (json) {
					siteUsers = json.NewDataSet.GetSiteUsers.SPUser;		        
		    }
		});
		//populate the dropdowns in the filter and edit form
		for (var i = 0; i < siteUsers.length; i++){
			addUser(siteUsers[i]);
		}
		
		
		if (projectDetails.length !== 0) {
		    var pmArray = projectDetails.ows_ProjectManagers.split(';#');
		    for (var i = 0; i < pmArray.length; i = i + 2) {
		        //			$('#projectManagers').append('<li id="draggablePerson" class="ui-state-highlight">' + pmArray[i + 1] + '</li>');
		    }
		}
		
		$('.searchTasks').autocomplete({
			source: taskTitles
		});
		
		$('.searchTasks').click(function() {
			$(this).val('');
			$(this).css('color','#f6931f').css('font-style','normal');		
		});
		
		$('.searchTasks').change(function() {
			//filter the task board by the task titles
			$(".task-Item").hide();
			$(".task-Item[taskTitle *= '"+$(this).val()+"']").show();					
			$(".activeFilter").text('by Task Titles');
		});
		
		$('#new-Task-Title').focus(function() {
			$(this).select();//on focus selects all start text in task title field
		});
		
		//highlight select task item
		$('.task-Item').on("click", function(){
			if($('.task-Item').hasClass('ui-state-highlight'))
				$('.task-Item').removeClass('ui-state-highlight');
				
			$(this).toggleClass("ui-state-highlight");
		});
		
		
		//toggle all task item progress bars on board
		$("#toggleProgressBars").click(function() {
			$(".ui-progressbar").toggle();
		});

		//toggle all task details on board.
		$("#toggleDetails").click(function() {
			if ($(this).is(':checked'))
				$(".task-Details").show();
			else
				$(".task-Details").hide();
								
		});

	
		//clicking on star icons changes task priority
		//updates task-Item.taskPriority attribute for filtering, display, tasksData array, and data container		

		$(".task-Priority-Star").on("click",function() {
				
			var taskID = getTaskID(this.id);
			var task = $("#taskid_"+taskID);
			var taskItemIndex = task.attr("taskArrayIndex");
			var taskItem = tasksData[taskItemIndex];
			var star_Color = $(this).attr('taskColor');
						
			switch (star_Color)
			{
				case 'green':
					$(this).toggle();
					$('#redStar_'+taskID).toggle();
					tasksData[taskID-1].ows_Priority = "(1) High";
					break;
				case 'red':
					$(this).toggle();
					$('#blueStar_'+taskID).toggle();	
					tasksData[taskID-1].ows_Priority = "(3) Low";
					break;
				case 'blue':
					$(this).toggle();
					$('#greenStar_'+taskID).toggle();	
					tasksData[taskID-1].ows_Priority = "(2) Normal";
					break;
			}
			//update array
			$("#taskid_"+taskID).attr("taskPriority", tasksData[taskID-1].ows_Priority);
			//update task item on display
			$("#taskid_"+taskID+"_details > #details-priority").text("Priority: "+tasksData[taskID-1].ows_Priority);
			//update the task list
			updateTask(taskItem);			
		});

		$('#newTask').click(function() {

			$("#taskEdit").attr("mode","new");
			$("#new-DatePicker-Start").datepicker("setDate",rightNow);
			$("#new-DatePicker-Due").datepicker("setDate",rightNow);
			
			taskTableOverlayResize();
			$(".task-Table-Overlay").toggle();
			$("#taskEdit").offset({ top: 200, left: 200 });
			$("#taskEdit").effect( "slide", 500);
			$(".new-Task").show();
			$(".edit-Task").hide();			
			$("#AssignedToSelector").show();
						
		});


		//double click event to edit task item
		$( ".task-Item").on("dblclick", function(){
			var taskID = getTaskID(this.id);
			$(".new-Task").hide();
			$(".edit-Task").show();
			$("#taskEdit").attr("mode","edit");						
			openEditForm(taskID);
		});

		//single click event to edit task item from edit icon
		$( ".editTask").on("click", function(){
			var taskID = getTaskID(this.id);
			$(".new-Task").hide();
			$(".edit-Task").show();	
			$("#taskEdit").attr("mode","edit");					
			openEditForm(taskID);
		});
		
		$(".toggleTaskDetails").on("click", function() {
			var details = $("#"+$(this).attr("taskDetails"));
			details.toggle();
		});
		
		
		$("#toggleAssignedToSelector").click(function() {
			$("#AssignedToText").toggle();
			$("#AssignedToSelector").toggle();
			
		});		
		$(".checkbox-AssignedTo-All").click(function() {
			 $(".checkbox-AssignedTo").attr('checked', this.checked);
		});

		//cancel edit and return to task board
		$("#closeEdit").click(function() {
			closeEditForm();
		});

		$("#pastdue-filter > img").click(function () {
			$("#user-select").hide();	
			$(".activeFilter").text(this.id+' Tasks');

			switch (this.id)
			{
				case 'Past Due':
					//hide all tasks before		
					$(".task-Item").hide();
					//show only tasks that are past due
					$(".task-PastDue").parent().show();
					break;											
				default:
					$(".task-Item").show();
					break;
					
			}
			//filterCheckOverlay($(this),0,0);
		});
		
		$("#priority-filter > img").click(function () {
     		
     		var filterPriority = $(this).attr("filterColor");
				$("#user-select").hide();
				$(".activeFilter").text(this.id+' Tasks');
	
     		//show all tasks before deciding which to hide
     		$(".task-Item").show();
     		//show only selected tasks
     		switch (filterPriority)
     		{
	 			case 'red':
					$(".task-Item").not(".task-Item[taskPriority~='High']").toggle();
					break;
				case 'green':
					$(".task-Item").not(".task-Item[taskPriority~='Normal']").toggle();
					break;
				case 'blue':
					$(".task-Item").not(".task-Item[taskPriority~='Low']").toggle();
					break;
		    default:
		    		$(".task-Item").show();
		    		break		
     		}
     		//filterCheckOverlay($(this),0,0);
   		});
   		
		$("#assignment-filter > img").click(function () {
			filterByAssigned(this.id);
			//filterCheckOverlay($(this),0,0);
			$(".activeFilter").text(this.id+' Tasks');


		});
		
		function filterByAssigned(filter)
		{
			switch (filter)
			{
				case 'Unassigned':
					//hide all tasks before		
					$(".task-Item").hide();
					$(".task-Item[assignedTo = '0']").show();
					$("#user-select").hide();											
					break;
				case 'My':
					$(".task-Item").hide();
					$(".task-Item[assignedTo *= 'u"+cwVariables.CWUID+"|']").show();					
					$("#user-select").hide();
					break;					
				case 'By User':
					$("#user-select").effect("slide");
					break;
				case 'All':											
					$(".task-Item").show();	
					$("#user-select").hide();										
					break;
					
			}
					
		}

		$("#user-select").change(function () 
		{
			var userID = $(this).val()
			if(userID != 'Select')
			{
				$(".task-Item").hide();
				$(".task-Item[assignedTo *='"+userID+"']").show();
				$(".activeFilter").text($('#user-select option:selected').html()+'\'s Tasks');//Gets the text value from the selected option

			}
		});		
   		
		$( ".connectedSortable").sortable({
			connectWith: ".connectedSortable",
			stop: function(event, ui)
			{
				var taskID = getTaskID(ui.item[0].id);
				var taskItemIndex = ui.item.attr("taskArrayIndex");
				var taskItem = tasksData[taskItemIndex];
				var taskDetails = $("#taskid_"+taskID+"_details");

				if(ui.item.attr('taskStatus') != ui.item.parent().attr('taskStatus'))
				{
					var newPercent = ui.item.attr('complete'); // Use current value unless overridden below
					if(ui.item.parent().attr('taskStatus') == 'In Progress' && ui.item.attr('complete') < .25)
					{
						newPercent = .25;
					}
					if(ui.item.parent().attr('taskStatus') == 'In Progress' && ui.item.attr('complete') > .75)
					{
						newPercent = .75;
					}
					if(ui.item.parent().attr('taskStatus') == 'Completed' && ui.item.attr('complete') < 1)
					{
						newPercent = 1;
					}
					if(ui.item.parent().attr('taskStatus') == 'Not Started' && ui.item.attr('complete') > .0)
					{
						newPercent = 0;
					}
					ui.item.attr('taskStatus' ,ui.item.parent().attr('taskStatus'));
					ui.item.attr('complete', newPercent);
					
					//update progressbar in display
					$(ui.item.children(".progressbar").progressbar({ value: (newPercent * 100) }));	
					
					//update task array in memory and displayed values
					taskItem.ows_Status = ui.item.parent().attr('taskStatus');

					taskItem.ows_PercentComplete = newPercent;
					$(taskDetails).children("#details-percentComplete").text("Percent Complete: "+newPercent * 100);
					
					//assigned task to current user if unassigned and update array and display.
					if (taskItem.ows_AssignedTo == '')
					{
						taskItem.ows_AssignedTo = cwVariables.CWUID + ';#' + cwVariables.CWUserID;
						$(taskDetails.children("#details-assignedTo").text('Assigned To: '+cwVariables.CWUserID));
						$(ui.item.children("#Unassigned").attr("title",cwVariables.CWUserID));
						$(ui.item.attr("assignedTo",'u'+cwVariables.CWUID+'|'));					
						setHatColor(ui.item,cwVariables.CWUserID);
					}

					//update task item in data container (SharePoint List)
					updateTask(taskItem);
					$(".new-Task").hide();
					$(".edit-Task").show();
					$("#taskEdit").attr("mode","edit");						
					openEditForm(taskID);
										
				}
			}

		}).droppable({
			hoverClass: 'ui-state-highlight'		
		}).disableSelection();
		
		$("#saveEdits").click(function() {
			var mode = $("#taskEdit").attr("mode");
			var title = $("#new-Task-Title").val();
			title = $.trim(title);

			if(mode == 'edit')
				title = 'edit';
			
 
			
			if (title != 'Task title required for save'){
				var taskID = $("#taskEdit").attr("taskID");
				var taskArrayIndex = $("#taskEdit").attr("taskArrayIndex");
				saveTask(taskID, taskArrayIndex);
			}
			else{
				alert('Please enter a task title before saving.');
				$("#new-Task-Title").css('border-color', 'red');
				
			}			
		});
		
		//filterByAssigned('Mine');
	  $("#My").click();	
	  
	  //$(".connectedSortable").height($("#statusColumnData > td").height());

	});

		//reposition the filter check mark overlay
	/*	function filterCheckOverlay(filter,adjTop,adjLeft)
		{
			var checkLeft = filter.offset().left+adjLeft;
			var checkTop = filter.offset().top+adjTop;
			
			$(".filter-checked").show();
			$(".filter-checked").offset({top: checkTop, left: checkLeft});
		
		}
*/

	//resize the overlay if the user changes the window size - preserves clean UI/UX
	$(window).resize(function() {
		taskTableOverlayResize(); 	
	});

	function openEditForm(taskID)
	{
		var task = $("#taskid_"+taskID);
		var taskArrayIndex = task.attr("taskArrayIndex");
		$("#taskEdit").attr("taskID", taskID);
		$("#taskEdit").attr("taskArrayIndex", taskArrayIndex);
		

				
		//show task board overlay -- disables all task board functionality
		taskTableOverlayResize();
		$(".task-Table-Overlay").toggle();
		
		
		//find top & left position of selected task item
		var offset = task.offset();
		var editLeft;
				
		//determine if the edit form will open off the right side of the screen and set it to the left of the task.
		if ((offset.left + 100 + $("#taskEdit").outerWidth()) < ($("body").innerWidth()))
			editLeft = 100;
		else
			editLeft = -310;

		//set position of and show edit form
		$("#taskEdit").offset({ top: offset.top - 20, left: (offset.left + editLeft) });
		$("#taskEdit").effect( "slide", 500);
		//$("#tasksDataView").toggle();
		editTask(taskID);			
	}

	$("#new-DatePicker-Start").datepicker({
		dateFormat: 'mm-dd-yy',
		showAnim: 'slideDown',
		showOn: 'button',
		buttonImage: '/CWPPM32/Images/calendar.png',
		buttonImageOnly: true,
		//SharePoint Friendly format for updating
		altField: "#alt-Start",
	 	altFormat: "yy-mm-dd"
	});
	$("#new-DatePicker-Due").datepicker({
		dateFormat: 'mm-dd-yy',
		showAnim: 'slideDown',
		showOn: 'button',
		buttonImage: '/CWPPM32/Images/calendar.png',
		buttonImageOnly: true,
		//SharePoint Friendly format for updating
		altField: "#alt-Due",
  		altFormat: "yy-mm-dd"		
	});
	$("#new-Task-Work").change(function(){
		$("#new-Slider-Work").slider("value", $(this).val());
	});
	$("#new-Slider-Work").slider({
		value:0,
		min:0,
		step:.25,
    	slide: function( event, ui ) {
  	    	$( "#new-Task-Work" ).val((ui.value).toFixed(2));
    	}			
	});	

	
	//get the ID of a selected task 
	function getTaskID(taskID)
	{
		return taskID.match(/\d+/g);
	}


	function dateThis(intDate)
	{	
		if (intDate == null || intDate == 'undefined')
		{
			return '{none}';
		}
		else
		{
	 		var gmt_date = new Date(parseInt(intDate.substring(6, 19))); 
	 		return gmt_date.toDateString();
	 	}
 	}
 
 function setEditFormAssignedToCheckBoxes(assigned)
 {
		for (var i = 0; i < assigned.length; i=i+2)
		{		
			$(".checkbox-AssignedTo[userID ='"+assigned[i]+"']").attr('checked',true);
		}
 }
 function getEditFormAssignedToCheckBoxes()
 {
		var assignedTo='';
	
		for (var i = 0; i < siteUsers.length; i++)
		{		
			if ($(".checkbox-AssignedTo[userID ='"+siteUsers[i].ID.value+"']").attr('checked') == 'checked')
			{
				if (assignedTo != '')
					{assignedTo +=';#';}
				assignedTo += siteUsers[i].ID.value +';#'+siteUsers[i].Name.value;			
			}
		}
		
		return assignedTo;
 }

		$("#edit-DatePicker-ActualStart").datepicker({
			dateFormat: 'mm-dd-yy',
			showAnim: 'slideDown',
			showOn: 'button',
			buttonImage: '/CWPPM32/Images/calendar.png',
			buttonImageOnly: true,
			//SharePoint Friendly format for updating
			altField: "#alt-ActualStart",
    	 	altFormat: "yy-mm-dd"
		});
		$("#edit-DatePicker-ActualFinish").datepicker({
			dateFormat: 'mm-dd-yy',
			showAnim: 'slideDown',
			showOn: 'button',
			buttonImage: '/CWPPM32/Images/calendar.png',
			buttonImageOnly: true,
			//SharePoint Friendly format for updating
			altField: "#alt-ActualFinish",
      		altFormat: "yy-mm-dd"		
		});
		$("#edit-Task-ActualWork").change(function(){
			$("#edit-Slider-ActualWork").slider("value", $(this).val());
		});
		$("#edit-Slider-ActualWork").slider({
			value:0,
			min:0,
			step:.25,
	    	slide: function( event, ui ) {
	  	    	$( "#edit-Task-ActualWork" ).val((ui.value).toFixed(2));
	    	}			
		});	
		$("#edit-Task-PercentComplete").change(function(){
			$("#edit-Slider-PercentComplete").slider("value", $(this).val());
		});
		$("#edit-Slider-PercentComplete").slider({
			value:0,
			min:0,
			max:100,
			step:10,
	    	slide: function( event, ui ) {
	  	    	$( "#edit-Task-PercentComplete" ).val(ui.value);
	    	}			
		});	

	
 function editTask(taskID)
	{
		var task = $("#taskid_"+taskID);
		var i = task.attr("taskArrayIndex");
		var taskItem = tasksData[i];
		var assignedTo = new Array;
		var assignedToText = getAssignedToInfo(taskItem.ows_AssignedTo,1);
		
		if(taskItem.ows_AssignedTo)
		{
			assignedTo = taskItem.ows_AssignedTo.split(';#');
			setEditFormAssignedToCheckBoxes(assignedTo);
		}
		
		var startDate = formatDate(taskItem.ows_StartDate,"MM-dd-yyyy");
		var dueDate = formatDate(taskItem.ows_DueDate,"MM-dd-yyyy");
		var actualStartDate = formatDate(taskItem.ows_ActualStart,"MM-dd-yyyy");
		var actualFinishDate = formatDate(taskItem.ows_ActualFinish,"MM-dd-yyyy");
		var taskWork = new Number(taskItem.ows_Work);
		var actualWork;
		var percentComplete;

		if(taskItem.ows_ActualWork)
			actualWork = new Number(taskItem.ows_ActualWork);
		else 
			actualWork = new Number(0);
		
		if (taskItem.ows_PercentComplete)
			percentComplete = new Number(taskItem.ows_PercentComplete * 100);
		else
			percentComplete = new Number(0);
			
	
		 $("#edit-Task-Title").text(taskItem.ows_Title);
		 $("#AssignedToText").text(assignedToText);
		 $("#edit-Task-Priority").text(taskItem.ows_Priority);
		 $("#edit-Task-StartDate").text(startDate);
		 $("#edit-Task-DueDate").text(dueDate);
		 $("#edit-DatePicker-ActualStart").val(actualStartDate);
		 $("#edit-DatePicker-ActualFinish").val(actualFinishDate);
	   $("#edit-Task-Work" ).text(taskWork.toFixed(2) + " hrs");		
	   $("#edit-Task-ActualWork" ).val(actualWork.toFixed(2));		
		 $("#edit-Slider-ActualWork").slider("value", actualWork);
	   $("#edit-Task-PercentComplete" ).val(percentComplete);		
		 $("#edit-Slider-PercentComplete").slider("value", percentComplete);
	}
	
	function saveTask(taskID, taskArrayIndex)
	{
	
		var mode = $("#taskEdit").attr("mode");

		var taskItem;
		var taskDisplay;
		var taskDisplayDetails;
		var percentComplete;

		

		var assignedTo = getEditFormAssignedToCheckBoxes();	//determine which users are assigned to the claim by looking at checkboxes.	
		var assignedToNames = getAssignedToInfo(assignedTo,1); // parse the user names
		var assignedToIDs = getAssignedToInfo(assignedTo,0);  //parse the user IDs
		var assignedToIDsUpdate = assignedToIDs.replace(/u/g,'');//remove extra chars used as delimiters in userID attribute
		var assignedToIDsSOAPArray =  new Array();  // create Array to hold user IDs to be updated
		var assignedToNamesSOAPArray = new Array(); // create Array to hold user names to be updated
		assignedToIDsSOAPArray = assignedToIDsUpdate.split('|'); //load the array with user IDs
		assignedToNamesSOAPArray = assignedToNames.split(', '); //load the array with user Names
		var assignedToSOAPUpdate = '';  //create string to hold user IDs and names for web service update

		//build AssignedTo string for update to tasksData array that will be used in web service update request.
		if(assignedToIDsSOAPArray[0] != '0') // someone is assigned the task
		{	
			for(var i = 0; i < assignedToNamesSOAPArray.length; i++)
			{					
				if(assignedToSOAPUpdate != '')  //if more than user assigned, add web serivce required delimiter
					{ assignedToSOAPUpdate += ';#'; }
				assignedToSOAPUpdate += assignedToIDsSOAPArray[i];
				assignedToSOAPUpdate += ';#';
				assignedToSOAPUpdate += assignedToNamesSOAPArray[i];				
			}					
		}
		else // no one is assigned the task
			assignedToSOAPUpdate = '';
			
		
		//Check mode of input form and update existing task or create new task		
		if(mode == 'edit')  //update existing task
		{
			taskItem = tasksData[taskArrayIndex];
			taskDisplay = $("#taskid_"+taskID);
			taskDisplayDetails = $("#taskid_"+taskID+"_details");
			percentComplete = $("#edit-Slider-PercentComplete").slider("value");

			//update tasks array
			taskItem.ows_AssignedTo = assignedToSOAPUpdate;
			taskItem.ows_ActualStart = $("#alt-ActualStart").val();
			taskItem.ows_ActualFinish = $("#alt-ActualFinish").val();
			taskItem.ows_ActualWork = $("#edit-Task-ActualWork").val();		
			taskItem.ows_PercentComplete = percentComplete / 100;

			//update task data list
			updateTask(taskItem);
			
			//update task item displayed values
			taskDisplay.attr("assignedTo",assignedToIDs);
			taskDisplayDetails.children("#details-assignedTo").text("Assgned To: "+ assignedToNames);
			setHatColor(taskDisplay,assignedToNames);  // change the color of the Assigned To hat icon based on the users edit form selections.		
			taskDisplayDetails.children("#details-actualStart").text("Actual Start: " + $("#edit-DatePicker-ActualStart").val());
			taskDisplayDetails.children("#details-actualFinish").text("Actual Finish: " + $("#edit-DatePicker-ActualFinish").val());		
			taskDisplayDetails.children("#details-actualWork").text("Actual Work: " + taskItem.ows_ActualWork);
			taskDisplayDetails.children("#details-percentComplete").text("Percent Complete: " + percentComplete);
		}
		else  //create new task
		{
			taskItem = addItemToTasksData();

			taskItem.ows_Title = $("#new-Task-Title").val();
			taskItem.ows_Priority = $("#new-Task-Priority").val();
			taskItem.ows_AssignedTo = assignedToSOAPUpdate;
			taskItem.ows_StartDate = $("#alt-Start").val();
			taskItem.ows_DueDate = $("#alt-Due").val();
			taskItem.ows_Status = taskStatusColumns[0];

			taskItem.ows_ActualStart = '';
			taskItem.ows_ActualFinish = '';

			if ($("#new-Task-Work").val() > 0)
				taskItem.ows_Work = $("#new-Task-Work").val();
			else
				taskItem.ows_Work = 0;
			
			taskItem.ows_PercentComplete = 0;
			taskItem.ows_ActualWork = 0;
			

			//add task title to the autocomplete array
			taskTitles.push(taskItem.ows_Title);


			//add the task to the task data list
			createTask(taskItem);
			
			//add the task to the display
			addListItem(taskItem, tasksData.length-1)
		
		}
		//close task edit form
		closeEditForm();
	
	}
	
	function addItemToTasksData()
	{
		var index = tasksData.length;
		tasksData.push({"ows_Title":""});
	
		return(tasksData[index]);
	}
	
	function closeEditForm()
	{
		//reset form inputs
		
		$("#new-Task-Title").val('Task title required for save').css('border-color','transparent');

		$(".checkbox-AssignedTo").attr('checked', false);
		$("#AssignedToText").text('');

		$("#edit-Task-Priority").text('');
		$("#new-Task-Priority").val(taskPriorities[0]);

		$("#edit-Task_StartDate").text('');	
		$("#new-DatePicker-Start").val('');		
		$("#alt-Start").val('');

		$("#edit-Task_DueDate").text('');	
		$("#new-DatePicker-Due").val('');		
		$("#alt-Due").val('');

		$("#new-DatePicker-ActualStart").val('');		
		$("#alt-ActualStart").val('');	

		$("#new-DatePicker-ActualFinish").val('');		
		$("#alt-ActualFinish").val('');

		$("#edit-Task-Work").text('');
		$("#new-Task-Work").val('');
		$("#new-Slider-Work").slider("value",0);
	
		$("#edit-Task-ActualWork").val('');	
		$("#edit-Slider-ActualWork").slider("value",0);	

		$("#edit-Task-PercentComplete").val('');
		$("#edit-Slider-PercentComplete").slider("value",0);
		
		//reposition form, hide overlay, and switch back to main display.
		$("#taskEdit").offset({ top: 0, left: 0 });			
		$("#taskEdit").toggle();		
		$(".task-Table-Overlay").toggle();
	}

 	function createTask(task)
 	{

		//replace & with %26
		var taskTitle = task.ows_Title.replace("&","%26");
		
 		//create query for batch request		
		var batchXML = '';

		batchXML += '<Batch OnError="Continue" ListVersion="1" ViewName="">';
		batchXML += '<Method ID="1" Cmd="New">';

		batchXML += '<Field Name="ID">New</Field>';
		batchXML += '<Field Name="Title">' + taskTitle +'</Field>';
		batchXML += '<Field Name="AssignedTo">' + task.ows_AssignedTo +'</Field>';		
		batchXML += '<Field Name="Status">' + taskStatusColumns[0] +'</Field>';
		batchXML += '<Field Name="Priority">' + task.ows_Priority+'</Field>';

		if (task.ows_StartDate)		
			batchXML += '<Field Name="StartDate">' + task.ows_StartDate+'</Field>';
		if (task.ows_DueDate)
			batchXML += '<Field Name="DueDate">' + task.ows_DueDate+'</Field>';

		batchXML += '<Field Name="Work">' + task.ows_Work+'</Field>';				
		batchXML += '<Field Name="PercentComplete">' + task.ows_PercentComplete+'</Field>';
			
		batchXML += '</Method>';
		batchXML += '</Batch>';
		
		//call CAPS with batch request to update list item
		$.ajax({
			url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data:{RequestType:'UpdateListItems',ListTitle:'Tasks',Batch:batchXML,OutputType:'json'},
			dataType: 'json',
			async:false,
			cache: false,
			type: 'POST',
			complete:function(xhr,status){
			},
			success:function(json){
				var newTaskID = json.NewDataSet.UpdateListItems.Results.Result.ID;
				task.ows_ID = newTaskID[1];
			}
		});
	}

	
 	function updateTask(task)
 	{
 		//create query for batch request		
		var batchXML = '';

		batchXML += '<Batch OnError="Continue" ListVersion="1" ViewName="">';
		batchXML += '<Method ID="1" Cmd="Update">';
		batchXML += '<Field Name="ID">' + task.ows_ID + '</Field>';
		batchXML += '<Field Name="AssignedTo">' + task.ows_AssignedTo +'</Field>';		
		batchXML += '<Field Name="Status">' + task.ows_Status +'</Field>';
		batchXML += '<Field Name="Priority">' + task.ows_Priority+'</Field>';
		if (task.ows_ActualStart)		
			batchXML += '<Field Name="ActualStart">' + task.ows_ActualStart+'</Field>';
		if (task.ows_ActualFinish)
			batchXML += '<Field Name="ActualFinish">' + task.ows_ActualFinish+'</Field>';
		if (task.ows_ActualWork)
			batchXML += '<Field Name="ActualWork">' + task.ows_ActualWork+'</Field>';
		else
			batchXML += '<Field Name="ActualWork">0</Field>';				
		if (task.ows_PercentComplete)
			batchXML += '<Field Name="PercentComplete">' + task.ows_PercentComplete+'</Field>';
		else
			batchXML += '<Field Name="PercentComplete">0</Field>';				
		batchXML += '</Method>';
		batchXML += '</Batch>';

		//call CAPS with batch request to update list item
		$.ajax({
			url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
			data:{RequestType:'UpdateListItems',ListTitle:'Tasks',Batch:batchXML,OutputType:'json'},
			dataType: 'json',
			async:false,
			cache: false,
			complete:function(xhr,status){
			},
			success:function(json){
			}
		});
	}

 	function overdue(task)
 	{
		var returnHTML = '';
 		
 		//get dates into primitive values for comparison against rightNow. 		
 		var thisStartDate = formatDate(task.ows_StartDate,'Primitive');
 		var thisDueDate = formatDate(task.ows_DueDate,'Primitive');
 		 	
 		if(task.ows_PercentComplete != 1 && thisDueDate < rightNow.valueOf())
 		{ 
			returnHTML += '<img class="task-PastDue" src="/CWPPM32/Images/flag_red.png" title="Task not completed - past due date: ' + formatDate(task.ows_DueDate,'MM-dd-yyyy') + '" />&nbsp;';
		}
	 	return returnHTML;
 	}
 		
 	function setHatColor(task, userNames)
 	{
		var taskUserIDs = task.attr("assignedTo");
		
		if (taskUserIDs.match('u'+cwVariables.CWUID+'|') != '')
		{
			task.children("#assignedHat").attr("src","/CWPPM32/Images/hat_green.png");		
			task.children("#assignedHat").attr("title",userNames);
		}
		else if (taskUserIDs == '0')
		{
			task.children("#assignedHat").attr("src","/CWPPM32/Images/hat_red.png");
			task.children("#assignedHat").attr("title",'Unassigned');
		}
		else
		{
			task.children("#assignedHat").attr("src","/CWPPM32/Images/hat_gray.png");		
			task.children("#assignedHat").attr("title",userNames);
		}
		
		//reapply assignedTo filter based on assignment selections from edit form
			
	}
	
	function addTaskStatusColumn(column, mapping)
	{
		var newStatusColumnHeaderHTML = '';
		var newStatusColumnDataHTML = '';
		//Build task column header
		newStatusColumnHeaderHTML += '<td class="statusColumn"';
		newStatusColumnHeaderHTML += 'id="'+column+'"><div class="ui-state-default ui-corner-all">';
		newStatusColumnHeaderHTML += column + '</div></td>';
		
		//Build task column data container
		
		newStatusColumnDataHTML += '<td><div class="task-instructions"></div>';
		newStatusColumnDataHTML += '<ul id="sortable" taskStatus="' + column + '" status="' + column +'" class="connectedSortable ui-corner-all">';
		newStatusColumnDataHTML += '</ul></td>';
		
		//Append the html to the table header and data rows.		
		$("#statusColumnHeaders").append(newStatusColumnHeaderHTML);
		$("#statusColumnData").append(newStatusColumnDataHTML);	
		
	}	
 	
	function addListItem(task, index)
	{
		var newListItemHTML = '';
		var assignedToNames = getAssignedToInfo(task.ows_AssignedTo,1);
		var assignedToIDs = getAssignedToInfo(task.ows_AssignedTo,0);
		var progressBarID = 'progressbar_' + task.ows_ID;
		var existingColumnHTML = '';

		newListItemHTML += '<li ';
		newListItemHTML += ' class="ui-state-default assignToDroppable ui-corner-all task-Item"';
		newListItemHTML += ' id="taskid_' + task.ows_ID + '"';
		newListItemHTML += ' taskArrayIndex="' + index + '"';
		newListItemHTML += ' taskTitle="' + task.ows_Title + '"';		
		newListItemHTML += ' taskStatus="' + task.ows_Status + '"';
		newListItemHTML += ' taskPriority="' + task.ows_Priority+ '"';
		newListItemHTML += ' complete="' + task.ows_PercentComplete + '"';
		newListItemHTML += ' assignedTo="'+ assignedToIDs + '"';
		newListItemHTML += '>';
		

		newListItemHTML += '<div class="ui-progressbar ui-progressbar-value progressbar" title="' + (task.ows_PercentComplete * 100) + '% complete" id="' + progressBarID + '"></div>';
		progressBarID = '#' + progressBarID;
		
		// Overdue indicators
		newListItemHTML += overdue(task);

		newListItemHTML += task.ows_Title + '<br/>';
		// Item ribbon with indicators and actions
		// Progress (Percent Complete
		// Status indicator
		var starRedShow = 'none';
		var starBlueShow = 'none';
		var starGreenShow = 'none';
		switch (task.ows_Priority)
		{
			case '(1) High':
				starRedShow="display";
				break;
			case '(2) Normal':
				starGreenShow="display";
				break;
			case '(3) Low':
				starBlueShow="display";
				break;
		}
		
		//Priority indicator - clickable
		var starID = 'Star_' + task.ows_ID;
		newListItemHTML += '<img style="display:'+starRedShow+'" id="red' + starID +'" taskColor="red" class="task-Priority-Star" src="/CWPPM32/Images/star_red.png" style="cursor:pointer;" title="High Priority - Click to Change" />'
		newListItemHTML += '<img style="display:'+starGreenShow+'" id="green' + starID +'" taskColor="green" class="task-Priority-Star" src="/CWPPM32/Images/star_green.png" style="cursor:pointer;" title="Normal Priority - Click to Change" />'
		newListItemHTML += '<img style="display:'+starBlueShow+'" id="blue' + starID +'" taskColor="blue" class="task-Priority-Star" src="/CWPPM32/Images/star_blue.png" style="cursor:pointer;" title="Low Priority - Click to Change" />'
		newListItemHTML += '&nbsp;'

		// Task assignment indicator
		if (assignedToIDs.match('u'+cwVariables.CWUID+'|') != '')
			newListItemHTML += '<img id="assignedHat" src="/CWPPM32/Images/hat_green.png" title="' + assignedToNames + '" />';		
		else if (assignedToIDs == '0')
			newListItemHTML += '<img id="assignedHat" src="/CWPPM32/Images/hat_red.png" title="Unassigned"/>';			
		else
			newListItemHTML += '<img id="assignedHat" src="/CWPPM32/Images/hat_gray.png" title="' + assignedToNames + '" />';
		
		newListItemHTML += '&nbsp;'
		
		//Edit and details icons - clickable
		var editID = 'Edit_' + task.ows_ID;
		newListItemHTML += '<img id="'+editID+'" class="editTask" src="/CWPPM32/Images/data_edit.png" style="cursor:pointer;" title="Edit Task" />&nbsp;';
		
		//toggle task details
		newListItemHTML += '<img class="toggleTaskDetails" src="/CWPPM32/Images/view.png" title="View Task Details" taskDetails="taskid_' + task.ows_ID + '_details" />';
		
		
		// Item details
		newListItemHTML += '<div id="taskid_' + task.ows_ID + '_details" class="task-Details">';
		
		newListItemHTML += '<div id="details-assignedTo">Assigned To: ' + assignedToNames + '</div>';

		var work = new Number(task.ows_Work);
		var actualWork = new Number(task.ows_ActualWork);
		newListItemHTML += '<div id="details-priority">Priority: ' + task.ows_Priority + '</div>';
		newListItemHTML += '<div id="details-startDate">Start Date: ' + formatDate(task.ows_StartDate,"MM-dd-yyyy")  + '</div>';
		newListItemHTML += '<div id="details-dueDate">Due Date: ' + formatDate(task.ows_DueDate,"MM-dd-yyyy")  + '</div>';
		if (task.ows_ActualStart)
			newListItemHTML += '<div id="details-actualStart">Actual Start: ' + formatDate(task.ows_ActualStart,"MM-dd-yyyy")  + '</div>';
		else
			newListItemHTML += '<div id="details-actualStart">Actual Start: </div>';					
		if (task.ows_ActualFinish)
			newListItemHTML += '<div id="details-actualFinish">Actual Finish: ' + formatDate(task.ows_ActualFinish,"MM-dd-yyyy")  + '</div>';
		else
			newListItemHTML += '<div id="details-actualFinish">Actual Finish: </div>';		

		newListItemHTML += '<div id="details-work">Work: ' + work.toFixed(2)  + '</div>';

		if (task.ows_ActualWork)
			newListItemHTML += '<div id="details-actualWork">Actual Work: ' + actualWork.toFixed(2)  + '</div>';
		else		
			newListItemHTML += '<div id="details-actualWork">Actual Work: 0.00</div>';

		if (task.ows_PercentComplete)
			newListItemHTML += '<div id="details-percentComplete">Percent Complete: ' + task.ows_PercentComplete * 100  + '</div>';
		else		
			newListItemHTML += '<div id="details-percentComplete">Percent Complete: 0</div>';
		
		newListItemHTML += '</div>';

		var taskStatusTableColumn = task.ows_Status;

		newListItemHTML += '</li>';
		
		//get the inner html of the current column
		existingColumnHTML = $('#statusColumnData td ul[status="' + taskStatusTableColumn + '"]').html();
		
		if($("#taskEdit").attr("mode") != 'new')  // append values to end of column
			$('#statusColumnData td ul[status="' + taskStatusTableColumn + '"]').append(newListItemHTML);
		else  // add new tasks to beginning of column
		{
			$('#statusColumnData td ul[status="' + taskStatusTableColumn + '"]').html(newListItemHTML + existingColumnHTML);
			$('#taskid_' + task.ows_ID).click();	
		}				

		$(progressBarID).progressbar({ value: (task.ows_PercentComplete * 100) });
		
	} 

function addUser(user)
{
	var optionFilterHTML = "";
	var optionListHTML = "";
	var userID = user.ID.value;
	var displayName = user.Name.value;
	
	optionFilterHTML = '<option value="u'+userID+'|">'+displayName +'</option>';
	editAssignedToListHTML = '<div><input type="checkbox" class="checkbox-AssignedTo" userID="'+userID+'" userName="'+displayName+'" />'+displayName +'</div>';
		
	if (cwVariables.CWUserID != displayName && displayName != 'System Account')
		$("#user-select").append(optionFilterHTML);
	
	if (displayName != 'System Account')
		$("#AssignedToSelector").append(editAssignedToListHTML );

}

function addPriorities(priority)
{
	var optionPriorities = "";
	optionPriorities = '<option value="'+priority+'">'+priority+'</option>';
	
	$("#new-Task-Priority").append(optionPriorities);

}

//break the ids and names out from the AssignedTo field value for use in displays, etc.
//nameOrID parameter value = 1 returns the names, all other values return the IDs.
function getAssignedToInfo(assignedTo, nameOrID)
{
		var assignedToArray = assignedTo.split(';#');
		var assignedToNames = '';
		var assignedToIDs = ''

		if (assignedTo != '')
		{
			for (var i = 0; i < assignedToArray.length; i = i + 2)
			{
				if (assignedToNames != '')
				{
					assignedToNames += ', ';
				}
				assignedToIDs += 'u'+assignedToArray[i]+'|';
				assignedToNames += assignedToArray[i + 1];		
			}    
		}
		else 
		{		
			assignedToNames = '{none}';
			assignedToIDs = '0';
		}	
		
		if (nameOrID == 1)
		{
			return assignedToNames;
		}
		else
		{
			return assignedToIDs;
		}
}


	function formatDate(date, dateFormat)
	{
		var dateParts;
		var	timeParts;
		var theDate;
		
		var year;
		var monthText;
		var day;
		var hour;
		var minute;
		
		if (date){
			dateParts = (date.slice(0,10)).split('-');
			timeParts = (date.slice(12)).split(':');
			
			year = dateParts[0];
			month = dateParts[1];
			
			switch(month)
			{
				case '01':
					monthText = 'Jan';
					break;
				case '02':
					monthText = 'Feb';
					break;
				case '03':
					monthText = 'Mar';
					break;
				case '04':
					monthText = 'Apr';
					break;
				case '05':
					monthText = 'May';
					break;
				case '06':
					monthText = 'Jun';
					break;
				case '07':
					monthText = 'Jul';
					break;
				case '08':
					monthText = 'Aug';
					break;
				case '09':
					monthText = 'Sep';
					break;
				case '10':
					monthText = 'Oct';
					break;
				case '11':
					monthText = 'Nov';
					break;
				case '12':
					monthText = 'Dec';
					break;			
			}
	
			day = dateParts[2];
			
			hour = timeParts[0];
			minute = timeParts[1];
			
			switch(dateFormat)
			{
				case 'dd/MM/yyyy':
					theDate = day+"/"+month+"/"+year;
					break;
				case 'dd-MM-yyyy':
					theDate = day+"-"+month+"-"+year;
					break;					
				case 'MM/dd/yyyy':
					theDate = month+"/"+day+"/"+year;
					break;
				case 'MM-dd-yyyy':
					theDate = month+"-"+day+"-"+year;
					break;
				case 'MMM d, yyyy':
					theDate = monthText+" "+day+", "+year;	
					break;
				case 'UTC':
					theDate = new Date(year, month-1, day, hour, minute,0,0);
					break;
				case 'Primitive':
					theDate = new Date(year, month-1, day, hour, minute,0,0).valueOf();
					break;				 
			}	
			
			return theDate;}
		else
			return date;
			
	}
	function taskTableOverlayResize()
	{
			//get dimensions of task board for transparent overlay
			var overlayWidth = $("#tasksTable").outerWidth();
			var overlayHeight = $("#tasksTable").outerHeight();
			$(".task-Table-Overlay").width(overlayWidth);
			$(".task-Table-Overlay").height(overlayHeight);
	
	}
