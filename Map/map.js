// name: process-map.js
// by: papproth, brian
// date: 2015.02.07
// purpose: this is the main js file for the process map

// *** document.ready
var MapDef;
var sraTools;
var projectsMasterListID;
var NoMapSet = false;

$(document).ready(function () {
    $('#main-wrapper').hide();
    getProjectMethodology();
    getSRATools(sraTools);
    getMaps();



    // global variables
    activeStageId = '';
    activeStage = 0;        // selected process map stage
    activeToolDocID = ''; // variable used in tool dialog to control tool class in process map

    // extend the contains selector to be case in-sensitive
    $.extend($.expr[":"], {
        "containsNC": function (elem, i, match, array) {
            return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });

    $("#cw-sra-MapMethodology").on('click', function () {
    	if(MapDef.ProjectEditor){
        $("div.cw-sra-map-menu").toggle();}
    });
    $(".mapMenuAlert").on('click', function () {
    	if(MapDef.ProjectEditor){
        $("div.cw-sra-map-menu").hide();}
    });
    $('#mapMenu').on('change', function () {
    	if(NoMapSet){
	        $('#busyLoader').show();
	        $('#main-wrapper').hide();
	        updateProjectMethodology($('#mapMenu option:selected').val(), $('#mapMenu option:selected').attr('mapID'));
	        $("div.cw-sra-map-menu").hide();
	        NoMapSet = false;    	
			$('div.mapMenuAlert').show();
			}
		else{
			$('#change-map-confirm').dialog('open');  		
			}      
        
    });

    $( "#change-map-confirm" ).dialog({
    	dialogClass:'no-close',
    	closeOnEscape:false,
    	autoOpen: false,
      resizable: false,
		minWidth: 690,
		maxWidth: 690,
		minHeight: 200,
		maxHeight: 200,
      modal: true,
      buttons: {
        "Change Map": function() {
	        $('#busyLoader').show();
	        $('#main-wrapper').hide();
	        updateProjectMethodology($('#mapMenu option:selected').val(), $('#mapMenu option:selected').attr('mapID'));
	        $("div.cw-sra-map-menu").hide();
	        NoMapSet = false;
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
          $("div.cw-sra-map-menu").hide();
          $('select#mapMenu')[0].selectedIndex = 0;
        }
      }
    });
    
    /*$('#mapMenu').chosen().change(function(){
		updateProjectMethodology($(this).val(),$('#mapMenu option:selected').attr('mapID'));
	})*/
    // bind the keypress event to the tool-search input
    $("#tool-search").keyup(function (event) {
        $("div.cw-tool-title").hide();
        $("div.cw-tool-title:containsNC(" + $(this).val() + ")").show();
    });

    // handle the x on the input field
    // there are 2 events fired on input element when clicking on the clear button:
    // mousedown and mouseup.
    // from stack-overflow : http://stackoverflow.com/questions/14498396/event-fired-when-clearing-text-input-on-ie10-with-clear-icon
    $("#tool-search").bind("mouseup", function (e) {
        var $input = $(this), oldValue = $input.val();
        if (oldValue == "") return;
        // When this event is fired after clicking on the clear button
        // the value is not cleared yet. We have to wait for it.
        setTimeout(function () {
            var newValue = $input.val();
            if (newValue == "") {
                $('div.cw-avail-tool').show();
            }
        }, 1);
    });

    // tool dialog checkbox
    $('#tool-dialog-checkbox, #tool-dialog-checkbox-text').on('click', function () {
    	if(MapDef.ProjectEditor){
	        if ($('#tool-dialog-checkbox').hasClass('cw-not-checked')) {
	            // mark document as complete
	            $('#tool-dialog-checkbox').removeClass('cw-not-checked').addClass('cw-checked');
	            $('#' + activeStageId).children('[docid="' + activeToolDocID + '"]').removeClass('cw-active').addClass('cw-inactive');
	            updateToolStatus($('#' + activeStageId).children('[docid="' + activeToolDocID + '"]').attr('splistid'), 'inactive')
	        }
	        else {
	            // mark document as not complete
	            $('#tool-dialog-checkbox').removeClass('cw-checked').addClass('cw-not-checked');
	            $('#' + activeStageId).children('[docid="' + activeToolDocID + '"]').removeClass('cw-inactive').addClass('cw-active');
	            updateToolStatus($('#' + activeStageId).children('[docid="' + activeToolDocID + '"]').attr('splistid'), 'active')
	        }
	    }
    });

    //prevent the default event for the doc-template
    // added by papproth, brian 2015.04.20 
    $('#doc-template').click(function (event) {
    	if(MapDef.ProjectEditor){ 
	        event.preventDefault();	        
	        $('#save-tool-wrapper').slideDown();
	    }
    });

	// setup the buttons for the tool template save
	$(function() {
    	$( ".cw-save-template-btn" ).button();
  	});

});
// *** document.ready end


// name: buildToolsTable
// by: papproth, brian
// date: 2015.02.07
// purpose: create a table of all the stages with tools
function buildToolsTable(MapDef) {

    //check if tools are local and if not get def from master SRA


    // write the process title
    /*if(MapDef.Map.Stages.Stage[0].Tools.ItemCount == 0)
	{
		writeLocalMapDefinition();
		
	}
	else
		{*/
    $('#cw-sra-MapMethodology').text(MapDef.Map.title).attr('mapID', MapDef.Map.id);
    var stageArray = new Array;
    // loop thru each stage and add a row to the sra table
    $.each(MapDef.Map.Stages.Stage, function (indx, val) {
        // add the stages
        var toolRow = '<div id="stage_' + indx + '"  class="cw-sra-tool-row"><div class="cw-sra-row-head cw-sra-row-head-font" title="' + val.title + '\n' + val.purpose + '" indx="' + indx + '" mapStageID="' + val.id + '" mapStageTitle="' + val.title + '">' + val.initial + '</div>';
        // build the stage button array for the manage stage dialog
        stageArray.push(val.initial);

        if (val.Tools.ItemCount != 0) {
            if (val.Tools.ItemCount > 1) {
                $.each(val.Tools.Tool, function (indx, val) {
                    toolRow = toolRow + '<div id="tool_' + val.id + '" class="cw-sra-tool cw-' + val.status + '" title="' + val.helpMessage + '" docid="' + val.toolID + '" splistid="' + val.id + '" template="' + val.templateURL + '">' + val.title + '</div>';
                });
            }
            else //handles object properties if only one tool is present
            { 
            	toolRow = toolRow + '<div id="tool_' + val.Tools.Tool.id + '" class="cw-sra-tool cw-' + val.Tools.Tool.status + '" title="' + val.Tools.Tool.helpMessage + '" docid="' + val.Tools.Tool.toolID + '" splistid="' + val.Tools.Tool.id + '" template="' + val.Tools.Tool.templateURL + '">' + val.Tools.Tool.title + '</div>'; 
                //toolRow = toolRow + '<div id="tool_' + val.id + '" class="cw-sra-tool cw-' + val.status + '" title="' + val.helpMessage + '" docid="' + val.toolID + '" splistid="' + val.id + '" template="' + val.templateURL + '">' + val.title + '</div>';

            }
        }

        toolRow = toolRow + '</div>';
        $('#sra').append(toolRow);
    });
    // add the stage buttons to the manage stages dialog
    buildStageButtons(stageArray);

    // add the click event to all tools
    bindSraToolClick();


    // add the click event to all row headings
    $('.cw-sra-row-head').click(function () {
    
    	if(MapDef.ProjectEditor){
	        var stage = $(this).text() + ': ' + $(this).attr('mapStageTitle');
	        activeStage = $(this).attr('indx');
	
	        var stageTools = $(this).parent().children();
	        manageStage(stage, function (result) {
	            if (result == true) {
	                getStageTools(stageTools, function () {
	
	                });
	            }
	        });
	    }
    });
	if(MapDef.ProjectEditor){	
	    $('.cw-sra-tool-row').sortable({
	        axis: 'x',
	        items: '.cw-sra-tool',
	        helper: 'clone',
	        update: function (event, ui) {
	            saveSortedStage(ui.item.parent('.cw-sra-tool-row').children('.cw-sra-tool'));
	        }
	    });
	}
    $('#busyLoader').hide();
    $('#main-wrapper').show();
    //}
};

// name: bindSraToolClick
// by: papproth, brian
// date: 2015.02.22
// purpose: bind a click event to each tool on the process map
function bindSraToolClick() {
    $('.cw-sra-tool').on('click', function () {
   	
        activeToolBaseDocID = $(this).attr('docid').split("_")[0];
        activeToolDocID = $(this).attr('docid');
        activeStageId = $(this).parent()[0].id;
        // reset the help text
        // $('#tool-helper').text("Help has not been specified");

        // get the selected tool from the sraTools array
        var activeTool = $.grep(sraTools.Tool, function (tool, index) {
            return tool.ID == activeToolBaseDocID;
        });
        // add the data to the mange tool dialog
        // add the help message
        //$('#tool-helper').text(activeTool[0].TemplateLocation);
        if (activeTool[0].TemplateLocation)
        { $('#doc-template').attr('href', activeTool[0].TemplateLocation.split(',')[0]); 
        //add 1.12.2016 Joe Lewis to reenable after disabled link
        $('#doc-template').text('Download Tool Template').prop('disabled', '');
         
        }
        else
        { $('#doc-template').text('No Template Link').prop('disabled', 'disabled') }
        if (activeTool[0].HelpFileLocation)
        { 
        $('#help-doc').attr('href', activeTool[0].HelpFileLocation.split(',')[0]);
        //add 1.12.2016 Joe Lewis to reenable after disabled link
        $('#help-doc').text('Open Help Document').prop('disabled', '');
        
		 }
        else
        { $('#help-doc').text('No Help File').prop('disabled', 'disabled'); }
        $('#doc-purpose').text(activeTool[0].Purpose);
        $('#doc-stages').text("Stages: " + activeTool[0].Stages);

        // set the status of the check box
        if ($('#' + activeStageId).children('[docid="' + activeToolDocID + '"]').hasClass('cw-inactive')) {
            $('#tool-dialog-checkbox').removeClass('cw-not-checked').addClass('cw-checked');
        }
        else {
            $('#tool-dialog-checkbox').removeClass('cw-checked').addClass('cw-not-checked');
        }

        $('#select-tool-dialog').removeClass('hide');
        $('#select-tool-dialog').dialog({
            minWidth: 690,
            maxWidth: 690,
            minHeight: 530,
            maxHeight: 530,
            resizeable: false,
            modal: true,
            title: $(this).text(),
            create: function(){
            	var $btnPane = $("div.ui-dialog-buttonpane");
            	$btnPane.append('<div id="tool-dialog-status"></div>');
            },
            open: function () {
                $('.cw-save-template-btn').off('click');
                $('#save-tool-wrapper').hide();
                $('#tool-dialog-status').text('').removeClass('cw-dialog-success cw-dialog-error cw-dialog-saving');                    
                
                // bind the click event for the tool template download
                $('#saveTemplateYes').on('click', function (e) {
					if(MapDef.ProjectEditor){                	
	                    $('#tool-dialog-status').addClass('cw-dialog-saving').removeClass('cw-dialog-success cw-dialog-error').text('Saving template...');
						setTimeout(function(){
							var fileUrl = $('#doc-template').attr('href');
		                    saveTemplateFile(fileUrl, function (result, msg, listItemID) {
		                        if (result == true) {
		                            updateTemplateFileMetaData(activeStageId, listItemID, function (result, msg) {
		                                if (result == true) {
		                                    $('#tool-dialog-status').removeClass('cw-dialog-error cw-dialog-saving').addClass('cw-dialog-success');
		                                    $('#tool-dialog-status').text(msg);
		                                }
		                                else {
		                                    $('#tool-dialog-status').removeClass('cw-dialog-success cw-dialog-saving').addClass('cw-dialog-error');
		                                    $('#tool-dialog-status').text(msg);
		                                }
		                            });
		                        }
		                        else {
		                             $('#tool-dialog-status').removeClass('cw-dialog-success').addClass('cw-dialog-error');
		                             $('#tool-dialog-status').text(msg);
		                        }
		                        $('#save-tool-wrapper').slideUp();
		                    });
		            	},300);
					}
					else{
						alert('You do not have the proper rights');
					}                    
                });
                // bind the click event for the tool template download
                $('#saveTemplateNo').on('click', function (e) {
                	$('div#tool-dialog-status').text('Downloaded via browser').removeClass('cw-dialog-success cw-dialog-error');
                	$('#save-tool-wrapper').slideUp();
                    var fileUrl = $('#doc-template').attr('href');
                    ForceDocDL(sraRoot,fileUrl);
                });

            },
            buttons: [{
                text: 'Done',
                click: function () {
                    $(this).dialog("close");
                }
            }]
        });
    });
}

// name: ForceDocDL
// by: papproth, brian from lewis, joe
// date: 2015.02.07
// purpose: forces a file download
function ForceDocDL(Origin,ItemURL)
{
	STSNavigate(Origin +'/_layouts/download.aspx?SourceURL=' + ItemURL);

}



// *********** DEMO CODE FOR MANAGE STAGE DIALOG
// name: manageStage
// by: papproth, brian
// date: 2015.02.07
// purpose: load the manage stage dialog
function manageStage(stage, callback) {

    // loop thru each tool list and add to the all-tools div
    // remove all the child divs (except first), leave the search input box
    $('#all-tools div').not(':first').remove();
    $.each(sraTools.Tool, function (indx, val) {
        var toolTitle = '<div class="cw-tool-title cw-avail-tool " title="' + val.Purpose + '" stage="' + val.Stages + '" docid="' + val.ID + '">' + val.Title + '</div>';
        $('#all-tools').append(toolTitle);
    });

    bindAllToolClick();

    // show the dialog
    $('#manage-stage').removeClass('hide');
    $('#manage-stage').dialog({
        minWidth: 690,
        maxWidth: 690,
        minHeight: 640,
        maxHeight: 640,
        resizeable: false,
        modal: true,
        title: 'Manage Stage "' + stage + '"',
        buttons: [{
            text: 'Done',
            click: function () {
                updateStageTools();
                $(this).dialog("close");
            }
        }]
    });

    callback(true);
}


//// *************************

// name: bindAllToolClick
// by: papproth, brian
// date: 2015.02.09
// purpose: add a click event to each tool in the all-tools div
//               when tool is selected it will be highlighted and
//               disabled. it will be added to the selected tools panel
//               to the right.
function bindAllToolClick() {
    $('#all-tools div.cw-tool-title').unbind('click');
    $('#all-tools div.cw-tool-title').click(function () {

        var splistid = addTool($(this).attr('docid'), ($('#selected-tools div').length + 1), $('#stage_' + activeStage).children('div.cw-sra-row-head').attr('mapstageid'));
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

// name: getStageTools
// by: papproth, brian
// date: 2015.02.09
// purpose: bind the click event to the selected tools
function bindSelectedToolClick() {
    $("#selected-tools div.cw-selected-tool-title").unbind('click');
    $("#selected-tools div.cw-selected-tool-title").click(function () {
        // make the matching tool in the all-tools pane selectable
        var tool = $('#all-tools').children('[docid=' + $(this).attr('docid') + ']');
        bindAllToolClick();
        //remove from the local map definition
        deleteTool($(this).attr('splistid'));
        // remove from the selected-tools pane
        $(this).remove();
        updateStageTools();
    });
}

// name: getStageTools
// by: papproth, brian
// date: 2015.02.09
// purpose: load the tools for a selected stage
//                stage = all child divs from the stage row including the row header
//                             do not include the header in the tools ( indx > 0 )
//                             when looping thru the elements
function getStageTools(stage, result) {
    // clear the selected tools from the selected-tools div
    $('#selected-tools').empty();
    // add the tools from selected stage
    $.each(stage, function (indx, val) {
        if (indx > 0) {
            // skip the row header ( indx > 0 )
            var tool = '<div class="cw-selected-tool-title" docid="' + $(val).attr('docid') + '" splistid="' + $(val).attr('splistid') + '">' + val.innerHTML + '</div>';
            $('#selected-tools').append(tool);
        }
    });

    bindSelectedToolClick();
}

// name: updateStageTools
// by: papproth, brian
// date: 2015.02.09
// purpose: write the selected tools back to stage
function updateStageTools() {
    var toolArray = new Array;
    var statusArray = new Array;
    var tools;

    // build an array of the inactive documents
    $.each($('#stage_' + activeStage).children().not(':first'), function (indx, val) {
        if ($(val).hasClass('cw-inactive')) {
            statusArray.push($(val).attr('docid'));
        }
    });

    // build an array of selected tools
    $.each($('#selected-tools').children(), function (indx, val) {
        toolArray.push(new toolData($(val).attr('docid'), val.innerHTML, val.title, $(val).attr('splistid')));
    });

    // remove all the tools from the selected stage, keep the row header
    $('#stage_' + activeStage).children().not(':first').remove();
    // add the new tools
    $.each(toolArray, function (indx, val) {
        tool = '<div class="cw-sra-tool cw-active" title="' + val.purpose + '" docid="' + val.docid + '" splistid="' + val.splistid + '">' + val.title + '</div>';//splistid needs to be added to this div's attributes. splistid is the unique id returned by the addTool() function after the tool is written to the list of tools for this project's map.
        $('#stage_' + activeStage).append(tool);
    });

    //set the inactive class of the tools from the statusArray
    $.each(statusArray, function (indx, val) {
        $('#stage_' + activeStage).find("[docid='" + val + "']").removeClass('cw-active').addClass('cw-inactive');
    });

    // unbind the click event from all tools
    $('.cw-sra-tool').unbind('click');

    // add the click event to all tools
    bindSraToolClick();
}

// name: buildStageButtons
// by: papproth, brian
// date: 2015.02.10
// purpose: create the stage buttons on the manage stage dialog
function buildStageButtons(stageArray) {
    $.each(MapDef.Map.Stages.Stage, function (indx, val) {
        $('#stage-btns-wrapper').append('<div class="cw-stage-btn cw-stage-btn-inactive" id="stage_btn_' + indx + '" indx="' + indx + '" stageID="' + val.stageID + '" stageName="' + val.title + '">' + val.initial + '</div>');

    });
    // add the 'show all' filter
    $('#stage-btns-wrapper').append('<div class="cw-stage-btn cw-stage-btn-inactive" id="stage_btn_' + MapDef.Map.Stages.ItemCount + '" indx="' + MapDef.Map.Stages.ItemCount + '">All</div>');

    // add the click event to all stage butons
    $('.cw-stage-btn').click(function () {
        // clear the search box
        $('#tool-search').val('');
        // toggle the button formatting
        $('.cw-stage-btn').removeClass('cw-stage-btn-active').addClass('cw-stage-btn-inactive');
        $(this).removeClass('cw-stage-btn-inactive').addClass('cw-stage-btn-active');

        // filter the tools by the selected stage button
        $("#all-tools .cw-tool-title").hide();
        if ($(this)[0].innerHTML == "All") {
            $("#all-tools .cw-tool-title").show();
        }
        else {
            $("#all-tools .cw-tool-title[stage*='" + $(this).attr('stageid') + $(this).attr('stagename') + "']").show();
        }
    });
};


// name: saveMap
// by: papproth, brian
// date: 2015.03.01
// purpose: save the process map
function saveSortedStage(stageTools) {

    var batchXML = '<ows:Batch OnError="Return">';
    $.each(stageTools, function (i, v) {
        batchXML += '<Method ID="A' + (i + 1) + '"><SetList>%Map%</SetList><SetVar Name="ID">' + $(v).attr('spListID') + '</SetVar><SetVar Name="Cmd">Save</SetVar><SetVar Name="urn:schemas-microsoft-com:office:office#ToolPosition">' + (i + 1) + '</SetVar></Method>';
    });
    batchXML += '</ows:Batch>';

    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'Map', 'Batch': batchXML, 'OutputType': 'JSON' },
        dataType: 'json',
        async: true,
        cache: false,
        type: 'POST',
    });

}

function addTool(toolID, position, mapstageID) {

    var batchXML = '<ows:Batch OnError="Return"><Method ID="A1"><SetList>%Map%</SetList><SetVar Name="ID">New</SetVar><SetVar Name="Cmd">Save</SetVar>' +
					'<SetVar Name="urn:schemas-microsoft-com:office:office#ToolID">' + toolID + '</SetVar>' +
					'<SetVar Name="urn:schemas-microsoft-com:office:office#MapStageID">' + mapstageID + '</SetVar>' +
					'<SetVar Name="urn:schemas-microsoft-com:office:office#ToolPosition">' + position + '</SetVar>' +
					'</Method></ows:Batch>';

    var splistid;

    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'Map', 'Batch': batchXML, 'OutputType': 'JSON' },
        dataType: 'json',
        async: false,
        cache: false,
        type: 'POST',
        success: function (json) {
            splistid = json.NewDataSet.ProcessBatchData.Results.Result.ID[1];
        }
    });

    return splistid;
}


