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

//
//
//
//
String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

//
//
//
//
$(document).ready(function () {
    // format date controls
    $('#startDate').datepicker({
        dateFormat: 'mm-dd-yy',
        showAnim: 'slideDown',
        showOn: 'button',
        buttonImage: imgRoot + 'calendar.png',
        buttonImageOnly: true,
        //SharePoint Friendly format for updating
        altField: "#alt-Start",
        altFormat: "yy-mm-dd"
    });
    $('#dueDate').datepicker({
        dateFormat: 'mm-dd-yy',
        showAnim: 'slideDown',
        showOn: 'button',
        buttonImage: imgRoot + 'calendar.png',
        buttonImageOnly: true,
        //SharePoint Friendly format for updating
        altField: "#alt-Due",
        altFormat: "yy-mm-dd"
    });
    $('#actualStartDate').datepicker({
        dateFormat: 'mm-dd-yy',
        showAnim: 'slideDown',
        showOn: 'button',
        buttonImage: imgRoot + 'calendar.png',
        buttonImageOnly: true,
        //SharePoint Friendly format for updating
        altField: "#alt-ActualStart",
        altFormat: "yy-mm-dd"
    });
    $('#finishDate').datepicker({
        dateFormat: 'mm-dd-yy',
        showAnim: 'slideDown',
        showOn: 'button',
        buttonImage: imgRoot + 'calendar.png',
        buttonImageOnly: true,
        //SharePoint Friendly format for updating
        altField: "#alt-Finish",
        altFormat: "yy-mm-dd"
    });

    //get current user
    $.ajax({
        url: urlCAPS,
        data: { RequestType: 'CheckVariables', XsltLocation: '[SRA Root]/Resources/TaskBoard_2/TaskBoardCWVariables.xslt', OutputType: 'json' },
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
        data: { RequestType: 'GetListInfo', ListTitle: 'Tasks', XsltLocation: '[SRA Root]/Resources/TaskBoard_2/TaskBoardColumns.xslt', OutputType: 'json' },
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
    for (var i = 0; i < taskPriorities.length; i++) {
        addPriorities(taskPriorities[i]);
    }


    /* Load Data from Server */
    $.ajax({
        url: urlCAPS,
        data: {
            RequestType: 'BatchRequest',
            ConfigFileLocation: '[SRA Root]/Resources/TaskBoard_2/TaskBoardCBD_2.xml',
            XsltLocation: '[SRA Root]/Resources/TaskBoard_2/TaskBoardXSLT.xslt',
            OutputType: 'json'
        },
        dataType: 'json',
        async: false,
        cache: false,
        error: function () {
            alert('error');
        },
        complete: function (xhr, status) {

        },
        success: function (json) {
            if (json.NewDataSet.Tasks !== null) {
                tasksData = json.NewDataSet.Tasks
            }
        }
    });

    $.each($(tasksData.Task).toArray(), function (indx, task) {
        task.ows_Title = task.ows_Title.replace('%26', '&');
        addListItem(task, indx);
        taskTitles.push(task.ows_Title);
    });


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
            var login;
            siteUsers = json.NewDataSet.GetSiteUsers.SPUser;
            $.each(siteUsers, function (indx, user) {
                if (user.LoginName.value.split('#.w|').length == 1) {
                    login = user.Name.value
                }
                else {
                    login = user.LoginName.value.split('#.w|')[1];
                }

                if (user.Name.value != 'System Account' && user.IsDomainGroup.value == false) {
                    $('#assignedTo').append($('<option>', {
                        value: user.ID.value + ';#' + user.Name.value,
                        text: user.Name.value,
                        userid: user.ID.value,
                        username: user.Name.value,
                        userLogin: login
                    }));
                }
            });
            $("select#assignedTo").pqSelect({
                multiplePlaceholder: 'Select Assignee(s)',
                checkbox: true,
                maxDisplay: 20,
                width: 246,
                minWidth: 246
            });

        }
    });


    //populate the dropdowns in the filter and edit form

    for (var i = 0; i < siteUsers.length; i++){
        addUser(siteUsers[i]);
    }



    // TODO: Not working
    if (projectDetails.length !== 0) {
        var pmArray = projectDetails.ows_ProjectManagers.split(';#');
        for (var i = 0; i < pmArray.length; i = i + 2) {
            //$('#projectManagers').append('<li id="draggablePerson" class="ui-state-highlight">' + pmArray[i + 1] + '</li>');
        }
    }

    $('.searchTasks').autocomplete({
        source: taskTitles
    });

    $('.searchTasks').click(function () {
        $(this).val('');
        $(this).css('color', '#f6931f').css('font-style', 'normal');
    });

    $('.searchTasks').change(function () {
        //filter the task board by the task titles
        $(".task-Item").hide();
        $(".task-Item[taskTitle *= '" + $(this).val() + "']").show();
        $(".activeFilter").text('by Task Titles');
    });


    var $taskTitle = $('#taskTitle');
    $taskTitle.focus(function () {
        $(this).select();//on focus selects all start text in task title field
    });
    
    $taskTitle.on('change', function (e) {
        if ($taskTitle.val() != '') {
            $taskTitle.parent().removeClass('cw-input-error');
            $('#taskDialogStatus').removeClass().html('');
        }
    });


    //highlight select task item
    $('.task-Item').on("click", function () {
        if ($('.task-Item').hasClass('ui-state-highlight'))
            $('.task-Item').removeClass('ui-state-highlight');

        $(this).toggleClass("ui-state-highlight");
    });


    //toggle all task item progress bars on board
    $("#toggleProgressBars").click(function () {
        $(".ui-progressbar").toggle();
    });

    //toggle all task details on board.
    $("#toggleDetails").click(function () {
        if ($(this).is(':checked'))
            $(".task-Details").show();
        else
            $(".task-Details").hide();

    });

	setupTaskPriortyStars();

    $('#newTask').click(function () {

        $("#taskEdit").attr("mode", "new");
        $("#startDate").datepicker("setDate", rightNow);
        $("#dueDate").datepicker("setDate", rightNow);

        var formData = { taskID: null, formTitle: 'Create New Task' }
        showTaskDialog(formData);
    });


    //double click event to edit task item
    $(".task-Item").on("dblclick", function () {
        var taskID = getTaskID(this.id);
        $("#taskEdit").attr("mode", "edit");
        var formData = { taskID: taskID, formTitle: 'Edit Task' };
        showTaskDialog(formData);

    });

	setupEditTaskClick();
	setupToggleTaskDetailsClick();

    $("#toggleAssignedToSelector").click(function () {
        $("#AssignedToText").toggle();
        $("#AssignedToSelector").toggle();

    });
    $(".checkbox-AssignedTo-All").click(function () {
        $(".checkbox-AssignedTo").attr('checked', this.checked);
    });

    //cancel edit and return to task board
    $("#closeEdit").click(function () {
        closeEditForm();
    });

    $("#pastdue-filter > img").click(function () {
        $("#user-select").hide();
        $(".activeFilter").text(this.id + ' Tasks');

        switch (this.id) {
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

    });

    $("#priority-filter > img").click(function () {

        var filterPriority = $(this).attr("filterColor");
        $("#user-select").hide();
        $(".activeFilter").text(this.id + ' Tasks');

        //show all tasks before deciding which to hide
        $(".task-Item").show();
        //show only selected tasks
        switch (filterPriority) {
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

    });

    $("#assignment-filter > img").click(function () {
        filterByAssigned(this.id);
        $(".activeFilter").text(this.id + ' Tasks');


    });

    function filterByAssigned(filter) {
        switch (filter) {
            case 'Unassigned':
                //hide all tasks before		
                $(".task-Item").hide();
                $(".task-Item[assignedTo = '0']").show();
                $("#user-select").hide();
                break;
            case 'My':
                $(".task-Item").hide();
                $(".task-Item[assignedTo *= 'u" + cwVariables.CWUID + "|']").show();
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

    $("#user-select").change(function () {
        var userID = $(this).val()
        if (userID != 'Select') {
            $(".task-Item").hide();
            $(".task-Item[assignedTo *='" + userID + "']").show();
            $(".activeFilter").text($('#user-select option:selected').html() + '\'s Tasks');//Gets the text value from the selected option

        }
    });

    $(".connectedSortable").sortable({
        connectWith: ".connectedSortable",
        stop: function (event, ui) {
            var taskID = getTaskID(ui.item[0].id);
            var taskItemIndex = ui.item.attr("taskArrayIndex");
            var taskItem = tasksData.Task[taskItemIndex];
            var taskDetails = $("#taskid_" + taskID + "_details");

            if (ui.item.attr('taskStatus') != ui.item.parent().attr('taskStatus')) {
                var newPercent = ui.item.attr('complete'); // Use current value unless overridden below
                var newActualWork= ui.item.attr('actualwork');
                if (ui.item.parent().attr('taskStatus') == 'In Progress' && ui.item.attr('complete') < .25) {
                    newPercent = .25;
                }
                if (ui.item.parent().attr('taskStatus') == 'In Progress' && ui.item.attr('complete') > .75) {
                    newPercent = .75;
                }
                if (ui.item.parent().attr('taskStatus') == 'Completed' && ui.item.attr('complete') < 1) {
                    newPercent = 1;
                }
                if (ui.item.parent().attr('taskStatus') == 'Not Started' && ui.item.attr('complete') > .0) {
                	newActualWork = 0;
                    newPercent = 0;
                }
                ui.item.attr('taskStatus', ui.item.parent().attr('taskStatus'));
                ui.item.attr('complete', newPercent);
                ui.item.attr('actualwork', newActualWork);

                //update progressbar in display
                $(ui.item.children(".progressbar").progressbar({ value: (newPercent * 100) }));

                //update task array in memory and displayed values
                taskItem.ows_Status = ui.item.parent().attr('taskStatus');

                taskItem.ows_PercentComplete = newPercent;
                $(taskDetails).children("#details-percentComplete").text("Percent Complete: " + newPercent * 100);

				taskItem.ows_ActualWork = newActualWork;
				$(taskDetails).children("#details-actualWork").text("Actual Work: " + newActualWork);
				
                //assigned task to current user if unassigned and update array and display.
                if (taskItem.ows_AssignedTo == '') {
                    taskItem.ows_AssignedTo = cwVariables.CWUID + ';#' + cwVariables.CWUserID;
                    $(taskDetails.children("#details-assignedTo").text('Assigned To: ' + cwVariables.CWUserID));
                    $(ui.item.children("#Unassigned").attr("title", cwVariables.CWUserID));
                    $(ui.item.attr("assignedTo", 'u' + cwVariables.CWUID + '|'));
                    setHatColor(ui.item, cwVariables.CWUserID);
                }

                //update task item in data container (SharePoint List)
                updateTask(taskItem, function (result, msg) {
                    if (result == false) {
                        alert('Error saving task\n' + msg);
                    }
                });
                
                $("#taskEdit").attr("mode", "edit");
                var formData = { taskID: taskID, formTitle: 'Edit Task' };
        		showTaskDialog(formData);


            }
        }

    }).droppable({
        hoverClass: 'ui-state-highlight'
    }).disableSelection();

    
    $(".connectedSortable").height($("#statusColumnData > td").height());

	$("#complete").change(function () {
    	$("#completeSlider").slider("value", $(this).val());
	});

	$("#completeSlider").slider({
	    value: 0,
	    min: 0,
	    max: 100,
	    step: 10,
	    slide: function (event, ui) {
	        $("#complete").val(ui.value);
	    }
	});
	
	
	$("#taskWork").change(function () {
	    $("#taskWorkSlider").slider("value", $(this).val());
	});

	$("#taskWorkSlider").slider({
	    value: 0,
	    min: 0,
	    step: .25,
	    slide: function (event, ui) {
	        $("#taskWork").val((ui.value).toFixed(2));
	    }
	});

	
	
	$("#actualWork").change(function () {
	    $("#actualWorkSlider").slider("value", $(this).val());
	});

	$("#actualWorkSlider").slider({
	    value: 0,
	    min: 0,
	    step: .25,
	    slide: function (event, ui) {
	        $("#actualWork").val((ui.value).toFixed(2));
	    }
	});

    filterByAssigned('Mine');
    $("#My").click();

});

// name: setupToggleTaskDetailsClick
//
//
//
function setupToggleTaskDetailsClick() {

	$('.toggleTaskDetails').unbind('click');
    $('.toggleTaskDetails').on('click', function () {
        var details = $('#' + $(this).attr('taskDetails'));
        details.toggle();
    });
}

// name: setupEditTaskClick
//
//
//
function setupEditTaskClick() {
    //single click event to edit task item from edit icon
    $('.editTask').unbind('click');
    $('.editTask').on('click', function () {
        var taskID = getTaskID(this.id);
        $('#taskEdit').attr('mode', 'edit');
        var formData = { taskID: taskID, formTitle: 'Edit Task' };
        showTaskDialog(formData);
    });
}

// name: setupTaskPriortyStars
//
//
//
function setupTaskPriortyStars() {

    //clicking on star icons changes task priority
    //updates task-Item.taskPriority attribute for filtering, display, tasksData array, and data container
    $('.task-Priority-Star').unbind('click');
    $('.task-Priority-Star').on('click', function () {

        var taskID = getTaskID(this.id);
        var task = $('#taskid_' + taskID);
        var taskItemIndex = task.attr('taskArrayIndex');
        var taskItem = tasksData.Task[taskItemIndex];
        var star_Color = $(this).attr('taskColor');

        switch (star_Color) {
            case 'green':
                $(this).toggle();
                $('#redStar_' + taskID).toggle();
                tasksData.Task[taskID - 1].ows_Priority = "(1) High";
                break;
            case 'red':
                $(this).toggle();
                $('#blueStar_' + taskID).toggle();
                tasksData.Task[taskID - 1].ows_Priority = "(3) Low";
                break;
            case 'blue':
                $(this).toggle();
                $('#greenStar_' + taskID).toggle();
                tasksData.Task[taskID - 1].ows_Priority = "(2) Normal";
                break;
        }
        //update array
        $("#taskid_" + taskID).attr("taskPriority", tasksData.Task[taskID - 1].ows_Priority);
        //update task item on display
        $("#taskid_" + taskID + "_details > #details-priority").text("Priority: " + tasksData.Task[taskID - 1].ows_Priority);
        //update the task list
        updateTask(taskItem, function (result, msg) {
            if (result == false) {
                alert('Error saving task\n' + msg);
            }
        });
    });
}

//get the ID of a selected task 
function getTaskID(taskID) {
    return taskID.match(/\d+/g);
}

// name: dateThis
// by: 
// date:
// purpose: 
function dateThis(intDate) {
    if (intDate == null || intDate == 'undefined') {
        return '{none}';
    }
    else {
        var gmt_date = new Date(parseInt(intDate.substring(6, 19)));
        return gmt_date.toDateString();
    }
}

// name: editTask
// by: 
// date:
// purpose: 
function editTask(taskID) {
    var task = $("#taskid_" + taskID);
    //var i = task.attr("taskArrayIndex");
    var taskItemArray = $.grep(tasksData.Task, function (task, indx) {
        return task.ows_ID == taskID;
    });
    var taskItem = taskItemArray[0];

    if (taskItem.ows_AssignedTo) {
        assignedTo = taskItem.ows_AssignedTo.split(';#');
        $.each(assignedTo, function (indx, val) {
            $('#assignedTo option[username="' + val + '"]').prop('selected', 1);
        });
        $('#assignedTo').pqSelect('refreshData');
    }

    var startDate = formatDate(taskItem.ows_StartDate, "MM-dd-yyyy");
    var dueDate = formatDate(taskItem.ows_DueDate, "MM-dd-yyyy");
    var actualStartDate = formatDate(taskItem.ows_ActualStart, "MM-dd-yyyy");
    var actualFinishDate = formatDate(taskItem.ows_ActualFinish, "MM-dd-yyyy");
    var taskWork = new Number(taskItem.ows_Work);
    var actualWork;
    var percentComplete;

    if (taskItem.ows_ActualWork)
        actualWork = new Number(taskItem.ows_ActualWork);
    else
        actualWork = new Number(0);

    if (taskItem.ows_PercentComplete)
        percentComplete = new Number(taskItem.ows_PercentComplete * 100);
    else
        percentComplete = new Number(0);


    $("#taskTitle").val(taskItem.ows_Title);
    //$("#AssignedToText").text(assignedToText);
    $("#priority").val(taskItem.ows_Priority);
    $("#startDate").val(startDate).datepicker('option', 'disabled', true).parent().addClass('cw-disabled');
    $("#dueDate").val(dueDate).datepicker('option', 'disabled', true).parent().addClass('cw-disabled');
    $('#actualStartDateWrapper').removeClass('cw-hide');
    $('#actualStartDate').val(actualStartDate);
    $('#finishDateWrapper').removeClass('cw-hide');
    $('#finishDate').val(actualFinishDate);		
    $("#actualWork").val(actualWork.toFixed(2));
    $("#actualWorkSlider").slider("value", actualWork);    
    $("#complete").val(percentComplete.toFixed(0));
    $("#completeSlider").slider("value", percentComplete);
}


// name: saveTask
// by: 
// date:
// purpose: 
function saveTask(taskID, callback) {

    var mode = $("#taskEdit").attr("mode");

    var taskItem;
    var taskDisplay;
    var taskDisplayDetails;
    var percentComplete;

    // gets an array of user logins
    var names = '';
    var assignedToNames = '';
    var assignedToIDs = '';
    var selectedNames = $('#assignedTo').pqSelect().val();
    if (selectedNames != null) {
        $.each(selectedNames, function (indx, val) {
            names += val + ';#'
        });

        names = names.slice(0, -2); // remove the last semi-colon
        assignedToNames = getAssignedToInfo(names, 1); // parse the user names
        assignedToIDs = getAssignedToInfo(names, 0);  //parse the user IDs
    }


    //Check mode of input form and update existing task or create new task		
    if (mode == 'edit')  //update existing task
    {
        var taskItemArray = $.grep(tasksData.Task, function (task, indx) {
            return task.ows_ID == taskID;
        });
        var taskItem = taskItemArray[0];

        taskDisplay = $("#taskid_" + taskID);
        taskDisplayDetails = $("#taskid_" + taskID + "_details");
        percentComplete = $("#completeSlider").slider("value");

        //update tasks array
        taskItem.ows_ActualStart = $("#alt-ActualStart").val();
        taskItem.ows_ActualFinish = $("#alt-Finish").val();
        taskItem.ows_ActualWork = $("#actualWork").val();
        taskItem.ows_PercentComplete = percentComplete / 100;
        taskItem.ows_AssignedTo = names;
        taskItem.ows_Priority = $("#priority").val();

        //update task item displayed values
        taskDisplay.attr("assignedTo", assignedToIDs);
        setHatColor(taskDisplay, assignedToNames);  // change the color of the Assigned To hat icon based on the users edit form selections.

        var actualStart = $("#actualStartDate").val();
        var actualFinish = $("#finishDate").val();

        taskDisplayDetails.children("#details-actualStart").html("<span>Actual Start:</span>" + actualStart);
        taskDisplayDetails.children("#details-actualFinish").html("<span>Actual Finish:</span>" + actualFinish);
        taskDisplayDetails.children("#details-actualWork").html("<span>Actual Work:</span>" + taskItem.ows_ActualWork);
        taskDisplayDetails.children("#details-percentComplete").html("<span>% Complete:</span>" + percentComplete);
        taskDisplayDetails.children("#details-priority").html("<span>Priority:</span>" + taskItem.ows_Priority);
        taskDisplayDetails.children('#details-assignedTo').children("#name-wrapper").html(getAssignedToInfo(taskItem.ows_AssignedTo, 1).replaceAll(', ', '<br/>'));

        // set the star color
        switch (taskItem.ows_Priority) {
            case '(1) High':
                $("#redStar_" + taskItem.ows_ID).css('display', 'inline-block');
                $("#greenStar_" + taskItem.ows_ID).css('display', 'none');
                $("#blueStar_" + taskItem.ows_ID).css('display', 'none');
                break;
            case '(2) Normal':
                $("#redStar_" + taskItem.ows_ID).css('display', 'none');
                $("#greenStar_" + taskItem.ows_ID).prop('display', 'inline-block');
                $("#blueStar_" + taskItem.ows_ID).prop('display', 'none');
                break;
            case '(3) Low':
                $("#redStar_" + taskItem.ows_ID).css('display', 'none');
                $("#greenStar_" + taskItem.ows_ID).css('display', 'none');
                $("#blueStar_" + taskItem.ows_ID).css('display', 'inline-block');
                break;
        }
        // move the task to the completed column
        var $activeTask = $('#taskid_' + taskItem.ows_ID);
        var statusColumn = $activeTask.parent().attr('status');
        if ($activeTask.attr('taskstatus') == 'In Progress' || $activeTask.attr('taskstatus') == 'Completed' || $activeTask.attr('taskstatus') == 'Not Started') {

            switch (percentComplete) {
                case 100:
                    $activeTask.attr('taskstatus', 'Completed');
                    if (statusColumn != $activeTask.attr('taskstatus')) {
                        $activeTask.detach().appendTo('#statusColumnData td ul[status="Completed"]').fadeIn(700, function () { });
                        taskDisplayDetails.children(".toggleTaskDetails").trigger('click');
                    }
                    break;
                case 0:
                    $activeTask.attr('taskstatus', 'Not Started');
                    if (statusColumn != $activeTask.attr('taskstatus')) {
                        $activeTask.detach().appendTo('#statusColumnData td ul[status="Not Started"]').fadeIn(700, function () { });
                    }
                    break;
                default:
                    $activeTask.attr('taskstatus', 'In Progress');
                    if (statusColumn != $activeTask.attr('taskstatus')) {
                        var $animateDiv = $('#movingTask');
                        $activeTask.detach().appendTo('#statusColumnData td ul[status="In Progress"]').fadeIn(700, function () { });
                    }
                    break;
            }
        }
        taskItem.ows_Status = $activeTask.attr('taskstatus');
        updateTask(taskItem, function (result, msg) {
            if (result == true) {
                callback(true, msg);
            }
            else {
                callback(false, msg);
            }
        });

    }
    else  //create new task
    {
        taskItem = new taskObject();
        taskItem.ows_ActualFinish = '';
        taskItem.ows_ActualStart = '';
        taskItem.ows_ActualWork = 0;
        taskItem.ows_AssignedTo = names;
        taskItem.ows_Description = '';
        taskItem.ows_DueDate = $("#alt-Due").val();
        taskItem.ows_ID = '';
        taskItem.ows_IsSummaryTask = '';
        taskItem.ows_PercentComplete = 0;
        taskItem.ows_Predecessors = '';
        taskItem.ows_Priority = $("#priority").val();
        taskItem.ows_StartDate = $("#alt-Start").val();
        taskItem.ows_Status = taskStatusColumns[0];
        taskItem.ows_Title = $("#taskTitle").val();
        if ($("#taskWork").val() > 0) {
            taskItem.ows_Work = $("#taskWork").val();
        }
        else {
            taskItem.ows_Work = 0;
        }

        //var newTask = addItemToTasksData(taskItem);


        //add task title to the autocomplete array
        taskTitles.push(taskItem.ows_Title);


        //add the task to the task data list
        createTask(taskItem, function (result, data) {
            if (result == true) {
                var newTaskID = data.NewDataSet.UpdateListItems.Results.Result.ID;
                taskItem.ows_ID = newTaskID[1];
                addItemToTasksData(taskItem, function (indx) {
            		addListItem(taskItem, indx);
        			callback(true, data);
        		}); 
            }
            else {
                callback(false, data);
            }
        });


       // addItemToTasksData(taskItem, function (indx) {
       //     //addListItem(taskItem, tasksData.length - 1);
        //    addListItem(taskItem, indx);
      //  });
        //add the task to the display
    }
}


// name: addItemToTasksData
// by: 
// date:
// purpose: 
function addItemToTasksData(taskItem, callback) {
    var indx = $(tasksData.Task).toArray().length;
    //var taskItemArray = $(tasksData.Task).toArray();
    //taskItemArray.push(new taskObject());

	//taskItemArray.push(taskItem);
	tasksData.Task.push(taskItem);

    //return (taskItemArray[index]);
    callback(indx);
}

// name: taskItem
// by: 
// date:
// purpose: 
function taskObject() {
    this.ows_ActualFinish = '',
	this.ows_ActualStart = '',
	this.ows_ActualWork = '',
	this.ows_AssignedTo = '',
	this.ows_Description = '',
	this.ows_DueDate = '',
	this.ows_ID = '',
	this.ows_IsSummaryTask = '',
	this.ows_PercentComplete = '',
	this.ows_Predecessors = '',
	this.ows_Priority = '',
	this.ows_StartDate = '',
	this.ows_Status = '',
	this.ows_Title = '',
	this.ows_Work = ''
}


// name: createTask
// by: 
// date:
// purpose: 
function createTask(task, callback) {

    //replace & with %26
    var taskTitle = task.ows_Title.replace("&", "%26");

    //create query for batch request		
    var batchXML = '';

    batchXML += '<Batch OnError="Continue" ListVersion="1" ViewName="">';
    batchXML += '<Method ID="1" Cmd="New">';
    batchXML += '<Field Name="ID">New</Field>';
    batchXML += '<Field Name="Title">' + taskTitle + '</Field>';
    batchXML += '<Field Name="AssignedTo">' + task.ows_AssignedTo + '</Field>';
    batchXML += '<Field Name="Status">' + taskStatusColumns[0] + '</Field>';
    batchXML += '<Field Name="Priority">' + task.ows_Priority + '</Field>';


    if (task.ows_StartDate)
        batchXML += '<Field Name="StartDate">' + task.ows_StartDate + '</Field>';
    if (task.ows_DueDate)
        batchXML += '<Field Name="DueDate">' + task.ows_DueDate + '</Field>';

    batchXML += '<Field Name="Work">' + task.ows_Work + '</Field>';
    batchXML += '<Field Name="PercentComplete">' + task.ows_PercentComplete + '</Field>';

    batchXML += '</Method>';
    batchXML += '</Batch>';

    //call CAPS with batch request to update list item
    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { RequestType: 'UpdateListItems', ListTitle: 'Tasks', Batch: batchXML, OutputType: 'json' },
        dataType: 'json',
        async: false,
        cache: false,
        type: 'POST',
        error: function (xhr, status, msg) {
            callback(false, msg);
        },
        success: function (json) {
            callback(true, json);
        }
    });
}

// name: updateTask
// by: 
// date:
// purpose: 
function updateTask(task, callback) {
    //create query for batch request		
    var batchXML = '';

    batchXML += '<Batch OnError="Continue" ListVersion="1" ViewName="">';
    batchXML += '<Method ID="1" Cmd="Update">';
    batchXML += '<Field Name="ID">' + task.ows_ID + '</Field>';
    batchXML += '<Field Name="AssignedTo">' + task.ows_AssignedTo + '</Field>';
    batchXML += '<Field Name="Status">' + task.ows_Status + '</Field>';
    batchXML += '<Field Name="Priority">' + task.ows_Priority + '</Field>';
    if (task.ows_ActualStart)
        batchXML += '<Field Name="ActualStart">' + task.ows_ActualStart + '</Field>';
    if (task.ows_ActualFinish)
        batchXML += '<Field Name="ActualFinish">' + task.ows_ActualFinish + '</Field>';
    if (task.ows_ActualWork)
        batchXML += '<Field Name="ActualWork">' + task.ows_ActualWork + '</Field>';
    else
        batchXML += '<Field Name="ActualWork">0</Field>';
    if (task.ows_PercentComplete)
        batchXML += '<Field Name="PercentComplete">' + task.ows_PercentComplete + '</Field>';
    else
        batchXML += '<Field Name="PercentComplete">0</Field>';
    batchXML += '</Method>';
    batchXML += '</Batch>';

    //call CAPS with batch request to update list item
    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { RequestType: 'UpdateListItems', ListTitle: 'Tasks', Batch: batchXML, OutputType: 'json' },
        dataType: 'json',
        async: false,
        cache: false,
        complete: function (xhr, status) {

        },
        success: function (json) {
            callback(true, json)
        },
        error: function (xhr, status, msg) {
            callback(false, msg);
        }
    });
}

