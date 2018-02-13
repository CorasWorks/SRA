<link rel="stylesheet" href="[SRA Root]/Resources/MapDesigner/map-designer.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="[SRA Root]/Resources/paramquery/pqselect.min.css" rel="stylesheet" type="text/css" />
<script src="[SRA Root]/Resources/MapDesigner/map-designer.js" type="text/javascript"></script>
<script src="[SRA Root]/Resources/paramquery/pqselect.min.js" type="text/javascript"></script>


<!-- tool validation ok dialog -->
<div id="toolValidationOkDialog" class="cw-dialog hide" title="">
	
	<div id="toolValidationMsg" class="validationOK">No tool validation errors were found</div>

</div>


<!-- Add New Map Dialog -->
<div id="newMapDialog" class="cw-dialog hide" title="">
    <div id="mapMethodologyWrapper">
        <label for="mapMethodology" class="cw-label">
            Map Methodology
        </label>
        <div class="cw-input-wrapper">
            <input id="mapMethodology" class="cw-input" />
        </div>
    </div>

    <div id="existMapMethodologyWrapper" style="float: left" class="hide">
        <label for="existMapMethodology" class="cw-label">
            Map Methodology
        </label>
        <div id="existMapMethodologyInputWrapper" class="cw-input-wrapper">
            <select id="existMapMethodology" class="cw-input sra-maps" style="width: 575px"></select>
        </div>
    </div>


    <div id="mapDescriptionWrapper">
        <label for="mapDescription" class="cw-label">
            Description
        </label>
        <div class="cw-input-wrapper">
            <textarea id="mapDescription" class="cw-textarea"></textarea>
        </div>
    </div>



    <div id="mapHelpWrapper">
        <label for="mapHelp" class="cw-label">
            Help Message
        </label>
        <div class="cw-input-wrapper">
            <textarea id="mapHelp" class="cw-textarea"></textarea>
        </div>
    </div>
    <div id="activeMapWrapper">
        <input type="checkbox" name="activeMap" id="activeMap" checked="checked">
        Active
    </div>
</div>
<!-- Add New Map Dialog end -->


