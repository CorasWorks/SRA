<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="cw rs z">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="/">
	<NewDataSet>
		<xsl:attribute name="Count"><xsl:value-of select="count(//TeamMembers/cw:listitems/rs:data/z:row)"/></xsl:attribute>
		<xsl:attribute name="SiteTitle"><xsl:value-of select="//TeamMembers/@SiteTitle"/></xsl:attribute>
		<xsl:attribute name="SiteUrl"><xsl:value-of select="//TeamMembers/@SiteUrl"/></xsl:attribute>
		<xsl:for-each-group select="//TeamMembers/cw:listitems/rs:data/z:row" group-by="@ows_SharePointUser">
			<User><xsl:value-of select="@ows_SharePointUser"/></User>
		</xsl:for-each-group>		
	</NewDataSet>
	</xsl:template>
</xsl:stylesheet>