/**
 * Created by Joe on 10/18/2016.
 */
var ProcessMaps = window.ProcessMaps || {};

$(document).ready(function () {
    ProcessMaps.Item = new ProcessMaps.Base();
    ProcessMaps.Item.Init();

});
ProcessMaps.Base = function () {
// global variables
    var mapTitles = new Array;
    var keyQuestions = new Array;
    var deliverables = new Array;
    var templates = new Array;
//var toolTitles = new Array;
    var sraTools;
    var activeStage = '';        // selected process map stage
    var newMapID = '0';
    var stageListItemID = 0;

    function _init() {
        // extend the contains selector to be case in-sensitive
        $.extend($.expr[":"], {
            "containsNC": function (elem, i, match, array) {
                return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
            }
        });


        // get all the available tools
        getSRATools(function (data) {
            addToolsToControls(data);

        });


        // load the key questions
        getKeyQuestions(function (result, msg) {
            if (result != true) {
                alert(msg);
            }
        });

        // load the deliverables
        getDeliverables(function (result, msg) {
            if (result != true) {
                alert(msg);
            }
        });

        // load the templates
        getTemplates(function (result, msg) {
            if (result == true) {

            }
            else {
                alert('Error loading reference documents\n' + msg);
            }

        });


        getMaps(function () {
            buildMapsTable();
        });

        // load the stage definitions from sharepoint
        // StagesDef variable is global
        getStageDefinitions(false);

        //

        // click event for toolHelpFile
        $('#toolHelpFileTest').click(function (event) {
            if ($('#toolHelpFile').val() == '') {
                event.preventDefault();
                alert('Please enter a file location');
            }
            else {
                var fileURL = $('#toolHelpFile').val();
                verifyToolURL(fileURL, null, function (result) {
                    if (result == true) {
                        $('#toolHelpInputWrapper').removeClass('file-url-invalid').addClass('file-url-valid');
                    }
                    else {
                        $('#toolHelpInputWrapper').removeClass('file-url-valid').addClass('file-url-invalid');
                    }

                });

                $(this).attr('href', fileURL);
            }
        });


        $('#toolTemplateTest').click(function (event) {
            var $toolTemplate = $('#toolTemplate');
            if ($('#existToolTemplateWrapper').hasClass('hide')) {
                if ($toolTemplate.val() == '') {
                    event.preventDefault();
                    alert('Please enter a file location');
                }
                else {
                    var fileURL = $('#toolTemplate').val();
                    verifyToolURL(fileURL, null, function (result) {
                        if (result == true) {
                            $('#toolTemplateInputWrapper').removeClass('file-url-invalid').addClass('file-url-valid');
                        }
                        else {
                            $('#toolTemplateInputWrapper').removeClass('file-url-valid').addClass('file-url-invalid');
                        }
                    });
                    $(this).attr('href', fileURL);
                }
            }
            else {
                if ($('#existToolTemplate').val() == 'Select') {
                    event.preventDefault();
                    alert('Please select a template file');
                }
                else {
                    var fileURL = $('#existToolTemplate').val();
                    if (result == true) {
                        $('#existToolTemplateWrapper').removeClass('file-url-invalid').addClass('file-url-valid');
                    }
                    else {
                        $('#existToolTemplateWrapper').removeClass('file-url-valid').addClass('file-url-invalid');
                    }

                    $(this).attr('href', fileURL);
                }
            }
        });

        // add a click event for the new map div
        $('#newMap').on('click', function (e) {
            mapMethodology('new', null);
        });

        // add a click event for the manageMaps div
        $('#manageMaps').on('click', function (e) {
            mapMethodology('manage', null);
        });

        // add a click event for the manageTools div
        $('#manageTools').on('click', function (e) {
            $('#toolExisting').prop('checked', true).trigger('change');

            var formData = { toolID: '0' };
            openManageToolsDialog(formData);
        });


        // add a click event for the manage tool templates div
        $('#manageToolTemplates').on('click', function (e) {
            openManageToolTemplatesDialog();
        });


        // add a click event for the manageTools div
        $('#manageDeliverables').on('click', function (e) {
            openManageDeliverablesDialog()
        });

        // add a click event for the manageTools div
        $('#manageQuestions').on('click', function (e) {
            openManageQuestionsDialog();
        });

        // add a click event for the manage stage toolbar button
        $('#manageStages').on('click', function (e) {
            // set the global variable to empty string
            activeStage = '';

            var $stageInit = $('#stageInit');
            var saveBtnText = "Save Stage Definition";
            var dialogData = {
                dialogTitle: 'Manage Stages',
                saveBtnText: saveBtnText,
                $stageInit: $stageInit,
                activeMapID: null,
                activeStageID: null,
                activeMapName: null,
                dialogHeight: 540,
                manageTools: false,
                newMapStage: false
            };
            $('#stageMaps').text('');
            $('#stageExisting').prop('checked', true).trigger('change');
            $('#toolPanelWrapper, #stageDescWrapper, #stageTools, #tollgateWrapper').addClass('hide');
            $('#stageDataWrapper, #stageMapsWrapper, #existStageDescWrapper, #stageInitErrMsg, #activeStageWrapper, #sourceOfStageWrapper, #stageNewDescWrapper').removeClass('hide');
            $('#stageDesc, #stageInit, #stagePurpose').removeClass('cw-readonly').prop('readonly', false);


            manageStageDialog(dialogData);
        });


        //change event for map select
        $('#sraSelectMaps').on('change', function (e) {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;
            // hide all the maps
            if (valueSelected != 'All') {
                $('.cw-sra-map-title').addClass('hide');
            }
            switch (valueSelected) {
                case 'All':
                case 'Select':
                    $('.cw-sra-map-title').removeClass('hide');
                    $('.cw-sra-tool-table').addClass('hide').removeClass('map-expanded');
                    break;
                default:
                    $('.cw-sra-map-title').addClass('hide');
                    var $selectedMap = $('.cw-sra-map-title[id=' + valueSelected + ']');
                    $selectedMap.removeClass('hide');
                    $selectedMap.children('.cw-sra-tool-table').removeClass('hide').addClass('map-expanded');
                    break;
            }
        });

        $('#stageTools').tabs();


        setupManageToolTemplateDialog();
        setupMapsDialog();
        setupStageDialog();
        setupToolsDialog();
        setupDeliverablesDialog();
        setupQuestionsDialog();

        setupToolSearch();
    }


// name: setupManageToolTempalteDialog
// by: papproth, brian
// date: 2015.05.09
// purpose: setup the controls binding for the manage tool template dialog
    function setupManageToolTemplateDialog() {

        $('#editExistTemplate').on('click', function (e) {
            $('#existToolTemplateFileWrapper').removeClass('hide');
            $('#button-delete-file, #button-save-file, #button-cancel-file').removeClass('hide');
            $('#button-save-file, #button-delete-file').prop('disabled', true);
            $('#button-ok-file').addClass('hide');
            $('#button-cancel-file').focus();

        });


        $('#addNewTemplate').on('click', function (e) {
            $('#existToolTemplateFileWrapper').addClass('hide');
            $('#button-delete-file, #button-save-file, #button-cancel-file').addClass('hide');
            $('#button-ok-file').removeClass('hide').focus();
            $('#toolTemplatesDialogStatus').removeClass().html('');

            var CWDialogOptions = {
                url: '../_layouts/CorasWorks.Central.Administration/ActionForm.aspx?actionUrl=[SRA Root]/Actions%20Library/UploadReferenceDocument.cwad',
                title: 'Upload File',
                allowMaximize: true,
                showClose: true,
                autoSize: true,
                dialogReturnValueCallback: CWDialogCloseUploadDocument
            };
            SP.UI.ModalDialog.showModalDialog(CWDialogOptions);

        });


        $('#existFile').on('change', function (e) {
            $('#toolTemplatesDialogStatus').removeClass().html('');
            if ($(this).val() == 'Select') {
                $('#fileTitle').val('');
                $('#fileMethodology').val('');
                $('#fileLanguage').val('');
                $('#templateFilename').val('');
                $('#button-save-file, #button-delete-file').prop('disabled', true);
            }
            else {
                var id = $(this).val();
                // find the template in the array
                var template = $.grep(templates.Template, function (t, index) {
                    return t.ID == id;
                });
                $('#fileMethodology').val(template[0].Methodology);
                $('#fileTitle').val(template[0].Title);
                $('#templateFilename').val($('#existFile option:selected').text());
                $('#fileLanguage').val(template[0].Language);
                $('#button-save-file, #button-delete-file').prop('disabled', false);
                $('#button-save-file, #button-delete-file, #button-cancel-file').removeClass('hide');
                $('#button-ok-file').addClass('hide');
            }

        });

    }

// name: CWDialogCloseUploadDocument
// by: papproth, brian
// date: 2015.05.11
// purpose: callback function for document upload
    function CWDialogCloseUploadDocument(result, target) {
        // assume the file upload is successfull and reload the templates
        // no method to trap an error back to the parent dialog
        getTemplates(function (result, msg) {
            if (result != true) {
                alert(msg);
            }
        });

    }


// name: setupMapsDialog
// by: papproth, brian
// date: 2015.05.08
// purpose: setup the controls binding for the manage maps dialog
    function setupMapsDialog() {

        $('#mapMethodology').on('change', function (e) {
            if ($(this).val() != '') {
                $('#button-save-map').prop('disabled', false);
            }
            else {
                $('#button-save-map').prop('disabled', true);
            }
        });

        // bind the existing map change event
        $('#existMapMethodology').on('change', function (e) {
            if ($(this).val() == 'Select') {
                $('#button-save-map, #button-delete-map').prop('disabled', true);
            }
            else {
                // get the active map from the MapDef json object

                var activeMapID = $(this).val().split('_')[1];
                var activeMap = $.grep(MapDef.Map, function (map, index) {
                    return map.id == activeMapID;
                });
                $('#mapDescription').val(activeMap[0].description);
                $('#mapHelp').val(activeMap[0].helpMessage);
                if (activeMap[0].active == '1') {
                    $('#activeMap').prop('checked', true);
                }
                else {
                    $('#activeMap').prop('checked', false);
                }
                $('#button-save-map, #button-delete-map').prop('disabled', false);
                $('#mapDialogStatus').removeClass().html('');
            }
        });

    }


// name: setupStageDialog
// by: papproth, brian
// date: 2015.05.08
// purpose: setup the controls binding for the manage stage dialog
    function setupStageDialog() {

        // restrict the stage init to alpha characters only
        $("#stageInit").bind("keypress", function (event) {
            if (event.charCode != 0) {
                var regex = new RegExp("^[a-zA-Z]+$");
                var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                if (!regex.test(key)) {
                    event.preventDefault();
                    return false;
                }
            }
        });

        //bind the change event on the initial box on the new stage dialog
        $('#stageInit').on('change', function (e) {

            var $activeStage = $('#' + activeStage);
            var $newStageHdr = $activeStage.children('.cw-sra-row-head-font').children('.cw-stage-initial');
            $newStageHdr.text($(this).val());


            // show / hide the error message
            $stageInitErrMsg = $('#stageInitErrMsg');
            if ($(this).val() == '') {
                $stageInitErrMsg.removeClass('hide');
                $('#button-save-stage').button('disable');
                $activeStage.children('.cw-sra-tool').remove();
                $activeStage.children('.cw-sra-row-head').removeClass('cw-sra-row-head').addClass('cw-sra-new-row-head').text('Add Stage to Map');
                $('#selected-tools').empty();
            }
            else {
                $stageInitErrMsg.addClass('hide');
                $('#button-save-stage').button('enable');
                updateStageTools();
            }
        });


        // bind the change event on the stage type radio buttons
        $('input:radio[name=stageType]').on('change', function () {
            resetStageData();
            switch ($(this).val()) {
                case 'new':
                    stageListItemID = 0;
                    $('#stageDescWrapper').removeClass('hide');
                    $('#existStageDescWrapper, #stageMapsWrapper').addClass('hide');
                    $('#activeStage').prop('checked', true);
                    $('#activeStage').prop('disabled', 'disabled');
                    break;
                case 'existing':
                    $('#stageDescWrapper').addClass('hide');
                    $('#existStageDescWrapper, #stageMapsWrapper').removeClass('hide');
                    $('#activeStage').prop('disabled', false);
                    $('#activeStage').prop('checked', false);

                    break;
                default:

            }
        });

        // bind the existing stage change event
        $('#existStageDesc').on('change', function (e) {
            var stageSelected = $('#existStageDesc option:selected').val();
            // get the stage
            if (stageSelected != '') {
                stageResult = $.grep(StagesDef.Stage, function (s, i) {
                    return s.ID == stageSelected;
                });

                // verify that a stage was found
                if (stageResult.length = 1) {
                    // get the list item id of the selected stage
                    stageListItemID = stageResult[0].ID;
                    // find the maps that use this stage

                    var usedInMap = new Array;
                    $('#stageMaps').text('');
                    $.each(MapDef.Map, function (mapIndx, map) {
                        if (map.Stages != null){
                            $.each($(map.Stages.Stage).toArray(), function(stageIndx, stage){
                                if (stage.stageID == stageSelected){
                                    usedInMap.push(map.title);
                                }
                            });
                        }
                    });
                    var mapTitles = '';
                    $.each(usedInMap, function(indx, title){
                        mapTitles += title + ', ';
                    });
                    $('#stageMaps').text(mapTitles.slice(0,-2));

                    $('#stagePurpose').val(stageResult[0].Purpose);
                    $('#stageInit').val(stageResult[0].Initial).trigger('change');
                    $('#stageNewDesc').val(stageResult[0].Title)
                    if (stageResult[0].Active == '1') {
                        $('#activeStage').prop('checked', true);
                    }
                    else {
                        $('#activeStage').prop('checked', false);
                    }
                }
                else {
                    alert('Stage "' + val + '" not found in Stages list');
                    resetStageData();
                }
            }
            else {
                stageListItemID = 0;
                $('#stagePurpose, #stageNewDesc').val('');
                $('#stageInit').val('').trigger('change');
            }
        });


    }

// name: setupToolsDialog
// by: papproth, brian
// date: 2015.05.08
// purpose: setup the controls binding for the manage tools dialog
    function setupToolsDialog() {
        // bind the existing tool change event
        $('#existToolTitle').on('change', function (e) {
            var $toolPurpose = $('#toolPurpose');
            var $toolHelpMsg = $('#toolHelpMsg');
            var $toolHelpFile = $('#toolHelpFile');
            var $toolTemplate = $('#toolTemplate');
            var $toolTitleRevised = $('#toolTitleRevised');
            $('#toolDialogStatus').removeClass().html('');
            $('#toolStages > option').removeProp('selected');
            $('#toolStages').pqSelect('refreshData');

            if ($(this).val() == 'Select') {
                $('#button-save-tool, #button-delete-tool').prop('disabled', true);
                $toolPurpose.val('');
                $toolHelpMsg.val('');
                $toolHelpFile.val('');
                $toolTemplate.val('');
                $toolTitleRevised.val('');
                $('#activeTool').prop('checked', false);

            }
            else {
                // get the selected tool from the sraTools object
                var activeToolID = $(this).val();
                var activeTool = $.grep(sraTools.Tool, function (tool, index) {
                    return tool.ID == activeToolID;
                });
                // create an array of tool stages
                // every odd indx is the index of the stage
                if (activeTool[0].Stages != null) {
                    var toolStages = activeTool[0].Stages.split(' ');
                    $.each(toolStages, function (indx, val) {
                        $('#toolStages option[value="' + val + '"]').prop('selected', 1);
                    });
                    $('#toolStages').pqSelect('refreshData');
                }
                $toolTitleRevised.val(activeTool[0].Title);
                $toolPurpose.val(activeTool[0].Purpose);
                $toolHelpMsg.val(activeTool[0].HelpMessage);


                if (activeTool[0].HelpFileLocation != undefined) {
                    $toolHelpFile.val(activeTool[0].HelpFileLocation.split(', ')[0]);
                    // check if the url is valid
                    $.ajax({
                        type: 'HEAD',
                        url: activeTool[0].HelpFileLocation.split(', ')[0],
                        success: function () {
                            $toolHelpFile.parent().removeClass().addClass('cw-input-wrapper file-url-valid');
                        },
                        error: function () {
                            $toolHelpFile.parent().removeClass().addClass('cw-input-wrapper file-url-invalid');
                        }
                    });
                }
                else {
                    $toolHelpFile.val('');
                    $toolHelpFile.parent().removeClass().addClass('cw-input-wrapper file-url-invalid');
                }

                // populate the tool template field
                if (activeTool[0].TemplateLocation != undefined) {
                    $toolTemplate.val(activeTool[0].TemplateLocation.split(', ')[0]);
                    // check if the url is valid
                    $.ajax({
                        type: 'HEAD',
                        url: activeTool[0].TemplateLocation.split(', ')[1],
                        success: function () {
                            $toolTemplate.parent().removeClass().addClass('cw-input-wrapper file-url-valid');
                        },
                        error: function () {
                            $toolTemplate.parent().removeClass().addClass('cw-input-wrapper file-url-invalid');
                        }
                    });
                }
                else {
                    $toolTemplate.val('');
                    $toolTemplate.parent().removeClass().addClass('cw-input-wrapper file-url-invalid');

                }
                if (activeTool[0].Active == '1') {
                    $('#activeTool').prop('checked', true);
                }
                else {
                    $('#activeTool').prop('checked', false);
                }
                $('#button-save-tool, #button-delete-tool').prop('disabled', false);
            }
        });

        // bind the change event on the tool type radio buttons
        $('input:radio[name=toolType]').on('change', function () {
            $('#toolPurpose').val('');
            $('#toolHelpMsg').val('');
            $('#toolHelpFile').val('');
            $('#toolTemplate').val('');
            $('#toolTitleRevised').val('');
            $('#toolDialogStatus').removeClass().html('');

            $activeTool = $('#activeTool');
            $existToolTitleWrapper = $('#existToolTitleWrapper');
            $toolTitleWrapper = $('#toolTitleWrapper');
            switch ($(this).val()) {
                case 'new':
                    toolListItemID = 0;
                    $('#existToolTitle').val('Select');
                    $toolTitleWrapper.removeClass('hide');
                    $existToolTitleWrapper.addClass('hide');
                    $activeTool.prop('disabled', true);
                    $activeTool.prop('checked', true);
                    $('#button-save-tool, #button-delete-tool').prop('disabled', true);
                    $('#toolStages > option').removeProp('selected');
                    $('#toolStages').pqSelect('refreshData');
                    break;
                case 'existing':
                    $toolTitleWrapper.addClass('hide');
                    $existToolTitleWrapper.removeClass('hide');
                    $activeTool.prop('disabled', false);
                    $activeTool.prop('checked', false);
                    break;
                default:

            }
        });

        // bind the change event on the libraryTool checkbox
        $('#libraryTool').on('change', function (e) {
            $('#toolDialogStatus').removeClass().html('');
            if ($(this).is(':checked')) {
                $('#toolTemplateInputWrapper').addClass('hide');
                $('#existToolTemplateWrapper').removeClass('hide');
            }
            else {
                $('#existToolTemplateWrapper').addClass('hide');
                $('#toolTemplateInputWrapper').removeClass('hide');

            }
        });

        $('#toolStages').on('change', function(e){
            $('#toolDialogStatus').removeClass().html('');
        });

        $('#toolHelpFile, #toolTitleRevised, #toolPurpose, #toolHelpMsg , #toolTemplate').on('change', function (e) {
            $('#toolDialogStatus').removeClass().html('');
        });

        $('#activeTool').on('click', function (e) {
            $('#toolDialogStatus').removeClass().html('');
        });
    }

// name: setupDeliverablesDialog
// by: papproth, brian
// date: 2015.05.08
// purpose: setup the controls binding for the deliverables dialog
    function setupDeliverablesDialog() {

        // bind the change event on the question title
        $('#deliverablesTitle, #deliverablesNewTitle').on('change', function (e) {
            $('#deliverablesDialogStatus').removeClass().html('');
            if ($(this).val().trim() == '') {
                $('#button-save-deliverable').prop('disabled', true);
            }
            else {
                $('#button-save-deliverable').prop('disabled', false);
            }
        });

        // bind the change event on the deliverables type radio buttons
        $('input:radio[name=deliverablesType]').on('change', function () {
            $('#deliverablesTitle').val('');
            $('#deliverablesNewTitle').val('');
            $('#deliverablesDialogStatus').removeClass().html('');
            switch ($(this).val()) {
                case 'new':
                    $('#deliverablesTitleWrapper').removeClass('hide');
                    $('#existDeliverablesTitleWrapper').addClass('hide');
                    $('#activeDeliverables').prop('checked', true);
                    $('#activeDeliverables').prop('disabled', true);
                    break;
                case 'existing':
                    $('#deliverablesTitleWrapper').addClass('hide');
                    $('#existDeliverablesTitleWrapper').removeClass('hide');
                    $('#activeDeliverables').prop('disabled', false);
                    $('#activeDeliverables').prop('checked', false);
                    $('#existDeliverablesTitle').val('Select');
                    break;
                default:
            }
        });



        // bind the click event for the deliverables select
        $('#activeDeliverables, #existDeliverablesTitle').on('click', function (e){
            $('#deliverablesDialogStatus').removeClass().html('');
        });


        // bind the change event for the deliverables select
        $('#existDeliverablesTitle').on('change', function (e) {
            if ($(this).val() == 'Select') {
                $('#activeDeliverables').prop('checked', false);
                $('#deliverablesNewTitle').val('');
                $('#button-save-deliverable').prop('disabled', true);
            }
            else {
                var id = $(this).val();
                // find the deliveable in the array
                var deliverable = $.grep(deliverables.Deliverable, function (d, index) {
                    return d.ID == id;
                });
                $('#deliverablesNewTitle').val(deliverable[0].Title);
                if (deliverable[0].Active == '1') {
                    $('#activeDeliverables').prop('checked', true);
                }
                else {
                    $('#activeDeliverables').prop('checked', false);
                }
                $('#button-save-deliverable').prop('disabled', false);

            }

        });
    }


// name: setupQuestionsDialog
// by: papproth, brian
// date: 2015.05.08
// purpose: setup the controls binding for the key questions dialog
    function setupQuestionsDialog() {

        var $activeQuestion = $('#activeQuestion');
        var $questionTitleWrapper = $('#questionTitleWrapper');
        var $existQuestionTitleWrapper = $('#existQuestionTitleWrapper');
        var $questionPurpose = $('#questionPurpose');
        var $questionNewTitle = $('#questionNewTitle');

        // bind the change event on the question title
        $('#questionTitle').on('change', function (e) {
            if ($(this).val().trim() == '') {
                $('#button-save-question').prop('disabled', true);
            }
            else {
                $('#button-save-question').prop('disabled', false);
            }
        });

        // bind the change event on the key questions type radio buttons
        $('input:radio[name=questionType]').on('change', function () {
            $('#questionPurpose').val('');
            $('#questionDialogStatus').removeClass().html('');
            switch ($(this).val()) {
                case 'new':
                    $questionNewTitle.val('');
                    $questionTitleWrapper.removeClass('hide');
                    $existQuestionTitleWrapper.addClass('hide');
                    $activeQuestion.prop('checked', true);
                    $activeQuestion.prop('disabled', true);
                    break;
                case 'existing':
                    $questionTitleWrapper.addClass('hide');
                    $existQuestionTitleWrapper.removeClass('hide');
                    $activeQuestion.prop('disabled', false);
                    $activeQuestion.prop('checked', false);
                    $('#existQuestionTitle').val('Select');
                    break;
                default:
            }
        });

        // bind the click event for the key questions select
        $('#activeQuestion').on('click', function (e) {
            $('#questionDialogStatus').removeClass().html('');
        });

        $('#questionNewTitle, #questionPurpose').on('change', function (e) {
            $('#questionDialogStatus').removeClass().html('');
        });

        // bind the change event for the key questions select
        $('#existQuestionTitle').on('change', function (e) {
            $('#questionDialogStatus').removeClass().html('');
            if ($(this).val() == 'Select') {
                $activeQuestion.prop('checked', false);
                $questionPurpose.val('');
                $('#button-save-question').prop('disabled', true);
            }
            else {
                var id = $(this).val();
                // find the question in the array
                var question = $.grep(keyQuestions.Question, function (q, index) {
                    return q.ID == id;
                });
                $questionPurpose.val(question[0].KeyQuestion);
                if (question[0].Active == '1') {
                    $activeQuestion.prop('checked', true);
                }
                else {
                    $activeQuestion.prop('checked', false);
                }

                $('#questionNewTitle').val($('#existQuestionTitle :selected').text());
                $('#button-save-question').prop('disabled', false);

            }

        });



    }


// name: sortDropDownListByText
// by: papproth, brian
// date: 2015.05.07
// purpose: sorts a drop-down list
    function sortDropDownListByText(selectId) {
        var foption = $('#' + selectId + ' option:first');
        var soptions = $('#' + selectId + ' option:not(:first)').sort(function (a, b) {
            return a.text.toLowerCase() == b.text.toLowerCase() ? 0 : a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1
        });
        $('#' + selectId).html(soptions).prepend(foption);

    };

// name: resetStageData// by: papproth, brian
// date: 2015.04.06
// purpose: clears the input fields for the stage dialog
    function resetStageData() {
        stageID = 0;
        $('#existStageDesc').val($("#existStageDesc option:first").val());
        $('#stagePurpose').val('');
        $('#stageDesc').val('');
        $('#stageInit').val('');
        $('#stageNewDesc').val('')
        $('#activeStage').prop('checked', false);
        $('#stageMaps').text('');
        $('#stageDescWrapper').removeClass('hide');
        $('#existStageDescWrapper').addClass('hide');
    }


// name: getMaps
// by: papproth, brian
// date: 2015.04.07
// purpose: loads all the map definitions from a CAPS call
    function getMaps(callback) {

        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: { 'RequestType': 'BatchRequest', 'ConfigFileLocation': '[SRA Root]/Resources/MapDesignerKO/map-designerCBD.xml', 'OutputType': 'JSON', 'XsltLocation': '[SRA Root]/Resources/MapDesignerKO/mapDesignerXSLT.xslt' },
            dataType: 'json',
            async: true,
            cache: false,
            type: 'POST',
            success: function (json) {
                if (json.Maps.Map) {
                    MapDef = json.Maps;
                    callback();

                }
                else { alert('No Map Definitions Found - Please contact SRA support.'); }
            }
        });


        // using temporary data
        //MapDef = jsonMapData.Maps;
        //callback(MapDef);
    }