<!-- Manage Tools Dialog -->
<div id="manageToolsDialog" class="cw-dialog hide" title="Manage Tools">

    <div id="sourceOfToolWrapper">
        <div>What do you want to do?</div>
        <div id="toolTypeWrapper" style="margin-bottom: 5px">
            <input class="cw-radio" type="radio" id="toolNew" name="toolType" checked="checked" value="new" /><label for="toolNew">Create a new tool</label>
            <input class="cw-radio" type="radio" id="toolExisting" name="toolType" value="existing" /><label for="toolExisting">Editing an existing tool</label>
        </div>
    </div>


    <div id="toolTitleWrapper">
        <label for="toolTitle" class="cw-label">
            Title
        </label>
        <div class="cw-input-wrapper">
            <input id="toolTitle" class="cw-input" />
        </div>
    </div>

    <div id="existToolTitleWrapper" class="hide">
        <label for="existToolTitle" class="cw-label">
            Tool
        </label>
        <div id="existToolTitleInputWrapper" class="cw-input-wrapper">
            <select id="existToolTitle" class="cw-input" style="width: 573px;">
                <option value="Select">Select a Tool...</option>
            </select>
        </div>
        <label for="toolTitleRevised" class="cw-label">
            Title
        </label>
        <div class="cw-input-wrapper">
            <input id="toolTitleRevised" class="cw-input" />
        </div>

    </div>


    <div id="toolPurposeWrapper">
        <label for="toolPurpose" class="cw-label">
            Purpose
        </label>
        <div class="cw-input-wrapper">
            <textarea id="toolPurpose" class="cw-textarea"></textarea>
        </div>
    </div>
    <div id="toolHelpMsgWrapper">
        <label for="toolhelpMsg" class="cw-label">
            Help Message
        </label>
        <div class="cw-input-wrapper">
            <textarea id="toolHelpMsg" class="cw-textarea"></textarea>
        </div>
    </div>

    <div id="toolHelpFileWrapper">
        <label for="toolHelpFile" class="cw-label">
            Help File Location 
        </label>
        
        <div id="toolHelpInputWrapper" class="cw-input-wrapper file-url-invalid">
            <input id="toolHelpFile" type="url" class="cw-input" style="width: 550px" />   
        </div>
        <a href="" id="toolHelpFileTest" target="_blank" style="padding-left: 7px">Test Link</a>
    </div>
	
	
    <div id="toolTemplateWrapper" style="margin-top: 10px">
        <label for="toolTemplate" class="cw-label sameLine" style="float: left; margin-right: 10px">
            Template File Location
        </label>
        <div id="libraryToolWrapper">
            <input type="checkbox" name="libraryTool" id="libraryTool">
            Select Template From Library
        </div>

        <div id="toolTemplateInputWrapper" class="cw-input-wrapper file-url-invalid">
            <input id="toolTemplate" type="url" class="cw-input"  style="width: 550px"/>
        </div>

        <div id="existToolTemplateWrapper" class="cw-input-wrapper hide  file-url-invalid">
            <select id="existToolTemplate" class="cw-input" style="width: 555px;">
                <option value="Select">Select a Template...</option>
            </select>
        </div>
		<a href="" id="toolTemplateTest" target="_blank" style="padding-left: 7px">Test Link</a>

    </div>

    <div id="toolStagesWrapper"  style="margin-top: 10px">
        <label for="toolStages" class="cw-label">
            Stages
        </label>
        <select id="toolStages" multiple="true"></select>

    </div>


    <div id="activeToolWrapper" class="" style="margin-top: 10px;">
        <input type="checkbox" name="activeTool" id="activeTool">
        Active
    </div>


</div>
<!-- Manage Tools Dialog End -->

<!-- manage tool templates dialog -->
<div id="manageToolTemplatesDialog" class="cw-dialog hide" title="Manage Tool Templates">
    <div id="templateSourceWrapper">
        <div>What do you want to do?</div>
        <div id="templateActionWrapper" style="margin-bottom: 5px">

            <div class="tool-template-button" id="addNewTemplate">Add a new tool template</div>
            <div class="tool-template-button" id="editExistTemplate">Edit an existing tool template</div>

        </div>
    </div>
    <div id="existToolTemplateFileWrapper" class="hide">
        <div id="existFileWrapper">
            <label for="existFile" class="cw-label">
                Template File
            </label>
            <div id="existFileInputWrapper" class="cw-input-wrapper">
                <select id="existFile" class="cw-input" style="width: 573px;">
                    <option value="Select">Select a Tool Template...</option>
                </select>
            </div>
        </div>

        <div id="templateFilenameWrapper" class="hide">
            <label for="templateFilename" class="cw-label">
                Filename
            </label>
            <div class="cw-input-wrapper">
                <input id="templateFilename" class="cw-input" />
            </div>
        </div>


        <div id="fileTitleWrapper">
            <label for="fileTitle" class="cw-label">
                Title
            </label>
            <div class="cw-input-wrapper">
                <input id="fileTitle" class="cw-input" />
            </div>
        </div>
        <div id="fileMethodologyWrapper">
            <label for="fileMethodology" class="cw-label">
                Map Methodology
            </label>
            <div class="cw-input-wrapper">
                <input id="fileMethodology" class="cw-input" />
            </div>
        </div>
        <div id="fileLanguageWrapper">
            <label for="fileLanguage" class="cw-label">
                Language
            </label>
            <div class="cw-input-wrapper">
                <input id="fileLanguage" class="cw-input" />
            </div>
        </div>


    </div>
</div>
<!-- end manage tool templates dialog -->


