<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="/">
	<NewDataSet>
	<xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row[@ows_Role = 'Team Leader']" >		
		<Item>
			<xsl:variable name="DeleteAction">						
			   <xsl:text>%ISiteURL%/_layouts/CorasWorks.Central.Administration/ActionForm.aspx?actionUrl=[SRA Root]/Actions%20Library/Delete.cwad&amp;listItem=</xsl:text>
		       <xsl:value-of select="//TeamMembers/@SiteUrl"/>
		       <xsl:text>/</xsl:text>
		       <xsl:value-of select="//TeamMembers/@ListGuid"/>
		       <xsl:text>/</xsl:text>
		       <xsl:value-of select="substring-after(@ows_UniqueId,';#')"/>
			</xsl:variable>
			<xsl:variable name="EditAction">						
			   <xsl:text>%ISiteURL%/_layouts/CorasWorks.Central.Administration/ActionForm.aspx?actionUrl=%ISiteURL%/Actions%20Library/EditProjectRole.cwad&amp;listItem=</xsl:text>
		       <xsl:value-of select="//TeamMembers/@SiteUrl"/>
		       <xsl:text>/</xsl:text>
		       <xsl:value-of select="//TeamMembers/@ListGuid"/>
		       <xsl:text>/</xsl:text>
		       <xsl:value-of select="substring-after(@ows_UniqueId,';#')"/>
			</xsl:variable>			
			<xsl:variable name="Permissions">
						<xsl:text>&lt;span class=&quot;ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only&quot; style=&quot;padding-left:10px;&quot; onclick=&quot;LaunchTeamMemberAction('</xsl:text>
						<xsl:value-of select="$EditAction"/><xsl:text>','Edit Project Role','%SiteURL%')&quot;&gt;&lt;span class=&quot;ui-button-text&quot;&gt;Edit Project Role&lt;/span&gt;&lt;/span&gt;</xsl:text>					
						<xsl:text>&lt;span class=&quot;ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only&quot; style=&quot;padding-left:10px;&quot; onclick=&quot;LaunchTeamMemberAction('</xsl:text>
						<xsl:value-of select="$DeleteAction"/><xsl:text>','Delete','%SiteURL%')&quot;&gt;&lt;span class=&quot;ui-button-text&quot;&gt;Remove Team Member&lt;/span&gt;&lt;/span&gt;</xsl:text>					
			</xsl:variable>
			<xsl:variable name="tlEditRole">
				<xsl:text>&lt;img title=&quot;Edit Team Leader's Role&quot; src=&quot;../_layouts/images/editheader.png&quot; class=&quot;ui-button ui-widget ui-state-default ui-corner-all&quot; onclick=&quot;LaunchTeamMemberAction('</xsl:text>
				<xsl:value-of select="$EditAction"/><xsl:text>','Edit Project Role','%SiteURL%')&quot;/&gt;</xsl:text>					</xsl:variable>
			<xsl:variable name="tlRemove">					
				<xsl:text>&lt;img title=&quot;Remove Team Leader&quot; src=&quot;../_layouts/images/removecolleague.png&quot; class=&quot;ui-button ui-widget ui-state-default ui-corner-all&quot; onclick=&quot;LaunchTeamMemberAction('</xsl:text>
				<xsl:value-of select="$DeleteAction"/><xsl:text>','Delete','%SiteURL%')&quot;/&gt;</xsl:text>
			</xsl:variable>
			
			<!--<Buttons>&lt;div align=&quot;center&quot;&gt;<xsl:value-of select="$Permissions"/>&lt;/div&gt;</Buttons>-->
			<SharePointUser>
				<xsl:value-of select="$tlRemove"/>
				<xsl:value-of select="substring-after(@ows_SharePointUser,';#')"/>
			</SharePointUser>
			<Role>
				<xsl:value-of select="$tlEditRole"/>
				<xsl:value-of select="@ows_Role"/>
			</Role>
			<Editor>
				<xsl:text>&lt;img style=&quot;padding:3px; margin-right:3px;&quot; src=&quot;../_layouts/images/cbchecked.gif&quot; title=&quot;Site Editor&quot; class=&quot;ui-button-disabled ui-state-disabled ui-button ui-widget ui-state-default ui-corner-all&quot;/&gt;</xsl:text>				
			</Editor>
			<Modified><xsl:value-of select="format-date(xs:date(substring-before(@ows_Modified,' ')), '[M]-[D]-[Y]')"/></Modified>
			<ModifiedBy><xsl:value-of select="substring-after(@ows_Editor,';#')"/></ModifiedBy>
			
		</Item>
	</xsl:for-each>
	<xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row[@ows_Role != 'Team Leader']" >
		<xsl:sort select="@ows_Role" />		
		<Item>
			<xsl:variable name="DeleteAction">						
			   <xsl:text>%ISiteURL%/_layouts/CorasWorks.Central.Administration/ActionForm.aspx?actionUrl=[SRA Root]/Actions%20Library/Delete.cwad&amp;listItem=</xsl:text>
		       <xsl:value-of select="//TeamMembers/@SiteUrl"/>
		       <xsl:text>/</xsl:text>
		       <xsl:value-of select="//TeamMembers/@ListGuid"/>
		       <xsl:text>/</xsl:text>
		       <xsl:value-of select="substring-after(@ows_UniqueId,';#')"/>
			</xsl:variable>
			<xsl:variable name="EditAction">						
			   <xsl:text>%ISiteURL%/_layouts/CorasWorks.Central.Administration/ActionForm.aspx?actionUrl=%ISiteURL%/Actions%20Library/EditProjectRole.cwad&amp;listItem=</xsl:text>
		       <xsl:value-of select="//TeamMembers/@SiteUrl"/>
		       <xsl:text>/</xsl:text>
		       <xsl:value-of select="//TeamMembers/@ListGuid"/>
		       <xsl:text>/</xsl:text>
		       <xsl:value-of select="substring-after(@ows_UniqueId,';#')"/>
			</xsl:variable>			
			<xsl:variable name="Permissions">
						<xsl:text>&lt;span class=&quot;ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only&quot; style=&quot;padding-left:10px;&quot; onclick=&quot;LaunchTeamMemberAction('</xsl:text>
						<xsl:value-of select="$EditAction"/><xsl:text>','Edit Project Role','%SiteURL%')&quot;&gt;&lt;span class=&quot;ui-button-text&quot;&gt;Edit Project Role&lt;/span&gt;&lt;/span&gt;</xsl:text>					
						<xsl:text>&lt;span class=&quot;ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only&quot; style=&quot;padding-left:10px;&quot; onclick=&quot;LaunchTeamMemberAction('</xsl:text>
						<xsl:value-of select="$DeleteAction"/><xsl:text>','Delete','%SiteURL%')&quot;&gt;&lt;span class=&quot;ui-button-text&quot;&gt;Remove Team Member&lt;/span&gt;&lt;/span&gt;</xsl:text>					
			</xsl:variable>
			<xsl:variable name="tmEditRole">
				<xsl:text>&lt;img title=&quot;Edit Project Role&quot; src=&quot;../_layouts/images/editheader.png&quot; class=&quot;ui-button ui-widget ui-state-default ui-corner-all&quot; onclick=&quot;LaunchTeamMemberAction('</xsl:text>
				<xsl:value-of select="$EditAction"/><xsl:text>','Edit Project Role','%SiteURL%')&quot;/&gt;</xsl:text>					</xsl:variable>
			<xsl:variable name="tmRemove">					
				<xsl:text>&lt;img title=&quot;Remove Team Member&quot;src=&quot;../_layouts/images/removecolleague.png&quot; class=&quot;ui-button ui-widget ui-state-default ui-corner-all&quot; onclick=&quot;LaunchTeamMemberAction('</xsl:text>
				<xsl:value-of select="$DeleteAction"/><xsl:text>','Delete','%SiteURL%')&quot;/&gt;</xsl:text>
			</xsl:variable>
			<xsl:variable name="Editor">
				<xsl:choose>
					<xsl:when test="@ows_Editor0 = 0">
						<xsl:text>&lt;img style=&quot;padding:3px; margin-right:3px;&quot; src=&quot;../_layouts/images/cbunchecked.gif&quot; title=&quot;Set as Editor&quot; class=&quot;ui-button ui-widget ui-state-default ui-corner-all&quot; onclick=&quot;SetEditor('</xsl:text><xsl:value-of select="@ows_ID"/><xsl:text>','%SiteURL%','True')&quot;/&gt;</xsl:text>	
					</xsl:when>
					<xsl:otherwise>
						<xsl:text>&lt;img style=&quot;padding:3px; margin-right:3px;&quot; src=&quot;../_layouts/images/cbchecked.gif&quot; title=&quot;Remove as Editor&quot; class=&quot;ui-button ui-widget ui-state-default ui-corner-all&quot; onclick=&quot;SetEditor('</xsl:text><xsl:value-of select="@ows_ID"/><xsl:text>','%SiteURL%','False')&quot;/&gt;</xsl:text>				
					</xsl:otherwise>
				</xsl:choose>	        
			</xsl:variable>				
			<!--<Buttons>&lt;div align=&quot;center&quot;&gt;<xsl:value-of select="$Permissions"/>&lt;/div&gt;</Buttons>-->
			<SharePointUser>
				<xsl:value-of select="$tmRemove"/>
				<xsl:value-of select="substring-after(@ows_SharePointUser,';#')"/>
			</SharePointUser>
			<Role>
				<xsl:value-of select="$tmEditRole"/>
				<xsl:value-of select="@ows_Role"/>
			</Role>
			<Editor>
				<xsl:value-of select="$Editor"/>
			</Editor>			
			<Modified><xsl:value-of select="format-date(xs:date(substring-before(@ows_Modified,' ')), '[M]-[D]-[Y]')"/></Modified>
			<ModifiedBy><xsl:value-of select="substring-after(@ows_Editor,';#')"/></ModifiedBy>
		</Item>
	</xsl:for-each>	
		
	</NewDataSet>
	</xsl:template>
</xsl:stylesheet>