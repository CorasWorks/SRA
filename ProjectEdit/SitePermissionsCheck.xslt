<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="cw rs z">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="/">
	<NewDataSet>
		<xsl:attribute name="count"><xsl:value-of select="count(//TeamMembers/cw:listitems/rs:data/z:row)"/></xsl:attribute>
		<xsl:for-each select="//TeamMembers/cw:listitems/rs:data/z:row" >
			<User>
				<xsl:attribute name="ProUserID"><xsl:value-of select="@ows_ID"/></xsl:attribute>
			</User>
		</xsl:for-each>		
	</NewDataSet>
	</xsl:template>
</xsl:stylesheet>