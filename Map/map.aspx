<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=9" />
    <meta name="description" content="NEI Database" />
    <title>Corning Process Map</title>

    <link rel="stylesheet" href="/spsites/sra/Resources/Map/map.css" rel="stylesheet" type="text/css" />
	<script src="/spsites/sra/Resources/Map/map.js" type="text/javascript"></script>

    
</head>
<body>
    <body>
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
                        <img src="/spsites/sra/Resources/Map/Images/Search.png" alt="Search" />
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
        <div id="doc-purpose" class="tool-helper">
        </div>         
        <div class="cw-dialog-wrapper">
            <div>
                <img src="/spsites/sra/Resources/Map/Images/document-download.png" alt="Open Template" /></div>
            <div>
                <a id="doc-template" href="">Download Tool Template</a></div>

        </div>
        <div id="tool-helper" class="tool-helper">
        </div>        
        <div class="cw-dialog-wrapper">
            <div>
                <img src="/spsites/sra/Resources/Map/Images/document-help.png" alt="Open Document" /></div>
            <div>
                <a id="help-doc" href="">Help Document</a>
            </div>
        </div>
        <div class="cw-dialog-wrapper" title="Click to check/uncheck">
            <div id="tool-dialog-checkbox" class="cw-not-checked"></div>
            <div id="tool-dialog-checkbox-text" style="padding-left: 10px">Complete Tool</div>
        </div>
    </div>
    <!--    select tool dialog end-->
<!-- Loader -->
<div id="busyLoader" style="text-align: center;">
    <h2 style="text-align:center">
        <span id="busySpinner"></span>
        <img src="/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px">
        <br>
        Loading Map...
    </h2>
    Don't refresh the page, just wait patiently please
</div>

<!-- Loader end -->  
    <div id="main-wrapper">
    	<div id="map-wrapper">
	        <div id="title-wrapper">
	            <div class="cw-sra-title">Map: <span id="cw-sra-MapMethodology" class="cw-sra-map-methodology"></span></div>
	            <div class="cw-sra-map-menu">
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
</body>
</body>
</html>