// name: getSRATools
// by: bradley, michael, papproth, brian
// date: 2015.03.06
// purpose: returns a json object of all available tools
    function getSRATools(callback) {
        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: {
                'RequestType': 'BatchRequest',
                'ConfigFileLocation': '[SRA Root]/resources/getAllMapToolsCBD.xml',
                'XsltLocation': '[SRA Root]/Resources/getAllMapToolsXSLT_1.xslt',
                'OutputType': 'JSON'
            },
            dataType: 'json',
            async: true,
            cache: false,
            type: 'POST',
            success: function (json) {
                if (json.Tools.Tool) {
                    callback(json.Tools);
                    //sraTools = json.Tools;
                    /*
                     $('#all-tools div').not(':first').remove();
                     $.each(sraTools.Tool, function (indx, val) {
                     var toolTitle = '<div class="cw-tool-title cw-avail-tool " title="' + val.Purpose + '" stage="' + val.Stages + '" splistid="" docid="' + val.ID  + '">' + val.Title + '</div>';
                     $('#all-tools').append(toolTitle);
                     });
                     bindAllToolClick();
                     */
                }
                else { alert('No SRA Tools Found - Please contact SRA support.'); }
            }
        });


        // using temporary data
        //sraTools = jsonTools.Tools
        //$('#all-tools div').not(':first').remove();
        //$.each(sraTools.Tool, function (indx, val) {
        //    var toolTitle = '<div class="cw-tool-title cw-avail-tool " title="' + val.Purpose + '" stage="' + val.Stages + '" docid="' + val.ID + '">' + val.Title + '</div>';
        //    $('#all-tools').append(toolTitle);
        //});

        //bindAllToolClick();

    }

// name: getDeliverables
// by: papproth, brian
// date: 2015.04.09
// purpose: this methods gets the deliverables
    function getDeliverables(callback) {

        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: {
                'RequestType': 'BatchRequest',
                'ConfigFileLocation': '[SRA Root]/Resources/MapDesignerKO/getAllDeliverablesCBD.xml',
                'OutputType': 'json',
                'XsltLocation': '[SRA Root]/Resources/MapDesignerKO/getAllDeliverablesXSLT.xslt'
            },
            dataType: 'json',
            async: true,
            cache: false,
            type: 'POST',
            success: function (jsonData) {

                deliverables.length = 0;
                deliverables = jsonData.Deliverables;
                $('#existDeliverablesTitle option').not(':first').remove();
                $('#all-deliverables div').not(':first').remove();

                // fill the deliverables select input
                $.each(jsonData.Deliverables.Deliverable, function (indx, deliverable) {
                    if (deliverable.Active == '1') {
                        $('#existDeliverablesTitle').append($('<option>', {
                            value: deliverable.ID,
                            text: deliverable.Title,
                            class: '',
                            title: deliverable.Title
                        }));
                        deliverableTitle = '<div class="cw-tool-title cw-avail-tool" title="' + deliverable.Title + '" splistid="' + deliverable.ID + '">' + deliverable.Title + '</div>';
                        $('#all-deliverables').append(deliverableTitle);

                    }
                    else {
                        $('#existDeliverablesTitle').append($('<option>', {
                            value: deliverable.ID,
                            text: deliverable.Title,
                            class: 'cw-inactive-option',
                            title: 'Inactive'
                        }));
                    }

                });

                callback(true, null);
            },
            error: function (jqXHR, status, error) {
                callback(false, error);

            }

        });
    }



// name: getKeyQuestions
// by: papproth, brian
// date: 2015.04.09
// purpose: this methods gets tyhe key questions
    function getKeyQuestions(callback) {



        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: {
                'RequestType': 'BatchRequest',
                'ConfigFileLocation': '[SRA Root]/Resources/MapDesignerKO/getAllQuestionsCBD.xml',
                'OutputType': 'json',
                'XsltLocation': '[SRA Root]/Resources/MapDesignerKO/getAllQuestionsXSLT.xslt'
            },
            dataType: 'json',
            async: true,
            cache: false,
            type: 'POST',
            success: function (jsonData) {

                keyQuestions.length = 0;
                keyQuestions = jsonData.Questions;
                $('#existQuestionTitle option').not(':first').remove();
                $('#all-questions div').not(':first').remove();

                // fill the key questions select input
                $.each(jsonData.Questions.Question, function (indx, question) {
                    if (question.Active == '1') {
                        $('#existQuestionTitle').append($('<option>', {
                            value: question.ID,
                            text: question.Title,
                            class: '',
                            title: question.KeyQuestion
                        }));


                        questionTitle = '<div class="cw-tool-title cw-avail-tool" title="' + question.KeyQuestion + '" splistid="' + question.ID + '">' + question.Title + '</div>';
                        $('#all-questions').append(questionTitle);


                    }
                    else {
                        $('#existQuestionTitle').append($('<option>', {
                            value: question.ID,
                            text: question.Title,
                            class: 'cw-inactive-option',
                            title: 'Inactive'
                        }));
                    }




                });




                callback(true, null);
            },
            error: function (jqXHR, status, error) {
                callback(false, error);

            }

        });

    }

// name: getTemplates
// by: papproth, brian
// date: 2015.05.11
// purpose: this methods gets the templates from the reference documents library
    function getTemplates(callback) {

        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: {
                'RequestType': 'BatchRequest',
                'ConfigFileLocation': '[SRA Root]/Resources/MapDesignerKO/getToolsAndTemplatesCBD.xml',
                'OutputType': 'json',
                'XsltLocation': '[SRA Root]/Resources/MapDesignerKO/getToolsAndTemplatesXSLT.xslt'
            },
            dataType: 'json',
            async: true,
            cache: false,
            type: 'POST',
            success: function (jsonData) {

                templates.length = 0;
                templates = jsonData.Templates;

                $('#existFile option').not(':first').remove();
                $('#existToolTemplate option').not(':first').remove();

                // fill the templates select input
                $.each(jsonData.Templates.Template, function (indx, file) {
                    $('#existFile, #existToolTemplate ').append($('<option>', {
                        value: file.ID,
                        text: file.Filename,
                        title: file.Filename,
                        url: file.Url
                    }));

                });

                sortDropDownListByText('existToolTemplate');
                sortDropDownListByText('existFile');
                callback(true, null);
            },
            error: function (jqXHR, status, error) {
                callback(false, error);

            }

        });

    }



