<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="cw rs z">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="/">
	<NewDataSet>
	<xsl:for-each select="//Projects/cw:listitems/rs:data/z:row" >		
		<Item>	
			<xsl:variable name="Permissions">
			
						<xsl:text>&lt;span class=&quot;ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only&quot; style=&quot;padding-left:10px;&quot; onclick="LaunchAdminProjectEdit('[SRA Root]/Resources/ProjectEdit/ProjectEdit.aspx?ProjectSite=</xsl:text>
						<xsl:value-of select="@ows_URL"/>
						<xsl:text>&amp;LoadedTab=0');"&gt;&lt;span class=&quot;ui-button-text&quot;&gt;Edit Project&lt;/span&gt;&lt;/span&gt;</xsl:text>
						
			</xsl:variable>
			<Buttons>&lt;div align=&quot;center&quot;&gt;<xsl:value-of select="$Permissions"/>&lt;/div&gt;</Buttons>				
			<ProjectTitle>&lt;a href="<xsl:value-of select="@ows_URL"/>"&gt;<xsl:value-of select="@ows_Title"/>&lt;/a&gt;</ProjectTitle>
			<TeamLeader>
				<xsl:for-each select="tokenize(@ows_TeamLeader,';#')">
					<xsl:if test="position() mod 2 = 0 ">
						<xsl:value-of select="."/>
						<xsl:if test="position() != last()">
							<xsl:text>, </xsl:text>
						</xsl:if>
					</xsl:if>
				</xsl:for-each>
			</TeamLeader>
			<Division><xsl:value-of select="@ows_Division"/></Division>
			<Region><xsl:value-of select="@ows_Region"/></Region>
			<Location><xsl:value-of select="@ows_Location"/></Location>
			<!--
			<SiteStatus><xsl:value-of select="@ows_SiteStatus"/></SiteStatus>
						
							<Created><xsl:value-of select="format-date(xs:date(substring-before(@ows_Created,' ')), '[M01]-[D01]-[Y0001]')"/></Created>
				-->

		</Item>
	</xsl:for-each>	
	</NewDataSet>
	</xsl:template>
</xsl:stylesheet>