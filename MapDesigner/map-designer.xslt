<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html" indent="yes" version="4.0"/>
	<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
	<!--Preprocess the map, stages, tools and relationships in a variable to improve performance and ready the data for the true transformation -->

	<xsl:template match="/">
		<link rel="stylesheet" href="[SRA Root]/resources/js/chosen_v1.2.0/docsupport/style.css"/>
		<link rel="stylesheet" href="[SRA Root]/resources/js/chosen_v1.2.0/docsupport/prism.css"/>
		<link rel="stylesheet" href="[SRA Root]/resources/js/chosen_v1.2.0/chosen.css"/>
		<link rel="stylesheet" href="[SRA Root]/Resources/MapDesigner/map-designer.css"/>
    
    <div id="sraMapDesignerMenu" class="sra-map-designer-menu">
        <div id="sraMapSelection">
            <select id="sraSelectMaps" name="Maps">
            </select>
        </div>
    </div>
    		<div id="sraMaps" class="mapContainer">
    		</div>

		<script src="[SRA Root]/resources/js/chosen_v1.2.0/chosen.jquery.min.js"></script>
		<script src="[SRA Root]/resources/js/chosen_v1.2.0/docsupport/prism.js"></script>
		<script src="[SRA Root]/Resources/MapDesigner/map-designer.js" type="text/javascript"></script>
	</xsl:template>
	
</xsl:stylesheet>