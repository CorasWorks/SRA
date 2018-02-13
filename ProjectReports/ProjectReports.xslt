<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<xsl:choose>
		<xsl:when test="count(//Reports/cw:listitems/rs:data/z:row) &gt; 0"> 
			<xsl:for-each select="//Reports/cw:listitems/rs:data/z:row">
			<!-- Determine the type of Call used to load the report and build the url to be passed to SP.UI.ModalDialog -->
			<xsl:variable name="Report">
				<xsl:choose>
					<xsl:when test="lower-case(@ows_CallType) = 'caps'">
					   <xsl:text>%SiteURL%/_layouts/CorasWorksApps/CorasWorksApplicationService.ashx?RequestType=GetFileContents&amp;OutputType=html&amp;FileUrl=[SRA Root]/</xsl:text>
				       <xsl:value-of select="@ows_HTMPage"/>					
					</xsl:when>
					<xsl:otherwise>
					   <xsl:text>[SRA Root]/</xsl:text>
				       <xsl:value-of select="@ows_HTMPage"/>
				       <xsl:text>&amp;IsDlg=1</xsl:text>							
					</xsl:otherwise>
				</xsl:choose>						
			</xsl:variable>					
			<div id="PCDisplayRoot" class="SectionBaseRoot">
				<div class="SectionBase" data-url="{$Report}">
						<h2>
						<xsl:value-of select="@ows_Title"/>
						</h2>
						<p>
						<label for="Description">Description</label>
						<br/>
						<xsl:value-of select="@ows_Description" disable-output-escaping="yes"/>
						</p>
				</div>
				<br/>
			</div>
		  	</xsl:for-each>
		</xsl:when>
		<xsl:otherwise>
			<div id="PCDisplayRoot">
				<div id="NoItems">
				<h2>No Reports Available</h2>
				</div>
			
			</div>
		</xsl:otherwise>
	</xsl:choose>
	</xsl:template>
</xsl:stylesheet>