// name: toolSearch
// by: papproth, brian
// date: 2015.04.09
// purpose: binds the mouse events to the tool search box
    function setupToolSearch() {


        // bind the keypress event to the tool-search input
        $("#tool-search, #deliverable-search, #question-search").keyup(function (event) {
            var toolWrapper;
            switch ($(this).prop('id')){
                case 'tool-search':
                    toolWrapper = 'all-tools';
                    break;
                case 'deliverable-search':
                    toolWrapper = 'all-deliverables';
                    break;
                case 'question-search':
                    toolWrapper = 'all-questions';
                    break;
            }


            $("#" + toolWrapper + " > div.cw-tool-title").hide();
            $("#" + toolWrapper + " > div.cw-tool-title:containsNC(" + $(this).val() + ")").show();
        });

        // handle the x on the input field
        // there are 2 events fired on input element when clicking on the clear button:
        // mousedown and mouseup.
        // from stack-overflow : http://stackoverflow.com/questions/14498396/event-fired-when-clearing-text-input-on-ie10-with-clear-icon
        $("#tool-search, #deliverable-search, #question-search").bind("mouseup", function (e) {
            var toolWrapper;
            switch ($(this).prop('id')){
                case 'tool-search':
                    toolWrapper = 'all-tools';
                    break;
                case 'deliverable-search':
                    toolWrapper = 'all-deliverables';
                    break;
                case 'question-search':
                    toolWrapper = 'all-questions';
                    break;
            }

            var $input = $(this), oldValue = $input.val();
            if (oldValue == "") return;
            // When this event is fired after clicking on the clear button
            // the value is not cleared yet. We have to wait for it.
            setTimeout(function () {
                var newValue = $input.val();
                if (newValue == "") {
                    $("#" + toolWrapper + ' > div.cw-avail-tool').show();
                }
            }, 1);
        });
    }



// name: buildMapsTable
// by: papproth, brian
// date: 2015.04.07
// purpose: builds the main map table by taking the map json object (MapDef) generated from a CAPS call
    function buildMapsTable(callback) {

        var mapTitle = '';
        mapTitles.length = 0;
        // loop thru the maps and write to the table
        $.each(MapDef.Map, function (mapIndx, map) {
            // add the map title to the array
            mapTitles.push({ 'Title': map.title, 'ID': 'map_' + map.id, 'Active': map.active });

            // only show the active maps in the table
            if (map.active == '1') {
                mapTitle = '<span class="cw-active-map">' + map.title + '</span>';
            }
            else {
                mapTitle = '<span class="cw-inactive-map">' + map.title + ' (Inactive)</span>';
            }
            // add a div to the table for each map
            $('#sraMaps').append('<div id="map_' + map.id + '" class="cw-sra-map-title"><div class="cw-edit-map" title="Edit Map Definition"></div><div class="cw-validate-map-tools hide" id="map_' + map.id + '_validate" title="Validate Map Tool Templates"></div><div class="cw-validate-map-tool-help hide" id="map_' + map.id + '_validate_help" title="Validate Map Tool Help Templates"></div><div class="cw-sra-title">' + mapTitle + '</div></div>');
            // add the stages and tools to the map div
            $('#map_' + map.id).append('<div id="map_' + map.id + '_wrapper" class="cw-sra-tool-table hide"></div>');
            if (map.Stages) {
                $.each($(map.Stages.Stage).toArray(), function (stageIndx, stage) {
                    $('#map_' + map.id + '_wrapper').append('<div id="stage_' + map.id + '_' + stage.position + '" stageindx="' + stage.position + '" class="cw-sra-tool-row ui-sortable"><div class="cw-sra-row-head cw-sra-row-head-font" mapstageid="' + stage.id + '" mapstagetitle="' + stage.title + '" title="' + stage.title + ' ' + stage.purpose + '" indx="' + stageIndx + '" ><div class="cw-sra-edit cw-sra-edit-stage"></div><div class="cw-stage-initial" stageid="' + stage.stageID + '">' + stage.initial + '</div><div class="cw-sra-delete" title="Delete Stage"></div></div></div>');
                    // add the tools to the stages
                    if (stage.Tools) {
                        // check if any tools are defined and then add them to the stage
                        $.each($(stage.Tools.Tool).toArray(), function (toolIndx, tool) {
                            toolCounter = +toolIndx + +1;
                            //$('#stage_' + map.id + '_' + stage.position).append('<div id="tool_' + map.id + '_' + tool.id + '" docid="' + tool.toolID + '" class="cw-sra-tool cw-active" splistid="' + tool.id + '"><div class="cw-sra-tool-edit" title="Edit tool"></div>' + tool.title + '<div class="cw-sra-delete-tool" title="Delete tool"></div></div>');
                            $('#stage_' + map.id + '_' + stage.position).append('<div id="tool_' + map.id + '_' + stage.position + '_' + tool.id + '" docid="' + tool.toolID + '" class="cw-sra-tool cw-active" splistid="' + tool.id + '"><div class="cw-sra-tool-edit" title="Edit tool"></div>' + tool.title + '<div class="cw-sra-delete-tool" title="Delete tool"></div></div>');
                            newToolIndx = ++toolIndx;
                        });
                    }
                    // add a blank tool for adding an additional tool to the end
                    newToolIndx = 0;
                    $('#stage_' + map.id + '_' + stage.position).append('<div id="tool_' + map.id + '_' + stage.position + '_' + newToolIndx + '" class="cw-new-tool">Manage Tools</div>');
                    newStageIndx = +stage.position + +1;
                });

                // add a new stage button at the end of each stage
                $('#map_' + map.id + '_wrapper').append('<div id="stage_' + map.id + '_new" stageindx="' + newStageIndx + '" class="cw-sra-tool-row ui-sortable"><div class="cw-sra-new-row-head cw-sra-row-head-font">Add Stage to Map</div></div>');
            }

            else {
                // new map definition found
                // add new stage and new tools placeholders
                $('#map_' + map.id + '_wrapper').append('<div id="stage_' + map.id + '_new' + '" stageindx="1" class="cw-sra-tool-row ui-sortable"><div class="cw-sra-new-row-head cw-sra-row-head-font">Add Stage to Map</div></div>');
            }
            nextStageIndx = 0;
        });



        // hide the loader dialog
        $('#busyLoader').hide();


        // fill the map selection drop-down
        addMapTitles();

        // make the tool rows sortable
        makeStagesSortable();

        // add a click event for the map title
        mapClick(function () {
            // activate the new map
            if (newMapID != '0') {
                //alert('#map_' + newMapID);
                $('#map_' + newMapID).children('.cw-sra-title').trigger('click');
                $('#sraSelectMaps').val('map_' + newMapID);
            }
        });

        // add a click event for the new stage
        stageClick();

        // add a click event to all the tools
        toolEditClick();

        // add a click event for the delete stage icon
        deleteStageClick();

        // add a click event for the delete tool icon
        deleteToolClick();

        // add a click event for the edit map icon
        editMapClick()

        // add click event for map validation
        validateMapClick();

    }


// name: makeRowSortable
// by: papproth, brian
// date: 2015.04.07
// purpose: makes the tools in the stage row sortable
    function makeStagesSortable() {


        //activeStage = $(this).parent().parent()[0].id;
        //var activeMapID = activeStage.split('_')[1];

        $('.cw-sra-tool-row').sortable({
            axis: 'x',
            items: '.cw-sra-tool',
            helper: 'clone',
            update: function (event, ui) {
                var toolIDs = new Array;
                $.each(ui.item.parent('.cw-sra-tool-row').children('.cw-sra-tool'), function(indx, tool){
                    toolIDs.push($(tool).attr('splistid'));
                });
                batchUpdateMapStageTools(toolIDs, 'Save');
            }
        });
        // make the stage sortable in the vertical axis
        $('.cw-sra-tool-table').sortable({
            axis: 'y',
            items: '.cw-sra-tool-row',
            update: function (event, ui) {

                activeStage = ui.item[0].id;
                var activeMapID = activeStage.split('_')[1];
                resequenceStageIndexes(activeMapID, function (result, data) {
                    if (result == true) {

                    }
                    else {
                        alert('An error occured re-sequencing the map stages!\n' + data);
                    }

                });
            }
        });
    }

// name: mapClick
// by: papproth, brian
// date: 2015.04.07
// purpose: adds a click event to each map title
    function mapClick(callback) {
        $('.cw-sra-title').on('click', function () {

            var $currentMap = $(this).parent().children('.cw-sra-tool-table');
            var mapID = $currentMap.parent().prop('id');
            var $validateMap = $('#' + mapID + '_validate');
            var $validateMapHelp = $('#' + mapID + '_validate_help');

            if ($currentMap.hasClass('map-expanded')) {
                $currentMap.removeClass('map-expanded').addClass('hide');
                $validateMap.addClass('hide');
                $validateMapHelp.addClass('hide');
                //reset the validation colors
                $('[id^=tool_' + mapID.split('_')[1] + '_]').css({'color':'white','font-weight':'normal'});
            }
            else {

                var $mapTable = $(this).parent().children('.cw-sra-tool-table');
                // check if the map wrapper is hidden
                if ($mapTable.hasClass('hide')) {
                    $mapTable.removeClass('hide').addClass('map-expanded');
                    $validateMap.removeClass('hide');
                    $validateMapHelp.removeClass('hide');
                }
            }
        });
        callback();
    }

// name: editMapClick
// by: papproth, brian
// date: 2015.04.17
// purpose: adds a click event to each map title
    function editMapClick() {

        $('.cw-edit-map').on('click', function (e) {
            mapMethodology('edit', $(this).parent().attr('id').split('_')[1]);
        });
    }

// name: validateMapClick
// by: papproth, brian
// date: 2015.04.17
// purpose: adds a click event to each map validate icon
    function validateMapClick() {

        var currentTool;

        $('.cw-validate-map-tools, .cw-validate-map-tool-help').on('click', function (e) {

            var validMapFlag = true;
            var url;
            var mapID = $(this).parent().attr('id').split('_')[1];
            var mapTools = $('[id^=tool_' + mapID + '_]');

            // reset the tool font color and weight
            $('[id^=tool_' + mapID + '_]').css({ 'color': 'white', 'font-weight': 'normal' });

            $.each(mapTools, function (indx, mapTool) {
                if ($(mapTool).hasClass('cw-sra-tool')) {
                    currentTool = $.grep(sraTools.Tool, function (tool, index) {
                        return tool.ID == $(mapTool).attr('docid');
                    });

                    if ($(e.target).hasClass('cw-validate-map-tool-help')) {
                        if (currentTool[0].HelpFileLocation) {
                            url = currentTool[0].HelpFileLocation.split(', ')[0];
                            verifyToolURL(url, mapTool, function(result){
                                if (result){
                                    $(mapTool).css({ 'color': 'yellow', 'font-weight': 'normal' });
                                }
                                else {
                                    validMapFlag = false;
                                    $(mapTool).css({ 'color': '#C50C0C', 'font-weight': 'bold' });
                                }

                            });
                        }
                        else {
                            validMapFlag = false;
                            $(mapTool).css({ 'color': '#C50C0C', 'font-weight': 'bold' });
                        }
                    }
                    else {
                        if (currentTool[0].TemplateLocation) {
                            url = currentTool[0].TemplateLocation.split(', ')[1];
                            verifyToolURL(url, mapTool, function(result){
                                if (result){
                                    $(mapTool).css({ 'color': 'yellow', 'font-weight': 'normal' });
                                }
                                else {
                                    validMapFlag = false;
                                    $(mapTool).css({ 'color': '#C50C0C', 'font-weight': 'bold' });
                                }

                            });

                        }
                        else {
                            validMapFlag = false;
                            $(mapTool).css({ 'color': '#C50C0C', 'font-weight': 'bold' });
                        }
                    }
                }
            });
            // display a dialog if the map is valid for the selected validation

            // this is not returning an a correct status if async = true when verifying the URL
            /*
             var $toolValidationOkDialog = $('#toolValidationOkDialog');
             $toolValidationOkDialog.removeClass('hide');
             $toolValidationOkDialog.dialog({
             autoOpen: true,
             modal: true,
             width: 340,
             minWidth: 340,
             maxWidth: 340,
             height: 200,
             minHeight: 200,
             maxHeight: 200,
             resizeable: false,
             title: 'Tool Validation',
             open: function () {
             if (validMapFlag) {
             $('#toolValidationMsg').removeClass().addClass('validationOK').text('No tool validation errors were found');

             }
             else {
             $('#toolValidationMsg').removeClass().addClass('validationFail').text('Tool validation errors were found');
             }
             },
             buttons: [{
             id: 'button-ok-validation',
             text: 'OK',
             click: function () {
             $(this).dialog('close');
             }
             }]

             });
             */

        });

    }


// name: verifyToolURL
// by: papproth, brian
// date: 2015.06.18
// purpose: verifies the url for a template of help file
    function verifyToolURL(url, mapTool, callback){
        $.ajax({
            type: 'HEAD',
            url: url,
            async: true,
            success: function () {
                callback(true);
                //$(mapTool).css({'color':'white','font-weight':'normal'});
            },
            error: function () {
                callback(false);
                //$(mapTool).css({'color':'#C50C0C','font-weight':'bold'});
            }
        });

    }


// name: editMapMethodology
// by: papproth, brian
// date: 2015.04.17
// purpose: adds a click event to each map title and the manage maps toolbar button
    function mapMethodology(requestType, activeMapID) {

        var $mapDialogStatus = $('#mapDialogStatus');
        var $mapMethodology = $('#mapMethodology');
        var $mapDescription = $('#mapDescription');
        var $activeMapWrapper = $('#activeMapWrapper');
        var $activeMap = $('#activeMap');
        var $existMapMethodologyWrapper = $('#existMapMethodologyWrapper');
        var $mapMethodologyWrapper = $('#mapMethodologyWrapper');

        var $mapHelp = $('#mapHelp');
        var activeStatus;

        // show the dialog
        var $newMapDialog = $('#newMapDialog')
        $newMapDialog.removeClass('hide');
        $newMapDialog.dialog({
            autoOpen: true,
            modal: true,
            width: 610,
            minWidth: 610,
            maxWidth: 610,
            height: 450,
            minHeight: 450,
            maxHeight: 450,
            resizeable: false,
            title: function () {
                switch (requestType) {
                    case 'edit':
                        return 'Edit Map Definition';
                        break;
                    case 'new':
                        return 'Add New Map Definition';
                        break;
                    case 'manage':
                        return 'Manage Map Definitions';
                        break;

                    default:
                }
            },
            create: function () {
                var $btnPane = $newMapDialog.parent().children('.ui-dialog-buttonpane');
                $btnPane.append('<div id="mapDialogStatus" class=""></div>');
                $mapDialogStatus = $('#mapDialogStatus');

            },

            open: function () {
                $('#button-ok-map').addClass('hide');
                $('#button-save-map, #button-delete-map').prop('disabled', true);
                $('#mapDialogStatus').removeClass().html('');
                // reset the checkbox to active since only active maps are available
                $('#activeMap').prop('checked', true);
                switch (requestType) {
                    case 'edit':
                        $('#button-delete-map').removeClass('hide');
                        // get the active map from the MapDef json object
                        var activeMap = $.grep(MapDef.Map, function (map, index) {
                            return map.id == activeMapID;
                        });
                        $mapMethodology.val(activeMap[0].title);
                        $mapDescription.val(activeMap[0].description);
                        $mapHelp.val(activeMap[0].helpMessage);
                        $existMapMethodologyWrapper.addClass('hide');
                        $mapMethodologyWrapper.removeClass('hide');
                        (activeMap[0].active == '1') ? $activeMap.prop('checked', true) : $activeMap.prop('checked', false);
                        $('#button-save-map, #button-delete-map').prop('disabled', false);
                        break;
                    /*
                     case 'manage':
                     $mapDescription.val('');
                     $mapHelp.val('');
                     $('#activeMap').prop('checked', false);
                     $('#existMapMethodology').val('Select');
                     $existMapMethodologyWrapper.removeClass('hide');
                     $mapMethodologyWrapper.addClass('hide');
                     $activeMapWrapper.removeClass('hide');
                     break;
                     */
                    case 'new':
                        $mapDescription.val('');
                        $mapHelp.val('');
                        $mapMethodology.val('');
                        $activeMapWrapper.addClass('hide');
                        $existMapMethodologyWrapper.addClass('hide');
                        $mapMethodologyWrapper.removeClass('hide');
                        $('#button-delete-map').addClass('hide');
                        break;
                    default:
                }
            },
            close: function () {
                $activeMapWrapper.removeClass('hide');
            },
            buttons: [{
                id: 'button-save-map',
                text: 'Save Map',
                click: function () {
                    if ($mapMethodology.val() == '' && requestType != 'manage') {
                        $mapDialogStatus.children('.cw-dialog-exclamation').removeClass('hide');
                    }
                    else {
                        switch (requestType) {
                            case 'new':
                                saveMapDef('New', 1, requestType, function callback(result, data) {
                                    if (result == true) {
                                        if (data.Code == '0') {
                                            $mapDialogStatus.removeClass().addClass('cw-dialog-success').html('Map definition saved');
                                            newMapID = data.ID[1];
                                            // reload the map definitions
                                            $('#sraMaps').empty();
                                            getMaps(function () {
                                                buildMapsTable();
                                            });
                                        }
                                        else {
                                            $mapDialogStatus.removeClass().addClass('cw-dialog-failure').html('Error saving map definition');
                                            alert('An error occured saving the map definition.\nPlease contact SRA support for help.\nCAPS Error Code: ' + data.Code + '\nCAPS Error: ' + data.ErrorText)
                                        }
                                    }
                                    else {
                                        alert('Error saving map!\nError: ' + data);
                                    }
                                });
                                break;
                            case 'edit':
                            case 'manage':
                                $('#button-cancel-map,#button-delete-map,#button-save-map').addClass('hide');
                                $('#button-ok-map').removeClass('hide');
                                if ($('#activeMap').is(':checked')) {
                                    activeStatus = 1;
                                }
                                else {
                                    activeStatus = 0;
                                }

                                // get the id of the seelcted map if dialog opened from toolbar
                                if (requestType == 'manage') {
                                    activeMapID = $('#existMapMethodology').val().split('_')[1];
                                }
                                saveMapDef(activeMapID, activeStatus, requestType, function callback(result, data) {
                                    if (result == true) {
                                        if (data.Code == '0') {
                                            // reload the map definitions
                                            $('#sraMaps').empty();
                                            getMaps(function () {
                                                buildMapsTable();
                                                if (requestType == 'manage') {
                                                    $('#existMapMethodology').val('map_' + activeMapID);
                                                }
                                            });
                                            $mapDialogStatus.removeClass().addClass('cw-dialog-success').html('Map definition has been updated');
                                        }
                                        else {
                                            $mapDialogStatus.removeClass().addClass('cw-dialog-failure').html('Error saving map definitioan');
                                            alert('An error occured saving the map definition.\nPlease contact SRA support for help.\nCAPS Error Code: ' + data.Code + '\nCAPS Error: ' + data.ErrorText)
                                        }
                                    }
                                    else {
                                        alert('Error saving map!\nError: ' + data);
                                    }
                                });
                                break;

                            default:

                        }
                        if (requestType == 'manage') {
                            $('#button-save-map,#button-cancel-map,#button-delete-map').removeClass('hide');
                            $('#button-ok-map').addClass('hide');
                        }
                        else {
                            $('#button-save-map,#button-cancel-map,#button-delete-map').addClass('hide');
                            $('#button-ok-map').removeClass('hide');
                        }
                    }
                }
            },
                {
                    id: 'button-ok-map',
                    text: 'OK',
                    click: function () {
                        //$activeMapWrapper.removeClass('hide');
                        $(this).dialog('close');
                    }
                },
                {
                    id: 'button-delete-map',
                    text: 'Delete Map',
                    click: function () {
                        deleteMapDialog(activeMapID,requestType);
                    }
                },
                {
                    id: 'button-cancel-map',
                    text: 'Cancel',
                    click: function () {
                        $mapMethodology.val('');
                        $mapDescription.val('');
                        $mapHelp.val('');
                        $(this).dialog('close');

                    }
                }]
        });
    }


