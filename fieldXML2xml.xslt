<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:template match="/NewDataSet">
		<xsl:for-each select="*/*/*/*/@ows_XML">
			<xsl:value-of select="substring-after(.,'?&gt;')" disable-output-escaping="yes"/>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>