// name: overdue
// by: 
// date:
// purpose: 
function overdue(task) {
    var returnHTML = '';

    //get dates into primitive values for comparison against rightNow. 		
    var thisStartDate = formatDate(task.ows_StartDate, 'Primitive');
    var thisDueDate = formatDate(task.ows_DueDate, 'Primitive');

    if (task.ows_PercentComplete != 1 && thisDueDate < rightNow.valueOf()) {
        returnHTML += '<img class="task-PastDue" src="' + imgRoot + 'flag_red.png" title="Task not completed - past due date: ' + formatDate(task.ows_DueDate, 'MM-dd-yyyy') + '" />&nbsp;';
    }
    return returnHTML;
}

// name: setHatColor
// by: 
// date:
// purpose: 
function setHatColor(task, userNames) {
    var taskUserIDs = task.attr("assignedTo");

	if (taskUserIDs == undefined ){
		taskUserIDs = '0';
	}
	
    if (taskUserIDs.match('u' + cwVariables.CWUID + '|') != '') {
        task.children("#assignedHat").attr("src", imgRoot + "hat_green.png");
        task.children("#assignedHat").attr("title", userNames);
    }
    else if (taskUserIDs == '0') {
        task.children("#assignedHat").attr("src", imgRoot + "hat_red.png");
        task.children("#assignedHat").attr("title", 'Unassigned');
    }
    else {
        task.children("#assignedHat").attr("src", imgRoot + "hat_gray.png");
        task.children("#assignedHat").attr("title", userNames);
    }

    //reapply assignedTo filter based on assignment selections from edit form

}