// name: deleteMapDialog
// by: papproth, brian
// date: 2015.06.12
// purpose: shows the delete map confirmation dialog
    function deleteMapDialog(activeMapID) {

        var $deleteMapDialog = $('#delete-map');
        var $mapDialogStatus = $('#mapDialogStatus');

        $deleteMapDialog.removeClass('hide');
        $deleteMapDialog.dialog({
            minWidth: 400,
            maxWidth: 400,
            minHeight: 200,
            maxHeight: 200,
            resizeable: false,
            title: 'Delete Map',
            modal: true,
            create: function () {
                var $btnPane = $deleteMapDialog.parent().children('.ui-dialog-buttonpane');
                $btnPane.append('<div id="deleteMapDialogStatus" class=""></div>');

            },
            open: function () {
                $('#deleteMapDialogStatus').removeClass().html('');
                $('#button-ok-map-delete').addClass('hide');
            },
            close: function () {

            },
            buttons: [
                {
                    id: 'button-yes-map-delete',
                    text: 'Yes',
                    click: function () {
                        $('#button-cancel-map,#button-delete-map,#button-save-map').addClass('hide');
                        $('#button-ok-map').removeClass('hide');
                        // delete the tools related to the map
                        var toolIDs = new Array;
                        $.each($('[id^="tool_' + activeMapID + '"][class="cw-sra-tool cw-active"]'), function(indx, tool){
                            toolIDs.push($(tool).attr('splistid'));
                        });
                        batchUpdateMapStageTools(toolIDs, 'Delete');


                        // delete the stages related to the map
                        var stageIDs = new Array;
                        $.each($('[id^="stage_' + activeMapID + '"]'), function(indx, tool){
                            if($(tool).prop('id') != 'stage_' + activeMapID + '_new'){
                                stageIDs.push($(tool).children('.cw-sra-row-head').attr('mapstageid'));
                            }
                        });
                        $('[id^=stage_' + activeMapID + ']').remove();
                        batchDeleteMapStages(stageIDs);


                        deleteMapDef(activeMapID, function callback(result, data) {
                            if (result == true) {
                                if (data.Code == '0') {
                                    $mapDialogStatus.removeClass().addClass('cw-dialog-success').html('Map definition has been deleted');
                                    // reload the map definitions
                                    $('#sraMaps').empty();
                                    getMaps(function () {
                                        buildMapsTable();
                                    });
                                }
                                else {
                                    $mapDialogStatus.removeClass().addClass('cw-dialog-failure').html('Error deleteng map definition');
                                    alert('An error occured deleting the map definition.\nPlease contact SRA support for help.\nCAPS Error Code: ' + data.Code + '\nCAPS Error: ' + data.ErrorText)
                                }
                            }
                            else {
                                alert('Error deleting map!\nError: ' + data);
                            }
                        });

                        $deleteMapDialog.dialog('close');
                    }
                },
                {
                    id: 'button-no-map-delete',
                    text: 'No',
                    click: function () {
                        $deleteMapDialog.dialog('close');
                    }
                },
                {
                    id: 'button-ok-map-delete',
                    text: 'OK',
                    click: function () {
                        $deleteMapDialog.dialog('close');
                    }
                }
            ]
        });
    }



// name: deleteToolClick
// by: papproth, brian
// date: 2015.05.11
// purpose: adds a click event to the for the delete tool icon
    function deleteToolClick() {
        $(document).on('click', '.cw-sra-delete-tool', function () {
            var $tool = $(this).parent();
            var toolID = $tool.prop('id');
            var toolListitemID = $tool.attr('splistid');
            var $deleteToolDialog = $('#delete-tool');

            $('#delete-tool').attr('activeToolID', $(this).parent().prop('id'));
            $deleteToolDialog.removeClass('hide');
            $deleteToolDialog.dialog({
                minWidth: 400,
                maxWidth: 400,
                minHeight: 200,
                maxHeight: 200,
                resizeable: false,
                title: 'Delete "' + $tool.text() + '"',
                modal: true,
                create: function () {
                    var $btnPane = $deleteToolDialog.parent().children('.ui-dialog-buttonpane');
                    $btnPane.append('<div id="deleteToolDialogStatus" class=""></div>');

                },
                open: function () {
                    $('#deleteToolDialogStatus').removeClass().html('');
                    $('#button-ok-tool-delete').addClass('hide');
                },
                close: function () {

                },
                buttons: [
                    {
                        id: 'button-yes-tool-delete',
                        text: 'Yes',
                        click: function () {
                            var $deleteTool = $('#delete-tool');
                            var toolAttr = $deleteTool.attr('activeToolID').split('_');
                            var mapID = toolAttr[1];
                            var stageID = toolAttr[2];
                            var toolID = toolAttr[3];
                            var activeToolID = $('#delete-tool').attr('activeToolID');
                            deleteTool(toolID, function (result, data) {
                                if (result == true && data.Code == '0') {
                                    $('#deleteToolDialogStatus').removeClass().addClass('cw-dialog-success').html('Tool has been Deleted');
                                    $('#button-yes-tool-delete, #button-no-tool-delete').addClass('hide');
                                    $('#button-ok-tool-delete').removeClass('hide');
                                    $('#' + activeToolID).remove();
                                    // need to update the tool position column in the MapStageTools list
                                    // get an array of the tool ids
                                    var toolIDs = new Array;
                                    $.each($('#stage_' + mapID + '_' + stageID).children('.cw-sra-tool'), function(indx, tool){
                                        toolIDs.push($(tool).attr('splistid'));
                                    });
                                    batchUpdateMapStageTools(toolIDs, 'Save');

                                }
                                else {
                                    $('#deleteToolDialogStatus').removeClass().addClass('cw-dialog-failure').html('Error Deleting Tool!');
                                }

                            });
                        }
                    },
                    {
                        id: 'button-no-tool-delete',
                        text: 'No',
                        click: function () {
                            $deleteToolDialog.dialog('close');
                        }
                    },
                    {
                        id: 'button-ok-tool-delete',
                        text: 'OK',
                        click: function () {
                            $deleteToolDialog.dialog('close');
                        }
                    }
                ]
            });
        });
    }


// name: batchDeleteMapStages
// by: papproth, brian
// date: 2015.06.11
// purpose: deletes stages the MapStages list whena map definition is deleted
    function batchDeleteMapStages(stageIDs) {

        var batchXML = '<ows:Batch OnError="Return">'

        $.each(stageIDs, function (indx, id) {
            batchXML += '<Method ID="A' + indx + '">' +
                '<SetList>%MapStages%</SetList>' +
                '<SetVar Name="ID">' + id + '</SetVar>' +
                '<SetVar Name="Cmd">Delete</SetVar>' +
                '</Method>';
        });
        batchXML += '</ows:Batch>';


        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'MapStages', 'Batch': batchXML, 'OutputType': 'JSON' },
            dataType: 'json',
            async: true,
            cache: false,
            type: 'POST',
            success: function () {
            },
            error: function (jqXHR, status, error) {
                alert('An error occured updating the MapStagesList\nError:' + error);
            }

        });

    }

// name: batchUpdateMapStageTools
// by: papproth, brian
// date: 2015.06.11
// purpose: updates the MapStageTools list
    function batchUpdateMapStageTools(toolIDs, cmd){

        var toolPosition = 0;
        var batchXML = '<ows:Batch OnError="Return">'
        $.each(toolIDs, function(indx, id){
            toolPosition = +indx + +1;
            batchXML += '<Method ID="A' + indx + '">' +
                '<SetList>%MapStageTools%</SetList>' +
                '<SetVar Name="ID">' + id + '</SetVar>' +
                '<SetVar Name="Cmd">' + cmd + '</SetVar>';
            if (cmd == 'Save'){
                batchXML += '<SetVar Name="urn:schemas-microsoft-com:office:office#ToolPosition">' + toolPosition  + '</SetVar>';
            }
            batchXML += '</Method>';
        });
        batchXML += '</ows:Batch>';


        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'MapStageTools', 'Batch': batchXML, 'OutputType': 'JSON' },
            dataType: 'json',
            async: true,
            cache: false,
            type: 'POST',
            success: function () {
            },
            error: function (jqXHR, status, error) {
                alert('An error occured updating the MapStageToolsList\nError:' + error);
            }

        });

    }


// name: deleteStageClick
// by: papproth, brian
// date: 2015.04.07
// purpose: adds a click event to the for the delete stage icon
    function deleteStageClick() {
        $(document).on('click', '.cw-sra-delete', function () {
            activeStage = $(this).parent().parent()[0].id;
            var activeMapID = activeStage.split('_')[1];
            var $activeStage = $('#' + activeStage);
            var $deleteStageDialog = $('#delete-stage');
            var stageID = $activeStage.children('.cw-sra-row-head').children('.cw-stage-initial').html();
            var mapStageID = $activeStage.children('.cw-sra-row-head').attr('mapstageid');

            $deleteStageDialog.removeClass('hide');
            $deleteStageDialog.dialog({
                minWidth: 400,
                maxWidth: 400,
                minHeight: 200,
                maxHeight: 200,
                resizeable: false,
                title: 'Delete Stage "' + stageID + '"',
                modal: true,
                create: function () {
                    var $btnPane = $deleteStageDialog.parent().children('.ui-dialog-buttonpane');
                    $btnPane.append('<div id="deleteStageDialogStatus" class=""></div>');

                },
                open: function () {
                    $('#deleteStageDialogStatus').removeClass().html('');
                    $('#button-ok-stage-delete').addClass('hide');
                },
                close: function () {

                },
                buttons: [
                    {
                        id: 'button-yes-stage-delete',
                        text: 'Yes',
                        click: function () {
                            var capsCallData = {
                                listItemID: mapStageID,
                                cmd: 'Delete'
                            };
                            saveMapStage(capsCallData, function (deleteStageResult, data) {
                                if (deleteStageResult== true) {
                                    if (data.Code != '0') {
                                        $('#deleteStageDialogStatus').addClass('cw-dialog-failure').html('Error occured!');
                                        alert('An error occured deleting the map-stage definition.\nPlease contact SRA support for help.\nCAPS Error Code: ' + data.Code + '\nCAPS Error: ' + data.ErrorText)
                                    }
                                    else {
                                        $activeStage.remove();
                                        $('#deleteStageDialogStatus').addClass('cw-dialog-success').html('Stage Deleted');
                                        resequenceStageIndexes(activeMapID, function (resequenceStageResult, data) {
                                            if (resequenceStageResult == true) {
                                                getMaps(function () { });
                                            }
                                            else {
                                                alert('An error occured re-sequencing the map stages!\n' + data);
                                            }

                                        });
                                        // delete tools from MapStageTools list
                                        var toolIDs = new Array;
                                        $.each($activeStage.children('.cw-sra-tool'), function(indx, tool){
                                            toolIDs.push($(tool).attr('splistid'));
                                        });
                                        batchUpdateMapStageTools(toolIDs, 'Delete');


                                        // loop thru the stages and update the stageindx attribute
                                        $.each($('[id^="stage_' + activeMapID+ '_"]'), function(indx, stage){
                                            $(this).attr('stageindx', ++indx);
                                        });
                                        $('#button-yes-stage-delete, #button-no-stage-delete').addClass('hide');
                                        $('#button-ok-stage-delete').removeClass('hide');


                                    }
                                }
                                else {
                                    $('#deleteStageDialogStatus').addClass('cw-dialog-failure').html('Error occured!');
                                    alert('Error deleting map-stage definition!\nError: ' + data);
                                }
                            });
                        }
                    },
                    {
                        id: 'button-no-stage-delete',
                        text: 'No',
                        click: function () {
                            $deleteStageDialog.dialog('close');
                        }
                    },
                    {
                        id: 'button-ok-stage-delete',
                        text: 'OK',
                        click: function () {
                            $deleteStageDialog.dialog('close');
                        }
                    }
                ]
            });
        });
    }

// name: toolEditClick
// by: papproth, brian
// date: 2015.05.14
// purpose: adds a click event to the tool edit icon
    function toolEditClick() {
        $(document).on('click', '.cw-sra-tool-edit', function () {

            var toolID = $(this).parent().attr('docid'); // was splistid
            var formData = { toolID: toolID, toolTitle: $(this).parent().text() };
            openManageToolsDialog(formData);

        });

    }