<!-- key questions dialog start -->
<div id="manageQuestionsDialog" class="cw-dialog hide" title="Manage Key Questions">

    <div id="sourceOfQuestionWrapper">
        <div>What do you want to do?</div>
        <div id="questionTypeWrapper" style="margin-bottom: 5px">
            <input class="cw-radio" type="radio" id="questionNew" name="questionType" checked="checked" value="new" /><label for="questionNew">Create a new key question</label>
            <input class="cw-radio" type="radio" id="questionExisting" name="questionType" value="existing" /><label for="questionExisting">Editing an existing key question</label>
        </div>
    </div>


    <div id="questionTitleWrapper">
        <label for="questionTitle" class="cw-label">
            Question
        </label>
        <div class="cw-input-wrapper">
            <input id="questionTitle" class="cw-input" type="text" maxlength="255" style="border-style:none" />
        </div>
    </div>

    <div id="existQuestionTitleWrapper" class="hide">
        <label for="existquestionTitle" class="cw-label">
            Question
        </label>
        <div id="existQuestionTitleInputWrapper" class="cw-input-wrapper">
            <select id="existQuestionTitle" class="cw-input" style="width: 573px;">
                <option value="Select">Select a Key Question...</option>
            </select>
        </div>
        
        <label for="questionNewTitle" class="cw-label">
            Title
        </label>
        <div class="cw-input-wrapper">
            <input id="questionNewTitle" class="cw-input" type="text" maxlength="255" style="border-style:none" />
        </div>

        
        
    </div>
    <div id="questionPurposeWrapper">
        <label for="questionPurpose" class="cw-label">
            Description
        </label>
        <div class="cw-input-wrapper">
            <textarea id="questionPurpose" class="cw-textarea"></textarea>
        </div>
    </div>
    <div id="activeQuestionWrapper" class="" style="margin-top: 10px;">
        <input type="checkbox" name="activeQuestion" id="activeQuestion">
        Active
    </div>
</div>

<!-- key questions dialog end -->
<div id="manageDeliverablesDialog" class="cw-dialog hide" title="Manage Deliverables">

    <div id="sourceOfDeliverablesWrapper">
        <div>What do you want to do?</div>
        <div id="deliverablesTypeWrapper" style="margin-bottom: 5px">
            <input class="cw-radio" type="radio" id="deliverablesNew" name="deliverablesType" checked="checked" value="new" /><label for="deliverablesNew">Create a new deliverable</label>
            <input class="cw-radio" type="radio" id="deliverablesExisting" name="deliverablesType" value="existing" /><label for="deliverablesExisting">Editing an existing deliverable</label>
        </div>
    </div>


    <div id="deliverablesTitleWrapper">
        <label for="deliverablesTitle" class="cw-label">
            Title
        </label>
        <div class="cw-input-wrapper">
            <input id="deliverablesTitle" class="cw-input" />
        </div>
    </div>

    <div id="existDeliverablesTitleWrapper" class="hide">
        <label for="existDeliverablesTitle" class="cw-label">
            Deliverable
        </label>
        <div id="existDeliverablesTitleInputWrapper" class="cw-input-wrapper">
            <select id="existDeliverablesTitle" class="cw-input" style="width: 573px;">
                <option value="Select">Select a Deliverable...</option>
            </select>
        </div>

        <label for="deliverablesNewTitle" class="cw-label">
            Title
        </label>
        <div class="cw-input-wrapper">
            <input id="deliverablesNewTitle" class="cw-input" />
        </div>


    </div>
    <div id="activeDeliverablesWrapper" class="" style="margin-top: 10px;">
        <input type="checkbox" name="activeDeliverables" id="activeDeliverables">
        Active
    </div>
</div>


<!-- deliverables dialog start -->

<!-- deliverables dialog end -->

