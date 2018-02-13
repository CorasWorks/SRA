<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
  <xsl:output method="html" indent="yes" version="4.0"/>
  <xsl:template match="/">

    <link type="text/css" rel="stylesheet" href="[SRA Root]/resources/TaskBoard_2/TaskBoard.css"/>
    <link rel="stylesheet" href="[SRA Root]/Resources/paramquery/pqselect.min.css" type="text/css" />
    <script type="text/javascript" src="[SRA Root]/resources/TaskBoard_2/TaskBoard.js"></script>
    <script src="[SRA Root]/Resources/paramquery/pqselect.min.js" type="text/javascript"></script>

    <script type="text/javascript">
      var imgRoot = '[SRA Root]/resources/TaskBoard_2/Images/';
    </script>


    <!-- task edit dialog begin -->
    <div id="taskEdit" title="Update Task" class="cw-hide" taskID="" taskArrayIndex="" mode="edit">

      <div id="taskTitleWrapper">
        <label for="taskTitle" class="cw-label">
          Title
        </label>
        <div class="cw-input-wrapper">
          <input id="taskTitle" class="cw-input" />
        </div>
      </div>

      <div id="dataWrapper">
        <div id="dataLeft">
          <div id="priorityWrapper">
            <label for="priority" class="cw-label">
              Priority
            </label>
            <div class="cw-input-wrapper">
              <select id="priority" class="cw-input" />
            </div>
          </div>


          <div id="startDateWrapper">
            <label for="startDate" class="cw-label">
              Start Date
            </label>
            <div class="cw-input-wrapper">
              <input id="startDate" class="cw-input" />
              <input type="hidden" id="alt-Start" />
            </div>
          </div>
          <div id="dueDateWrapper">
            <label for="dueDate" class="cw-label">
              Due Date
            </label>
            <div class="cw-input-wrapper">
              <input id="dueDate" class="cw-input" />
              <input type="hidden" id="alt-Due" />
            </div>
          </div>

          <div id="actualStartDateWrapper" class="cw-hide">
            <label for="actualStartDate" class="cw-label">
              Actual Start Date
            </label>
            <div class="cw-input-wrapper">
              <input id="actualStartDate" class="cw-input" />
              <input type="hidden" id="alt-ActualStart" />
            </div>
          </div>
          <div id="finishDateWrapper" class="cw-hide">
            <label for="finishDate" class="cw-label">
              Actual Finish Date
            </label>
            <div class="cw-input-wrapper">
              <input id="finishDate" class="cw-input" />
              <input type="hidden" id="alt-Finish" />
            </div>
          </div>


          <div id="taskWorkWrapper" class="cw-hide">
            <label for="taskWork" class="cw-label">
              Task Work (Hrs)
            </label>
            <div class="cw-input-wrapper">
              <input id="taskWork" class="cw-input" />
              <div id="taskWorkSlider" class="work-slider"></div>
            </div>
            
          </div>



          <div id="actualWorkWrapper" class="cw-hide">
            <label for="actualWork" class="cw-label">
              Actual Work (Hrs)
            </label>
            <div class="cw-input-wrapper">
              <input id="actualWork" class="cw-input" />
              <div id="actualWorkSlider" class="work-slider"></div>
            </div>
            
          </div>
          
          <div id="completeWrapper" class="cw-hide">
            <label for="complete" class="cw-label">
              Complete (%)
            </label>
            <div class="cw-input-wrapper">
              <input id="complete" class="cw-input" />
              <div id="completeSlider" class="work-slider"></div>
            </div>
            
          </div>




        </div>
        <div id="dataRight">
          <div id="assignedToWrapper">
            <label for="AssignedTo" class="cw-label">
              Assigned To
            </label>

            <select id="assignedTo" class="cw-input" multiple="multiple" style="margin-top: 4px;" />

          </div>
        </div>


      </div>


      <!--
        <div class="edit-Actions">
          <img id="closeEdit" class="img-Clickable" title="Cancel without Updating" src="[SRA Root]/resources/TaskBoard_2/Images/delete2.png"/>
        </div>

        <div id="edit-Form-NoEdit">
          <span class="edit-Task" id="edit-Task-Title"></span>
          <div class="new-Task">
            <span class="required-Field">*</span>
            <input type="text" class="new-Task" id="new-Task-Title" value="Task title required for save" style="width:85%"/>
          </div>
        </div>
        <table class="input-Form">
          <tr class="edit">
            <td align="right" style="vertical-align:top">
              <img id="toggleAssignedToSelector" class="img-Clickable" style="vertical-align:text-bottom" title="Change Task Assignment" src="[SRA Root]/resources/TaskBoard_2/Images/plus-minus.png"/>
              Assigned To:
            </td>
            <td class="edit-Form-Edit" id="edit-Task-AssignedTo">
              <div id="AssignedToText"></div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div id="AssignedToSelector" class="ui-corner-all"></div>
            </td>
          </tr>
          <tr class="new">
            <td align="right" >Priority:</td>
            <td class="edit-Form-NoEdit">
              <span class="edit-Task" id="edit-Task-Priority"></span>
              <select class="new-Task" id="new-Task-Priority" ></select>
            </td>
          </tr>
          <tr class="new-Task">
            <td align="right" >Start Date:</td>
            <td >
              <input class="new-Task" type="text" size="16" id="new-DatePicker-Start" />
              <input type="hidden" id="alt-Start" />
            </td>
          </tr>
          <tr class="edit-Task">
            <td align="right" >Start Date:</td>
            <td class="edit-Form-NoEdit">
              <span class="edit-Task" id="edit-Task-StartDate"></span>
            </td>
          </tr>
          <tr class="new-Task">
            <td align="right" >Due Date:</td>
            <td>
              <input class="new-Task" type="text" size="16" id="new-DatePicker-Due" />
              <input type="hidden" id="alt-Due" />
            </td>
          </tr>
          <tr class="edit-Task">
            <td align="right" >Due Date:</td>
            <td class="edit-Form-NoEdit">
              <span class="edit-Task" id="edit-Task-DueDate"></span>
            </td>
          </tr>
          <tr class="edit-Task">
            <td align="right" >Actual Start:</td>
            <td>
              <input class="edit-Form-Edit" type="text" size="16" id="edit-DatePicker-ActualStart" />
              <input type="hidden" id="alt-ActualStart" />
            </td>
          </tr>
          <tr class="edit-Task">
            <td align="right" >Actual Finish:</td>
            <td>
              <input class="edit-Form-Edit" type="text" size="16" id="edit-DatePicker-ActualFinish" />
              <input type="hidden" id="alt-ActualFinish" />
            </td>
          </tr>
          <tr class="new-Task">
            <td align="right" >Work:</td>
            <td class="edit-Form-NoEdit">
              <span class="edit-Task" id="edit-Task-Work"></span>
              <input size="5" class="new-Task" type="text" id="new-Task-Work"/>hrs
            </td>
          </tr>
          <tr class="new-Task">
            <td></td>
            <td>
              <div id="new-Slider-Work" style="width:95%; float:right;"></div>
            </td>
          </tr>
          <tr class="edit-Task">
            <td align="right" >Actual Work:</td>
            <td class="edit-Form-Edit" >
              <input size="5" class="edit-Form-Edit" type="text" id="edit-Task-ActualWork"/>hrs
            </td>
          </tr>
          <tr class="edit-Task">
            <td></td>
            <td>
              <div id="edit-Slider-ActualWork" style="width:95%; float:right;"></div>
            </td>
          </tr>
          <tr class="edit-Task">
            <td align="right" >Percent Complete:</td>
            <td class="edit-Form-Edit">
              <input size="5" class="edit-Form-Edit" type="text" id="edit-Task-PercentComplete"/>%
            </td>
          </tr>
          <tr class="edit-Task">
            <td></td>
            <td>
              <div id="edit-Slider-PercentComplete" style="width:95%; float:right;"></div>
            </td>
          </tr>
        </table>
        <div class="edit-Actions">
          <img id="saveEdits" class="img-Clickable" title="Update Task" src="[SRA Root]/resources/TaskBoard_2/Images/disk_blue.png"/>
        </div>
        -->



    </div>
    <!-- task edit dialog end -->


    <div id="tasksDataView">

      <div class="task-Table-Overlay"></div>


      <table id="tasksTable" class="tasksTable">
        <thead>
          <tr id="statusColumnHeaders">
            <td>

              <div class="ui-state-default ui-corner-all">Task Board</div>
            </td>
            <!--<td id="project-Site-Users">Project Team</td>-->
            <!-- Dynamically create task board status columns based on Task List Status field choices.  Columsn created in with same order as field choices. -->
          </tr>
        </thead>
        <tbody>
          <tr valign="top" id="statusColumnData">
            <td>
              <div class="legend-section">Actions</div>
              <div class="legend-container" id="actions">
                <img class="img-Clickable" id="newTask" src="[SRA Root]/resources/TaskBoard_2/Images/add2.png" title="Create New Task"/>
              </div>
              <div class="legend-section">
                Filter: <span class="activeFilter"></span>
              </div>
              <div class="legend-container" id="filters">
                <input type='text' id="searchTasksBox" class="ui-corners-all searchTasks" name="searchBox" value="Enter text to search task titles" />
                <div id="pastdue-filter" class="legend-items">
                  <img id="All" src="[SRA Root]/resources/TaskBoard_2/Images/flag_white.png" title="Show All Tasks "/>
                  <img id="Past Due" src="[SRA Root]/resources/TaskBoard_2/Images/flag_red.png" title="Show Past Due" />
                </div>
                <div id="priority-filter" class="legend-items">
                  <img id="All" src="[SRA Root]/resources/TaskBoard_2/Images/star_white.png" title="Show All Priorities" filterColor="All"/>
                  <img id="High Priority" src="[SRA Root]/resources/TaskBoard_2/Images/star_red.png" title="Show High Priorities" filterColor="red"/>
                  <img id="Normal Priority" src="[SRA Root]/resources/TaskBoard_2/Images/star_green.png" title="Show Normal Priorities" filterColor="green"/>
                  <img id="Low Priority" src="[SRA Root]/resources/TaskBoard_2/Images/star_blue.png" title="Show Low Priorities" filterColor="blue"/>
                </div>
                <div id="assignment-filter" class="legend-items">
                  <img id="All" src="[SRA Root]/resources/TaskBoard_2/Images/hat_white.png" title="Show All Tasks "/>
                  <img id="Unassigned" src="[SRA Root]/resources/TaskBoard_2/Images/hat_red.png" title="Show Unassigned" />
                  <img id="My" src="[SRA Root]/resources/TaskBoard_2/Images/hat_green.png" title="Show My Tasks" />
                  <img id="By User" src="[SRA Root]/resources/TaskBoard_2/Images/hat_gray.png" title="Show By Assigned" />
                  <!--<img id="selected-Filter-Overlay" class="filter-checked" src="[SRA Root]/resources/TaskBoard_2/Images/filter_check.png" title="Selected Filter"/>-->
                </div>
                <div>
                  <select id="user-select">
                    <option value="Select">Select User...</option>
                  </select>
                </div>
              </div>
              <div id="display-options">
                <div class="legend-section">Display Options</div>
                <div class="legend-container">
                  <div class="legend-items">
                    <input id="toggleProgressBars" type="checkbox" style="vertical-align:text-top"/><img src="[SRA Root]/resources/TaskBoard_2/Images/prog-bar.png" />Show
                    Progress Bar<br />
                    <input id="toggleDetails" type="checkbox" style="vertical-align:text-top"/><img src="[SRA Root]/resources/TaskBoard_2/Images/view.png" />Show
                    Details<br />
                    <!--<img src="[SRA Root]/resources/TaskBoard_2/Images/hat_green.png" /><input type="checkbox" />My Tasks Only<br />-->
                  </div>
                </div>
              </div>
              <div id="legend">
                <div class="legend-section">Legend</div>
                <div class="legend-container">
                  <div class="legend-items">
                    <img src="[SRA Root]/resources/TaskBoard_2/Images/view.png" />View Task
                    Details<br />
                    <img src="[SRA Root]/resources/TaskBoard_2/Images/data_edit.png" />Edit Task<br />
                    <img src="[SRA Root]/resources/TaskBoard_2/Images/star_red.png" />;High
                    Priority<br />
                    <img src="[SRA Root]/resources/TaskBoard_2/Images/star_green.png" />Normal
                    Priority<br />
                    <img src="[SRA Root]/resources/TaskBoard_2/Images/star_blue.png" />Low
                    Priority<br />
                    <img src="[SRA Root]/resources/TaskBoard_2/Images/hat_green.png" />My Tasks<br />
                    <img src="[SRA Root]/resources/TaskBoard_2/Images/hat_gray.png" />Assigned<br />
                    <img src="[SRA Root]/resources/TaskBoard_2/Images/hat_red.png" />Unassigned<br />
                    <img src="[SRA Root]/resources/TaskBoard_2/Images/flag_red.png" />Overdue<br />
                    <!--<img src="[SRA Root]/resources/TaskBoard_2/Images/filter_check.png" />Current Filter<br />-->
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </xsl:template>
</xsl:stylesheet>