// name: stageClick
// by: papproth, brian
// date: 2015.04.07
// purpose: adds a click event to the new tools
    function stageClick() {

        var manageTools;
        $(document).on('click', '.cw-sra-new-row-head, .cw-sra-edit, .cw-new-tool', function () {

            var newMapStage = false;
            // set the activeStage variable
            if ($(this).hasClass('cw-sra-new-row-head')) {
                manageTools = false;
                newMapStage = true;
                activeStage = $(this).parent()[0].id;
                activeStagePosition = $(this).parent().attr('stageindx');
            }
            else if ($(this).hasClass('cw-new-tool')) {
                // manage tool selected
                manageTools = true;
                activeStage = $(this).parent()[0].id;
                activeStagePosition = $(this).parent().attr('stageindx');
            }
            else {
                manageTools = false;
                activeStage = $(this).parent().parent()[0].id;
                activeStagePosition = $(this).parent().parent().attr('stageindx');
            }
            var activeMapID = activeStage.split('_')[1]; // activeStage = 'stage_xx_y' where xx = map.id and y = stage index
            //var activeStagePosition = activeStage.split('_')[2]; // add 1 to the stage index becasue the position attribute starts at 1
            var nextStageIndx = +activeStagePosition + +1;
            var savebtnText;
            var updateFlag = false;
            var $stageInit = $('#stageInit');
            var $activeStage = $('#' + activeStage);
            var mapStageTitle = $activeStage.children(':first').attr('mapstagetitle');


            // get the active map from the MapDef json object
            var activeMap = $.grep(MapDef.Map, function (map, index) {
                return map.id == activeMapID; // activeStage = 'stage_xx_y' where xx = map.id and y = stage index
            });

            // now get the stage data from the activeMap
            if (activeMap[0].Stages) {
                var stageData = $.grep($(activeMap[0].Stages.Stage).toArray(), function (stage, index) {
                    return stage.position == activeStagePosition;
                });
            }

            var dialogHeight;
            var stageID = $activeStage.children('.cw-sra-row-head').children('.cw-stage-initial').html();
            var stageIDValue = $activeStage.children('.cw-sra-row-head').children('.cw-stage-initial').attr('stageid');
            //var stageID = $activeStage.children('.cw-sra-tool-row').children('.cw-sra-row-head').children('.cw-stage-initial').html();
            $stageInit.val(stageID);

            // restore default styling
            $('#sourceOfStageWrapper, #stageTools, #sourceOfStageWrapper').removeClass('hide');
            $('#stageDesc, #stageInit, #stagePurpose').removeClass('cw-readonly').prop('readonly', false);
            $('#stageDesc, #stageInit, #stagePurpose').parent().removeClass('cw-readonly');
            $('#stageTools').tabs('option', 'disabled', []);



            // setup the dialog
            if ($(this).hasClass('cw-sra-new-row-head')) {
                // new stage dialog
                dialogTitle = "Add New Stage";
                $stageInit.val('');
                $('#stageNew').prop('checked', true).trigger('change');
                $('#stagePurpose').val('');
                $('#stageDesc').val('');
                $('#selected-tools').empty();
                saveBtnText = "Save Stage Definition";
                $('#stageDataWrapper, #existStageDescWrapper, #tollgateWrapper').removeClass('hide');
                $('#toolPanelWrapper, #activeStageWrapper, #stageTools, #sourceOfStageWrapper, #stageDescWrapper, #stageNewDescWrapper').addClass('hide'); //
                $('#stageDesc, #stageInit, #stagePurpose').addClass('cw-readonly').prop('readonly', true);
                $('#stageDesc, #stageInit, #stagePurpose').parent().addClass('cw-readonly');

                dialogHeight = 415;
            }
            else if ($(this).hasClass('cw-sra-edit-stage')) {
                // manage stage and tools dialog
                getStageTools($(this).parent().parent().children());
                getStageQuestionsAndDeliverables(stageData[0])
                updateFlag = true;
                $('#stageExisting').prop('checked', true);
                $('#existStageDesc').val(stageIDValue).trigger('change');
                dialogTitle = "Manage Stage and Tools";
                saveBtnText = "Save Changes";
                if (stageData.length > 0) {
                    $('#stagePurpose').val(stageData[0].purpose);
                    $('#stageDesc').val(stageData[0].title.replace(stageData[0].initial + ' - ', ''));
                    if (stageData[0].tollgate == '1') {
                        $('#tollGate').prop('checked', true);
                    }
                    else {
                        $('#tollGate').prop('checked', false);
                    }
                }
                $('#stageDataWrapper,#toolPanelWrapper, #tollgateWrapper, #stageDescWrapper').removeClass('hide');
                $('#activeStageWrapper').addClass('hide');
                dialogHeight = 890;

                // make selected controls readonly
                $('#sourceOfStageWrapper, #existStageDescWrapper').addClass('hide');
                $('#stageDesc, #stageInit, #stagePurpose').addClass('cw-readonly').prop('readonly', true);
                $('#stageDesc, #stageInit, #stagePurpose').parent().addClass('cw-readonly');

            }
            else {
                // manage stage dialog
                updateFlag = true;
                dialogTitle = 'Manage "' + mapStageTitle + '" Stage Tools';
                saveBtnText = "Save Tools";
                $('#stageDataWrapper').addClass('hide');
                $('#toolPanelWrapper').removeClass('hide');
                $('#stageTools').tabs('option', 'disabled', [1, 2]);
                dialogHeight = 620;
                getStageTools($(this).parent().children());
            }

            var dialogData = {
                dialogHeight: dialogHeight,
                dialogTitle: dialogTitle,
                saveBtnText: saveBtnText,
                activeMapID: activeMapID,
                activeMapName: activeMap[0].title,
                activeStageID: stageIDValue,
                activeStagePosition: activeStagePosition,
                nextStageIndx: nextStageIndx,
                activeStageTitle: mapStageTitle,
                $stageInit: $stageInit,
                updateFlag: updateFlag,
                $activeStage: $activeStage,
                manageTools: manageTools,
                newMapStage: newMapStage
            };
            manageStageDialog(dialogData);
            // open the dialog
            //var $newStageDialog = $('#manage-stage')
            //$newStageDialog.removeClass('hide');
            //$newStageDialog.dialog({});
        });
    }

// name: addMapTitles
// by: papproth, brian
// date: 2015.04.09
// purpose: populates the select map drop-down
    function addMapTitles() {
        //var $sraSelectMaps = $('#sraSelectMaps');
        var $sraSelectMaps = $('.sra-maps');

        $sraSelectMaps.empty();
        $sraSelectMaps.append('<option value="Select">Select a Map...</option>');

        // add the options to the main map select
        $.each(mapTitles, function (indx, map) {
            if (map.Active == '1') {
                $('#sraSelectMaps').append('<option value="' + map.ID + '" class="cw-active-map">' + map.Title + '</option>');
            }
            else {
                $('#sraSelectMaps').append('<option value="' + map.ID + '" class="cw-inactive-map">' + map.Title + ' (Inactive)</option>');
            }
        });
        $('#sraSelectMaps').append('<option value="All">Show All Maps</option>');

        // add the options to the manage maps select
        $.each(mapTitles, function (indx, map) {
            if (map.Active == '1') {
                $('#existMapMethodology').append($('<option>', {
                    value: map.ID,
                    text: map.Title
                }));
            }
            else {
                $('#existMapMethodology').append($('<option>', {
                    value: map.ID,
                    text: map.Title,
                    class: 'cw-inactive-option',
                    title: 'Inactive'
                }));

            }
        });

    }
// name: getStageTools
// by: papproth, brian
// date: 2015.02.09
// purpose: load the tools for a selected stage
//          stage = all child divs from the stage row including the row header
//          do not include the header in the tools ( indx > 0 )
//          when looping thru the elements
    function getStageTools(stage) {
        // clear the selected tools from the selected-tools div
        $('#selected-tools').empty();
        // add the tools from selected stage
        $.each(stage, function (indx, val) {
            if (indx > 0 && indx < stage.length - 1) {
                // skip the row header ( indx > 0 )
                var tool = '<div class="cw-selected-tool-title" docid="' + $(val).attr('docid') + '" splistid="' + $(val).attr('splistid') + '">' + $(val).text() + '</div>';
                $('#selected-tools').append(tool);
            }
        });

        bindSelectedToolClick();
    }


// name: getStageQuestionsAndDeliverables
// by: papproth, brian
// date: 2015.05.29
// purpose: gets the selected questions and deliverables for a stage
    function getStageQuestionsAndDeliverables(stageData) {

        $('#all-deliverables > div.cw-avail-tool').removeClass('hide');
        $('#all-questions > div.cw-avail-tool').removeClass('hide');
        $('#selected-deliverables, #selected-questions').empty();
        var deliverableTitles = stageData.deliverables.split(';#');
        var questionTitles = stageData.keyQuestions.split(';#');

        // get the deliverables, get every odd indx in the array - this will be the text
        var deliverableTitleArray = $(deliverableTitles).toArray();
        $.each(deliverableTitleArray, function (indx, val) {
            if (val != '' && indx % 2 != 0) {
                var deliverableHTML = '<div class="cw-selected-tool-title" splistid="' + deliverableTitleArray[indx - 1] + '">' + val + '</div>';
                $('#selected-deliverables').append(deliverableHTML);
                $('#all-deliverables > div:contains("' + val + '")').addClass('hide');
            }
        });

        // get the questions, get every odd indx in the array - this will be the text
        var questionTitleArray = $(questionTitles).toArray();
        $.each(questionTitleArray, function (indx, val) {
            if (val != '' && indx % 2 != 0) {
                var questionHTML = '<div class="cw-selected-tool-title" splistid="' + questionTitleArray[indx - 1] + '">' + val + '</div>';
                $('#selected-questions').append(questionHTML);
                $('#all-questions > div:contains("' + val + '")').addClass('hide');
            }
        });

        // click event
        setupItemClick(['questions', 'deliverables']);


    }

// name: setupItemClick
// by: papproth, brian
// date: 2015.05.29
// purpose: generic handler for questions and deliverables click event
    function setupItemClick(itemTypes) {

        $.each(itemTypes, function (indx, itemType) {

            $('#selected-' + itemType + ' > div.cw-selected-tool-title').unbind('click');
            $('#selected-' + itemType + ' > div.cw-selected-tool-title').click(function () {
                $('#all-' + itemType + ' > div:contains("' + $(this).text() + '")').removeClass('hide');
                $(this).remove();
            });

            $('#all-' + itemType + ' > div.cw-avail-tool').unbind('click');
            $('#all-' + itemType + ' > div.cw-avail-tool').click(function () {
                var $item = $(this).clone();
                $item.unbind('click');
                $item.click(function () {
                    $('#all-' + itemType + ' > div:contains("' + $(this).text() + '")').removeClass('hide');
                    $(this).remove();
                });
                $item.removeClass('cw-avail-tool').addClass('cw-selected-tool-title');
                $('#selected-' + itemType).append($item);
                $(this).addClass('hide');
            });
        });
    }


// name: bindAllToolClick
// by: papproth, brian
// date: 2015.02.09
// purpose: add a click event to each tool in the all-tools div
//          when tool is selected it will be highlighted and
//          disabled. it will be added to the selected tools panel
//          to the right.
    function bindAllToolClick() {
        $('#all-tools div.cw-tool-title').unbind('click');
        $('#all-tools div.cw-tool-title').click(function () {
            var $manageStageDialog = $('#manage-stage');
            var mapID = $manageStageDialog.attr('activemapid');
            var stageID = $manageStageDialog.attr('activestageid');
            var mapName = $manageStageDialog.attr('activemapname');
            var stageTitle= $manageStageDialog.attr('activestagetitle');
            var splistid = addTool(mapID,
                $(this).attr('docid'),
                ($('#selected-tools div').length + 1),
                $('#' + activeStage).children('div.cw-sra-row-head').attr('mapstageid'),
                stageID,
                mapName,
                $(this).text(),
                stageTitle,
                $(this).text());
            // create a unique tool identicication number
            // this is used when marking a tool as complete on the manage tool dialog
            var docid = $(this).attr('docid') + "_" + $('#selected-tools > div').length;
            var tool = '<div class="cw-selected-tool-title" title="' + $(this).attr('title') + '" docid="' + docid + '" splistid="' + splistid + '">' + $(this).prop('innerText') + '</div>';
            $('#selected-tools').append(tool);
            updateStageTools();
            // re-bind the click event in the all tools
            bindSelectedToolClick();

        });
    }
// name: bindSelectedToolClick
// by: papproth, brian
// date: 2015.02.09
// purpose: bind the click event to the selected tools
    function bindSelectedToolClick() {
        $("#selected-tools div.cw-selected-tool-title").unbind('click');
        $("#selected-tools div.cw-selected-tool-title").click(function () {
            // make the matching tool in the all-tools pane selectable
            var tool = $('#all-tools').children('[docid=' + $(this).attr('docid') + ']');
            var toolTitle = $(this).text();
            bindAllToolClick();
            //remove from the local map definition
            deleteTool($(this).attr('splistid'), function (result, data) {
                if (result == true) {
                    $('#stageDialogStatus').removeClass().addClass('cw-dialog-success').html(toolTitle + ' has been Deleted');
                }
                else {
                    $('#stageDialogStatus').removeClass().addClass('cw-dialog-failure').html('Error Deleting ' + toolTitle + '!');
                }

            });
            // remove from the selected-tools pane
            $(this).remove();
            updateStageTools();
        });
    }
// name: updateStageTools
// by: papproth, brian
// date: 2015.02.09
// purpose: write the selected tools back to stage
    function updateStageTools() {

        var toolArray = new Array;
        var tools;

        if (activeStage != '') {

            var mapID = activeStage.split('_')[1];
            var stageID = activeStage.split('_')[2];
            // build an array of selected tools
            $.each($('#selected-tools').children(), function (indx, val) {
                toolArray.push(new toolData($(val).attr('docid'), val.innerHTML, val.title, $(val).attr('splistid')));
            });

            // remove all the tools from the selected stage, keep the row header and the manage tools
            $('#' + activeStage).children('.cw-sra-tool').remove();
            // add the new tools
            $.each(toolArray, function (indx, val) {
                tool = '<div id="tool_' + mapID + '_' + stageID + '_' + val.splistid + '" class="cw-sra-tool cw-active" docid="' + val.docid.split('_')[0] + '" splistid="' + val.splistid + '"><div class="cw-sra-tool-edit" title="Edit tool"></div>' + val.title + '<div class="cw-sra-delete-tool" title="Delete tool"></div></div>';//splistid needs to be added to this div's attributes. splistid is the unique id returned by the addTool() function after the tool is written to the list of tools for this project's map.
                $(tool).insertBefore($('#' + activeStage).children(':last-child'));
            });
        }
    }


// name: addTool
// by: papproth, brian
// date: 2015.04.10
// purpose: adds a tool to the mapstagetools list
    function addTool(mapID, toolID, position, mapstageID, stageID, mapName, toolName, stageName, toolName) {

        $('#stageDialogStatus').removeClass().html('');
        var batchXML = '<ows:Batch OnError="Return">' +
            '<Method ID="A1">' +
            '<SetList>%MapStageTools%</SetList>' +
            '<SetVar Name="ID">New</SetVar>' +
            '<SetVar Name="Cmd">Save</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">Map Stage Tool</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#MapID">' + mapID + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#MapName">' + mapName + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#ToolID">' + toolID + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#MapStageID">' + mapstageID + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#ToolPosition">' + position + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#StageID">' + stageID + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#Stage">' + stageName + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#Tool">' + toolName + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_"><![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>' + toolName + '</LookupDbStoreValue><LookupDisplayValue>' + toolName + '</LookupDisplayValue></Property></Properties>]]></SetVar>' +
            '</Method>' +
            '</ows:Batch>';

        var splistid;

        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'MapStageTools', 'Batch': batchXML, 'OutputType': 'JSON' },
            dataType: 'json',
            async: false,
            cache: false,
            type: 'POST',
            success: function (json) {
                splistid = json.NewDataSet.ProcessBatchData.Results.Result.ID[1];
                $('#stageDialogStatus').removeClass().addClass('cw-dialog-success').html(toolName + ' Saved!');
            },
            error: function (jqXHR, status, error) {
                $('#stageDialogStatus').removeClass().addClass('cw-dialog-failure').html('Error Saving Tool!');
            }

        });

        return splistid;
    }

// name: deleteTool
// by: papproth, brian
// date: 2015.04.10
// purpose: deletes a tool to the sharepoint list
    function deleteTool(spListID, callback) {

        var batchXML = '<ows:Batch OnError="Return">' +
            '<Method ID="A1">' +
            '<SetList>%MapStageTools%</SetList>' +
            '<SetVar Name="ID">' + spListID + '</SetVar>' +
            '<SetVar Name="Cmd">Delete</SetVar>' +
            '</Method>' +
            '</ows:Batch>';

        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'MapStageTools', 'Batch': batchXML, 'OutputType': 'JSON' },
            dataType: 'json',
            async: true,
            cache: false,
            type: 'POST',
            success: function (json) {
                var capsResult = new capsResultData(json.NewDataSet.ProcessBatchData.Results.Result);
                callback(true, capsResult);
            },
            error: function (jqXHR, status, error) {
                callback(false, error);
            }

        });
    }


// name: deleteMapDef
// by: papproth, brian
// date: 2015.04.13
// purpose: deletes a map definition from sharepoint
    function deleteMapDef(listItemID, callback) {

        batchXML = '<ows:Batch OnError="Return">' +
            '<Method ID="A1">' +
            '<SetList>%Maps%</SetList>' +
            '<SetVar Name="ID">' + listItemID + '</SetVar>' +
            '<SetVar Name="Cmd">Delete</SetVar>' +
            '</Method>' +
            '</ows:Batch>';
        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'Maps', 'Batch': batchXML, 'OutputType': 'JSON' },
            dataType: 'json',
            async: false,
            cache: false,
            type: 'POST',
            success: function (json) {
                var capsResult = new capsResultData(json.NewDataSet.ProcessBatchData.Results.Result);
                callback(true, capsResult);
            },
            error: function (jqXHR, status, error) {
                callback(false, error);
            }
        });

    }