// name: addTaskStatusColumn
// by: 
// date:
// purpose: 
function addTaskStatusColumn(column, mapping) {
    var newStatusColumnHeaderHTML = '';
    var newStatusColumnDataHTML = '';
    //Build task column header
    newStatusColumnHeaderHTML += '<td class="statusColumn"';
    newStatusColumnHeaderHTML += 'id="' + column + '"><div class="ui-state-default ui-corner-all">';
    newStatusColumnHeaderHTML += column + '</div></td>';

    //Build task column data container

    newStatusColumnDataHTML += '<td><div class="task-instructions"></div>';
    newStatusColumnDataHTML += '<ul id="sortable" taskStatus="' + column + '" status="' + column + '" class="connectedSortable ui-corner-all">';
    newStatusColumnDataHTML += '</ul></td>';

    //Append the html to the table header and data rows.		
    $("#statusColumnHeaders").append(newStatusColumnHeaderHTML);
    $("#statusColumnData").append(newStatusColumnDataHTML);

}

// name: addListItem
// by: 
// date:
// purpose: 
function addListItem(task, index) {
    var newListItemHTML = '';
    var assignedToNames = getAssignedToInfo(task.ows_AssignedTo,1);
    var assignedToIDs = getAssignedToInfo(task.ows_AssignedTo,0);
    var progressBarID = 'progressbar_' + task.ows_ID;
    var existingColumnHTML = '';

    newListItemHTML += '<li ';
    //newListItemHTML += ' class="ui-state-default assignToDroppable ui-corner-all task-Item"';
    newListItemHTML += ' class="assignToDroppable ui-corner-all task-Item"';
    newListItemHTML += ' id="taskid_' + task.ows_ID + '"';
    newListItemHTML += ' taskArrayIndex="' + index + '"';
    newListItemHTML += ' taskTitle="' + task.ows_Title + '"';
    newListItemHTML += ' taskStatus="' + task.ows_Status + '"';
    newListItemHTML += ' taskPriority="' + task.ows_Priority + '"';
    newListItemHTML += ' complete="' + task.ows_PercentComplete + '"';
    newListItemHTML += ' assignedTo="'+ assignedToIDs + '"';
    newListItemHTML += ' actualWork="'+ task.ows_ActualWork + '"';
    newListItemHTML += '>';


	var percentComplete = Number(task.ows_PercentComplete * 100).toFixed(0);
    newListItemHTML += '<div class="ui-progressbar ui-progressbar-value progressbar" title="' + percentComplete  + '% complete" id="' + progressBarID + '"></div>';
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
    switch (task.ows_Priority) {
        case '(1) High':
            starRedShow = "display";
            break;
        case '(2) Normal':
            starGreenShow = "display";
            break;
        case '(3) Low':
            starBlueShow = "display";
            break;
    }

    //Priority indicator - clickable
    var starID = 'Star_' + task.ows_ID;
    newListItemHTML += '<img style="display:' + starRedShow + '" id="red' + starID + '" taskColor="red" class="task-Priority-Star" src="' + imgRoot + 'star_red.png" style="cursor:pointer;" title="High Priority - Click to Change" />'
    newListItemHTML += '<img style="display:' + starGreenShow + '" id="green' + starID + '" taskColor="green" class="task-Priority-Star" src="' + imgRoot + 'star_green.png" style="cursor:pointer;" title="Normal Priority - Click to Change" />'
    newListItemHTML += '<img style="display:' + starBlueShow + '" id="blue' + starID + '" taskColor="blue" class="task-Priority-Star" src="' + imgRoot + 'star_blue.png" style="cursor:pointer;" title="Low Priority - Click to Change" />'
    newListItemHTML += '&nbsp;'

    // Task assignment indicator
    if (assignedToIDs.match('u'+cwVariables.CWUID+'|') != '')
        newListItemHTML += '<img id="assignedHat" src="' + imgRoot +'hat_green.png" title="' + assignedToNames + '" />';		
    else if (assignedToIDs == '0')
        newListItemHTML += '<img id="assignedHat" src="' + imgRoot +'hat_red.png" title="Unassigned"/>';			
    else
        newListItemHTML += '<img id="assignedHat" src="' + imgRoot +'hat_gray.png" title="' + assignedToNames + '" />';
    newListItemHTML += '&nbsp;'

    //Edit and details icons - clickable
    var editID = 'Edit_' + task.ows_ID;
    newListItemHTML += '<img id="' + editID + '" class="editTask" src="' + imgRoot + 'data_edit.png" style="cursor:pointer;" title="Edit Task" />&nbsp;';

    //toggle task details
    newListItemHTML += '<img class="toggleTaskDetails" src="' + imgRoot + 'view.png" title="View Task Details" taskDetails="taskid_' + task.ows_ID + '_details" />';


    // Item details
    newListItemHTML += '<div id="taskid_' + task.ows_ID + '_details" class="task-Details">';
    newListItemHTML += '<div id="details-assignedTo"><div id="assignedTo-wrapper">Assigned To:</div><div id="name-wrapper">' + assignedToNames.replaceAll(', ', '<br/>') + '</div></div>';

    var work = new Number(task.ows_Work);
    var actualWork = new Number(task.ows_ActualWork);
    newListItemHTML += '<div id="details-priority"><span>Priority:</span>' + task.ows_Priority + '</div>';
    newListItemHTML += '<div id="details-startDate"><span>Start Date: </span>' + formatDate(task.ows_StartDate, "MM-dd-yyyy") + '</div>';
    newListItemHTML += '<div id="details-dueDate"><span>Due Date:</span>' + formatDate(task.ows_DueDate, "MM-dd-yyyy") + '</div>';
    if (task.ows_ActualStart)
        newListItemHTML += '<div id="details-actualStart"><span>Actual Start:</span>' + formatDate(task.ows_ActualStart, "MM-dd-yyyy") + '</div>';
    else
        newListItemHTML += '<div id="details-actualStart"><span>Actual Start:</span></div>';
    if (task.ows_ActualFinish)
        newListItemHTML += '<div id="details-actualFinish"><span>Actual Finish:</span>' + formatDate(task.ows_ActualFinish, "MM-dd-yyyy") + '</div>';
    else
        newListItemHTML += '<div id="details-actualFinish"><span>Actual Finish:</span></div>';
    newListItemHTML += '<div id="details-work"><span>Work:</span>' + work.toFixed(2) + '</div>';
    if (task.ows_ActualWork)
        newListItemHTML += '<div id="details-actualWork"><span>Actual Work:</span>' + actualWork.toFixed(2) + '</div>';
    else
        newListItemHTML += '<div id="details-actualWork"><span>Actual Work:</span>0.00</div>';
    if (task.ows_PercentComplete)
        newListItemHTML += '<div id="details-percentComplete"><span>% Complete:</span>' + percentComplete + '</div>';
    else
        newListItemHTML += '<div id="details-percentComplete"><span>% Complete:</span>0</div>';
    newListItemHTML += '</div>';
    newListItemHTML += '</li>';

    var taskStatusTableColumn = task.ows_Status;
    //get the inner html of the current column
    existingColumnHTML = $('#statusColumnData td ul[status="' + taskStatusTableColumn + '"]').html();

    if ($("#taskEdit").attr("mode") != 'new'){ 
    	// append values to end of column
        $('#statusColumnData td ul[status="' + taskStatusTableColumn + '"]').append(newListItemHTML);
        }
    else {
    	// add new tasks to beginning of column
        //$('#statusColumnData td ul[status="Not Started"]').prepend(newListItemHTML);
        
        $('#statusColumnData td ul[status="' + taskStatusTableColumn + '"]').prepend(newListItemHTML);
	    setupToggleTaskDetailsClick();
		setupTaskPriortyStars();
		setupEditTaskClick();

    }

    $(progressBarID).progressbar({ value: percentComplete  });
    
    
	setHatColor($('#taskid_' + task.ows_ID), assignedToNames);
	
}

