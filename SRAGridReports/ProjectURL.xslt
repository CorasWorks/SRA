<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs">
	<xsl:template match="/NewDataSet/*/*/*/*">
		<NewDataSet>
			<Data>
				<SiteUrl><xsl:value-of select="@ows_URL"/></SiteUrl>				
			</Data>
		</NewDataSet>		
	</xsl:template>
</xsl:stylesheet>