// name: saveMapDef
// by: papproth, brian
// date: 2015.04.13
// purpose: saves a map definition to sharepoint
    function saveMapDef(listItemID, activeStatus, requestType, callback) {

        var methodology = $('#mapMethodology').val();
        var description = $('#mapDescription').val();
        var help = $('#mapHelp').val();
        var batchXML;

        if (requestType == 'manage') {
            batchXML = '<ows:Batch OnError="Return">' +
                '<Method ID="A1">' +
                '<SetList>%Maps%</SetList>' +
                '<SetVar Name="ID">' + listItemID + '</SetVar>' +
                '<SetVar Name="Cmd">Save</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#Description">' + description + '</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#HelpMessage">' + help + '</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#Active">' + activeStatus + '</SetVar>' +
                '</Method>' +
                '</ows:Batch>';


        }
        else {
            batchXML = '<ows:Batch OnError="Return">' +
                '<Method ID="A1">' +
                '<SetList>%Maps%</SetList>' +
                '<SetVar Name="ID">' + listItemID + '</SetVar>' +
                '<SetVar Name="Cmd">Save</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">' + methodology + '</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#Description">' + description + '</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#HelpMessage">' + help + '</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#Active">' + activeStatus + '</SetVar>' +
                '</Method>' +
                '</ows:Batch>';


        }


        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'Maps', 'Batch': batchXML, 'OutputType': 'JSON' },
            dataType: 'json',
            async: false,
            cache: false,
            type: 'POST',
            success: function (json) {
                var capsResult = new capsResultData(json.NewDataSet.ProcessBatchData.Results.Result);
                callback(true, capsResult);
            },
            error: function (jqXHR, status, error) {
                callback(false, error);
            }
        });
    }
// name: saveStageDef
// by: papproth, brian
// date: 2015.04.17
// purpose: saves a new stage definition to sharepoint
    function saveStageDef(callback) {
        var batchXML;
        var stageDesc = $('#stageDesc').val();
        var stageNewDesc = $('#stageNewDesc').val();
        var stageInit = $('#stageInit').val();
        var stagePurpose = $('#stagePurpose').val();
        var stageActive = 0; // default to inactive

        if ($('#activeStage').prop('checked')) {
            stageActive = 1;
        }

        if (stageListItemID == 0) {
            batchXML = '<ows:Batch OnError="Return">' +
                '<Method ID="A1">' +
                '<SetList>%Stages%</SetList>' +
                '<SetVar Name="ID">New</SetVar>' +
                '<SetVar Name="Cmd">Save</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">' + stageDesc + '</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#Initial">' + stageInit + '</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#Purpose">' + stagePurpose + '</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#Active">1</SetVar>' +
                '</Method>' +
                '</ows:Batch>';

        }
        else {
            batchXML = '<ows:Batch OnError="Return">' +
                '<Method ID="A1">' +
                '<SetList>%Stages%</SetList>' +
                '<SetVar Name="ID">' + stageListItemID + '</SetVar>' +
                '<SetVar Name="Cmd">Save</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#Initial">' + stageInit + '</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">' + stageNewDesc + '</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#Purpose">' + stagePurpose + '</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#Active">' + stageActive + '</SetVar>' +
                '</Method>' +
                '</ows:Batch>';

        }


        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'Stages', 'Batch': batchXML, 'OutputType': 'JSON' },
            dataType: 'json',
            async: false,
            cache: false,
            type: 'POST',
            success: function (json) {
                var capsResult = new capsResultData(json.NewDataSet.ProcessBatchData.Results.Result);
                if (stageListItemID != 0) {
                    $('.cw-stage-initial[stageid="' + stageListItemID + '"]').text(stageInit);
                }
                callback(true, capsResult);
            },
            error: function (jqXHR, status, error) {
                callback(false, error);
            }
        });
    }

// name: saveDeliverable
// by: papproth, brian
// date: 2015.05.08
// purpose: saves a deliverable to sharepoint ( KeyQuestions list )
    function saveDeliverable(capsCallData, callback) {

        var batchXML;
        batchXML = '<ows:Batch OnError="Return">' +
            '<Method ID="A1">' +
            '<SetList>%StageDeliverables%</SetList>' +
            '<SetVar Name="ID">' + capsCallData.listItemID + '</SetVar>' +
            '<SetVar Name="Cmd">' + capsCallData.cmd + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">' + capsCallData.title + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#Active">' + capsCallData.active + '</SetVar>' +
            '</Method>' +
            '</ows:Batch>';
        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: {
                'RequestType': 'ProcessBatchData',
                'ListTitle': 'StageDeliverables',
                'Batch': batchXML,
                'OutputType': 'JSON'
            },
            dataType: 'json',
            async: false,
            cache: false,
            type: 'POST',
            success: function (json) {
                var capsResult = new capsResultData(json.NewDataSet.ProcessBatchData.Results.Result);
                callback(true, capsResult);
                getMaps(function () { });

            },
            error: function (jqXHR, status, error) {
                callback(false, error);
            }
        });
    }

// name: getServerURL
// by: papproth, brian
// date: 2015.05.10
// purpose: get the ows_ServerURL property for a document. this is required to update the meta-data
    function getServerURL(listItemID, listTitle, callback) {
        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: {
                'RequestType': 'GetListItems',
                'ListTitle': listTitle,
                'CAML': '<Query><Where><Eq><FieldRef Name="ID"/><Value Type="Number">' + listItemID + '</Value></Eq></Where></Query>',
                'OutputType': 'JSON'
            },
            dataType: 'json',
            async: false,
            cache: false,
            type: 'POST',
            success: function (json) {
                var owsServerUrl = json.NewDataSet.GetListItems.listitems["rs:data"]["z:row"].ows_ServerUrl;
                callback(true, owsServerUrl);

            },
            error: function (jqXHR, status, error) {
                callback(false, msg);
            }
        });
    }
// name: saveTemplate
// by: papproth, brian
// date: 2015.05.11
// purpose: updates tool template metadata or deletes the file
    function saveTemplate(capsCallData, callback) {

        var batchXML;
        batchXML = '<ows:Batch OnError="Return">' +
            '<Method ID="A1">' +
            '<SetList>%Reference Documents%</SetList>' +
            '<SetVar Name="ID">' + capsCallData.listItemID + '</SetVar>' +
            '<SetVar Name="Cmd">' + capsCallData.cmd + '</SetVar>' +
            '<SetVar Name="owsfileref">' + capsCallData.owsServerUrl + '</SetVar>';

        if (capsCallData.cmd == 'Save') {
            batchXML += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">' + capsCallData.title + '</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#Methodology">' + capsCallData.methodology + '</SetVar>' +
                '<SetVar Name="urn:schemas-microsoft-com:office:office#Language">' + capsCallData.language + '</SetVar>' +
                '<SetVar Name="FileLeafRef">' + capsCallData.filename + '</SetVar>' +
                '</Method>' +
                '</ows:Batch>';
        }
        else {
            batchXML += '</Method></ows:Batch>';
        }

        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: {
                'RequestType': 'ProcessBatchData',
                'ListTitle': 'Reference Documents',
                'Batch': batchXML,
                'OutputType': 'JSON'
            },
            dataType: 'json',
            async: false,
            cache: false,
            type: 'POST',
            success: function (json) {
                var capsResult = new capsResultData(json.NewDataSet.ProcessBatchData.Results.Result);
                callback(true, capsResult);
            },
            error: function (jqXHR, status, error) {
                callback(false, error);
            }
        });
    }



// name: saveKeyQuestion
// by: papproth, brian
// date: 2015.05.08
// purpose: saves a key question to sharepoint ( KeyQuestions list )
    function saveKeyQuestion(capsCallData, callback) {

        var batchXML;
        batchXML = '<ows:Batch OnError="Return">' +
            '<Method ID="A1">' +
            '<SetList>%KeyQuestions%</SetList>' +
            '<SetVar Name="ID">' + capsCallData.listItemID + '</SetVar>' +
            '<SetVar Name="Cmd">' + capsCallData.cmd + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">' + capsCallData.title + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#KeyQuestion">' + capsCallData.keyQuestion + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#Active">' + capsCallData.active + '</SetVar>' +
            '</Method>' +
            '</ows:Batch>';
        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: {
                'RequestType': 'ProcessBatchData',
                'ListTitle': 'KeyQuestions',
                'Batch': batchXML,
                'OutputType': 'JSON'
            },
            dataType: 'json',
            async: false,
            cache: false,
            type: 'POST',
            success: function (json) {
                var capsResult = new capsResultData(json.NewDataSet.ProcessBatchData.Results.Result);
                callback(true, capsResult);
                getMaps(function () { });
            },
            error: function (jqXHR, status, error) {
                callback(false, error);
            }
        });
    }


// name: saveMapStage
// by: papproth, brian
// date: 2015.04.13
// purpose: saves a stage for a map definition to sharepoint ( MapStages list )
    function saveMapStage(capsCallData, callback) {

        var batchXML;
        var dbStoreValue;
        var displayValue;


        batchXML = '<ows:Batch OnError="Return">' +
            '<Method ID="A1">' +
            '<SetList>%MapStages%</SetList>' +
            '<SetVar Name="ID">' + capsCallData.listItemID + '</SetVar>' +
            '<SetVar Name="Cmd">' + capsCallData.cmd + '</SetVar>';
        switch (capsCallData.cmd) {
            case 'Save':
                batchXML += '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">Map-Stage Definition</SetVar>' +
                    '<SetVar Name="urn:schemas-microsoft-com:office:office#MapID">' + capsCallData.mapID + '</SetVar>' +
                    '<SetVar Name="urn:schemas-microsoft-com:office:office#StageID">' + capsCallData.stageID + '</SetVar>' +
                    '<SetVar Name="urn:schemas-microsoft-com:office:office#StagePosition">' + capsCallData.stagePosition + '</SetVar>' +
                    '<SetVar Name="urn:schemas-microsoft-com:office:office#Tollgate">' + capsCallData.tollgate + '</SetVar>' +
                    '<SetVar Name="urn:schemas-microsoft-com:office:office#Map">' + capsCallData.mapName + '</SetVar>' +
                    '<SetVar Name="urn:schemas-microsoft-com:office:office#Stage">' + capsCallData.stageDescription + '</SetVar>' +
                    '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_"><![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>' + capsCallData.mapName + '</LookupDbStoreValue><LookupDisplayValue>' + capsCallData.mapName+ '</LookupDisplayValue></Property></Properties>]]></SetVar>' +
                    '<SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_0"><![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>' + capsCallData.stageDescription + '</LookupDbStoreValue><LookupDisplayValue>' + capsCallData.stageName + '</LookupDisplayValue></Property></Properties>]]></SetVar>';

                if (capsCallData.keyQuestions) {
                    batchXML += '<SetVar Name="urn:schemas-microsoft-com:office:office#KeyQuestions2">' + capsCallData.keyQuestions + '</SetVar>';
                }
                else {
                    batchXML += '<SetVar Name="urn:schemas-microsoft-com:office:office#KeyQuestions2"></SetVar>';
                }

                if (capsCallData.deliverables) {
                    batchXML += '<SetVar Name="urn:schemas-microsoft-com:office:office#Deliverables2">' + capsCallData.deliverables + '</SetVar>';
                }
                else {
                    batchXML += '<SetVar Name="urn:schemas-microsoft-com:office:office#Deliverables2"></SetVar>';
                }

                batchXML += '</Method></ows:Batch>';

                break;
            case 'Delete':
                batchXML += '</Method></ows:Batch>';
                break;
            default:

        }

        debugger;
        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'MapStages', 'Batch': batchXML, 'OutputType': 'JSON' },
            dataType: 'json',
            async: true,
            cache: false,
            type: 'POST',
            success: function (json) {
                var capsResult = new capsResultData(json.NewDataSet.ProcessBatchData.Results.Result);
                callback(true, capsResult);
            },
            error: function (jqXHR, status, error) {
                callback(false, error);
            }
        });

    }

// name: saveTool
// by: papproth, brian
// date: 2015.05.07
// purpose: saves a tool that is modified outside of a map definition
    function saveTool(capsCallData, callback) {

        var batchXML;
        //var dbStoreValue;
        //var displayValue;

        batchXML = '<ows:Batch OnError="Return">' +
            '<Method ID="A1">' +
            '<SetList>%Tools%</SetList>' +
            '<SetVar Name="ID">' + capsCallData.listItemID + '</SetVar>' +
            '<SetVar Name="Cmd">' + capsCallData.cmd + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#Title">' + capsCallData.title + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#Active">' + capsCallData.active + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#Purpose">' + capsCallData.purpose + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#HelpMessage">' + capsCallData.helpMessage + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#HelpFileLocation">' + capsCallData.helpFileLocation + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#TemplateLocation">' + capsCallData.templateLocation + '</SetVar>' +
            '<SetVar Name="urn:schemas-microsoft-com:office:office#Stages">' + capsCallData.stages + '</SetVar>' +
            '</Method>' +
            '</ows:Batch>';

        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'Tools', 'Batch': batchXML, 'OutputType': 'JSON' },
            dataType: 'json',
            async: false,
            cache: false,
            type: 'POST',
            success: function (json) {
                var capsResult = new capsResultData(json.NewDataSet.ProcessBatchData.Results.Result);
                callback(true, capsResult);
            },
            error: function (jqXHR, status, error) {
                callback(false, error);
            }
        });
    }



// name: getStageDefinitions
// by: papproth, brian
// date: 2015.04.13
// purpose: gets the stage definitions from sharpoint
    function getStageDefinitions(showAll) {

        // reset the stages first
        $('#existStageDesc, #toolStages').empty();
        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: { 'RequestType': 'BatchRequest', 'ConfigFileLocation': '[SRA Root]/resources/getStages_CBD.xml', 'OutputType': 'JSON', 'XsltLocation': '[SRA Root]/Resources/getStages_XSLT.xslt' },
            dataType: 'json',
            async: true,
            cache: false,
            type: 'POST',
            success: function (json) {
                if (json.Stages.Stage) {
                    StagesDef = json.Stages;
                    // populate the existing stage select box
                    $('#existStageDesc').append('<option value="">Select a stage...</option>');
                    $.each(StagesDef.Stage, function (indx, stage) {
                        if (showAll == false) {
                            if (stage.Active == '1') {
                                $('#existStageDesc, #toolStages').append($('<option>', {
                                    value: stage.ID,
                                    text: stage.Initial + ' - ' + stage.Title,
                                    desc: stage.Title,
                                    initial: stage.Initial
                                }));
                            }
                        }
                        else {
                            if (stage.Active == '1') {
                                $('#existStageDesc, #toolStages').append($('<option>', {
                                    value: stage.ID,
                                    text: stage.Initial + ' - ' + stage.Title,
                                    desc: stage.Title,
                                    initial: stage.Initial
                                }));
                            }
                            else {
                                $('#existStageDesc, #toolStages').append($('<option>', {
                                    value: stage.ID,
                                    text: stage.Initial + ' - ' + stage.Title,
                                    desc: stage.Title,
                                    initial: stage.Initial,
                                    class: 'cw-inactive-option',
                                    title: 'Inactive'
                                }));
                            }
                        }


                    });
                    // format the toolStages as a pqselect
                    $("select#toolStages").pqSelect({
                        multiplePlaceholder: 'Select Stage(s)',
                        checkbox: true,
                        width: '577px',
                        maxDisplay: 20
                    });

                }
                else { alert('No Stage Definitions Found - Please contact SRA support.'); }
            }
        });

        // using temporary data
        //StagesDef = jsonStages.Stages;
    }

// name: addNewStageHtml
// by: papproth, brian
//
//
    function addNewStageHtml(data) {

        var html = '<div id="stage_' + data.mapID + '_' + data.stagePosition + '" stageindx="' + data.stagePosition + '" class="cw-sra-tool-row ui-sortable">' +
            '<div class="cw-sra-row-head cw-sra-row-head-font" mapstageid="' + data.mapStageID + '" mapstagetitle="' + data.stageTitle + '" title="' + data.stagePurpose + '" indx="' + data.indx + '">' +
            '<div class="cw-sra-edit cw-sra-edit-stage"></div>' +
            '<div class="cw-stage-initial" stageid="' + data.stageID + '">' + data.stageInitial + '</div>' +
            '<div class="cw-sra-delete" title="Delete Stage"></div>' +
            '</div>' +
            //'<div id="tool_' + data.mapID + '_tg' + data.tollGateID + '" docid="tollgate" class="cw-sra-tool cw-active" splistid="tg' + data.tollGateID + '">' +
            // '<div class="cw-sra-edit" title="Edit tool"></div>' +
            // 'Tollgate' +
            // '<div class="cw-sra-delete-tool" title="Delete tool"></div>' +
            //'</div>' +
            '<div id="tool_' + data.mapID + '_' + data.stageID + '_0" class="cw-new-tool">Manage Tools</div>';
        return html;
    }


