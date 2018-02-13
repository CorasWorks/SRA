<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:template match="/NewDataSet">
		<NewDataSet>
			<xsl:for-each select="*/*/*/*">
				<Colors>
					<Color><xsl:value-of select="substring-after(@ows_Swatch,'#')"/></Color>
					<Code><xsl:value-of select="@ows_Code"/></Code>
					<Name><xsl:value-of select="@ows_Title"/></Name>
				</Colors>
			</xsl:for-each>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>