function deleteTool(spListID) {

    var batchXML = '<ows:Batch OnError="Return"><Method ID="A1"><SetList>%Map%</SetList><SetVar Name="ID">' + spListID + '</SetVar><SetVar Name="Cmd">Delete</SetVar></Method></ows:Batch>';


    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'Map', 'Batch': batchXML, 'OutputType': 'JSON' },
        dataType: 'json',
        async: true,
        cache: false,
        type: 'POST',
    });
}


function updateToolStatus(spListID, status) {

    var batchXML = '<ows:Batch OnError="Return"><Method ID="A1"><SetList>%Map%</SetList><SetVar Name="ID">' + spListID + '</SetVar><SetVar Name="Cmd">Save</SetVar><SetVar Name="urn:schemas-microsoft-com:office:office#Status">' + status + '</SetVar></Method></ows:Batch>';


    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'Map', 'Batch': batchXML, 'OutputType': 'JSON' },
        dataType: 'json',
        async: true,
        cache: false,
        type: 'POST',
    });
}

// tool object
function toolData(docid, title, purpose, splistid) {
    this.docid = docid;
    this.title = title;
    this.purpose = purpose;
    this.splistid = splistid;
}

// name: getProjectMethodology
// by: bradley, michael, papproth, brian
// date: 2015.03.06
// purpose: 
function getProjectMethodology() {
    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { 'RequestType': 'GetListItems', 'SiteUrl': '[SRA Root]', 'ListTitle': 'Projects', 'OutputType': 'JSON', 'CAML': '<Query><Where><Eq><FieldRef Name="URL"/><Value Type="Text">%SiteURL%</Value></Eq></Where></Query>' },
        dataType: 'json',
        async: false,
        cache: false,
        type: 'GET',
        success: function (json) {
            //SP.UI.ModalDialog.showWaitScreenWithNoClose('Building Map', ''); 
            projectsMasterListID = json.NewDataSet.GetListItems.listitems['rs:data']['z:row'].ows_ID;
            if (json.NewDataSet.GetListItems.listitems['rs:data']['z:row'].ows_MapID) {
                getMapDefinition(json.NewDataSet.GetListItems.listitems['rs:data']['z:row'].ows_MapID, buildToolsTable);
            }
            else {
                $('#cw-sra-MapMethodology').text("Please choose a methodology");
                $("div.cw-sra-map-menu").toggle();
                NoMapSet = true; 
                $('div.mapMenuAlert').hide();
                
                $('#busyLoader').hide();
                $('#main-wrapper').show();
                
            }
            //alert(json.NewDataSet.GetListItems.listitems['rs:data']['z:row'].ows_MapID);
        }
    });
}