// name: resequenceStageIndexes
// by: papproth, brian
// date: 2015.05.01
// purpose: puts the stageindex attributs in the correct order and updates the MapStages list
    function resequenceStageIndexes(activeMapID, callback) {

        var batchXML = '<ows:Batch OnError="Return">';
        var stageIndx;
        var stageCount = $('#map_' + activeMapID + '_wrapper').children().length - 1;

        $('#map_' + activeMapID + '_wrapper').children().each(function (indx, stage) {
            stageIndx = +indx + +1;
            $(stage).attr('stageindx', stageIndx);

            if (indx < stageCount) {
                // now build a caps call to update the stage position in the mapStages list
                batchXML += '<Method ID="A' + indx + '">' +
                    '<SetList>%MapStages%</SetList>' +
                    '<SetVar Name="ID">' + $(stage).children(':first').attr('mapstageid') + '</SetVar>' +
                    '<SetVar Name="Cmd">Save</SetVar>' +
                    '<SetVar Name="urn:schemas-microsoft-com:office:office#StagePosition">' + stageIndx + '</SetVar>' +
                    '</Method>';
            }
        });
        batchXML += '</ows:Batch>';


        //callback(true,null);
        $.ajax({
            url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
            data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'MapStages', 'Batch': batchXML, 'OutputType': 'JSON' },
            dataType: 'json',
            async: false,
            cache: false,
            type: 'POST',
            success: function (json) {
                var capsResult = new capsResultData(json.NewDataSet.ProcessBatchData.Results.Result);
                callback(true, capsResult);
            },
            error: function (jqXHR, status, error) {
                callback(false, error);
            }
        });

    }
// name: openManageDeliverablesDialog
// by: papproth, brian
// date: 2015.05.07
// purpose: shows the manage questions dialog
    function openManageDeliverablesDialog() {
        var $manageDeliverablesDialog = $('#manageDeliverablesDialog');

        $manageDeliverablesDialog.removeClass('hide');
        $manageDeliverablesDialog.dialog({
            minWidth: 610,
            maxWidth: 610,
            width: 610,
            minHeight: 310,
            maxHeight: 310,
            height: 310,
            resizeable: false,
            title: 'Manage Deliverables',
            modal: true,
            create: function () {
                var $btnPane = $manageDeliverablesDialog.parent().children('.ui-dialog-buttonpane');
                $btnPane.append('<div id="deliverablesDialogStatus" class=""></div>');
            },
            open: function () {

                var $buttonOk = $('#button-ok-deliverable');
                var $buttonSave = $('#button-save-deliverable');
                var $buttoncancel = $('#button-cancel-deliverable');

                $buttonOk.addClass('hide');
                $buttonSave.prop('disabled', true);

                $('#deliverablesNewTitle, #deliverablesTitle').val('');
                $('#deliverablesNew').prop('checked', true).trigger('change');
                $('#deliverablesDialogStatus').removeClass().html('');

            },
            buttons: [
                {
                    id: 'button-save-deliverable',
                    text: 'Save Deliverable',
                    click: function () {
                        var listItemID;
                        var title;
                        var activeDeliverable;
                        if ($('#deliverablesNew').is(':checked')) {
                            listItemID = 'New';
                            title = $('#deliverablesTitle').val();
                        }
                        else {
                            listItemID = $('#existDeliverablesTitle option:selected').val();
                            title = $('#deliverablesNewTitle').val();
                        }
                        if ($('#activeDeliverables').is(':checked')) {
                            activeDeliverable = '1';
                        }
                        else {
                            activeDeliverable = '0';
                        }
                        capsCallData = {
                            cmd: 'Save',
                            listItemID: listItemID,
                            title: title,
                            active: activeDeliverable
                        };
                        saveDeliverable(capsCallData, function (result, data) {
                            if (result == true) {
                                if (data.Code != '0') {
                                    alert('An error occured saving the deliverable.\nPlease contact SRA support for help.\nCAPS Error Code: ' + data.Code + '\nCAPS Error: ' + data.ErrorText)
                                }
                                else {
                                    $('#deliverablesDialogStatus').removeClass().addClass('cw-dialog-success').html('Deliverable Saved!');
                                    //$('#button-save-deliverable, #button-cancel-deliverable').addClass('hide');
                                    //$('#button-ok-deliverable').removeClass('hide');
                                    $('#selected-deliverables').children('div[splistid="' + listItemID + '"]').text(title);
                                    // re-load the deliverables
                                    getDeliverables(function (result, msg) {
                                        if (result != true) {
                                            alert(msg);
                                        }
                                        else {
                                            if ($('#deliverablesExisting').is(':checked')) {
                                                $('#existDeliverablesTitle').val(listItemID).trigger('change');
                                            }

                                        }
                                    });
                                }
                            }
                            else {
                                alert('Error saving deliverable\n' + msg);
                            }

                        });


                    }
                },
                {
                    id: 'button-ok-deliverable',
                    text: 'OK',
                    click: function () {
                        $(this).dialog('close');
                    }
                },
                {
                    id: 'button-cancel-deliverable',
                    text: 'Cancel',
                    click: function () {
                        $(this).dialog('close');
                    }
                }
            ]
        });

    }


// name: openManageQuestionsDialog
// by: papproth, brian
// date: 2015.05.07
// purpose: shows the manage questions dialog
    function openManageQuestionsDialog() {
        var $manageQuestionsDialog = $('#manageQuestionsDialog');
        var dialogWidth = 610;
        var dialogHeight = 430;

        $manageQuestionsDialog.removeClass('hide');
        $manageQuestionsDialog.dialog({
            minWidth: dialogWidth,
            maxWidth: dialogWidth,
            width: dialogWidth,
            minHeight: dialogHeight,
            maxHeight: dialogHeight,
            height: dialogHeight,
            resizeable: false,
            title: 'Manage Key Questions',
            modal: true,
            create: function () {
                var $btnPane = $manageQuestionsDialog.parent().children('.ui-dialog-buttonpane');
                $btnPane.append('<div id="questionDialogStatus" class=""></div>');
            },
            close: function () {


            },
            open: function () {

                var $buttonOk = $('#button-ok-question');
                var $buttonSave = $('#button-save-question');
                var $buttoncancel = $('#button-cancel-question');

                $buttonOk.addClass('hide');
                $buttonSave.prop('disabled', true);
                $('#questionDialogStatus').removeClass().html('');
                $('#questionPurpose,#questionTitle').val('');
                $('#activeQuestion').prop('checked', true);
                $('#activeQuestion').prop('disabled', true);
                $('#questionNew').prop('checked', true).trigger('change');


            },
            buttons: [
                {
                    id: 'button-save-question',
                    text: 'Save Question',
                    click: function () {
                        var listItemID;
                        var title;
                        var activeQuestion;
                        if ($('#questionNew').is(':checked')) {
                            listItemID = 'New';
                            title = $('#questionTitle').val();
                        }
                        else {
                            listItemID = $('#existQuestionTitle option:selected').val();
                            title = $('#questionNewTitle').val();
                        }
                        if ($('#activeQuestion').is(':checked')) {
                            activeQuestion = '1';
                        }
                        else {
                            activeQuestion = '0';
                        }
                        capsCallData = {
                            cmd: 'Save',
                            listItemID: listItemID,
                            title: title,
                            keyQuestion: $('#questionPurpose').val(),
                            active: activeQuestion
                        };
                        saveKeyQuestion(capsCallData, function (result, data) {
                            if (result == true) {
                                if (data.Code != '0') {
                                    alert('An error occured saving the key question definition.\nPlease contact SRA support for help.\nCAPS Error Code: ' + data.Code + '\nCAPS Error: ' + data.ErrorText)
                                }
                                else {
                                    $('#questionDialogStatus').removeClass().addClass('cw-dialog-success').html('Key Question Saved!');
                                    //$('#button-save-question, #button-cancel-question').addClass('hide');
                                    //$('#button-ok-question').removeClass('hide');
                                    // re-load the questions
                                    getKeyQuestions(function (result, msg) {
                                        if (result != true) {
                                            alert(msg);
                                        }
                                        else {
                                            if ($('#questionExisting').is(':checked')) {
                                                $('#existQuestionTitle').val(listItemID);
                                            }

                                        }
                                    });
                                }
                            }
                            else {
                                alert('Error saving question\n' + msg);
                            }

                        });

                    }
                },
                {
                    id: 'button-ok-question',
                    text: 'OK',
                    click: function () {
                        $(this).dialog('close');
                    }
                },
                {
                    id: 'button-cancel-question',
                    text: 'Cancel',
                    click: function () {
                        $(this).dialog('close');
                    }
                }
            ]
        });

    }

// name: openManageToolTemplatesDialog
// by: papproth, brian
// date: 2015.05.09
// purpose: shows the manage tools dialog
    function openManageToolTemplatesDialog() {
        var $manageToolTemplatesDialog = $('#manageToolTemplatesDialog');
        var dialogHeight = 470;
        var dialogWidth = 610;

        $manageToolTemplatesDialog.removeClass('hide');
        $manageToolTemplatesDialog.dialog({
            minWidth: dialogWidth,
            maxWidth: dialogWidth,
            width: dialogWidth,
            minHeight: dialogHeight,
            maxHeight: dialogHeight,
            height:dialogHeight,
            resizeable: false,
            title: 'Manage Tool Templates',
            modal: true,
            create: function () {
                var $btnPane = $manageToolTemplatesDialog.parent().children('.ui-dialog-buttonpane');
                $btnPane.append('<div id="toolTemplatesDialogStatus" class=""></div>');
            },
            open: function () {
                var $buttonOk = $('#button-ok-file');
                var $buttonSave = $('#button-save-file');
                var $buttonCancel = $('#button-cancel-file');
                var $buttonDelete = $('#button-delete-file');

                $buttonCancel.focus();
                $buttonOk.addClass('hide');
                $buttonDelete.addClass('hide');
                $buttonSave.addClass('hide');
                $('#existToolTemplateFileWrapper').addClass('hide');
                $('#toolTemplatesDialogStatus').removeClass().html('');
                $('#existFile').val('Select').trigger('change');
            },
            buttons: [{
                id: 'button-delete-file',
                text: 'Delete',
                click: function () {
                    var selectedID = $('#existFile option:selected').val();
                    getServerURL(selectedID, 'Reference Documents', function (owsResult, owsData) {
                        if (owsResult == true) {
                            var capsCallData = {
                                listItemID: selectedID,
                                cmd: 'Delete',
                                owsServerUrl: owsData
                            };
                            saveTemplate(capsCallData, function (result, data) {
                                if (result == true) {
                                    if (data.Code != '0') {
                                        alert('An error occured deleting the template.\nPlease contact SRA support for help.\nCAPS Error Code: ' + data.Code + '\nCAPS Error: ' + data.ErrorText)
                                    }
                                    else {
                                        $('#toolTemplatesDialogStatus').removeClass().addClass('cw-dialog-success').html('Template Deleted!');
                                        $('#button-save-file, #button-cancel-file, #button-delete-file').addClass('hide');
                                        $('#button-ok-file').removeClass('hide');
                                        // re-load the templates
                                        getTemplates(function (result, msg) {
                                            if (result != true) {
                                                alert(msg);
                                            }
                                            else {
                                                $('#existFile').val('Select').trigger('change');
                                            }
                                        });
                                    }
                                }
                                else {
                                    alert('Error deleting template\n' + msg);
                                }
                            });
                        }
                        else {
                            alert(owsData);
                        }
                    });
                }
            },
                {
                    id: 'button-save-file',
                    text: 'Save',
                    click: function () {
                        var selectedID = $('#existFile option:selected').val();
                        getServerURL(selectedID, 'Reference Documents', function (owsResult, owsData) {
                            if (owsResult == true) {
                                var capsCallData = {
                                    listItemID: selectedID,
                                    cmd: 'Save',
                                    title: $('#fileTitle').val(),
                                    filename: $('#templateFilename').val(),
                                    methodology: $('#fileMethodology').val(),
                                    language: $('#fileLanguage').val(),
                                    owsServerUrl: owsData
                                };
                                saveTemplate(capsCallData, function (result, data) {
                                    if (result == true) {
                                        if (data.Code != '0') {
                                            alert('An error occured saving the template.\nPlease contact SRA support for help.\nCAPS Error Code: ' + data.Code + '\nCAPS Error: ' + data.ErrorText)
                                        }
                                        else {
                                            $('#toolTemplatesDialogStatus').removeClass().addClass('cw-dialog-success').html('Template Saved!');
                                            $('#button-save-file, #button-cancel-file, #button-delete-file').addClass('hide');
                                            $('#button-ok-file').removeClass('hide');
                                            // re-load the templates
                                            getTemplates(function (result, msg) {
                                                if (result != true) {
                                                    alert(msg);
                                                }
                                                else {
                                                    $('#existFile').val(selectedID);
                                                }
                                            });
                                        }
                                    }
                                    else {
                                        alert('Error saving template\n' + msg);
                                    }
                                });
                            }
                            else {
                                alert(owsData);
                            }
                        });
                    }
                },
                {
                    id: 'button-ok-file',
                    text: 'OK',
                    click: function () {
                        $(this).dialog('close');
                    }
                },
                {
                    id: 'button-cancel-file',
                    text: 'Cancel',
                    click: function () {
                        $('#existFile').val('Select').trigger('change');
                        $(this).dialog('close');
                    }
                },
            ]
        });
    }

// name: openManageToolsDialog
// by: papproth, brian
// date: 2015.04.30
// purpose: shows the manage tools dialog
    function openManageToolsDialog(formData) {

        var $manageToolsDialog = $('#manageToolsDialog');
        var $toolTitle = $('#toolTitle');
        var $toolPurpose = $('#toolPurpose');
        var $helpMsg = $('#toolHelpMsg');
        var $helpFileLocation = $('#toolHelpFile');
        var $templateFileLocation = $('#toolTemplate');
        var $activeTool = $('#activeTool');
        var $toolTitleRevised = $('#toolTitleRevised');
        var capsCallData;
        var toolItemID;
        var toolTitle;
        var height;
        var width = 610;

        if (formData.toolID == '0') {
            title = 'Manage Tools';
            height = 730;
        }
        else {
            title = 'Edit Tool: ' + formData.toolTitle;
            height = 575;
        }
        $manageToolsDialog.removeClass('hide');
        $manageToolsDialog.dialog({
            minWidth: width,
            maxWidth: width,
            width: width,
            minHeight: height,
            maxHeight: height,
            height: height,
            resizeable: false,
            title: title,
            modal: true,
            close: function () {
                $activeTool.prop('checked', false);
                $('#existToolTemplate').val('Select');
                $('#libraryTool').prop('checked', false);
                $('#toolStages > option').removeProp('selected');
                $('#toolStages').pqSelect('refreshData');
                $('#existToolTitle').val('Select');
                $('#existToolTemplateWrapper').addClass('hide');
                $('#toolTemplateInputWrapper').removeClass('hide');
            },
            create: function () {
                var $btnPane = $manageToolsDialog.parent().children('.ui-dialog-buttonpane');
                $btnPane.append('<div id="toolDialogStatus" class=""></div>');
            },
            open: function () {

                var $buttonOk = $('#button-ok-tool');
                var $buttonSave = $('#button-save-tool');
                var $buttoncancel = $('#button-cancel-tool');

                if (formData.toolID == '0') {
                    $('#existToolTitleWrapper, #sourceOfToolWrapper, #toolStagesWrapper, #activeToolWrapper, #toolTemplateInputWrapper').removeClass('hide');
                    $toolPurpose.val('');
                    $helpMsg.val('');
                    $helpFileLocation.val('');
                    $templateFileLocation.val('');
                    $toolTitle.val('');
                    $buttonSave.prop('disabled', true);
                    $buttonOk.addClass('hide');
                }
                else {
                    $('#existToolTitleWrapper, #sourceOfToolWrapper, #toolStagesWrapper, #activeToolWrapper').addClass('hide');
                    $('#toolTitleWrapper, #toolTemplateInputWrapper').removeClass('hide');
                    $('#toolExisting').prop('checked', true);
                    $('#existToolTitle').val(formData.toolID).trigger('change');
                    $toolTitle.val(formData.toolTitle);
                    $buttonOk.addClass('hide');
                }

                $('#toolDialogStatus').removeClass().html('');

                // bind the change event to the toolTitle
                // enable the buttons if user enters a value
                $toolTitle.on('change', function (e) {
                    if ($(this).val() == '' && $('#toolNew').is(':checked')) {
                        $buttonSave.prop('disabled', true);
                    }
                    else {
                        $buttonSave.prop('disabled', false);
                    }
                });

                $('#existToolTemplate').on('change', function (e) {
                    var $existToolTemplate = $('#existToolTemplate');
                    $existToolTemplate.parent().removeClass().addClass('cw-input-wrapper file-url-invalid');
                    if ($(this).val() != 'Select') {
                        // verify the url
                        $.ajax({
                            type: 'HEAD',
                            url: $('#existToolTemplate option:selected').attr('url'),
                            success: function () {
                                $existToolTemplate.parent().removeClass().addClass('cw-input-wrapper file-url-valid');
                            },
                            error: function () {
                                $existToolTemplate.parent().removeClass().addClass('cw-input-wrapper file-url-invalid');
                            }
                        });

                    }

                });


                $('#existToolTitle').on('change', function (e) {
                    $('#libraryTool').attr('checked',false).trigger('change');
                    if ($(this).val() == 'Select' && $('#toolExisting').is(':checked')) {
                        $buttonSave.prop('disabled', true);
                    }
                    else {
                        $buttonSave.prop('disabled', false);
                    }

                });




            },
            buttons: [
                {
                    id: 'button-save-tool',
                    text: 'Save Tool',
                    click: function () {
                        if ($('#toolNew').is(':checked')) {
                            toolItemID = 'New';
                            toolTitle = $toolTitle.val();
                        }
                        else {
                            toolItemID = $('#existToolTitle').val();
                            if (formData.toolID == '0') {
                                toolTitle = $toolTitleRevised.val();
                            }
                            else {
                                toolTitle = $toolTitle.val();
                            }
                        }
                        // get the stages
                        // must be in this format-> 21;#ANALYZE;#6;#CONTROL;#9;#GENERATE
                        var optionsArray = $('#toolStages > option');
                        var stageData = '';
                        $.each($('.pq-select-item'), function (indx, itm) {
                            stageData += $(optionsArray[$(itm).attr('data-id')]).val() + ';#' + $(optionsArray[$(itm).attr('data-id')]).attr('desc') + ';#';
                        });
                        stageData = stageData.substring(0, stageData.length - 2);
                        var fileLocation = $('#existToolTemplateWrapper').hasClass('hide') ? $templateFileLocation.val() : $('#existToolTemplate option:selected').attr('url');
                        capsCallData = {
                            cmd: 'Save',
                            title: toolTitle,
                            listItemID: toolItemID,
                            active: $activeTool.is(':checked') ? '1' : '0',
                            purpose: $toolPurpose.val(),
                            helpMessage: $helpMsg.val(),
                            helpFileLocation: $helpFileLocation.val(),
                            templateLocation: fileLocation,
                            stages: stageData
                        };

                        saveTool(capsCallData, function (result, data) {
                            if (result == true) {
                                if (data.Code != '0') {
                                    alert('An error occured saving the tool definition.\nPlease contact SRA support for help.\nCAPS Error Code: ' + data.Code + '\nCAPS Error: ' + data.ErrorText)
                                }
                                else {
                                    $('#toolDialogStatus').removeClass().addClass('cw-dialog-success').html('Tool Definition Saved!');
                                    //$('#button-save-tool, #button-cancel-tool').addClass('hide');
                                    //$('#button-ok-tool').removeClass('hide');
                                    // re-load the tools
                                    getSRATools(function (data) {
                                        addToolsToControls(data, toolItemID );

                                    });
                                    // update the tool titles on the map
                                    $('.cw-sra-tool[docid="' + toolItemID + '"]').html('<div class="cw-sra-tool-edit" title="Edit tool"></div>' + toolTitle + '<div class="cw-sra-delete-tool" title="Delete tool"></div>');

                                }
                            }
                            else {
                                alert('An error saving tool definition!\nError: ' + data);
                            }
                        });

                    }
                },
                {
                    id: 'button-ok-tool',
                    text: 'OK',
                    click: function () {
                        $(this).dialog('close');
                    }
                },
                {
                    id: 'button-cancel-tool',
                    text: 'Cancel',
                    click: function () {
                        $(this).dialog('close');
                    }
                }
            ]
        });

    }


