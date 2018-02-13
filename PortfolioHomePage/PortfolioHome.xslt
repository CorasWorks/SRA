<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:output method="html"/>
	<xsl:template match="/">
	<div>
		<xsl:for-each select="//PortfolioSiteConfig/cw:listitems/rs:data/z:row">
			<div>
				<xsl:value-of select="@ows_Homepagetext" disable-output-escaping="yes"/>
			</div>
		</xsl:for-each>
	</div>
	</xsl:template>
</xsl:stylesheet>