// name: getSRATools
// by: bradley, michael, papproth, brian
// date: 2015.03.06
// purpose: 
//                    data: { 'RequestType': 'GetListItems', 'SiteUrl': '[SRA Root]', 'ListTitle': 'Tools', 'OutputType': 'JSON', 'CAML': '<Query><Where><Eq><FieldRef Name="Active"/><Value Type="Boolean">1</Value></Eq></Where><OrderBy><FieldRef Name="Title"/></OrderBy></Query>' },
function getSRATools() {
    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { 'RequestType': 'BatchRequest', 'ConfigFileLocation': '[SRA Root]/resources/getMapToolsCBD.xml', 'XsltLocation': '[SRA Root]/Resources/getMapToolsXSLT.xslt', 'OutputType': 'JSON' },
        dataType: 'json',
        async: true,
        cache: false,
        type: 'POST',
        success: function (json) {

            if (json.Tools.Tool) {
                sraTools = json.Tools;
            }
            else { alert('No SRA Tools Found - Please contact SRA support.'); }
        }
    });


}

// name: getMapDefinition
// by: bradley, michael, papproth, brian
// date: 2015.03.06
// purpose: 
function getMapDefinition(map, callback) {
    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { 'RequestType': 'BatchRequest', 'ConfigFileLocation': '[SRA Root]/resources/getMapDefCBD.xml', 'XsltLocation': '[SRA Root]/Resources/getMapDefXSLT.xslt', 'MapID': map, 'OutputType': 'JSON' },
        dataType: 'json',
        async: false,
        cache: false,
        type: 'POST',
        success: function (json) {
            if (json.Maps.Map) {
                MapDef = json.Maps;
         		//console.log(MapDef.ProjectEditor)
                callback(MapDef);
            }
            else { alert('No Map Definition Found - Please contact SRA support.'); }
        }
    });

}