// name: manageStageDialog
// by: papproth, brian
// date: 2015.04.30
// purpose: shows the manage stage dialog
    function manageStageDialog(dialogData) {

        var $newStageDialog = $('#manage-stage')
        $newStageDialog.attr('activeMapID', dialogData.activeMapID);
        $newStageDialog.attr('activeStageID', dialogData.activeStageID);
        $newStageDialog.attr('activeMapName', dialogData.activeMapName);
        $newStageDialog.attr('activeStageTitle', dialogData.activeStageTitle);

        $newStageDialog.removeClass('hide');

        $newStageDialog.dialog({
            minWidth: 680,
            maxWidth: 680,
            width: 680,
            minHeight: dialogData.dialogHeight,
            maxHeight: dialogData.dialogHeight,
            height: dialogData.dialogHeight,
            resizeable: false,
            title: dialogData.dialogTitle,
            modal: true,
            create: function () {
                var $btnPane = $newStageDialog.parent().children('.ui-dialog-buttonpane');
                $btnPane.append('<div id="stageDialogStatus" class=""></div>');
            },
            open: function (event, ui) {
                $('#stageTools').tabs('option', 'active', 0);
                if (dialogData.manageTools == true) {
                    $('#button-ok-stage').removeClass('hide');
                    $('#button-save-stage, #button-cancel-stage').addClass('hide');
                }
                else {
                    $('#button-ok-stage').addClass('hide');
                    $('#button-save-stage, #button-cancel-stage').removeClass('hide');
                }
                $('#stageDialogStatus').removeClass().html('');
                if (dialogData.$stageInit.val() == '') {
                    $('#stageInitErrMsg').removeClass('hide');
                    $('#button-ok-stage').addClass('hide');
                    $('#button-save-stage').button('disable');
                }
                else {
                    $('#stageInitErrMsg').addClass('hide');
                    $('#button-save-stage').button('enable');
                }

                // only show active stages if editing a map definition
                if (dialogData.activeMapID == null) {
                    getStageDefinitions(true);
                }
                else {
                    getStageDefinitions(false);
                }
            },
            close: function(){
                $('#button-ok-stage').addClass('hide');

            },
            buttons: [{
                id: 'button-save-stage',
                text: dialogData.saveBtnText,
                click: function () {
                    //stageListItemID is global variable
                    //debugger;
                    if (stageListItemID == 0) {
                        // user is creating a new stage so save to stages and map-stages lists
                        saveStageDef(function (result, data) {
                            if (result == true) {
                                if (data.Code == '0') {
                                    newStageID = data.ID[1];
                                    // refresh the stages drop-down
                                    // save the stage to the MapStages list
                                    var capsCallData = {
                                        mapID: dialogData.activeMapID,
                                        stageID: newStageID,
                                        stagePosition: dialogData.activeStagePosition,
                                        tollgate: 1,
                                        listItemID: 'New',
                                        cmd: 'Save',
                                        mapName: dialogData.activeMapName,
                                        stageName : $('#existStageDesc option:selected').text(),
                                        stageDescription : $('#existStageDesc option:selected').attr('desc')

                                    };

                                    // all done since stage is being add outside of a map definition
                                    if (dialogData.activeMapID == null) {
                                        $('#stageDialogStatus').removeClass().addClass('cw-dialog-success').html('Stage Definition Saved!');
                                    }
                                    // save to the map-stages table
                                    if (dialogData.activeMapID != null) {
                                        saveMapStage(capsCallData, function (result, data) {
                                            if (result == true) {
                                                if (data.Code != '0') {
                                                    $('#stageDialogStatus').removeClass().addClass('cw-dialog-failure').html('Error Saving Stage!');
                                                    alert('An error occured saving the map-stage definition!\nPlease contact SRA support for help.\nCAPS Error Code: ' + data.Code + '\nCAPS Error: ' + data.ErrorText)
                                                }
                                                else {
                                                    $('#stageDialogStatus').removeClass().addClass('cw-dialog-success').html('Stage Definition Saved!');
                                                    addNewStageToMap(dialogData, newStageID, data.ID[1], $('#stageDesc').val(), $('#stagePurpose').val());
                                                }
                                            }
                                            else {
                                                $('#stageDialogStatus').removeClass().addClass('cw-dialog-failure').html('Error Saving Stage!');
                                                alert('An error saving map-stage definition!\nError: ' + data);
                                            }
                                        });
                                    }
                                }
                                else {
                                    $('#stageDialogStatus').removeClass().addClass('cw-dialog-failure').html('Error Saving Stage!');
                                    alert('An error occured saving the stage definition.\nPlease contact SRA support for help.\nCAPS Error Code: ' + data.Code + '\nCAPS Error: ' + data.ErrorText)
                                }
                            }
                            else {
                                $('#stageDialogStatus').removeClass().addClass('cw-dialog-failure').html('Error Saving Stage!');
                                alert('Error saving stage definition!\nError: ' + data);
                            }
                        });
                    }
                    else if (dialogData.activeMapID == null && stageListItemID > 0) {
                        // editing an existing stage outside of a map definition
                        saveStageDef(function (result, data) {
                            if (result == true) {
                                if (data.Code == '0') {
                                    // refresh the stages drop-down
                                    $('#stageDialogStatus').removeClass().addClass('cw-dialog-success').html('Stage Definition Saved!');
                                }
                                else {
                                    $('#stageDialogStatus').removeClass().addClass('cw-dialog-failure').html('Error Saving Stage!');
                                    alert('An error occured saving the stage definition.\nPlease contact SRA support for help.\nCAPS Error Code: ' + data.Code + '\nCAPS Error: ' + data.ErrorText)
                                }
                            }
                            else {
                                $('#stageDialogStatus').removeClass().addClass('cw-dialog-failure').html('Error Saving Stage!');
                                alert('Error saving stage definition!\nError: ' + data);
                            }
                        });
                    }
                    else {
                        // an existing stage was selected so only save to the map-stages list
                        var mapStageID = $('#stage_' + dialogData.activeMapID + '_' + dialogData.activeStagePosition + ' > div').attr('mapstageid');
                        //var capsCallData = { mapID: dialogData.activeMapID, stageID: stageListItemID, stagePosition: dialogData.activeStagePosition, tollgate: 1, listItemID: 'New', cmd: 'Save' };

                        // get the key questions
                        var $selectedQuestions = $('#selected-questions').children();
                        var keyQuestions = '';
                        $.each($selectedQuestions, function (indx, ele) {
                            //keyQuestions and deliverables must be in the format of - 8;#Affinity Diagram;#3;#VOC
                            keyQuestions += $(ele).attr('splistid') + ';#' + $(ele).text().replace(';', '&#59;') + ';#';
                        });
                        // remove the last ;#
                        keyQuestions = keyQuestions.slice(0, -2);

                        // get the selected deliverables
                        var $selectedDeliverables = $('#selected-deliverables').children();
                        var deliverables = '';
                        $.each($selectedDeliverables, function (indx, ele) {
                            deliverables += $(ele).attr('splistid') + ';#' + $(ele).text().replace(';', '&#59;') + ';#';

                        });
                        // remove the last ;#
                        deliverables = deliverables.slice(0, -2);

                        var tollgate = ($('#tollGate').is(':checked')) ? 1 : 0;
                        var listItemID;
                        var stageName = '';        // stage name ie - "D - DEFINE"
                        var stageDescription = ''; // stage description = "DEFINE"


                        if (dialogData.newMapStage == true) {
                            listItemID = 'New';
                            stageName = $('#existStageDesc option:selected').text();
                            stageDescription = $('#existStageDesc option:selected').attr('desc');

                        }
                        else {
                            listItemID = mapStageID;
                            stageName = $('#stageInit').val() + ' - ' + $('#stageDesc').val();
                            stageDescription = $('#stageDesc').val();
                        }
                        var capsCallData = {
                            mapID: dialogData.activeMapID,
                            stageID: stageListItemID,
                            stagePosition: dialogData.activeStagePosition,
                            tollgate: tollgate,
                            listItemID: listItemID,
                            cmd: 'Save',
                            keyQuestions: keyQuestions,
                            deliverables: deliverables,
                            mapName: dialogData.activeMapName,
                            stageName : stageName,
                            stageDescription : stageDescription
                        };
                        //stageName : $('#stageInit').val() + ' - ' + $('#stageDesc').val(),
                        //stageName : $('#existStageDesc option:selected').text(),
                        //stageDescription : $('#existStageDesc option:selected').attr('desc')


                        saveMapStage(capsCallData, function (result, data) {
                            if (result == true) {
                                if (data.Code != '0') {
                                    $('#stageDialogStatus').removeClass().addClass('cw-dialog-failure').html('Error Saving Stage!');
                                    alert('An error occured saving the map-stage definition.\nPlease contact SRA support for help.\nCAPS Error Code: ' + data.Code + '\nCAPS Error: ' + data.ErrorText)
                                }
                                else {
                                    $('#stageDialogStatus').removeClass().addClass('cw-dialog-success').html('Stage Definition Saved!');
                                    /*
                                     if (mapStageID == undefined) {
                                     addNewStageToMap(dialogData, data.ID[1], $('#stageDesc').val(), $('#stagePurpose').val(), stageListItemID);
                                     }
                                     */
                                    if(dialogData.newMapStage == true){
                                        addNewStageToMap(dialogData, data.ID[1], $('#stageDesc').val(), $('#stagePurpose').val(), stageListItemID);
                                    }
                                }
                                // reload the map definitions
                                getMaps(function () { });
                            }
                            else {
                                $('#stageDialogStatus').removeClass().addClass('cw-dialog-failure').html('Error Saving Stage!');
                                alert('An error saving map-stage definition!\nError: ' + data);
                            }
                        });

                    }
                    $('#button-cancel-stage').addClass('hide');
                    $('#button-ok-stage').removeClass('hide');
                    $('#button-save-stage').prop('disabled', 'disabled');
                }
            },
                {
                    id: 'button-ok-stage',
                    text: 'OK',
                    click: function () {
                        resetStageData();
                        $(this).dialog('close');
                    }
                },
                {
                    id: 'button-cancel-stage',
                    text: 'Cancel',
                    click: function () {
                        if (dialogData.activeMapID != null) {
                            if (dialogData.updateFlag == false) {
                                dialogData.$activeStage.children('.cw-sra-tool').remove();
                                dialogData.$activeStage.children('.cw-sra-row-head').removeClass('cw-sra-row-head').addClass('cw-sra-new-row-head').text('Add Stage to Map');
                                $('#selected-tools').empty();
                            }
                            else {
                                // removed any controls that were added to the stage and not saved
                                dialogData.$activeStage.children('.cw-sra-tool[splistid="undefined"]').remove();
                            }
                        }
                        $(this).dialog('close');
                    }
                }]
        });
    }

// name: updateNewStageToolAttributes
// by: papproth, brian
// date:
// purpose:
    function updateNewStageToolAttributes(activeMapID) {

        // update the new stage tool attributes
        var lastIndx = $('#map_' + activeMapID + '_wrapper').children().length;
        var $newStage = $('#map_' + activeMapID + '_wrapper').children().last();
        $newStage.attr('stageindx', lastIndx);
    }


// name: addNewStageToMap
// by: papproth, brian
// date:
// purpose:
    function addNewStageToMap(dialogData, newMapStageID, stageTitle, stagePurpose, stageID) {
        var stageData = {
            mapID: dialogData.activeMapID,
            stagePosition: dialogData.activeStagePosition,
            //stagePosition: dialogData.nextStageIndx,
            mapStageID: newMapStageID,
            stageInitial: dialogData.$stageInit.val(),
            stageTitle: stageTitle,
            stagePurpose: stagePurpose,
            //indx: dialogData.activeStagePosition - 1,
            indx: dialogData.nextStageIndx,
            tollGateID: newMapStageID,
            stageID: stageID
        };

        $(addNewStageHtml(stageData)).insertBefore('#stage_' + dialogData.activeMapID + '_new');


        updateNewStageToolAttributes(dialogData.activeMapID);
        makeStagesSortable();
        getMaps(function () { });


    }

// name: addToolsToControls
// by: papproth, brian
// date:
// purpose: adds tools
    function addToolsToControls(data, toolItemID) {

        var toolTitle;
        sraTools = data; // global
        $('#all-tools div').not(':first').remove();
        $('#existToolTitle option').not(':first').remove();

        $.each(data.Tool, function (indx, tool) {
            // populate the all tools div
            if (tool.Active == '1') {
                toolTitle = '<div class="cw-tool-title cw-avail-tool" title="' + tool.Purpose + '" stage="' + tool.Stages + '" splistid="" docid="' + tool.ID + '">' + tool.Title + '</div>';
                $('#all-tools').append(toolTitle);
            }
            // now populate the select tools drop-down on the manage tools dialog from the toolbar
            if (tool.Active == '1') {
                $('#existToolTitle').append($('<option>', {
                    value: tool.ID,
                    text: tool.Title
                }));
            }
            else {
                $('#existToolTitle').append($('<option>', {
                    value: tool.ID,
                    text: tool.Title,
                    class: 'cw-inactive-option',
                    title: 'Inactive'
                }));
            }
        });

        $('#existToolTitle').val(toolItemID);

        bindAllToolClick();
    }


// name: checkFileExists
// by: papproth, brian
// date: 2015.06.18
// purpose returns a boolean based on url for file
// reference: https://api.jquery.com/jquery.get/
    function checkFileExists(url, callback) {

        var jqxhr = $.get( url, function() {
            callback(true);
        })
            .fail(function() {
                callback(false);
            });
    }
/// CLASSES ///
// tool object
    function toolData(docid, title, purpose, splistid) {
        this.docid = docid;
        this.title = title;
        this.purpose = purpose;
        this.splistid = splistid;
    }

// CAPS result
    function capsResultData(result) {
        this.Code = result.Code;
        this.ErrorText = result.ErrorText;
        this.ID = result.ID;
    }



    var publics = {
        Init: _init,
    };

    return publics;

}