// name: addUser
// by: 
// date:
// purpose: 
function addUser(user) {
    var optionFilterHTML = "";
    var optionListHTML = "";
    var userID = user.ID.value;
    var displayName = user.Name.value;

    if (user.IsDomainGroup.value == false) {
	    optionFilterHTML = '<option value="u' + userID + '|">' + displayName + '</option>';
	    editAssignedToListHTML = '<div><input type="checkbox" class="checkbox-AssignedTo" userID="' + userID + '" userName="' + displayName + '" />' + displayName + '</div>';

        if (cwVariables.CWUserID != displayName && displayName != 'System Account'){
            	$("#user-select").append(optionFilterHTML);
            }
    }
}

// name: addPriorities
// by: 
// date:
// purpose: 
function addPriorities(priority) {
    var optionPriorities = "";
    optionPriorities = '<option value="' + priority + '">' + priority + '</option>';

    $("#priority").append(optionPriorities);

}

// name: getAssignedToInfo
// by: 
// date:
// purpose: break the ids and names out from the AssignedTo field value for use in displays, etc.
//          nameOrID parameter value = 1 returns the names, all other values return the IDs.
function getAssignedToInfo(assignedTo, nameOrID) {

	if (assignedTo == null){
		assignedTo = '';
	}

    var assignedToArray = assignedTo.split(';#');
    var assignedToNames = '';
    var assignedToIDs = '';

    if (assignedTo != '') {
        for (var i = 0; i < assignedToArray.length; i = i + 2) {
            if (assignedToNames != '') {
                assignedToNames += ', ';
            }
            assignedToIDs += 'u' + assignedToArray[i] + '|';
            assignedToNames += assignedToArray[i + 1];
        }
    }
    else {
        assignedToNames = '{none}';
        assignedToIDs = '0';
    }

    if (nameOrID == 1) {
        return assignedToNames;
    }
    else {
        return assignedToIDs;
    }
}


