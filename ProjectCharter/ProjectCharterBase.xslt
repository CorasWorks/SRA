<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<link rel="stylesheet" type="text/css" href="[SRA Root]/Resources/ProjectCharter/ProjectCharter.css" />
	<link rel="stylesheet" type="text/css" href="[SRA Root]/Resources/TableSorter/theme.default.css" />
	<script src="[SRA Root]/Resources/ProjectCharter/ProjectCharter.js" type="text/javascript"></script>
	<script src="[SRA Root]/Resources/TableSorter/jquery.tablesorter.js" type="text/javascript"></script>
	<!-- Loader -->
	<div id="busyLoader" style="text-align: center;">
	    <h2 style="text-align:center">
	        <span id="busySpinner"></span>
	        <img src="/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
	        <br/>
	        Loading Project Information...
	    </h2>
	</div>
	<!-- Loader end -->  
	<div id="ProjectCharterMain" style="text-align: center;">
	
	</div>	
	</xsl:template>
</xsl:stylesheet>