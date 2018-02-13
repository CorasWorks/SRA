<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:variable name="MaxChars"><xsl:value-of select="format-number(NewDataSet/Config/*/*/*/@ows_MultiLineFieldLength,'###')"/></xsl:variable>
	<xsl:template match="/">
	<script src="[SRA Root]/Resources/EditSites/ProjectEdit-Info.js"></script>
	<div>
					<div id="ProjectReload" style="display:none">
						<div id="busyLoader" style="text-align: center;">
							<h2 style="text-align:center">
							<span id="busySpinner"></span>
							<img src="[SRA Root]/_layouts/AppDesigner/Apps/ApplicationDesigner/Images/ProcessDesigner.gif" style="vertical-align:middle;padding:5px"/>
							<br/>Saving Changes...</h2>
						</div>
					</div>
                	<div id="ProjectBody">                	
                	<xsl:for-each select="//Site/cw:listitems/rs:data/z:row">
			        <div id="ProjectButtons">
			            <button id="ProjectSave" data-id="{@ows_ID}" disabled="disabled">Save</button>
			        </div>
			        <br/>
					<label for="Title">Title<sup class="CWRequired">*</sup></label>
					<input type="text" class="Title" name="Title" value="{@ows_Title}" style="width:50%"/><br/>
	                <label for="Active">Active</label>
	                <input type="checkbox" class="Active" dataid="New">
	                	<xsl:if test="@ows_Active= '1'"><xsl:attribute name="checked"/></xsl:if>
	                </input>
					<br/>
				</xsl:for-each>			                	
                </div>
    </div> 
		<div id="ProjectError" title="Missing Title">Error Missing Title</div>
		<div id="ProjectErrorIllegal" title="Site Title Illegal Character">Site Name contains an illegal character. Please remove any of the following characters. &amp; ' "</div>                 	
	</xsl:template>
</xsl:stylesheet>