// name: formatDate
// by: 
// date:
// purpose: 
function formatDate(date, dateFormat) {
    var dateParts;
    var timeParts;
    var theDate;

    var year;
    var monthText;
    var day;
    var hour;
    var minute;

    if (date) {
        dateParts = (date.slice(0, 10)).split('-');
        timeParts = (date.slice(12)).split(':');

        year = dateParts[0];
        month = dateParts[1];

        switch (month) {
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

        switch (dateFormat) {
            case 'dd/MM/yyyy':
                theDate = day + "/" + month + "/" + year;
                break;
            case 'dd-MM-yyyy':
                theDate = day + "-" + month + "-" + year;
                break;
            case 'MM/dd/yyyy':
                theDate = month + "/" + day + "/" + year;
                break;
            case 'MM-dd-yyyy':
                theDate = month + "-" + day + "-" + year;
                break;
            case 'MMM d, yyyy':
                theDate = monthText + " " + day + ", " + year;
                break;
            case 'UTC':
                theDate = new Date(year, month - 1, day, hour, minute, 0, 0);
                break;
            case 'Primitive':
                theDate = new Date(year, month - 1, day, hour, minute, 0, 0).valueOf();
                break;
        }

        return theDate;
    }
    else
        return date;

}

// name: taskTableOverlayResize
// by: 
// date:
// purpose: 
function taskTableOverlayResize() {
    //get dimensions of task board for transparent overlay
    var overlayWidth = $("#tasksTable").outerWidth();
    var overlayHeight = $("#tasksTable").outerHeight();
    $(".task-Table-Overlay").width(overlayWidth);
    $(".task-Table-Overlay").height(overlayHeight);

}

// name: showTaskDialog
// by: papproth, brian
// date: 2015.05.15
// purpose: opens the dialog
function showTaskDialog(formData) {

    var dialogHeight;
    var dialogWidth;
    var dialogTitle;

    var $taskTitle = $("#taskTitle");
    var $taskDialog = $('#taskEdit');

    dialogWidth = 430;
    if (formData.taskID == null) {
        dialogHeight = 400;
    }
    else {
        dialogHeight = 560;
    }
    $taskDialog.removeClass('hide');
    $taskDialog.dialog({
        minWidth: dialogWidth,
        maxWidth: dialogWidth,
        width: dialogWidth,
        minHeight: dialogHeight,
        maxHeight: dialogHeight,
        height: dialogHeight,
        title: formData.formTitle,
        resizeable: false,
        modal: true,
        create: function () {
            var $btnPane = $("div.ui-dialog-buttonpane");
            $btnPane.append('<div id="taskDialogStatus"></div>');
        },
        close: function () {
            $('#taskTitle, #actualWork, #complete, #actualStartDate, #finishDate, #startDate, #dueDate').val('');
            $('.connectedSortable').droppable('enable');


        },
        open: function () {
        
        	// disable the droppable for the status column divs
        	$('.connectedSortable').droppable('disable');
        	
            $taskTitle.parent().removeClass('cw-input-error');
            $('#button-ok').addClass('cw-hide');
            $('#button-save, #button-cancel').removeClass('cw-hide');

            $('#taskDialogStatus').removeClass().html('');
            $('#assignedTo').val('');
            $('#assignedTo').pqSelect('refreshData');

            if (formData.taskID == null) {
            	// new task
                $("#startDate").val(startDate).datepicker('option', 'disabled', false).parent().removeClass('cw-disabled');
                $("#dueDate").val(dueDate).datepicker('option', 'disabled', false).parent().removeClass('cw-disabled');
                $('#completeWrapper, #actualStartDateWrapper, #finishDateWrapper, #actualWorkWrapper').addClass('cw-hide');
                $('#taskWorkWrapper').removeClass('cw-hide');
                $('#taskWork').val('0.00');
                $("#taskWorkSlider").slider('value', 0);            }
            else {
            	// edit task
            	$('#taskWorkWrapper').addClass('cw-hide')
                $('#completeWrapper, #actualWorkWrapper').removeClass('cw-hide');
                editTask(formData.taskID);
            }

        },
        buttons: [{
            text: 'Cancel',
            id: 'button-cancel',
            click: function () {
                $taskDialog.dialog("close");
            }
        },
        {
            text: 'Ok',
            id: 'button-ok',
            click: function () {
                $taskDialog.dialog("close");
            }
        },
        {
            text: 'Save',
            id: 'button-save',
            click: function () {
                var mode = $taskDialog.attr("mode");
                var title = $taskTitle.val();
                title = $.trim(title);

                if (title != '') {
                    saveTask(formData.taskID, function (result, msg) {
                        if (result == true) {
                            $('#taskDialogStatus').addClass('cw-dialog-success').html('Task Saved!');
                            $('#button-ok').removeClass('cw-hide');
                            $('#button-save, #button-cancel').addClass('cw-hide');
                            
                        }
                        else {
                            alert('An error occured saving the task.\n' + msg);
                        }

                    });
                }
                else {
                    $('#taskDialogStatus').addClass('cw-dialog-exclamation').html('Invalid Data Detected');
                    $taskTitle.parent().addClass('cw-input-error');

                }

            }
        }]
    });

}