<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="cw rs z">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="/">
	<NewDataSet>
		<SiteR>
			<xsl:attribute name="ProUserID"><xsl:value-of select="//Project/cw:listitems/rs:data/z:row[1]/@ows_ID"/></xsl:attribute>
		</SiteR>
		<Users>
			<xsl:attribute name="ProTeamMembers">		
			<xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row[@ows_Role != 'SiteLevelApprover']" >
					<xsl:value-of select="substring-before(@ows_SharePointUser,';#')"/><xsl:text>;#;#</xsl:text> 
			</xsl:for-each>
			</xsl:attribute>
			<xsl:attribute name="ProApprovers">		
			<xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row[@ows_Role = 'SiteLevelApprover']" >
					<xsl:value-of select="substring-before(@ows_SharePointUser,';#')"/><xsl:text>;#;#</xsl:text> 
			</xsl:for-each>
			</xsl:attribute>			
			<xsl:attribute name="ProTeamLeaders">		
			<xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row[@ows_Role = 'Team Leader']" >
					<xsl:value-of select="substring-before(@ows_SharePointUser,';#')"/><xsl:text>;#;#</xsl:text> 
			</xsl:for-each>
			</xsl:attribute>
			<xsl:attribute name="TeamMemberRoles">		
			<xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row[@ows_Role != 'SiteLevelApprover']" >
					<xsl:text>;#</xsl:text><xsl:value-of select="substring-after(@ows_SharePointUser,';#')"/><xsl:text>##</xsl:text><xsl:value-of select="@ows_Role"/> 
			</xsl:for-each>
			</xsl:attribute>
			<xsl:attribute name="TeamMemberDivisions">		
				<xsl:for-each-group select="//TeamMembers/cw:listitems/rs:data/z:row[@ows_Role != 'SiteLevelApprover']" group-by="@ows_SharePointUser">
					<xsl:text>;#</xsl:text><xsl:value-of select="substring-after(current-grouping-key(),';#')"/><xsl:text>##</xsl:text><xsl:value-of select="@ows_Title"/> 
				</xsl:for-each-group>
			</xsl:attribute>									
		</Users>
	</NewDataSet>
	</xsl:template>
</xsl:stylesheet>