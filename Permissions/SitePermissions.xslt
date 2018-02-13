<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="cw rs z">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="/">
	<NewDataSet>
		<xsl:attribute name="count"><xsl:value-of select="//TeamMembers/cw:listitems/rs:data/@ItemCount + //BaseSecuritySet/cw:listitems/rs:data/@ItemCount"/></xsl:attribute>
		<xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row" >
			<xsl:variable name="Role" select="@ows_Role" />
			<xsl:variable name="RolePrem" select="//ProjectRoles/cw:listitems/rs:data/z:row[@ows_Title = $Role]/@ows_RoleSecurityLevel" />
			<xsl:variable name="RolePremID" select="//RoleSecurityLevels/cw:listitems/rs:data/z:row[@ows_Title = $RolePrem]/@ows_SPRoleID" />
			<xsl:variable name="EditorOverride" select="//ProjectRoles/cw:listitems/rs:data/z:row[@ows_Title = 'Editor']/@ows_RoleSecurityLevel" />
			<xsl:variable name="EditorOverrideID" select="//RoleSecurityLevels/cw:listitems/rs:data/z:row[@ows_Title = $EditorOverride]/@ows_SPRoleID" />
			<User>
				<xsl:attribute name="PremRole">
					<xsl:choose>
						<xsl:when test="@ows_Editor0 = 1" >
							<xsl:value-of select="$EditorOverrideID"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="$RolePremID"/>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:attribute name="UserSCID"><xsl:value-of select="substring-before(@ows_SharePointUser,';#')"/></xsl:attribute>
				<xsl:attribute name="UserSCName"><xsl:value-of select="substring-after(@ows_SharePointUser,';#')"/></xsl:attribute>
				<xsl:attribute name="UserRoleName"><xsl:value-of select="@ows_Role"/></xsl:attribute>
			</User>
		</xsl:for-each>
		<xsl:for-each select="//BaseSecuritySet/cw:listitems/rs:data/z:row" >
			<xsl:variable name="Role" select="@ows_RoleSecurityLevel" />
			<xsl:variable name="RolePremID" select="//RoleSecurityLevels/cw:listitems/rs:data/z:row[@ows_Title = $Role]/@ows_SPRoleID" />
			<User>
				<xsl:attribute name="PremRole"><xsl:value-of select="$RolePremID"/></xsl:attribute>
				<xsl:attribute name="UserSCID"><xsl:value-of select="substring-before(@ows_SharePointUser,';#')"/></xsl:attribute>
			</User>
		</xsl:for-each>					
	</NewDataSet>
	</xsl:template>
</xsl:stylesheet>