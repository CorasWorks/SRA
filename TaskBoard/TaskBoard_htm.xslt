﻿<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">

<link type="text/css" rel="stylesheet" href="[SRA Root]/Resources/TaskBoard/TaskBoard.css"/>
<script type="text/javascript" src="[SRA Root]/Resources/TaskBoard/caps.js"></script>
    <script type="text/javascript" src="[SRA Root]/Resources/TaskBoard/lib/cw-ko-taskboard-utils.js"></script>
<script type="text/javascript" src="[SRA Root]/Resources/TaskBoard/display1.js"></script>


    <div id="loaderDiv">
        <img src="[SRA Root]/Resources/TaskBoard/Images/ajax/495-loading.gif" class="ajax-loader" />
    </div>
    
    <!-- Start Task Board Display -->
    <table id="tasksTable" class="tasksTable" style="display:none;">
        <thead>
            <tr id="statusColumnHeaders">
                <td>
                    <div class="ui-state-default ui-corner-all">Task Board</div>
                </td>
                <!-- ko foreach: boardColumns -->
                <td class="statusColumn" data-bind="attr: {{id: title}}">
                    <div class="ui-state-default ui-corner-all" data-bind="text: title"></div>
                </td>
                <!-- /ko -->
            </tr>
        </thead>
        <tbody>
            <tr valign="top" id="statusColumnData">
                <td>
                    <div class="legend-section">Actions</div>
                    <div class="legend-container" id="actions">
                        <img data-bind="click: addNewTaskClick" class="" id="newTask" src="[SRA Root]/Resources/TaskBoard/Images/add2.png" title="Create New Task" />
                    </div>
                    <div class="legend-section">Filter: <span class="activeFilter" data-bind="text: selectedFilter"></span></div>
                    <div class="legend-container" id="filters">
                        <input type="text" id="searchTasksBox" class="ui-corners-all searchTasks ui-autocomplete-input" name="searchBox" data-bind="jqAuto: {{ autoFocus: true }}, jqAutoSource: boardItems, jqAutoValue: textFilter, jqAutoSourceInputValue: 'title', jqAutoSourceValue: 'title'" value="Enter text to search task titles" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true" />
                        <div id="pastdue-filter" class="legend-items">
                            <img id="All" src="[SRA Root]/Resources/TaskBoard/Images/flag_white.png" title="Show All Tasks " data-bind="click: filterTasksClick.bind('Show All Tasks')" />
                            <img id="Past Due" src="[SRA Root]/Resources/TaskBoard/Images/flag_red.png" title="Show Past Due" data-bind="click: filterTasksClick.bind('Show Past Due')" />
                        </div>
                        <div id="priority-filter" class="legend-items">
                            <img id="All" src="[SRA Root]/Resources/TaskBoard/Images/star_white.png" title="Show All Priorities" filtercolor="All" data-bind="click: filterTasksClick.bind('Show All Priorities')" />
                            <img id="High Priority" src="[SRA Root]/Resources/TaskBoard/Images/star_red.png" title="Show High Priorities" filtercolor="red" data-bind="click: filterTasksClick.bind('Show High Priorities')" />
                            <img id="Normal Priority" src="[SRA Root]/Resources/TaskBoard/Images/star_green.png" title="Show Normal Priorities" filtercolor="green" data-bind="click: filterTasksClick.bind('Show Low Priorities')" />
                            <img id="Low Priority" src="[SRA Root]/Resources/TaskBoard/Images/star_blue.png" title="Show Low Priorities" filtercolor="blue" data-bind="click: filterTasksClick.bind('Show Normal Priorities')" />
                        </div>
                        <div id="assignment-filter" class="legend-items">
                            <img id="All" src="[SRA Root]/Resources/TaskBoard/Images/hat_white.png" title="Show All Tasks " data-bind="click: filterTasksClick.bind('Show All Tasks')" />
                            <img id="Unassigned" src="[SRA Root]/Resources/TaskBoard/Images/hat_red.png" title="Show Unassigned" data-bind="click: filterTasksClick.bind('Show All Unassigned')" />
                            <img id="My" src="[SRA Root]/Resources/TaskBoard/Images/hat_green.png" title="Show My Tasks" data-bind="click: filterTasksClick.bind('Show My Tasks')" />
                            <img id="By User" src="[SRA Root]/Resources/TaskBoard/Images/hat_gray.png" title="Show By Assigned" data-bind="click: filterByUserClick.bind($root) " />
                        </div>
                        <div data-bind="visible: showFilterByUser()">
                            <select id="filterByUser" data-bind="options: users, optionsText: 'name', value: selectedFilterUser, optionsCaption: 'Select User'"></select>
                        </div>
                    </div>
                    <div id="display-options">
                        <div class="legend-section">Display Options</div>
                        <div class="legend-container">
                            <div class="legend-items">
                                <input id="toggleProgressBars" data-bind="checked: showProgressBar" type="checkbox" style="vertical-align:text-top" />&amp;nbsp;<img src="[SRA Root]/Resources/TaskBoard/Images/prog-bar.png" />&amp;nbsp;Show
                                Progress Bar<br />
                                <input id="toggleDetails" data-bind="checked: showDetails" type="checkbox" style="vertical-align:text-top" />&amp;nbsp;<img src="[SRA Root]/Resources/TaskBoard/Images/view.png" />&amp;nbsp;Show
                                Details<br />
                            </div>
                        </div>
                    </div>
                    <div id="legend">
                        <div class="legend-section">Legend</div>
                        <div class="legend-container">
                            <div class="legend-items">
                                <img src="[SRA Root]/Resources/TaskBoard/Images/view.png" />&amp;nbsp;View Task
                                Details<br />
                                <img src="[SRA Root]/Resources/TaskBoard/Images/data_edit.png" />&amp;nbsp;Edit
                                Task<br />
                                <img src="[SRA Root]/Resources/TaskBoard/Images/star_red.png" />&amp;nbsp;High
                                Priority<br />
                                <img src="[SRA Root]/Resources/TaskBoard/Images/star_green.png" />&amp;nbsp;Normal
                                Priority<br />
                                <img src="[SRA Root]/Resources/TaskBoard/Images/star_blue.png" />&amp;nbsp;Low
                                Priority<br />
                                <img src="[SRA Root]/Resources/TaskBoard/Images/hat_green.png" />&amp;nbsp;My
                                Tasks<br />
                                <img src="[SRA Root]/Resources/TaskBoard/Images/hat_gray.png" />&amp;nbsp;Assigned<br />
                                <img src="[SRA Root]/Resources/TaskBoard/Images/hat_red.png" />&amp;nbsp;Unassigned<br />
                                <img src="[SRA Root]/Resources/TaskBoard/Images/flag_red.png" />&amp;nbsp;Overdue<br />
                                <!--<img src="[SRA Root]/Resources/TaskBoard/Images/filter_check.png" />&amp;nbsp;Current Filter<br />-->
                            </div>
                        </div>
                    </div>
                </td>
                <!-- ko 'foreach': boardColumns -->
                <td>
                    <div class="task-instructions"></div>
                    <!--<ul id="sortable" data-bind="attr: {{ id: 'StatusCol' + id(), rawID: id }}, sortable: {{ data: tasks, afterMove: $root.taskMoved }}" class="sortable connectedSortable ui-corner-all ui-sortable ui-droppable">-->
                    <ul id="sortable" data-bind="attr: {{ id: 'StatusCol' + id(), rawID: id }}, sortable: {{ data: $root.tasksByStatus($data), afterMove: $root.taskMoved }}" class="sortable connectedSortable ui-corner-all ui-sortable ui-droppable">
                        <li class="ui-state-default assignToDroppable ui-corner-all task-Item" style="display: list-item" data-bind="'visible': $root.filterMe($data, $root.selectedFilter, $root), 'attr': {{'id': 'taskid' + id() }}">
                            <div class="ui-progressbar ui-progressbar-value progressbar ui-widget ui-widget-content ui-corner-all" data-bind="attr: {{id: 'progressbar_' + id(), title: perComplete + '% complete'}}, visible: $root.showProgressBar, progress: perComplete" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="">
                            </div>
                            <img class="task-PastDue" alt="past Due" src="[SRA Root]/Resources/TaskBoard/Images/flag_red.png" data-bind="visible: pastDue(), attr:{{id: 'pastDue' + id(), title: 'Task not completed - past due date= ' + dueDate()}}" />
                            <span data-bind="text: title"></span><br />
                            <img data-bind="attr: {{ src: $data.priorityIcon, title: priority().value + ' Priority - Click to Change' }}, click: $root.taskPriorityStarClick.bind($data) " class="" />&amp;nbsp;
                            <img id="assignedHat" data-bind="attr: {{ src: assignedToIcon, title: assignedToToolTip  }}" />&amp;nbsp;
                            <img data-bind="click: $root.showEditTaskClick.bind($data), attr: {{id: 'Edit_' + id()}}" class="editTask" src="[SRA Root]/Resources/TaskBoard/Images/data_edit.png" style="cursor:pointer;" title="Edit Task" />&amp;nbsp;
                            <img class="toggleTaskDetails" src="[SRA Root]/Resources/TaskBoard/Images/view.png" title="View Task Details" data-bind="click: showDetailsClick, attr: {{taskdetails: 'taskid_' + id() + '_details'}}" />
                            <div data-bind="attr: {{id: 'taskid_' + id() + '_details'}}, visible: $root.showDetails() == true || showDetails() == true" class="task-Details">
                                <div id="details-assignedTo">
                                    Assigned To:
                                    <div data-bind="foreach: assignedTo">
                                        <span data-bind="if: $index() > 0">,&amp;nbsp;</span><span data-bind="'text': name()"></span>
                                    </div>
                                </div>
                                <div id="details-priority">Priority: <span data-bind="text: $data.priority().value"></span></div>
                                <div id="details-startDate">Start Date: <span data-bind="text: $data.formatDateForDisplay(startDate())"></span></div>
                                <div id="details-dueDate">Due Date: <span data-bind="text: formatDateForDisplay(dueDate())"></span></div>
                                <!--<div id="details-actualStart">Actual Start: <span data-bind="text: actualStart()"></span></div>
                                <div id="details-actualFinish">Actual Finish: <span data-bind="text: actualFinish()"></span></div>
                                <div id="details-actualFinish">Work: <span data-bind="text: formatWorkValue($data.work())"></span></div>
                                <div id="details-actualFinish">Actual Work: <span data-bind="text: formatWorkValue($data.actualWork())"></span></div>-->
                                <div id="details-percentComplete">
                                    Percent
                                    Complete: <span data-bind="text: perComplete()"></span><span>
                                        %
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </td>
                <!-- /ko -->
            </tr>
        </tbody>
    </table>

    <!-- Add/Edit form container, uses KnockoutJS template 'addEditFormTemplate' -->
    <!--<div id="taskEditWindow" class="ui-state-default ui-corner-all" data-bind="jqDialog: {{ autoOpen: false, resizable: false, modal: true, dialogClass: 'noclose' }}, 'template': {{ 'name': 'addEditFormTemplate', 'data': selectedTaskItem, 'if': selectedTaskItem }}, openDialog: selectedTaskItem">
    </div>-->