function getMaps() {
    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { 'RequestType': 'GetListItems', 'ListTitle': 'Maps', 'SiteUrl': '[SRA Root]', 'CAML': '<Query><Where><Eq><FieldRef Name="Active"/><Value Type="Bool">1</Value></Eq></Where><OrderBy><FieldRef Name="Title"/></OrderBy><ViewFields><FieldRef Name="ID"/><FieldRef Name="Title"/></ViewFields></Query>', 'OutputType': 'JSON' },
        dataType: 'json',
        async: true,
        cache: false,
        type: 'POST',
        success: function (json) {
            var mapMenuItems = "";
            $.each(json.NewDataSet.GetListItems.listitems["rs:data"]["z:row"], function (i, v) {
                mapMenuItems += '<option mapid="' + v.ows_ID + '">' + v.ows_Title + '</option>';
            });
            $("select#mapMenu").append(mapMenuItems);
            //$("select#mapMenu").append(mapMenuItems).trigger('chosen:updated');
            //$('.cw-sra-map-menu').hide();
        }
    });
}
function updateProjectMethodology(map, mapID) {
    var batchXML = '<ows:Batch OnError="Return"><Method ID="A1"><SetList>%Projects%</SetList><SetVar Name="ID">' + projectsMasterListID + '</SetVar><SetVar Name="Cmd">Save</SetVar><SetVar Name="urn:schemas-microsoft-com:office:office#Methodology">' + map + '</SetVar><SetVar Name="urn:schemas-microsoft-com:office:office#_x002a__x002a__x002a_wplu_x002a_0"><![CDATA[<Properties><Property><LookupKeyValue></LookupKeyValue><LookupLinkValue></LookupLinkValue><LookupDbStoreValue>' + map + '</LookupDbStoreValue><LookupDisplayValue>' + map + '</LookupDisplayValue></Property></Properties>]]></SetVar><SetVar Name="urn:schemas-microsoft-com:office:office#MapID">' + mapID + '</SetVar></Method></ows:Batch>';
    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { 'RequestType': 'ProcessBatchData', 'ListTitle': 'Projects', 'SiteUrl': '[SRA Root]', 'Batch': batchXML, 'OutputType': 'JSON' },
        dataType: 'json',
        async: true,
        cache: false,
        type: 'POST',
        success: function (json) { rewriteLocalMapDefinition(); }
    });
}

