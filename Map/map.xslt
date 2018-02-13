<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html" indent="yes" version="4.0"/>
	<xsl:template match="/">
<link rel="stylesheet" href="[SRA Root]/_layouts/AppDesigner/Content-Cache/Apps/ApplicationDesigner/css/1.8.10/themes/smoothness/jquery-ui.css"/>
<link rel="stylesheet" href="[SRA Root]/_layouts/AppDesigner/Content-Cache/Apps/ApplicationDesigner/4.0.11/css/SolutionTemplate2013.css"/>
<link rel="stylesheet" href="[SRA Root]/_layouts/AppDesigner/Content-Cache/Apps/ApplicationDesigner/4.0.11/css/SolutionTemplate.css"/>
<link rel="stylesheet" href="[SRA Root]/_layouts/AppDesigner/Content-Cache/Apps/ApplicationDesigner/4.0.11/css/JQueryUI_Sprite.css	"/>
	
			<link rel="stylesheet" href="[SRA Root]/resources/js/chosen_v1.2.0/docsupport/style.css"/>
			<link rel="stylesheet" href="[SRA Root]/resources/js/chosen_v1.2.0/docsupport/prism.css"/>
			<link rel="stylesheet" href="[SRA Root]/resources/js/chosen_v1.2.0/chosen.css"/>
		    <link rel="stylesheet" href="[SRA Root]/Resources/Map/map.css"/>
		

		<div class="cw-sra-map-body">
		
		<script>		
			var sraRoot ='[SRA Root]';		
		</script>
		
    <!--save dialog-->
    <!--<div id="save-dialog" class="hide" title="Confirm">
        Do you want to save the changes to the process map?
    </div>-->
    <!--manage stage dialog start-->
    <div id="manage-stage" class="cw-dialog hide" title="">
        <div style="display: inline-block">
            Filter Tools by Stage:</div>
        <div id="stage-selector">
            <div id="stage-btns-wrapper">
            </div>
        </div>
        <br />
        <div class="tool-panel" style="position: relative; left: 10px; top: 10px;">
            <label>
                Available Tools</label>
            <div class="cw-stage-tools-wrapper">
                <div class="cw-stage-tools" id="all-tools">
                    <div id="tool-search-wrapper">
                        <img src="[SRA Root]/Resources/Map/Images/Search.png" alt="Search" />
                        <input id="tool-search" type="search" placeholder="Start typing to find a tool..."
                            value="" />
                    </div>
                </div>
            </div>
        </div>
        <div class="tool-panel" style="position: relative; left: 25px; top: 10px;">
            <label>
                Selected Tools</label>
            <div class="cw-stage-tools-wrapper">
                <div class="cw-stage-tools" id="selected-tools">
                </div>
            </div>
        </div>
    </div>
    <!--manage stage dialog end-->
    <!--    select tool dialog start-->
    <div id="select-tool-dialog" class="cw-dialog hide">
        <div id="doc-purpose-wrapper" class="tool-helper">
        	<span id="doc-purpose-title">Purpose:</span>
        	<span id="doc-purpose"></span>
        </div>         
        <div class="cw-dialog-wrapper">
            <div>
                <img src="[SRA Root]/Resources/Map/Images/document-download.png" alt="Open Template" /></div>
            <div>
                <a target="_blank" id="doc-template" href="">Download Tool Template</a></div>
                
        </div>
        
        <div id="save-tool-wrapper">
        	<div style="margin-left:5px">What do you want to do?</div>
        		<div id="save-tool-btn-wrapper">
        			<button id="saveTemplateYes" class="cw-save-template-btn yes">Save to my project library</button>
        			<button id="saveTemplateNo" class="cw-save-template-btn no">Download a copy to my pc</button>
        		</div>
        </div>
        <div class="cw-dialog-wrapper">
	       <!-- <div id="tool-helper" class="tool-helper">
	        </div>-->
        
            <div>
                <img src="[SRA Root]/Resources/Map/Images/document-help.png" alt="Open Document" /></div>
            <div>
                <a target="_blank" id="help-doc" href="">Open Help Document</a>
            </div>
        </div>
        
        <div class="cw-dialog-wrapper doc-status-wrapper" title="Click to check/uncheck">
            <div id="tool-dialog-checkbox" class="cw-not-checked"></div>
            <div id="tool-dialog-checkbox-text" style="padding-left: 10px">Tool Completed</div>
        </div>
    </div>
    <!--    select tool dialog end-->
<!-- Loader -->
<div id="busyLoader" style="text-align: center;">
    <h2 style="text-align:center">
        <span id="busySpinner"></span>
        <img src="/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
        <div>Loading Map...</div>
    </h2>
    Don't refresh the page, just wait patiently please
</div>

<!-- Loader end -->  
    <div id="main-wrapper">
    	<div id="map-wrapper">
	        <div id="title-wrapper">
	            <div class="cw-sra-title">Map: <span id="cw-sra-MapMethodology" class="cw-sra-map-methodology"></span></div>
	            <div class="cw-sra-map-menu">
	            	<div class="mapMenuAlert">Selecting a methodology will reset your map and milestones, click the map title above to close.</div>
	            	<select id="mapMenu">
	            		<option mapID="0" selected="selected" disabled="disabled">Select a Methodology</option>
	            	</select>
	            </div>
	        </div>
	        <div id="process-map-wrapper">
	            <div class="cw-sra-tool-table" id="sra">
	            </div>
	        </div>
		</div>        
    </div>
	<div id="change-map-confirm" title="Change Map Confirmation">
	  <p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>This will reset your map and milestones, any prior map and milestone data will be lost. Are you sure?</p>
	</div>			
		</div>
			<script src="[SRA Root]/resources/js/chosen_v1.2.0/chosen.jquery.min.js"></script>
			<script src="[SRA Root]/resources/js/chosen_v1.2.0/docsupport/prism.js"></script>
			<script src="[SRA Root]/Resources/Map/map.js" type="text/javascript"></script>		    

	</xsl:template>
</xsl:stylesheet>