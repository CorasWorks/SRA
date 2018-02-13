<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">

<link rel="stylesheet" type="text/css" href="[SRA Root]/resources/projectstatus/projectstatusreport.css"/>
<link rel="stylesheet" type="text/css" href="[SRA Root]/Resources/TableSorter/theme.default.css" />
<link  rel="stylesheet" type="text/css" href="[SRA Root]/_layouts/AppDesigner/Content-Cache/libs/jqueryui/1.10.3/css/base/jquery-ui.css"/>
<link rel="stylesheet" type="text/css" href="[SRA Root]/Resources/TableSorter/pager/jquery.tablesorter.pager.css"/>
<script src="[SRA Root]/_layouts/AppDesigner/Content-Cache/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="[SRA Root]/_layouts/AppDesigner/Content-Cache/libs/jqueryui/1.10.3/jquery-ui-1.10.3.custom.min.js"></script>    	
<script type="text/javascript" src="[SRA Root]/resources/projectstatus/projectstatusreport.js"></script>
<script>
	var CurrentSiteRoot = '';
	if(getParameterByName('ProjectSite') !=''){
	CurrentSiteRoot = getParameterByName('ProjectSite');
	}else{alert('No Project Site Passed In')};	
</script>
<!-- Loader -->
<div id="busyLoader" style="text-align: center;">
    <h2 style="text-align:center">
        <span id="busySpinner"></span>
        <img src="/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
        <br/>
        <span>Loading</span> Project Information...
    </h2>
</div>
<!-- Loader end -->
<div class="projectStatusReportDisplayWrapper">
</div>
	</xsl:template>
</xsl:stylesheet>