<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:variable name="MaxChars"><xsl:value-of select="format-number(NewDataSet/Config/*/*/*/@ows_MultiLineFieldLength,'###')"/></xsl:variable>
	<xsl:template match="/">
	<script src="[SRA Root]/Resources/ProjectEdit/ProjectEdit-Info.js"></script>
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
                	<xsl:for-each select="//Projects/cw:listitems/rs:data/z:row">
			        <div id="ProjectButtons">
			            <button id="ProjectSave" data-id="{@ows_ID}" disabled="disabled">Save</button>
			        </div>
			        <br/>
					<label for="Title">Title<sup class="CWRequired">*</sup></label>
					<input type="text" class="Title" name="Title" value="{@ows_Title}" style="width:50%"/><br/>
	                <label for="ProjectSecurity">Security<sup class="CWRequired">*</sup></label>
					<select name="ProjectSecurity" id="ProjectSecurity">
						<xsl:variable name="ProjectSecurity" select="@ows_ProjectSecurity" />
						<xsl:for-each select="//ProjectSecurity/cw:listitems/rs:data/z:row">
							<option value="{@ows_Title}">
								<xsl:if test="@ows_Title=$ProjectSecurity" >
									<xsl:attribute name="selected">true</xsl:attribute>
								</xsl:if>
								<xsl:value-of select="@ows_Title" />	
							</option>
						</xsl:for-each>					
					</select>
					<br/>
	                <label for="Category">Category<sup class="CWRequired">*</sup></label>
					<select name="Category" id="Category">
						<xsl:variable name="CurrentCategory" select="@ows_Category" />
						<option disabled="disabled" value="">
							<xsl:if test="not(@ows_Category) or @ows_Category='Select a Category'" >
								<xsl:attribute name="selected">true</xsl:attribute>
							</xsl:if>
							Select a Category	
						</option>
						<xsl:for-each select="//Category/cw:listitems/rs:data/z:row">
							<option value="{@ows_Title}">
								<xsl:if test="@ows_Title=$CurrentCategory" >
									<xsl:attribute name="selected">true</xsl:attribute>
								</xsl:if>
								<xsl:value-of select="@ows_Title" />	
							</option>
						</xsl:for-each>
					</select>
					<br/>
	                <label for="Division">Division</label>
	                <xsl:value-of select="@ows_Division" />	
	                <!--
					<select name="Division" id="Division" disabled="disabled">
						<option value="{@ows_Division}" selected="selected">
							<xsl:value-of select="@ows_Division" />	
						</option>
					</select>
					-->
					<br/>
	                <label for="Region">Region</label>
	                <xsl:value-of select="@ows_Region" />	
	                <!--
					<select name="Region" id="Region" disabled="disabled">
						<option value="{@ows_Region}" selected="selected">
							<xsl:value-of select="@ows_Region" />	
						</option>
					</select>
					-->
					<br/>
	                <label for="Location">Location</label>
	                <xsl:value-of select="@ows_Location" />	
	                <!--
					<select name="Location" id="Location" disabled="disabled">
						<option value="{@ows_Location}" selected="selected">
							<xsl:value-of select="@ows_Location" />	
						</option>
					</select>
					-->
					<br/>
	                <label for="Region">Modified</label>
	                <span class="NewExternal">
	                <xsl:value-of select="substring-after(@ows_Editor, ';#')" /><xsl:text> - </xsl:text><xsl:value-of select="format-date(xs:date(substring-before(@ows_Modified,' ')), '[M01]-[D01]-[Y0001]')" />	
	                </span>
	                <!--
					<select name="Region" id="Region" disabled="disabled">
						<option value="{@ows_Region}" selected="selected">
							<xsl:value-of select="@ows_Region" />	
						</option>
					</select>
					-->
					<br/>
					<span id="NewExternal">
					<xsl:if test="not(@ows_ExternalLink)">
						<xsl:attribute name="style">display:none;</xsl:attribute>
					</xsl:if>
					<label for="Title">External Link</label>
					<input type="text" class="ExternalLink" name="ExternalLink" value="{@ows_ExternalLink}" style="width:50%"/><br/>
					</span>
				</xsl:for-each>			                	
                </div>
    </div> 
		<div id="ProjectError" title="Missing Project Title">Error Missing Project Title</div>
		<div id="ProjectCategoryError" title="Missing Category">Error Missing Project Category</div>
		<div id="ProjectErrorIllegal" title="Project Title Illegal Character">Project Name contains an illegal character. Please remove any of the following characters. &amp; ' "</div>                 	
	</xsl:template>
</xsl:stylesheet>