<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="cw rs z">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="/">
	<NewDataSet>
	<xsl:for-each select="//Projects/cw:listitems/rs:data/z:row" >		
		<Item>
			<xsl:variable name="EditAction">						
			   <xsl:text>%ISiteURL%/_layouts/CorasWorks.Central.Administration/ActionForm.aspx?actionUrl=[SRA Root]/Actions%20Library/EditSRAProject.cwad&amp;listItem=</xsl:text>
		       <xsl:value-of select="//Projects/@SiteUrl"/>
		       <xsl:text>/</xsl:text>
		       <xsl:value-of select="//Projects/@ListGuid"/>
		       <xsl:text>/</xsl:text>
		       <xsl:value-of select="substring-after(@ows_UniqueId,';#')"/>
			</xsl:variable>
		
			<xsl:variable name="Permissions">
				<xsl:choose>
					<xsl:when test="@ows_SiteStatus = 'Build Complete' and @ows_SecurityApplied != 'Yes'">
						<xsl:text>&lt;span class=&quot;ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only&quot; style=&quot;padding-left:10px;&quot; onclick=&quot;SetPermissionsInital('</xsl:text>
						<xsl:value-of select="@ows_URL"/><xsl:text>','</xsl:text><xsl:value-of select="@ows_ID"/><xsl:text>','</xsl:text><xsl:value-of select="substring-before(@ows_TeamLeader,';#')"/>
						<xsl:text>')&quot;&gt;&lt;span class=&quot;ui-button-text&quot;&gt;Apply Permissions&lt;/span&gt;&lt;/span&gt;</xsl:text>	
						<xsl:text>&lt;span class=&quot;ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only&quot; style=&quot;padding-left:10px;&quot; onclick=&quot;LaunchProjectEditAction('</xsl:text>
						<xsl:value-of select="$EditAction"/><xsl:text>','Edit SRA Project','</xsl:text><xsl:value-of select="@ows_ID"/><xsl:text>','</xsl:text><xsl:value-of select="@ows_URL"/>
						<xsl:text>', true)&quot;&gt;&lt;span class=&quot;ui-button-text&quot;&gt;Edit Project&lt;/span&gt;&lt;/span&gt;</xsl:text>
					</xsl:when>
					<xsl:when test="@ows_SiteStatus = 'Build Complete' and @ows_SecurityApplied = 'Yes'">
						<xsl:text>&lt;span class=&quot;ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only&quot; style=&quot;padding-left:10px;&quot; onclick=&quot;ResetRoleInheritance('</xsl:text>
						<xsl:value-of select="@ows_URL"/><xsl:text>','</xsl:text><xsl:value-of select="@ows_ID"/>
						<xsl:text>')&quot;&gt;&lt;span class=&quot;ui-button-text&quot;&gt;Re-Apply Permissions&lt;/span&gt;&lt;/span&gt;</xsl:text>	
						<xsl:text>&lt;span class=&quot;ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only&quot; style=&quot;padding-left:10px;&quot; onclick=&quot;LaunchProjectEditAction('</xsl:text>
						<xsl:value-of select="$EditAction"/><xsl:text>','Edit SRA Project','</xsl:text><xsl:value-of select="@ows_ID"/><xsl:text>','</xsl:text><xsl:value-of select="@ows_URL"/>
						<xsl:text>', false)&quot;&gt;&lt;span class=&quot;ui-button-text&quot;&gt;Edit Project&lt;/span&gt;&lt;/span&gt;</xsl:text>	
					</xsl:when>					
					<xsl:otherwise>
						<xsl:text>&lt;span class=&quot;ui-button ui-widget ui-state-disabled ui-corner-all ui-button-text-only&quot; style=&quot;padding-left:10px;&quot; onclick=""&gt;&lt;span class=&quot;ui-button-text&quot;&gt;Apply Permissions&lt;/span&gt;&lt;/span&gt;</xsl:text>	
					</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>
			<xsl:variable name="divs" select="@ows_Division" />
			<Buttons>&lt;div align=&quot;center&quot;&gt;<xsl:value-of select="$Permissions"/>&lt;/div&gt;</Buttons>					
			<ProjectTitle>&lt;a href="<xsl:value-of select="@ows_URL"/>"&gt;<xsl:value-of select="@ows_Title"/>&lt;/a&gt;</ProjectTitle>
			<TeamLeader><xsl:value-of select="substring-after(@ows_TeamLeader,';#')"/></TeamLeader>
			<UnitChampion><xsl:value-of select="substring-after(//Divisions/cw:listitems/rs:data/z:row[@ows_Title = $divs]/@ows_UnitChampion,';#')"/></UnitChampion>
			<Facilitator><xsl:value-of select="substring-after(//Divisions/cw:listitems/rs:data/z:row[@ows_Title = $divs]/@ows_Facilitator,';#')"/></Facilitator>
			<Division><xsl:value-of select="@ows_Division"/></Division>
			<Region><xsl:value-of select="@ows_Region"/></Region>
			<Location><xsl:value-of select="@ows_Location"/></Location>
			<SiteStatus><xsl:value-of select="@ows_SiteStatus"/></SiteStatus>
			<!--
			<LastModified><xsl:value-of select="format-dateTime(@ows_Modified, '[D] [MNn], [Y0001]')"/></LastModified>
			<ProblemBeingAddressed><xsl:value-of select="@ows_Question1"/></ProblemBeingAddressed>
			-->
		</Item>
	</xsl:for-each>	
	</NewDataSet>
	</xsl:template>
</xsl:stylesheet>