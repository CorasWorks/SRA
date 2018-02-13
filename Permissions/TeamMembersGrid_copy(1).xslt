<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="cw rs z">
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
			<Buttons>&lt;div align=&quot;center&quot;&gt;<xsl:value-of select="$Permissions"/>&lt;/div&gt;</Buttons>					
			<SharePointUser><xsl:value-of select="substring-after(@ows_SharePointUser,';#')"/></SharePointUser>
			<Role><xsl:value-of select="@ows_Role"/></Role>
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
			<Buttons>&lt;div align=&quot;center&quot;&gt;<xsl:value-of select="$Permissions"/>&lt;/div&gt;</Buttons>					
			<SharePointUser><xsl:value-of select="substring-after(@ows_SharePointUser,';#')"/></SharePointUser>
			<Role><xsl:value-of select="@ows_Role"/></Role>
		</Item>
	</xsl:for-each>	
		
	</NewDataSet>
	</xsl:template>
</xsl:stylesheet>