//Calling this function will remove any existing local tools and milestones and write down the SRA master definition for the selected methodology 
function rewriteLocalMapDefinition() {
    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { 'RequestType': 'BatchRequest', 'ConfigFileLocation': '[SRA Root]/resources/writeLocalMapDefCBD.xml', 'XsltLocation': '[SRA Root]/Resources/writeLocalMapDefXSLT.xslt', 'OutputType': 'Redirect' },
        async: true,
        cache: false,
        type: 'POST',
        success: function (data) {
            //clear the old map
            MapDef = {};
            SRATools = {};
            $('#sra').empty();
            $('#stage-btns-wrapper').empty();
            //build the new map
            getProjectMethodology();
        }
    });

}

// name: saveTemplateFile
// by: papproth, brian
// date: 2015.04.20
// purpose: saves a file to the project document library if the user select yes when downloading a template file 
function saveTemplateFile(fileUrl, callback) {

    var filename = fileUrl.split('/').pop();
    
    getFileIndex(filename, function(result, indx, msg){
    	    	
        if(result == true){
        	var fileExt = filename.substr(filename.lastIndexOf('.'), filename.length);	
			var newFilename = filename.substr(0, filename.lastIndexOf('.')) + '_' + indx + fileExt;
        
		    $.ajax({
                url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
                data: { 'RequestType': 'CopyFile', 'ListTitle': 'Documents', 'NewFileName': newFilename  , 'SourcePageUrl': fileUrl, 'IncludeWebParts': false, 'OutputType': 'json' },
                dataType: 'json',
                async: false,
                cache: false,
                type: 'POST',
                success: function (json) {
                    if(json.NewDataSet.hasOwnProperty('CopyFile')){
                        var itemId = json.NewDataSet.CopyFile.ItemId;
                        var copyResult = json.NewDataSet.CopyFile.CopyResult;
                        callback(true, copyResult, itemId);
                    }
                    else {
                        var errMsg = json.NewDataSet.ErrorInfo.ErrorMessage;
                        callback(false, errMsg, null);
                    }
                },
                error: function (jqXHR, status, error) {
                    callback(false, error, null);
                }
            });
        }  
        else {
            alert('Failed');
        }
    });   
}
// name: updateTemplateFileMetaData
// by: papproth, brian
// date: 2015.04.20
// purpose: updates the template file meta-data 
function updateTemplateFileMetaData(stageID, listItemID, callback) {
    var methodology = $('#cw-sra-MapMethodology').html();
    var stage = $('#' + stageID).children('.cw-sra-row-head').attr('mapstagetitle');
    var stageSortOrder = stageID.split('_').pop();

    // make caps call to get the ows_serverUrl valve
    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { 'RequestType': 'GetListItems', 'ListTitle': 'Documents', 'CAML': '<Query><Where><Eq><FieldRef Name="ID"/><Value Type="Number">' + listItemID + '</Value></Eq></Where></Query>', 'OutputType': 'JSON' },
        dataType: 'json',
        async: false,
        cache: false,
        type: 'POST',
        success: function (json) {
            var owsServerUrl = json.NewDataSet.GetListItems.listitems["rs:data"]["z:row"].ows_ServerUrl;
            var batchXML = '<ows:Batch OnError="Return">' +
	                        '<Method ID="A1">' +
	                         '<SetList>%Documents%</SetList>' +
	                         '<SetVar Name="Cmd">Save</SetVar>' +
	                         '<SetVar Name="ID">' + listItemID + '</SetVar>' +
	                         '<SetVar Name="owsfileref">' + owsServerUrl + '</SetVar>' +
                             '<SetVar Name="urn:schemas-microsoft-com:office:office#Stage">' + stage + '</SetVar>' +
                             '<SetVar Name="urn:schemas-microsoft-com:office:office#Category">' + stage + '</SetVar>' +
                             '<SetVar Name="urn:schemas-microsoft-com:office:office#Methodology">' + methodology + '</SetVar>' +
                             '<SetVar Name="urn:schemas-microsoft-com:office:office#StageSortOrder">' + stageSortOrder + '</SetVar>' +
                            '</Method>' +
                           '</ows:Batch>';
            var capsData = { 'RequestType': 'ProcessBatchData', 'ListTitle': 'Documents', 'Batch': batchXML, 'OutputType': 'JSON', 'Methodology': methodology, 'Stage': stage, 'StageSortOrder': stageSortOrder };
            updateDocumentMetaData(capsData, function (result, msg) {
                if (result == true) {
                    callback(true, 'File has been saved to the library');
                }
                else {
                	callback(false, msg);
                }
            });
        },
        error: function (jqXHR, status, error) {
            callback(false, msg);
        }
    });
}