<!-- delete stage dialog -->
<div id="delete-map" class="cw-dialog hide" title="Delete Map">
    <div class="cw-dialog-prompt">
        Are you sure you want to delete this map?<br>
        Press <b>YES</b> to delete or <b>NO</b> to cancel.
    </div>
</div>
<!-- delete stage dialog end -->



<!-- delete stage dialog -->
<div id="delete-stage" class="cw-dialog hide" title="Delete Stage">
    <div class="cw-dialog-prompt">
        Are you sure you want to delete this stage?<br>
        Press <b>YES</b> to delete or <b>NO</b> to cancel.
    </div>
</div>
<!-- delete stage dialog end -->

<!-- delete tool dialog -->
<div id="delete-tool" class="cw-dialog hide" title="Delete Tool">
    <div class="cw-dialog-prompt">
        Are you sure you want to delete this tool?<br>
        Press <b>YES</b> to delete or <b>NO</b> to cancel.
    </div>

</div>
<!-- delete stage dialog end -->


<!--manage stage dialog start-->
<div id="manage-stage" class="cw-dialog hide" title="Add New Stage">
    <div id="stageDataWrapper">

        <div id="sourceOfStageWrapper">
            <div>What do you want to do?</div>
            <div id="stageTypeWrapper" style="margin-bottom: 5px">
                <input class="cw-radio" type="radio" id="stageNew" name="stageType" checked="checked" value="new" /><label for="stageNew">Create a new stage</label>
                <input class="cw-radio" type="radio" id="stageExisting" name="stageType" value="existing" /><label for="stageExisting">Edit an existing stage</label>
            </div>
        </div>

        <div id="stageDescWrapper" style="">
            <label for="stageDesc" class="cw-label">
                Stage
            </label>
            <div id="stageDescInputWrapper" class="cw-input-wrapper">
                <input id="stageDesc" class="cw-input" style="width: 300px" />
            </div>
        </div>

        <div id="existStageDescWrapper" style="" class="hide">
            <label for="stageDesc" class="cw-label">
                Stage
            </label>

            <div id="existStageDescInputWrapper" class="cw-input-wrapper">
                <select id="existStageDesc" class="cw-input" style="width: 308px"></select>
            </div>
            <div id="stageNewDescWrapper">
	            <label for="stageNewDesc" class="cw-label">
	                Title
	            </label>
	            <div id="stageNewDescInputWrapper" class="cw-input-wrapper">
	                <input id="stageNewDesc" class="cw-input" style="width: 300px" />
	            </div>
			</div>
        </div>

        <div id="stageInitWrapper" style="">
            <label for="stageInit" class="cw-label">
                Initial
            </label>
            <div class="cw-input-wrapper">
                <input id="stageInit" class="cw-input" style="width: 21px" maxlength="1" pattern="[a-zA-Z]" title="Characters Only" />
            </div>

            <label id="stageInitErrMsg" class="errMsg hide">A Stage Initial is Required</label>

        </div>
        <div id="stagePurposeWrapper" style="clear: both">
            <label for="stagePurpose" class="cw-label">
                Purpose
            </label>
            <div class="cw-input-wrapper cw-readonly">
                <textarea id="stagePurpose" class="cw-textarea" style="width: 633px"></textarea>
            </div>
        </div>

        <div id="activeStageWrapper" class="hide">
            <input type="checkbox" name="activeStage" id="activeStage">
            Active
        </div>
		<div id="stageMapsWrapper" class="hide cw-read-only" style="margin-top: 5px">
		    <label for="stageMaps" class="cw-label">
                This Stage is Used in These Maps
            </label>
		    <div class="cw-input-wrapper cw-readonly">
                <textarea id="stageMaps" class="cw-textarea" readonly="readonly" style="width: 633px; height: 40px"></textarea>
            </div>

		</div>
		
		
        <div id="tollgateWrapper" class="">
            <input type="checkbox" name="tollGate" id="tollGate">
            Tollgate
        </div>
		

        <div class="hide" id="stage-selector">
            <div id="stage-btns-wrapper">
            </div>
        </div>
        
        
        
    </div>

    <div id="stageTools">
        <ul>
            <li><a href="#stageToolsTab">Tools</a></li>
            <li><a href="#stageDeliverablesTab">Deliverables</a></li>
            <li><a href="#stageKeyQuestionsTab">Key Questions</a></li>
        </ul>
        <div id="stageToolsTab">
            <div id="toolPanelWrapper">
                <div class="tool-panel">
                    <label>
                        Available Tools</label>
                    <div class="cw-stage-tools-wrapper">
                        <div class="cw-stage-tools" id="all-tools">
                            <div id="tool-search-wrapper">
                                <img src="[SRA Root]/Resources/Map/Images/Search.png" alt="Search" />
                                <input id="tool-search" type="search" placeholder="Start typing to search ..."
                                    value="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tool-panel" style="position: relative; left: 25px;">
                    <label>
                        Selected Tools</label>
                    <div class="cw-stage-tools-wrapper">
                        <div class="cw-stage-tools" id="selected-tools">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="stageDeliverablesTab">
            <div id="deliverablePanelWrapper">
                <div class="tool-panel">
                    <label>
                        Available Deliverables</label>
                    <div class="cw-stage-tools-wrapper">
                        <div class="cw-stage-tools" id="all-deliverables">
                            <div id="deliverable-search-wrapper">
                                <img src="[SRA Root]/Resources/Map/Images/Search.png" alt="Search" />
                                <input id="deliverable-search" type="search" placeholder="Start typing to search..."
                                    value="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tool-panel" style="position: relative; left: 25px;">
                    <label>
                        Selected Deliverables</label>
                    <div class="cw-stage-tools-wrapper">
                        <div class="cw-stage-tools" id="selected-deliverables">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="stageKeyQuestionsTab">
            <div id="questionsPanelWrapper">
                <div class="tool-panel">
                    <label>
                        Available Key Questions</label>
                    <div class="cw-stage-tools-wrapper">
                        <div class="cw-stage-tools" id="all-questions">
                            <div id="question-search-wrapper">
                                <img src="[SRA Root]/Resources/Map/Images/Search.png" alt="Search" />
                                <input id="question-search" type="search" placeholder="Start typing to search..."
                                    value="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tool-panel" style="position: relative; left: 25px;">
                    <label>
                        Selected Key Questions</label>
                    <div class="cw-stage-tools-wrapper">
                        <div class="cw-stage-tools" id="selected-questions">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>

