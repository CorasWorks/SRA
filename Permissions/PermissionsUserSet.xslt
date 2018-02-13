<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="cw rs z">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="/">
	<NewDataSet>
		<xsl:for-each select="//UsersSets/cw:listitems/rs:data/z:row" >
			<Group>
				<xsl:attribute name="PremRole">1073741829</xsl:attribute>
				<UserSCID><xsl:value-of select="substring-before(@ows_UnitChampion,';#')"/></UserSCID>
			</Group>
			<Group>
				<xsl:attribute name="PremRole">1073741829</xsl:attribute>
				<UserSCID><xsl:value-of select="substring-before(@ows_Facilitator,';#')"/></UserSCID>
			</Group>			
		</xsl:for-each>	
	</NewDataSet>
	</xsl:template>
</xsl:stylesheet>