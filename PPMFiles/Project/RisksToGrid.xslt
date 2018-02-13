<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:cw="http://schemas.microsoft.com/sharepoint/soap/" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" exclude-result-prefixes="xs cw rs z">
	<xsl:variable name="MultiDelimiter"><![CDATA[^\d+;#|;#\d+;#|;#]]></xsl:variable>
	<xsl:template match="/">
		<NewDataSet>
			<xsl:for-each select="//Risks/cw:listitems/rs:data/z:row">
			<Item>
				<Title><xsl:value-of select="@ows_Title"/></Title>
				<Probability>
					<xsl:choose>
						<xsl:when test="@ows_Probability">
								<xsl:value-of select="format-number(@ows_Probability, '#')"/>
						</xsl:when>			
						<xsl:otherwise>
							0
						</xsl:otherwise>
					</xsl:choose>
				</Probability>
				<Impact>
					<xsl:choose>
						<xsl:when test="@ows_Impact">
								<xsl:value-of select="format-number(@ows_Impact, '#')"/>
						</xsl:when>			
						<xsl:otherwise>
							0
						</xsl:otherwise>
					</xsl:choose>
				</Impact>
				<CreatedBy><xsl:value-of select="substring-after(@ows_Author, ';#')"/></CreatedBy>
				<Created><xsl:value-of select="@ows_Created"/></Created>
				<Status><xsl:value-of select="@ows_Status"/></Status>
				<RiskSource><xsl:value-of select="@ows_Risk_x0020_Source"/></RiskSource>
			</Item>	  
			</xsl:for-each>
		</NewDataSet>
	</xsl:template>
</xsl:stylesheet>