<!--manage stage dialog end-->


<div id="sraMapDesignerMenu" class="sra-map-designer-menu">

    <div id="sraMapSelection">
    <div style="display: table-cell; vertical-align:top">
        <select id="sraSelectMaps" name="Maps" class="sra-maps main-map-select">
        </select>
        </div>
        <div style="display: table-cell">
        <div id="newMap" class="toolbar-button">Create New Map</div>
        <!--
        <div id="manageMaps" class="toolbar-button">Manage Maps</div>
        -->
        <div id="manageStages" class="toolbar-button">Manage Stages</div>
        <div id="manageTools" class="toolbar-button">Manage Tools</div>
        <div id="manageToolTemplates" class="toolbar-button">Manage Tool Templates</div>
        <div id="manageDeliverables" class="toolbar-button">Manage Deliverables</div>
        <div id="manageQuestions" class="toolbar-button">Manage Questions</div>
        </div>
    </div>
</div>
<!-- Loader -->
<div id="busyLoader" style="text-align: center;">
    <h2 style="text-align: center">
        <span id="busySpinner"></span>
        <img src="/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align: middle; padding: 5px" />
        <div>Loading Map...</div>
    </h2>
    Don't refresh the page, just wait patiently please
</div>
<!-- Loader end -->

<div id="sraMaps" class="mapContainer">
</div>