<div id="taskEditWindow" class="ui-state-default ui-corner-all" data-bind="jqDialog: {{ autoOpen: false, resizable: false, modal: true, dialogClass: 'noclose' }}, 'template': {{ 'name': 'addEditFormTemplate', 'data': selectedTaskItem, 'if': selectedTaskItem }}, openDialog: selectedTaskItem">
    </div>

    <!-- Start KnockoutJS Template for Add/Edit Form -->
    <script id="addEditFormTemplate" type="text/html">
        <div class="edit-Actions">
            <img id="closeEdit" data-bind="click: restoreState" class="img-Clickable" title="Cancel without Updating" src="[SRA Root]/Resources/TaskBoard/Images/delete2.png" />
        </div>
        <div id="edit-Form-NoEdit">
            <span class="edit-Task" id="edit-Task-Title" style="display: none;"></span>
            <div class="new-Task" style="display: block;">
                <span class="required-Field">*</span>
                <input type="text" data-bind="'value': title" class="new-Task" id="new-Task-Title" value="Task title required for save" style="width: 85%; display: inline-block;" />
            </div>
        </div>
        <table class="input-Form">
            <tbody>
                <tr class="edit">
                    <td align="right" style="vertical-align:top">
                        <img id="toggleAssignedToSelector" data-bind="click: showAssignedToClick" class="img-Clickable" style="vertical-align:text-bottom" title="Change Task Assignment" src="[SRA Root]/Resources/TaskBoard/Images/plus-minus.png" />
                        Assigned To:
                    </td>
                    <td class="edit-Form-Edit" id="edit-Task-AssignedTo" data-bind="if: assignedTo">
                        <div id="AssignedToText" data-bind="foreach: assignedTo">
                            <span data-bind="if: $index() > 0">,&amp;nbsp;</span><span data-bind="text: name" />
                        </div>
                    </td>
                </tr>
                <tr data-bind="if: showAssignedTo">
                    <td></td>
                    <td>
                        <div data-bind="foreach: $root.users" id="AssignedToSelector" class="ui-corner-all">
                            <div><input type="checkbox" class="checkbox-AssignedTo" data-bind="value: id(), checked: $parent.assignedToIds, click: $parent.toggleAssignedToUserClick.bind($data), attr: {{ 'userid': id, username: name }}" /><span data-bind="text: name"></span></div>
                        </div>
                    </td>
                </tr>
                <tr class="new">
                    <td align="right">Priority:</td>
                    <td class="edit-Form-NoEdit">
                        <!--<select class="new-Task" data-bind="value: priority().ID" id="new-Task-Priority" style="display: inline-block;"><option value="3">High</option><option value="2">Medium</option><option value="1">Low</option></select>-->
                        <select class="new-Task" data-bind="options: $root.priorityValues, optionsText: 'value', value: priority" style="display: inline-block">
                        </select>
                    </td>
                </tr>
                <tr class="new">
                    <td align="right">Status:</td>
                    <td class="edit-Form-NoEdit">
                        <select class="new-Task" id="new-Task-Status" data-bind="options: $root.boardColumns, optionsText: 'title', value: status" style="display: inline-block;"></select>
                    </td>
                </tr>
                <tr class="new" style="display: table-row;">
                    <td align="right">Start Date:</td>
                    <td>
                        <span>
                            <input data-bind="datepicker: startDate, datepickerOptions: {{ dateFormat: 'mm-dd-yy', showOn: 'button', buttonImage: '[SRA Root]/Resources/TaskBoard/Images/calendar.png', buttonImageOnly: true }}" id="startDatePicker" />
                            <!--<img class="ui-datepicker-trigger" src="[SRA Root]/Resources/TaskBoard/Images/calendar.png" alt="..." title="...">-->
                        </span>
                       <!-- <span data-bind="visible: isNew() === false, text: formatDateForDisplay(startDate())" class="edit-Task" id="edit-Task-StartDate"></span>-->
                    </td>
                </tr>
                <tr class="new" style="display: table-row;">
                    <td align="right">Due Date:</td>
                    <td>
                        <span>
                            <input data-bind="datepicker: dueDate, datepickerOptions: {{ dateFormat: 'mm-dd-yy', showOn: 'button', buttonImage: '[SRA Root]/Resources/TaskBoard/Images/calendar.png', buttonImageOnly: true }}" id="datePickerDue" />
                            <!--<img class="ui-datepicker-trigger" src="[SRA Root]/Resources/TaskBoard/Images/calendar.png" alt="..." title="...">-->
                        </span>
                       <!-- <span data-bind="visible: isNew() === false, text: formatDateForDisplay(dueDate())" class="edit-Task" id="edit-Task-DueDate"></span>-->
                    </td>
                </tr>
                              <tr data-bind="if: isNew() === false" class="new">
                    <td align="right">Percent Complete:</td>
                    <td class="edit-Form-Edit">
                        <input size="5" data-bind="value: perComplete" class="edit-Form-Edit" type="text" id="edit-Task-PercentComplete" />&amp;nbsp;%
                    </td>
                </tr>
                <tr data-bind="if: isNew() === false">
                    <td />
                    <td><div style="margin: 10px" data-bind="slider: perComplete, sliderOptions: {{min: 0, max: 100, range: 'min', step: 10}}" class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"></div></td>
                </tr>
            </tbody>
        </table>
        <div class="edit-Actions">
            <img id="updateEdits" data-bind="visible: isNew() == false, click: $root.updateTaskClick.bind($data)" title="Update Task" src="[SRA Root]/Resources/TaskBoard/Images/disk_blue.png" />
            <img id="saveEdits" data-bind="visible: isNew, click: $root.saveNewTaskClick.bind($data)" title="Save Task" src="[SRA Root]/Resources/TaskBoard/Images/disk_blue.png" />
        </div>
    </script>
    <!-- End KnockoutJS Template for Add/Edit Form -->
    

	</xsl:template>
</xsl:stylesheet>    