// name: updateDocumentMetaData
// by: papproth, brian
// date: 2015.04.24
// purpose: updates the template file meta-data 
function updateDocumentMetaData(capsData, callback) {
    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: capsData,
        dataType: 'json',
        async: false,
        cache: false,
        type: 'POST',
        success: function (json) {
            if (json.NewDataSet.ProcessBatchData.Results.Result.Code == '0') {
                callback(true, '');
            }
            else {
                callback(false, json.NewDataSet.ProcessBatchData.Results.Result.ErrorText);
            }
        },
        error: function (jqXHR, status, error) {
            callback(false, error);
        }

    });

}

// name: checkForDuplicateDoc
// by: papproth, brian
// date: 2015.04.24
// purpose: 
function getFileIndex(filename, callback){
    // make caps call to get the ows_serverUrl valve
    var baseFilename = filename.substr(0, filename.lastIndexOf('.'));
    $.ajax({
        url: '../_layouts/CorasWorksApps/CorasWorksApplicationService.ashx',
        data: { 'RequestType': 'GetListItems', 
        		'ListTitle': 'Documents',
        		'XsltLocation': '[SRA Root]/Resources/Map/getDocQtyXSLT.xslt', 
        		'CAML': '<Query><Where><Contains><FieldRef Name="BaseName"/><Value Type="Text">' + baseFilename  + '</Value></Contains></Where></Query>', 
        		'OutputType': 'JSON' },
        dataType: 'json',
        async: false,
        cache: false,
        type: 'POST',
        success: function (json) {
			var docCount = json.DocQty.value;
			callback(true, ++docCount, null);
        },
        error: function (jqXHR, status, error) {
            callback(false,null, msg);
        }
    });


}